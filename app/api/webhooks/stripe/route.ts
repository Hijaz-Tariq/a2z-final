// // app/api/webhooks/stripe/route.ts
// import Stripe from 'stripe';
// import { headers } from 'next/headers';
// import { NextResponse } from 'next/server';
// import { stripe } from '../../../../lib/stripe';
// import { db } from '../../../../lib/db';

// export async function POST(req: Request) {
//   const body = await req.text();
//   const signature = (await headers()).get('Stripe-Signature') as string;

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     );
//   } catch (error: any) {
//     return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
//   }

//   const session = event.data.object as Stripe.Checkout.Session;

//   try {
//     switch (event.type) {
//       case 'checkout.session.completed':
//         await handleCheckoutCompleted(session);
//         break;
      
//       case 'checkout.session.async_payment_succeeded':
//         await handlePaymentSucceeded(session);
//         break;
      
//       case 'checkout.session.async_payment_failed':
//         await handlePaymentFailed(session);
//         break;
      
//       case 'charge.refunded':
//         await handleRefund(session);
//         break;
//     }

//     return new NextResponse(null, { status: 200 });
//   } catch (error) {
//     console.error('Webhook handler error:', error);
//     return new NextResponse('Webhook handler failed', { status: 500 });
//   }
// }

// async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
//   const orderId = session.metadata?.orderId;
//   if (!orderId) return;

//   await db.order.update({
//     where: { id: orderId },
//     data: { 
//       status: 'PROCESSING',
//       paymentStatus: 'COMPLETED'
//     }
//   });
// }

// async function handlePaymentFailed(session: Stripe.Checkout.Session) {
//   const orderId = session.metadata?.orderId;
//   if (!orderId) return;

//   const order = await db.order.findUnique({
//     where: { id: orderId },
//     include: { items: true }
//   });

//   if (order) {
//     // Update order status
//     await db.order.update({
//       where: { id: orderId },
//       data: { 
//         status: 'CANCELLED',
//         paymentStatus: 'FAILED'
//       }
//     });

//     // Restore stock
//     for (const item of order.items) {
//       await db.product.update({
//         where: { id: item.productId },
//         data: { stock: { increment: item.quantity } }
//       });
//     }
//   }
// }

// async function handleRefund(session: Stripe.Checkout.Session) {
//   const orderId = session.metadata?.orderId;
//   if (!orderId) return;

//   await db.order.update({
//     where: { id: orderId },
//     data: { 
//       paymentStatus: 'REFUNDED',
//       status: 'RETURNED'
//     }
//   });
// }


// app/api/webhooks/stripe/route.ts
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '../../../../lib/stripe';
import { db } from '../../../../lib/db';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'checkout.session.expired':
        await handleCheckoutExpired(event.data.object as Stripe.Checkout.Session);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      case 'charge.refunded':
        await handleRefund(event.data.object as Stripe.Charge);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return new NextResponse('Webhook handler failed', { status: 500 });
  }
}

// ✅ ONLY HERE — when Stripe confirms payment
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.orderId;
  if (!orderId) return;

  // ✅ STEP 1: Mark order as paid
  await db.order.update({
    where: { id: orderId },
    data: {
      status: 'PROCESSING',
      paymentStatus: 'COMPLETED',
      // paidAt: new Date(),
    },
  });

  // ✅ STEP 2: NOW — reduce stock (because payment succeeded!)
  const order = await db.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });

  if (!order) return;

  for (const item of order.items) {
    const updatedProduct = await db.product.update({
      where: {
        id: item.productId,
        stock: { gte: item.quantity }, // Prevents over-decrement
      },
      data: {
        stock: { decrement: item.quantity },
      },
    });

    if (!updatedProduct) {
      console.error(`[STOCK ERROR] Insufficient stock for product ${item.productId} (order ${orderId})`);
    }
  }

  console.log(`✅ [WEBHOOK] Order ${orderId} paid. Stock reduced.`);
}

// ✅ Restore stock if payment fails or expires
async function handleCheckoutExpired(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.orderId;
  if (!orderId) return;

  const order = await db.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });

  if (!order || order.status !== 'PENDING') return;

  for (const item of order.items) {
    await db.product.update({
      where: { id: item.productId },
       data: {
      stock: { increment: item.quantity } },
    });
  }

  await db.order.update({
    where: { id: orderId },
     data: {
      status: 'CANCELLED',
      paymentStatus: 'FAILED',
      // cancelledAt: new Date(),
    },
  });

  console.log(`🔄 [WEBHOOK] Order ${orderId} expired. Stock restored.`);
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  const orderId = paymentIntent.metadata?.orderId;
  if (!orderId) return;

  const order = await db.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });

  if (!order || order.status === 'CANCELLED' || order.paymentStatus === 'COMPLETED') return;

  for (const item of order.items) {
    await db.product.update({
      where: { id: item.productId },
       data: { stock: { increment: item.quantity } },
    });
  }

  await db.order.update({
    where: { id: orderId },
    data: {
      status: 'CANCELLED',
      paymentStatus: 'FAILED',
      // cancelledAt: new Date(),
    },
  });

  console.log(`❌ [WEBHOOK] Payment failed for order ${orderId}. Stock restored.`);
}

async function handleRefund(charge: Stripe.Charge) {
  const paymentIntentId = charge.payment_intent as string;
  if (!paymentIntentId) return;

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
    expand: ['metadata'],
  });

  const orderId = paymentIntent.metadata?.orderId;
  if (!orderId) return;

  const order = await db.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });

  if (!order) return;

  const totalRefunded = charge.amount_refunded || 0;
  const totalCharged = charge.amount || 0;

  if (totalRefunded >= totalCharged) {
    await db.order.update({
      where: { id: orderId },
     data:  {
        paymentStatus: 'REFUNDED',
        status: 'RETURNED',
        // refundedAt: new Date(),
      },
    });

    for (const item of order.items) {
      await db.product.update({
        where: { id: item.productId },
        data: { stock: { increment: item.quantity } },
      });
    }

    console.log(`↩️ [WEBHOOK] Full refund processed for order ${orderId}. Stock restored.`);
  } else {
    await db.order.update({
      where: { id: orderId },
       data: {
        paymentStatus: 'REFUNDED',
        // refundedAmount: totalRefunded,
        // refundedAt: new Date(),
      },
    });

    console.log(`⚠️ [WEBHOOK] Partial refund for order ${orderId}: $${(totalRefunded / 100).toFixed(2)}`);
  }
}