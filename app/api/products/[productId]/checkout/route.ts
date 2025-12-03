import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db";
import { auth } from "@/auth";
// import { getCookie } from "../../../../../lib/cookies";
import { initializeTransaction } from "../../../../../lib/lahza";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

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

    // Authentication
    const session = await auth();
    let userId: string | undefined;
    let guestCheckoutId: string | undefined;
    let guestSessionId: string | undefined;

    if (!isGuest && session?.user?.id) {
      userId = session.user.id;
    } else if (isGuest) {
      // Reuse existing guest logic
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

      if (!guestSessionId) {
        const newGuestSession = await db.guestSession.create({
          data: {
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

    // Calculate totals
    const price = product.discountPrice ?? product.price;
    const subtotal = Number(price) * quantity;
    const shippingCost = await calculateShippingCost();
    const total = subtotal + shippingCost;

    // Create order (payment not yet confirmed)
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
      },
    });

    // Customer info for Lahza (email is required)
    const customerEmail =
      order.user?.email || order.guest?.email || customerInfo?.email || "guest@example.com";
    const customerName =
      order.user?.name || order.guest?.name || customerInfo?.name || "Guest";
    const phone = order.guest?.phone || customerInfo?.phone || "";

    // Prepare Lahza transaction
    const amountInCents = Math.round(total * 100).toString();
    const reference = `order_${order.id}_${Date.now()}`;

    const lahzaData = await initializeTransaction({
      amount: amountInCents,
      currency: "USD",
      email: customerEmail,
      reference,
      first_name: customerName.split(" ")[0] || customerName,
      last_name: customerName.split(" ").slice(1).join(" ") || "",
      mobile: phone,
      callback_url: `${APP_URL}/api/checkout/verify?orderId=${order.id}&reference=${reference}`,
      metadata: {
        orderId: order.id,
        userId,
        guestCheckoutId,
        guestSessionId,
        type: userId ? "user" : "guest",
        // cancel_action: `${APP_URL}/track/${pickupId}`,
      },
    });

    // Save Lahza reference in trackingNumber (safe reuse)
    await db.order.update({
      where: { id: order.id },
      data: { trackingNumber: reference },
    });

    return NextResponse.json({
      url: lahzaData.authorization_url,
      orderId: order.id,
      ...(isGuest && guestSessionId && { guestSessionId }),
    });
  } catch (error) {
    console.error("Lahza product checkout error:", error);
    return NextResponse.json(
      { error: "Failed to process checkout" },
      { status: 500 }
    );
  }
}

// Keep your shipping logic — expand later as needed
async function calculateShippingCost(): Promise<number> {
  // TODO: Implement real shipping calculation
  return 5.0; // Flat rate
}