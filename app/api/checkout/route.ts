/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// // import { NextResponse } from 'next/server';
// // import { auth } from '@/auth';
// // import { db } from '../../../lib/db';
// // import type { Prisma } from '@prisma/client';

// // export async function POST(req: Request) {
// //   try {
// //     const session = await auth();
// //     const {
// //       email,
// //       shippingAddress = {},
// //       shippingCost = 0,
// //       brokerId,
// //       guestId
// //     } = await req.json();

// //     // Validate required fields
// //     if (!email) {
// //       return NextResponse.json(
// //         { error: 'Email is required' },
// //         { status: 400 }
// //       );
// //     }

// //     // Parse cookies manually for guest sessions
// //     const cookieHeader = req.headers.get('cookie') || '';
// //     const guestSessionId = cookieHeader
// //       .split(';')
// //       .find(c => c.trim().startsWith('guest_session_id='))
// //       ?.split('=')[1];

// //     // Get cart with proper typing
// //     const cart = await db.cart.findFirst({
// //       where: {
// //         OR: [
// //           { userId: session?.user?.id },
// //           { guestSessionId },
// //           { guestId }
// //         ].filter(Boolean) as Prisma.CartWhereInput[]
// //       },
// //       include: {
// //         items: {
// //           include: { product: true }
// //         }
// //       }
// //     });

// //     if (!cart || cart.items.length === 0) {
// //       return NextResponse.json(
// //         { error: 'Cart is empty' },
// //         { status: 400 }
// //       );
// //     }

// //     // Calculate totals with proper typing
// //     const subtotal = cart.items.reduce((sum, item) => {
// //       const price = item.discountPrice ?? item.originalPrice;
// //       return sum + (Number(price) * item.quantity);
// //     }, 0);

// //     const total = subtotal + shippingCost;

// //     // Prepare order data with all required fields
// //     const orderData: Prisma.OrderCreateInput = {
// //       status: 'PENDING',
// //       total,
// //       shippingCost,
// //       shippingAddress,
// //       ...(session?.user?.id && {
// //         user: { connect: { id: session.user.id } }
// //       }),
// //       ...(guestId && {
// //         guest: { connect: { id: guestId } }
// //       }),
// //       ...(guestSessionId && {
// //         guestSession: { connect: { id: guestSessionId } }
// //       }),
// //       ...(brokerId && {
// //         broker: { connect: { id: brokerId } }
// //       }),
// //       items: {
// //         create: cart.items.map(item => ({
// //           product: { connect: { id: item.productId } },
// //           quantity: item.quantity,
// //           originalPrice: item.originalPrice,
// //           discountPrice: item.discountPrice
// //         }))
// //       }
// //     };

// //     // Transaction with proper error handling
// //     const order = await db.$transaction(async (tx) => {
// //       const order = await tx.order.create({
// //         data: orderData,
// //         include: { items: true }
// //       });

// //       await tx.cartItem.deleteMany({
// //         where: { cartId: cart.id }
// //       });

// //       return order;
// //     });

// //     return NextResponse.json({
// //       order,
// //       success: true
// //     }, { status: 201 });

// //   } catch (error) {
// //     console.error('Checkout error:', error);
// //     return NextResponse.json(
// //       { error: 'Failed to process checkout' },
// //       { status: 500 }
// //     );
// //   }
// // }

// // app/api/checkout/route.ts
// import { NextResponse } from "next/server";
// import { headers } from "next/headers";
// import { db } from "../../../lib/db";
// import type { Prisma, OrderStatus } from "@prisma/client";

// export async function POST(req: Request) {
//   try {
//     const {
//       productId,
//       quantity,
//       customerInfo,
//       shippingAddress,
//       // paymentMethod = "CREDIT_CARD",
//     } = await req.json();

//     // Validate required fields
//     if (!productId || !quantity || !customerInfo || !shippingAddress) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Get product details
//     const product = await db.product.findUnique({
//       where: { id: productId },
//     });

//     if (!product) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     if (product.stock < quantity) {
//       return NextResponse.json(
//         { error: "Insufficient stock" },
//         { status: 400 }
//       );
//     }

//     // Check if user is authenticated via session or guest
//     const headersList = await headers();
//     const sessionToken =
//       headersList.get("x-session-token") ||
//       headersList.get("authorization")?.replace("Bearer ", "");

//     let userId: string | undefined;
//     let guestSessionId: string | undefined;
//     let guestCheckoutId: string | undefined;

//     if (sessionToken && sessionToken !== "guest") {
//       // Try to find user session
//       const session = await db.guestSession.findUnique({
//         where: { sessionToken },
//         include: { user: true },
//       });

//       if (session?.user) {
//         userId = session.user.id;
//       } else if (session) {
//         guestSessionId = session.id;
//       }
//     }

//     // Calculate totals
//     const price = product.discountPrice ?? product.price;
//     const subtotal = Number(price) * quantity;
//     const shippingCost = await calculateShippingCost(
//       product,
//       shippingAddress,
//       quantity
//     );
//     const total = subtotal + shippingCost;

//     // Create order in transaction
//     const order = await db.$transaction(async (tx) => {
//       // Create guest checkout record if needed
//       if (!userId && !guestSessionId && customerInfo.email) {
//         const guestCheckout = await tx.guestCheckout.create({
//           data: {
//             name: customerInfo.name,
//             email: customerInfo.email,
//             phone: customerInfo.phone,
//           },
//         });
//         guestCheckoutId = guestCheckout.id;
//       }

