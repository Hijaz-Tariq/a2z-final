// // app/api/track/[pickupId]/route.ts
// import { NextRequest } from 'next/server';
// import { prisma } from '@/lib/prisma';
// import { ShippingStatus } from '@prisma/client';

// interface ShippingAddress {
//   city: string;
//   country: string;
//   state?: string;
//   postalCode?: string;
//   line1?: string;
// }

// function isShippingAddress(obj: any): obj is ShippingAddress {
//   return (
//     obj != null &&
//     typeof obj === 'object' &&
//     typeof obj.city === 'string' &&
//     typeof obj.country === 'string'
//   );
// }

// export async function GET(
//   _req: NextRequest,
//   { params }: { params: { pickupId: string } }
// ) {
//   const { pickupId } = params;

//   if (!pickupId) {
//     return Response.json({ error: 'Pickup ID is required' }, { status: 400 });
//   }

//   try {
//     // Find ShippingTracking by pickupId
//     const tracking = await prisma.shippingTracking.findUnique({
//       where: { pickupId },
//       include: {
//         events: {
//           orderBy: { occurredAt: 'asc' },
//           select: {
//             id: true,
//             eventType: true,
//             location: true,
//             details: true,
//             occurredAt: true,
//           },
//         },
//         pickup: {
//           include: {
//             customPickupAddress: { select: { city: true, country: true, state: true, postalCode: true, line1: true } },
//             customDeliveryAddress: { select: { city: true, country: true, state: true, postalCode: true, line1: true } },
//             pickupContact: { select: { name: true } },
//             deliveryContact: { select: { name: true } },
//           },
//         },
//         order: {
//           select: { shippingAddress: true },
//         },
//       },
//     });

//     if (!tracking) {
//       return Response.json({ error: 'Tracking not found for this pickup' }, { status: 404 });
//     }

//     // --- Resolve ORIGIN ---
//     let origin = 'Unknown';
//     if (tracking.pickup?.customPickupAddress) {
//       const addr = tracking.pickup.customPickupAddress;
//       const cityState = [addr.city, addr.state].filter(Boolean).join(', ');
//       origin = `${cityState} ${addr.postalCode || ''}, ${addr.country}`.trim();
//     }

//     // --- Resolve DESTINATION ---
//     let destination = 'Unknown';

//     if (tracking.pickup?.customDeliveryAddress) {
//       const addr = tracking.pickup.customDeliveryAddress;
//       const cityState = [addr.city, addr.state].filter(Boolean).join(', ');
//       destination = `${cityState} ${addr.postalCode || ''}, ${addr.country}`.trim();
//     } else if (tracking.order?.shippingAddress && isShippingAddress(tracking.order.shippingAddress)) {
//       const addr = tracking.order.shippingAddress;
//       const cityState = [addr.city, addr.state].filter(Boolean).join(', ');
//       destination = `${cityState} ${addr.postalCode || ''}, ${addr.country}`.trim();
//     }

//     const events = tracking.events.map((e) => ({
//       id: e.id,
//       eventType: e.eventType as ShippingStatus,
//       location: e.location,
//       description: e.details,
//       timestamp: e.occurredAt,
//     }));

//     const result = {
//       trackingNumber: tracking.trackingNumber || pickupId,
//       carrier: tracking.carrier || 'A2Z Express',
//       status: tracking.status,
//       estimatedDelivery: tracking.estimatedDelivery,
//       origin,
//       destination,
//       events,
//     };

//     return Response.json(result);
//   } catch (error) {
//     console.error('Tracking API error:', error);
//     return Response.json({ error: 'Failed to fetch tracking data' }, { status: 500 });
//   }
// }