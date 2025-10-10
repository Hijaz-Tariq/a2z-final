import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db";
import { stripe } from "../../../../../lib/stripe";
import { currentUser } from "../../../../../lib/auth";

export async function POST(req: Request) {
  try {
    const {
      productId,
      quantity = 1,
      customerInfo,
      shippingAddress,
      isGuest = false,
      guestSessionToken,
    } = await req.json();

    // Validate required fields
    if (!productId || !quantity || !shippingAddress) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (isGuest && !customerInfo?.email) {
      return NextResponse.json(
        { error: "Guest checkout requires email" },
        { status: 400 }
      );
    }

    const product = await db.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.stock < quantity) {
      return NextResponse.json(
        { error: "Insufficient stock" },
        { status: 400 }
      );
    }

    let userId: string | undefined;
    let guestCheckoutId: string | undefined;
    let guestSessionId: string | undefined;

    // Handle user authentication
    if (!isGuest) {
      // Implement your auth logic here
      const user = await currentUser();
      userId = user?.id;
    }

    // Handle guest checkout
    if (isGuest) {
      // Check for existing guest session
      if (guestSessionToken) {
        const guestSession = await db.guestSession.findUnique({
          where: { sessionToken: guestSessionToken },
          include: {
            orders: {
              include: {
                guest: true,
              },
              orderBy: {
                createdAt: "desc",
              },
              take: 1,
            },
          },
        });

        if (guestSession) {
          guestSessionId = guestSession.id;
          // Get guestCheckout from the most recent order
          if (guestSession.orders.length > 0 && guestSession.orders[0].guest) {
            guestCheckoutId = guestSession.orders[0].guest.id;
          }
        }
      }

      // Create or find guest checkout record
      if (!guestCheckoutId) {
        let guestCheckout = await db.guestCheckout.findFirst({
          where: {
            email: customerInfo.email,
          },
        });

        if (!guestCheckout) {
          guestCheckout = await db.guestCheckout.create({
            data: {
              name: customerInfo.name,
              email: customerInfo.email,
              phone: customerInfo.phone,
            },
          });
        }
        guestCheckoutId = guestCheckout.id;
      }

      // Create guest session if not exists
      if (!guestSessionId) {
        const newGuestSession = await db.guestSession.create({
          data: {
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          },
        });
        guestSessionId = newGuestSession.id;
      }
    }

    // Calculate totals
    const price = product.discountPrice ?? product.price;
    const subtotal = Number(price) * quantity;
    const shippingCost = await calculateShippingCost(
      // product,
      // shippingAddress,
      // quantity
    );
    const total = subtotal + shippingCost;

    // Create order
    const order = await db.order.create({
      data: {
        status: "PENDING",
        total,
        shippingCost,
        shippingAddress,
        paymentStatus: "PENDING",
        ...(userId && { user: { connect: { id: userId } } }),
        ...(guestCheckoutId && { guest: { connect: { id: guestCheckoutId } } }),
        ...(guestSessionId && {
          guestSession: { connect: { id: guestSessionId } },
        }),
        items: {
          create: {
            productId: product.id,
            quantity,
            originalPrice: product.price,
            discountPrice: product.discountPrice,
          },
        },
      },
      include: {
        items: true,
        user: true,
        guest: true,
        guestSession: true,
      },
    });

    // Update stock
    // await db.product.update({
    //   where: { id: product.id },
    //   data: { stock: { decrement: quantity } },
    // });

    // Get or create Stripe customer
    let stripeCustomerId: string;
    const customerEmail =
      order.user?.email || order.guest?.email || customerInfo?.email;
    const customerName =
      order.user?.name || order.guest?.name || customerInfo?.name;

    if (userId) {
      let stripeCustomer = await db.stripeCustomer.findUnique({
        where: { userId },
      });

      if (!stripeCustomer) {
        const customer = await stripe.customers.create({
          email: customerEmail,
          name: customerName,
          metadata: { userId, type: "user" },
        });

        stripeCustomer = await db.stripeCustomer.create({
          data: {
            userId,
            stripeCustomerId: customer.id,
          },
        });
      }
      stripeCustomerId = stripeCustomer.stripeCustomerId;
    } else if (guestCheckoutId) {
      let stripeCustomer = await db.stripeCustomer.findUnique({
        where: { guestCheckoutId },
      });

      if (!stripeCustomer) {
        const customer = await stripe.customers.create({
          email: customerEmail,
          name: customerName,
          phone: order.guest?.phone || customerInfo?.phone,
          metadata: { guestCheckoutId, type: "guest" },
        });

        stripeCustomer = await db.stripeCustomer.create({
          data: {
            guestCheckoutId,
            stripeCustomerId: customer.id,
          },
        });
      }
      stripeCustomerId = stripeCustomer.stripeCustomerId;
    } else {
      // Fallback: create a Stripe customer without linking to user/guest
      const customer = await stripe.customers.create({
        email: customerEmail,
        name: customerName,
        metadata: { type: "anonymous" },
      });
      stripeCustomerId = customer.id;
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      line_items: [
        {
          quantity,
          price_data: {
            currency: "USD",
            product_data: {
              name: product.name,
              description: product.description || undefined,
              images: product.images,
            },
            unit_amount: Math.round(Number(price) * 100),
          },
        },
        ...(shippingCost > 0
          ? [
              {
                quantity: 1,
                price_data: {
                  currency: "USD",
                  product_data: {
                    name: "Shipping",
                    description: "Shipping cost",
                  },
                  unit_amount: Math.round(shippingCost * 100),
                },
              },
            ]
          : []),
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${order.id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/products/${product.id}?canceled=1`,
      metadata: {
        orderId: order.id,
        ...(userId && { userId }),
        ...(guestCheckoutId && { guestCheckoutId }),
        ...(guestSessionId && { guestSessionId }),
        type: userId ? "user" : "guest",
      },
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU"],
      },
    });

    // Update order with session ID
    await db.order.update({
      where: { id: order.id },
      data: { trackingNumber: session.id },
    });

    return NextResponse.json({
      url: session.url,
      orderId: order.id,
      ...(isGuest && guestSessionId && { guestSessionId }),
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to process checkout" },
      { status: 500 }
    );
  }
}

async function calculateShippingCost(
  // product: any,
  // address: any,
  // quantity: number
): Promise<number> {
  // Implement your shipping logic here
  return 5.0; // Flat rate for now
}
