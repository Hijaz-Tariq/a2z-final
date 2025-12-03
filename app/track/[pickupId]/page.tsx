// app/track/[pickupId]/page.tsx
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { db } from '@/lib/db';
import { SHIPPING_STATUS_CONFIG } from '@/lib/trackingStatusConfig';
import { getEventStatus } from '@/utils/tracking';
import type { ShippingStatus } from '@prisma/client';
import { PayNowButton } from '@/app/components/PayNowButton';

interface TrackingEvent {
  id: string;
  eventType: ShippingStatus;
  location: string | null;
  description: string | null;
  timestamp: Date;
}

interface TrackingData {
  trackingNumber: string;
  carrier: string;
  status: ShippingStatus;
  estimatedDelivery: Date | null;
  origin: string;
  destination: string;
  events: TrackingEvent[];
}

function isShippingAddress(obj: any): obj is { city: string; country: string; state?: string; postalCode?: string } {
  return obj != null && typeof obj === 'object' && typeof obj.city === 'string' && typeof obj.country === 'string';
}

export default async function TrackingPage({ params }: { params: { pickupId: string } }) {
  const { pickupId } =await params;

  // Fetch tracking data directly from Prisma
  const tracking = await db.shippingTracking.findUnique({
    where: { pickupId },
    include: {
      events: { orderBy: { occurredAt: 'asc' } },
      pickup: {
        include: {
          customPickupAddress: true,
          customDeliveryAddress: true,
          pickupContact: true,
                  },
      },
      order: {
        select: { shippingAddress: true },
      },
    },
  });

  if (!tracking) {
    notFound();
  }

  // Resolve origin
  const origin = tracking.pickup?.customPickupAddress
    ? `${tracking.pickup.customPickupAddress.city}, ${tracking.pickup.customPickupAddress.country}`
    : 'Unknown';

  // Resolve destination
  let destination = 'Unknown';
  if (tracking.pickup?.customDeliveryAddress) {
    const addr = tracking.pickup.customDeliveryAddress;
    destination = `${addr.city}, ${addr.country} ${addr.postalCode || ''}`.trim();
  } else if (tracking.order?.shippingAddress && isShippingAddress(tracking.order.shippingAddress)) {
    const addr = tracking.order.shippingAddress;
    destination = `${addr.city}, ${addr.country} ${addr.postalCode || ''}`.trim();
  }

  const events: TrackingEvent[] = tracking.events.map(e => ({
    id: e.id,
    eventType: e.eventType as ShippingStatus,
    location: e.location,
    description: e.details,
    timestamp: e.occurredAt,
  }));

  const trackingData: TrackingData = {
    trackingNumber: tracking.trackingNumber || pickupId,
    carrier: tracking.carrier || 'A2Z Express',
    status: tracking.status,
    estimatedDelivery: tracking.estimatedDelivery,
    origin,
    destination,
    events,
  };

  const currentConfig = SHIPPING_STATUS_CONFIG[trackingData.status];
const pickup = tracking.pickup;
const isPaid = pickup!.paymentStatus === 'COMPLETED';

if (!isPaid) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Complete Your Payment
          </h2>
          <p className="text-gray-600 mb-6">
            Your pickup is created, but payment is required to schedule it.
          </p>
          
          {pickup!.paymentStatus === 'FAILED' && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6">
              <strong>Payment failed.</strong> Please try again.
            </div>
          )}

          <PayNowButton pickupId={pickupId} />
          
          <div className="mt-6 text-sm text-gray-500">
            Pickup ID: {pickupId}
          </div>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Shipment</h1>
          <p className="text-gray-600">Real-time updates for your package</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Tracking Number</h2>
                <p className="font-mono text-lg text-gray-700">{trackingData.trackingNumber}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${currentConfig.color}`}></div>
                <span className="font-medium text-gray-900">{currentConfig.label}</span>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-600">
              <div><span className="font-medium">Origin:</span> {trackingData.origin}</div>
              <div><span className="font-medium">Destination:</span> {trackingData.destination}</div>
              <div><span className="font-medium">Carrier:</span> {trackingData.carrier}</div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Estimated Delivery</h3>
                <p className="text-2xl font-bold text-emerald-600">
                  {trackingData.estimatedDelivery
                    ? format(trackingData.estimatedDelivery, 'MMM d, yyyy')
                    : <span className="text-gray-500">—</span>}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Current Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl">{currentConfig.icon}</span>
                  <span className="font-semibold text-gray-900">{currentConfig.label}</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
              
              <div className="space-y-8 pl-12 relative">
                {trackingData.events.map((event) => {
                  const config = SHIPPING_STATUS_CONFIG[event.eventType];
                  const state = getEventStatus(event.eventType, trackingData.status);
                  const isCompleted = state === 'completed';
                  const isCurrent = state === 'current';

                  return (
                    <div key={event.id} className="relative">
                      <div className={`absolute -left-10 top-1 w-6 h-6 rounded-full flex items-center justify-center z-10 ${
                        isCompleted || isCurrent ? config.color : 'bg-white border-2 border-gray-300'
                      }`}>
                        {(isCompleted || isCurrent) && (
                          <span className="text-white text-sm">{config.icon}</span>
                        )}
                      </div>
                      
                      <div className={`p-4 rounded-xl border ${
                        isCurrent ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 bg-white'
                      }`}>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">{config.label}</h4>
                          <span className="text-sm text-gray-500">
                            {format(event.timestamp, 'MMM d, yyyy h:mm a')}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-1">{event.description}</p>
                        {event.location && (
                          <p className="text-sm text-gray-500 mt-2">{event.location}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>Need help? Contact our support team at support@a2z-express.com</p>
        </div>
      </div>
    </div>
  );
}

// // app/track/[pickupId]/page.tsx
// 'use client';

// import { useState } from 'react';
// import { format } from 'date-fns';
// import { SHIPPING_STATUS_CONFIG, ShippingStatus } from '@/lib/trackingStatusConfig';
// import { getEventStatus } from '@/utils/tracking';

// interface TrackingEvent {
//   id: string;
//   eventType: ShippingStatus;
//   location: string | null;
//   description: string | null;
//   timestamp: Date;
// }

// interface TrackingData {
//   trackingNumber: string;
//   carrier: string;
//   status: ShippingStatus;
//   estimatedDelivery: Date | null;
//   origin: string;
//   destination: string;
//   events: TrackingEvent[];
// }

// const hardcodedTrackingData: TrackingData = {
//   trackingNumber: 'A2Z123456789',
//   status: 'IN_TRANSIT',
//   estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
//   origin: 'Ramallah, PS',
//   destination: 'Schererville, IN 46375, US',
//   carrier: 'A2Z Express',
//   events: [
//     {
//       id: '1',
//       eventType: 'PENDING',
//       location: 'Ramallah Warehouse',
//       description: 'Shipment information received',
//       timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
//     },
//     {
//       id: '2',
//       eventType: 'PROCESSING',
//       location: 'Ramallah Warehouse',
//       description: 'Package processed at origin facility',
//       timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
//     },
//     {
//       id: '3',
//       eventType: 'IN_TRANSIT',
//       location: 'Amman Airport',
//       description: 'Departed origin country',
//       timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
//     },
//     {
//       id: '4',
//       eventType: 'IN_TRANSIT',
//       location: 'Frankfurt Airport',
//       description: 'Arrived at transit hub',
//       timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
//     },
//     {
//       id: '5',
//       eventType: 'IN_TRANSIT',
//       location: 'Chicago O\'Hare Airport',
//       description: 'Cleared customs, in transit to destination',
//       timestamp: new Date(),
//     },
//   ],
// };

// export default function TrackingPage() {
//   const [trackingData] = useState<TrackingData>(hardcodedTrackingData);
//   const currentConfig = SHIPPING_STATUS_CONFIG[trackingData.status];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-12">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Shipment</h1>
//           <p className="text-gray-600">Enter your tracking number to get real-time updates</p>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="p-6 border-b border-gray-200">
//             <div className="flex flex-wrap items-center justify-between gap-4">
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-900">Tracking Number</h2>
//                 <p className="font-mono text-lg text-gray-700">{trackingData.trackingNumber}</p>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className={`w-3 h-3 rounded-full ${currentConfig.color}`}></div>
//                 <span className="font-medium text-gray-900">{currentConfig.label}</span>
//               </div>
//             </div>
            
//             <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-600">
//               <div><span className="font-medium">Origin:</span> {trackingData.origin}</div>
//               <div><span className="font-medium">Destination:</span> {trackingData.destination}</div>
//               <div><span className="font-medium">Carrier:</span> {trackingData.carrier}</div>
//             </div>
//           </div>

//           <div className="p-6">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//               <div>
//                 <h3 className="text-lg font-medium text-gray-900">Estimated Delivery</h3>
//                 <p className="text-2xl font-bold text-emerald-600">
//                   {trackingData.estimatedDelivery
//                     ? format(trackingData.estimatedDelivery, 'MMM d, yyyy')
//                     : <span className="text-gray-500">—</span>}
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="text-sm text-gray-600">Current Status</p>
//                 <div className="flex items-center gap-2 mt-1">
//                   <span className="text-2xl">{currentConfig.icon}</span>
//                   <span className="font-semibold text-gray-900">{currentConfig.label}</span>
//                 </div>
//               </div>
//             </div>

//             <div className="relative">
//               <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
              
//               <div className="space-y-8 pl-12 relative">
//                 {trackingData.events.map((event) => {
//                   const config = SHIPPING_STATUS_CONFIG[event.eventType];
//                   const state = getEventStatus(event.eventType, trackingData.status);
//                   const isCompleted = state === 'completed';
//                   const isCurrent = state === 'current';

//                   return (
//                     <div key={event.id} className="relative">
//                       <div className={`absolute -left-10 top-1 w-6 h-6 rounded-full flex items-center justify-center z-10 ${
//                         isCompleted || isCurrent ? config.color : 'bg-white border-2 border-gray-300'
//                       }`}>
//                         {(isCompleted || isCurrent) && (
//                           <span className="text-white text-sm">{config.icon}</span>
//                         )}
//                       </div>
                      
//                       <div className={`p-4 rounded-xl border ${
//                         isCurrent ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 bg-white'
//                       }`}>
//                         <div className="flex justify-between">
//                           <h4 className="font-medium text-gray-900">{config.label}</h4>
//                           <span className="text-sm text-gray-500">
//                             {format(event.timestamp, 'MMM d, yyyy h:mm a')}
//                           </span>
//                         </div>
//                         <p className="text-gray-600 mt-1">{event.description}</p>
//                         {event.location && (
//                           <p className="text-sm text-gray-500 mt-2">{event.location}</p>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-8 text-center text-gray-600 text-sm">
//           <p>Need help? Contact our support team at support@a2z-express.com</p>
//         </div>
//       </div>
//     </div>
//   );
// }