//       // Create the order
//       const orderData: Prisma.OrderCreateInput = {
//         status: "PENDING" as OrderStatus,
//         total,
//         shippingCost,
//         shippingAddress,
//         items: {
//           create: {
//             productId: product.id,
//             quantity,
//             originalPrice: product.price,
//             discountPrice: product.discountPrice,
//           },
//         },
//       };

//       // Connect to appropriate customer
//       if (userId) {
//         orderData.user = { connect: { id: userId } };
//       } else if (guestSessionId) {
//         orderData.guestSession = { connect: { id: guestSessionId } };
//       } else if (guestCheckoutId) {
//         orderData.guest = { connect: { id: guestCheckoutId } };
//       }

//       const order = await tx.order.create({
//         data: orderData,
//         include: {
//           items: {
//             include: {
//               product: true,
//             },
//           },
//         },
//       });

//       // Update product stock
//       await tx.product.update({
//         where: { id: productId },
//         data: { stock: { decrement: quantity } },
//       });

//       return order;
//     });

//     // Here you would typically integrate with your payment provider
//     // For now, we'll return the order details
//     return NextResponse.json(
//       {
//         order,
//         paymentIntent: {
//           clientSecret: null, // You'd get this from your payment provider
//           requiresAction: false,
//         },
//         success: true,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Checkout error:", error);
//     return NextResponse.json(
//       { error: "Failed to process checkout" },
//       { status: 500 }
//     );
//   }
// }

// async function calculateShippingCost(
//   product: any,
//   shippingAddress: any,
//   quantity: number
// ): Promise<number> {
//   // Implement your shipping calculation logic here
//   // This is a simplified example
//   const baseRate = 5.0;
//   const weightRate = product.weight ? product.weight * 0.5 : 0;
//   const quantityRate = quantity * 0.25;

//   return baseRate + weightRate + quantityRate;
// }

// In your /api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { stripe } from "../../../lib/stripe";
import { currentUser } from "../../../lib/auth"; // Import currentUser

export async function POST(req: NextRequest) {
  try {
    const {
      items,
      customerInfo,
      shippingAddress,
      isGuest = false,
      guestSessionToken,
      // type = "cart",
    } = await req.json();

    // Validate required fields
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No items in checkout" },
        { status: 400 }
      );
    }

    if (isGuest && !customerInfo?.email) {
      return NextResponse.json(
        { error: "Guest checkout requires email" },
        { status: 400 }
      );
    }

    // Use currentUser() instead of manual auth handling
    const user = await currentUser();

    let userId: string | undefined;
    let guestCheckoutId: string | undefined;
    let guestSessionId: string | undefined;

    // Handle authentication
    if (!isGuest && user?.id) {
      userId = user.id;
    } else if (isGuest) {
      // Handle guest session logic (copy from working route)
      if (guestSessionToken) {
        const guestSession = await db.guestSession.findUnique({
          where: { sessionToken: guestSessionToken },
          include: {
            orders: {
              include: { guest: true },
              orderBy: { createdAt: "desc" },
              take: 1,
            },
          },
        });

        if (guestSession) {
          guestSessionId = guestSession.id;
          if (guestSession.orders.length > 0 && guestSession.orders[0].guest) {
            guestCheckoutId = guestSession.orders[0].guest.id;
          }
        }
      }

      // Create or find guest checkout
      if (!guestCheckoutId && customerInfo) {
        let guestCheckout = await db.guestCheckout.findFirst({
          where: { email: customerInfo.email },
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
            sessionToken: guestSessionToken || generateSessionToken(),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
        guestSessionId = newGuestSession.id;
      }
    } else {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Calculate totals and create order
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await db.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found` },
          { status: 404 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name}` },
          { status: 400 }
        );
      }

      const price = product.discountPrice ?? product.price;
      subtotal += Number(price) * item.quantity;

      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        originalPrice: product.price,
        discountPrice: product.discountPrice,
      });
    }

    const shippingCost = await calculateShippingCost(items, shippingAddress);
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
          create: orderItems,
        },
      },
      include: {
        items: true,
        user: true,
        guest: true,
      },
    });

    // // Update stock
    // for (const item of items) {
    //   await db.product.update({
    //     where: { id: item.productId },
    //     data: { stock: { decrement: item.quantity } },
    //   });
    // }

    // Get or create Stripe customer (similar to working route)
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
      const customer = await stripe.customers.create({
        email: customerEmail,
        name: customerName,
        metadata: { type: "anonymous" },
      });
      stripeCustomerId = customer.id;
    }

    // Create Stripe line items
    const line_items = [];

    for (const item of items) {
      const product = await db.product.findUnique({
        where: { id: item.productId },
      });

      if (product) {
        const price = product.discountPrice ?? product.price;
        line_items.push({
          quantity: item.quantity,
          price_data: {
            currency: "USD",
            product_data: {
              name: product.name,
              description: product.description || undefined,
              images: product.images,
            },
            unit_amount: Math.round(Number(price) * 100),
          },
        });
      }
    }

    if (shippingCost > 0) {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: "Shipping",
            description: "Shipping cost",
          },
          unit_amount: Math.round(shippingCost * 100),
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${order.id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart?canceled=1`,
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

function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

async function calculateShippingCost(items: any, shippingAddress: any
  // items: any[],
  // address: any
): Promise<number> {
  // Implement your shipping logic
  return 5.0;
}
