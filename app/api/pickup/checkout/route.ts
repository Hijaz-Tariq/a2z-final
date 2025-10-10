import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { stripe } from "../../../../lib/stripe";
import { auth } from "@/auth";
import { getCookie } from "../../../../lib/cookies";

export async function POST(req: Request) {
  try {
    const { pickupId } = await req.json();

    // Validate required fields
    if (!pickupId) {
      return NextResponse.json(
        { error: "Pickup ID is required" },
        { status: 400 }
      );
    }

    // Get session and guest session token
    const session = await auth();
    const cookies = req.headers.get("cookie") || "";
    const guestSessionId = getCookie(cookies, "guest_session_id");

    // Fetch the pickup with needed data
    const pickup = await db.pickup.findUnique({
      where: { id: pickupId },
      include: {
        User: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        GuestSession: {
          select: {
            id: true,
          },
        },
        pickupContact: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    if (!pickup) {
      return NextResponse.json({ error: "Pickup not found" }, { status: 404 });
    }

    // Verify ownership/access
    if (session?.user?.id) {
      const userOwnsPickup = pickup.User.some(
        (user) => user.id === session.user.id
      );
      if (!userOwnsPickup) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    } else if (guestSessionId) {
      const guestOwnsPickup = pickup.GuestSession.some(
        (guest) => guest.id === guestSessionId
      );
      if (!guestOwnsPickup) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    } else {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get customer email if available, but don't require it
    const customerEmail = pickup.User[0]?.email || pickup.pickupContact?.email;

    // Create Stripe checkout session without requiring email
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sessionOptions: any = {
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "USD",
            product_data: {
              name: `Pickup Service #${pickup.id}`,
              description: `Pickup service for ${pickup.itemsDescription}`,
            },
            unit_amount: Math.round((pickup.calculatedCost || 0) * 100),
          },
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/pickup/${pickup.id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pickup/${pickup.id}?canceled=1`,
      metadata: {
        pickupId: pickup.id,
        ...(session?.user?.id && { userId: session.user.id }),
        ...(guestSessionId && { guestSessionId }),
        type: session?.user?.id ? "user" : "guest",
      },
    };

    // Only add customer_email if available
    if (customerEmail) {
      sessionOptions.customer_email = customerEmail;
    }

    const stripeSession = await stripe.checkout.sessions.create(sessionOptions);

    // Update pickup with Stripe session ID
    await db.pickup.update({
      where: { id: pickup.id },
      data: {
        commercialDocuments: {
          stripeSessionId: stripeSession.id,
          paymentStatus: "PENDING",
        },
      },
    });

    return NextResponse.json({
      url: stripeSession.url,
    });
  } catch (error) {
    console.error("Pickup checkout error:", error);
    return NextResponse.json(
      { error: "Failed to process pickup checkout" },
      { status: 500 }
    );
  }
}
