// // app/api/webhooks/lahza/route.ts

// import { NextRequest, NextResponse } from "next/server";
// import { buffer } from "micro";
// import { createHmac } from "crypto";
// import { handlePaymentSuccess } from "@/lib/paymentHandlers";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // Use your existing Lahza Secret Key
// const LAHZA_SECRET_KEY = process.env.LAHZA_SECRET_KEY!;

// export async function POST(req: NextRequest) {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const buf = await buffer(req as any);
//   const body = buf.toString();
//   const signature = req.headers.get("x-lahza-signature");

//   if (!signature) {
//     return new NextResponse("Missing signature", { status: 400 });
//   }

//   // Sign the raw body with your secret key
//   const expectedSignature = createHmac("sha256", LAHZA_SECRET_KEY)
//     .update(body)
//     .digest("hex");

//   if (signature !== expectedSignature) {
//     return new NextResponse("Invalid signature", { status: 401 });
//   }

//   const event = JSON.parse(body);

//   if (event.event === "charge.success") {
//     const metadata = event.data.metadata
//       ? typeof event.data.metadata === "string"
//         ? JSON.parse(event.data.metadata)
//         : event.data.metadata
//       : null;

//     const pickupId = metadata?.pickupId;
//     const orderId = metadata?.orderId;

//     if (pickupId) {
//       await handlePaymentSuccess(pickupId);
//     } else if (orderId) {
//       await handlePaymentSuccess(undefined, orderId);
//     }
//   }

//   return new NextResponse(null, { status: 200 });
// }

// app/api/webhooks/lahza/route.ts
import { NextRequest, NextResponse } from "next/server";
import { buffer } from "micro";
import { createHmac } from "crypto";
import { handlePaymentSuccess } from "@/lib/paymentHandlers";

export const config = {
  api: {
    bodyParser: false,
  },
};

const LAHZA_SECRET_KEY = process.env.LAHZA_SECRET_KEY;

if (!LAHZA_SECRET_KEY) {
  console.error("LAHZA_SECRET_KEY is not set");
}

export async function POST(req: NextRequest) {
  try {
    // 1. Validate secret key is set
    if (!LAHZA_SECRET_KEY) {
      console.error("LAHZA_SECRET_KEY missing");
      return new NextResponse("Server misconfiguration", { status: 500 });
    }

    // 2. Get raw buffer safely
    let buf: Buffer;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      buf = await buffer(req as any);
    } catch (err) {
      console.error("Failed to read request body:", err);
      return new NextResponse("Invalid request body", { status: 400 });
    }

    const body = buf.toString();
    const signature = req.headers.get("x-lahza-signature");

    // 3. Validate signature presence
    if (!signature) {
      console.warn("Webhook missing x-lahza-signature");
      return new NextResponse("Missing signature", { status: 400 });
    }

    // 4. Verify signature
    const expectedSignature = createHmac("sha256", LAHZA_SECRET_KEY)
      .update(body)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.warn("Webhook signature mismatch");
      return new NextResponse("Invalid signature", { status: 401 });
    }

    // 5. Parse JSON safely
    let event;
    try {
      event = JSON.parse(body);
    } catch (parseError) {
      console.error("Failed to parse webhook JSON:", body.slice(0, 500), parseError);
      return new NextResponse("Invalid JSON", { status: 400 });
    }

    // 6. Handle event
    if (event?.event === "charge.success") {
      try {
        const metadata = event.data?.metadata
          ? typeof event.data.metadata === "string"
            ? JSON.parse(event.data.metadata)
            : event.data.metadata
          : null;

        const pickupId = metadata?.pickupId;
        const orderId = metadata?.orderId;

        if (pickupId) {
          await handlePaymentSuccess(pickupId);
        } else if (orderId) {
          await handlePaymentSuccess(undefined, orderId);
        }
      } catch (handlerError) {
        console.error("Error in handlePaymentSuccess:", handlerError);
        // Still return 200 to avoid Lahza retrying
        // (best practice: ack webhook, handle failure async)
      }
    }

    // Always respond with 200 to acknowledge receipt
    return new NextResponse(null, { status: 200 });

  } catch (error) {
    // Top-level safety net
    console.error("Unexpected error in Lahza webhook:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// Optional: Reject non-POST requests
export async function GET() {
  return new NextResponse("Webhook endpoint expects POST", { status: 405 });
}