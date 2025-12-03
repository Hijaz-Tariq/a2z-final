// utils/tracking.ts
import { ShippingStatus } from '@prisma/client';

export function getEventStatus(
  eventStatus: ShippingStatus,
  currentStatus: ShippingStatus
): 'completed' | 'current' | 'upcoming' {
  const statusOrder: ShippingStatus[] = [
    'PENDING',
    'PROCESSING',
    'IN_TRANSIT',
    'OUT_FOR_DELIVERY',
    'DELIVERED',
    'RETURNED', // ← Added terminal state
  ];

  // Exception statuses (non-linear, always historical if present)
  if (eventStatus === 'CUSTOMS_HOLD' || eventStatus === 'FAILED_ATTEMPT') {
    return 'completed';
  }

  const eventIndex = statusOrder.indexOf(eventStatus);
  const currentIndex = statusOrder.indexOf(currentStatus);

  // Safety: if somehow unknown status slips in (shouldn't happen with Prisma enum)
  if (eventIndex === -1) return 'completed';

  if (eventIndex < currentIndex) return 'completed';
  if (eventIndex === currentIndex) return 'current';
  return 'upcoming';
}