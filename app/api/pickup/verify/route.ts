// // api/pickup/verify/route.ts

// import { NextRequest, NextResponse } from "next/server";
// import { db } from "../../../../lib/db";

// const LAHZA_SECRET_KEY = process.env.LAHZA_SECRET_KEY!;

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const reference = searchParams.get("reference");
//     const pickupId = searchParams.get("pickupId");

//     if (!reference || !pickupId) {
//       return NextResponse.redirect(new URL(`/pickup/${pickupId}?error=missing_params`, process.env.NEXT_PUBLIC_APP_URL!));
//     }

//     // Verify with Lahza
//     const verifyRes = await fetch(`https://api.lahza.io/transaction/verify/${reference}`, {
//       headers: {
//         "Authorization": `Bearer ${LAHZA_SECRET_KEY}`,
//       },
//     });

//     if (!verifyRes.ok) {
//       throw new Error("Verification failed");
//     }

//     const verifyData = await verifyRes.json();
//     const transaction = verifyData.data;

//     if (transaction.status === "success" && transaction.amount > 0) {
//       // ✅ Payment succeeded — finalize pickup
//       await db.pickup.update({
//         where: { id: pickupId },
//         data: {
//           commercialDocuments: {
//             paymentStatus: "COMPLETED",
//           },
//         },
//       });

//       // 🔁 If you have inventory logic (like for products), handle it here
//       // (For pickups, you likely don’t reduce stock)

//       return NextResponse.redirect(new URL(`/pickup/${pickupId}?success=1`, process.env.NEXT_PUBLIC_APP_URL!));
//     } else {
//       // ❌ Payment failed or pending
//       await db.pickup.update({
//         where: { id: pickupId },
//         data: {
//           commercialDocuments: {
//             paymentStatus: "FAILED",
//           },
//         },
//       });
//       return NextResponse.redirect(new URL(`/pickup/${pickupId}?error=payment_failed`, process.env.NEXT_PUBLIC_APP_URL!));
//     }
//   } catch (error) {
//     console.error("Verification error:", error);
//     const pickupId = new URL(req.url).searchParams.get("pickupId") || "unknown";
//     return NextResponse.redirect(new URL(`/pickup/${pickupId}?error=verification_failed`, process.env.NEXT_PUBLIC_APP_URL!));
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { verifyTransaction } from "@/lib/lahza";
import {
  handlePaymentSuccess,
  handlePaymentFailure,
} from "@/lib/paymentHandlers";
import { db } from "@/lib/db";
import { PaymentStatus } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");
  const pickupId = searchParams.get("pickupId");

  if (!reference || !pickupId) {
    return NextResponse.redirect(
      new URL(
        `/pickup/${pickupId}?error=missing_reference`,
        process.env.NEXT_PUBLIC_APP_URL!
      )
    );
  }

  try {
    const transaction = await verifyTransaction(reference);

    if (transaction.status === "success") {
      await handlePaymentSuccess(pickupId);
    }
    // Check for known cancel statuses (check Lahza dashboard for exact value)
    else if (["abandoned", "cancelled"].includes(transaction.status)) {
      await db.pickup.update({
        where: { id: pickupId },
        data: { paymentStatus: PaymentStatus.CANCELLED }, // if you add this enum
      });
    } else {
      await handlePaymentFailure(pickupId);
    }

    return NextResponse.redirect(
      new URL(`/track/${pickupId}`, process.env.NEXT_PUBLIC_APP_URL!)
    );
  } catch (error) {
    console.error("Verification error:", error);
    await handlePaymentFailure(pickupId);
    return NextResponse.redirect(
      new URL(`/track/${pickupId}`, process.env.NEXT_PUBLIC_APP_URL!)
    );
  }
}
