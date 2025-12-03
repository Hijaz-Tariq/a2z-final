

import { NextRequest, NextResponse } from "next/server";
import { verifyTransaction } from "@/lib/lahza";
import { handlePaymentSuccess, handlePaymentFailure } from "@/lib/paymentHandlers";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");
  const orderId = searchParams.get("orderId");

  if (!reference || !orderId) {
    return NextResponse.redirect(
      new URL(`/orders/${orderId}?error=missing_reference`, process.env.NEXT_PUBLIC_APP_URL!)
    );
  }

  try {
    const transaction = await verifyTransaction(reference);

    if (transaction.status === "success") {
      await handlePaymentSuccess(undefined, orderId);
      return NextResponse.redirect(
        new URL(`/orders/${orderId}?success=1`, process.env.NEXT_PUBLIC_APP_URL!)
      );
    } else {
      await handlePaymentFailure(undefined, orderId);
      return NextResponse.redirect(
        new URL(`/orders/${orderId}?error=payment_failed`, process.env.NEXT_PUBLIC_APP_URL!)
      );
    }
  } catch (error) {
    console.error("Checkout verification error:", error);
    await handlePaymentFailure(undefined, orderId);
    return NextResponse.redirect(
      new URL(`/orders/${orderId}?error=verification_failed`, process.env.NEXT_PUBLIC_APP_URL!)
    );
  }
}