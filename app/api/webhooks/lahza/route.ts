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

// Use your existing Lahza Secret Key
const LAHZA_SECRET_KEY = process.env.LAHZA_SECRET_KEY!;

export async function POST(req: NextRequest) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buf = await buffer(req as any);
  const body = buf.toString();
  const signature = req.headers.get("x-lahza-signature");

  if (!signature) {
    return new NextResponse("Missing signature", { status: 400 });
  }

  // Sign the raw body with your secret key
  const expectedSignature = createHmac("sha256", LAHZA_SECRET_KEY)
    .update(body)
    .digest("hex");

  if (signature !== expectedSignature) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  const event = JSON.parse(body);

  if (event.event === "charge.success") {
    const metadata = event.data.metadata
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
  }

  return new NextResponse(null, { status: 200 });
}