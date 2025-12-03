// lib/paymentHandlers.ts

import { db } from "@/lib/db";
import { OrderStatus, PaymentStatus, ShippingStatus } from "@prisma/client";

// Called after Lahza verification
export async function handlePaymentSuccess(
  pickupId?: string,
  orderId?: string
) {
  if (orderId) {
    // ✅ Order: mark paid + reduce stock
    const order = await db.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order || order.paymentStatus === PaymentStatus.COMPLETED) return;

    // Update order
    await db.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: PaymentStatus.COMPLETED,
        status: OrderStatus.PROCESSING,
      },
    });

    // Reduce stock
    for (const item of order.items) {
      await db.product.update({
        where: {
          id: item.productId,
          stock: { gte: item.quantity },
        },
        data: { stock: { decrement: item.quantity } },
      });
    }
  }

  if (pickupId) {
  await db.pickup.update({
    where: { id: pickupId },
    data: {
      paymentStatus: PaymentStatus.COMPLETED,
      status: ShippingStatus.PROCESSING,
    },
  });

  const tracking = await db.shippingTracking.findUnique({
    where: { pickupId },
  });

  if (tracking) {
    await db.shippingTracking.update({
      where: { id: tracking.id },
      data: { status: ShippingStatus.PROCESSING },
    });

    await db.trackingEvent.create({
      data: {
        tracking: { connect: { id: tracking.id } },
        eventType: ShippingStatus.PROCESSING,
        details: "Payment confirmed, pickup scheduled",
        location: "A2Z Logistics",
        occurredAt: new Date(),
      },
    });
  }
}
}

export async function handlePaymentFailure(
  pickupId?: string,
  orderId?: string
) {
  if (orderId) {
    const order = await db.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order || order.paymentStatus === PaymentStatus.FAILED) return;

    // Restore stock if it was reserved/pre-allocated
    for (const item of order.items) {
      await db.product.update({
        where: { id: item.productId },
        data: { stock: { increment: item.quantity } },
      });
    }

    await db.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: PaymentStatus.FAILED,
        status: OrderStatus.CANCELLED,
      },
    });
  }

  if (pickupId) {
    await db.pickup.update({
      where: { id: pickupId },
      data: {
        paymentStatus: PaymentStatus.FAILED,
        status: ShippingStatus.FAILED_ATTEMPT,
      },
    });
  }
}
