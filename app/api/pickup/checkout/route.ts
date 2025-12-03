// // api/pickup/checkout/route.ts (Lahza version)

// import { NextResponse } from "next/server";
// import { db } from "../../../../lib/db";
// import { auth } from "@/auth";
// import { getCookie } from "../../../../lib/cookies";

// const LAHZA_SECRET_KEY = process.env.LAHZA_SECRET_KEY!;
// const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

// export async function POST(req: Request) {
//   try {
//     const { pickupId } = await req.json();

//     if (!pickupId) {
//       return NextResponse.json({ error: "Pickup ID required" }, { status: 400 });
//     }

//     const session = await auth();
//     const cookies = req.headers.get("cookie") || "";
//     const guestSessionId = getCookie(cookies, "guest_session_id");

//     const pickup = await db.pickup.findUnique({
//       where: { id: pickupId },
//       include: {
//         User: { select: { id: true, email: true, name: true } },
//         GuestSession: { select: { id: true } },
//         pickupContact: { select: { email: true, name: true, phone: true } },
//       },
//     });

//     if (!pickup) {
//       return NextResponse.json({ error: "Pickup not found" }, { status: 404 });
//     }

//     // Authorization check (same as before)
//     if (session?.user?.id) {
//       const owns = pickup.User.some(u => u.id === session.user.id);
//       if (!owns) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     } else if (guestSessionId) {
//       const owns = pickup.GuestSession.some(g => g.id === guestSessionId);
//       if (!owns) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     } else {
//       return NextResponse.json({ error: "Authentication required" }, { status: 401 });
//     }

//     // Customer info
//     const customer = pickup.User[0] || pickup.pickupContact;
//     const email = customer?.email || "guest@example.com"; // Lahza requires email
//     const name = customer?.name || "Guest";
//     // const phone = customer?.phone || "";

//     // Lahza expects amount in **cents** for USD
//     const amountInCents = Math.round((pickup.calculatedCost || 0) * 100).toString();

//     // Generate unique reference (e.g., pickup_abc123)
//     const reference = `pickup_${pickup.id}_${Date.now()}`;

//     // Call Lahza to initialize transaction
//     const lahzaResponse = await fetch("https://api.lahza.io/transaction/initialize", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${LAHZA_SECRET_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         amount: amountInCents,
//         currency: "USD",
//         email,
//         reference,
//         first_name: name.split(" ")[0] || name,
//         last_name: name.split(" ").slice(1).join(" ") || "",
//         // mobile: phone,
//         callback_url: `${APP_URL}/api/pickup/verify?pickupId=${pickup.id}&reference=${reference}`,
//         metadata: JSON.stringify({
//           pickupId: pickup.id,
//           userId: session?.user?.id,
//           guestSessionId,
//           type: session?.user?.id ? "user" : "guest",
//         }),
//       }),
//     });

//     if (!lahzaResponse.ok) {
//       const err = await lahzaResponse.text();
//       console.error("Lahza init failed:", err);
//       return NextResponse.json({ error: "Payment gateway error" }, { status: 500 });
//     }

//     const lahzaData = await lahzaResponse.json();

//     // Save reference & status in pickup (for later verification)
//     await db.pickup.update({
//       where: { id: pickup.id },
//       data: {
//         commercialDocuments: {
//           stripeSessionId: reference, // reuse field or add `lahzaReference`
//           paymentStatus: "PENDING",
//         },
//       },
//     });

//     return NextResponse.json({
//       url: lahzaData.data.authorization_url,
//     });
//   } catch (error) {
//     console.error("Lahza checkout error:", error);
//     return NextResponse.json({ error: "Failed to create payment" }, { status: 500 });
//   }
// }

// api/pickup/checkout/route.ts

import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { auth } from "@/auth";
import { getCookie } from "../../../../lib/cookies";
import { initializeTransaction } from "@/lib/lahza";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export async function POST(req: Request) {
  try {
    const { pickupId } = await req.json();

    if (!pickupId) {
      return NextResponse.json(
        { error: "Pickup ID required" },
        { status: 400 }
      );
    }

    const session = await auth();
    const cookies = req.headers.get("cookie") || "";
    const guestSessionId = getCookie(cookies, "guest_session_id");

    const pickup = await db.pickup.findUnique({
      where: { id: pickupId },
      include: {
        User: { select: { id: true, email: true, name: true } },
        GuestSession: { select: { id: true } },
        pickupContact: { select: { email: true, name: true, phone: true } },
      },
    });

    if (!pickup) {
      return NextResponse.json({ error: "Pickup not found" }, { status: 404 });
    }

    // Authorization
    if (session?.user?.id) {
      const owns = pickup.User.some((u) => u.id === session.user.id);
      if (!owns)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else if (guestSessionId) {
      const owns = pickup.GuestSession.some((g) => g.id === guestSessionId);
      if (!owns)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Customer data
    const customer = pickup.User[0] || pickup.pickupContact;
    const email = customer?.email?.trim() || "guest@example.com";
    const name = customer?.name || "Guest";
    // const phone = customer?.phone || "";

    if (!email || email === "guest@example.com") {
      console.warn("Using fallback email for pickup:", pickupId);
    }

    const amountInCents = Math.round(
      (pickup.calculatedCost || 0) * 100
    ).toString();
    const reference = `pickup_${pickup.id}_${Date.now()}`;

    if (!pickup.calculatedCost || pickup.calculatedCost <= 0) {
      return NextResponse.json({ error: "Invalid cost" }, { status: 400 });
    }

    // ✅ Use shared utility
    const lahzaData = await initializeTransaction({
      amount: amountInCents,
      currency: "USD",
      email,
      reference,
      first_name: name.split(" ")[0] || name,
      last_name: name.split(" ").slice(1).join(" ") || "",
      // mobile: phone,
      callback_url: `${APP_URL}/api/pickup/verify?pickupId=${pickup.id}&reference=${reference}`,
      metadata: {
        pickupId: pickup.id,
        userId: session?.user?.id,
        guestSessionId,
        type: session?.user?.id ? "user" : "guest",
        // ✅ Critical: handle cancellation
        cancel_action: `${APP_URL}/track/${pickupId}`,
      },
    });

    // Save reference
    await db.pickup.update({
      where: { id: pickup.id },
      data: {
        commercialDocuments: {
          stripeSessionId: reference,
          paymentStatus: "PENDING",
        },
      },
    });

    return NextResponse.json({
      url: lahzaData.authorization_url,
    });
  } catch (error) {
    console.error("Lahza checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 500 }
    );
  }
}
