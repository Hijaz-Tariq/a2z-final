// lib/trackingStatusConfig.ts
export type ShippingStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'RETURNED'
  | 'FAILED_ATTEMPT'
  | 'CUSTOMS_HOLD';

export const SHIPPING_STATUS_CONFIG: Record<
  ShippingStatus,
  {
    label: string;
    description: string;
    color: string;      // Tailwind bg class
    ringColor: string;  // Tailwind ring class (for focus/outlines)
    icon: string;
  }
> = {
  PENDING: {
    label: 'Order Confirmed',
    description: 'Your shipment has been registered and is awaiting processing.',
    color: 'bg-gray-400',
    ringColor: 'ring-gray-400',
    icon: '📋',
  },
  PROCESSING: {
    label: 'Processing at Origin',
    description: 'Your package is being prepared for dispatch at the origin facility.',
    color: 'bg-blue-500',
    ringColor: 'ring-blue-500',
    icon: '⚙️',
  },
  IN_TRANSIT: {
    label: 'In Transit',
    description: 'Your package is en route to its destination.',
    color: 'bg-green-500',
    ringColor: 'ring-green-500',
    icon: '🚚',
  },
  OUT_FOR_DELIVERY: {
    label: 'Out for Delivery',
    description: 'Your package is with the delivery carrier and will arrive soon.',
    color: 'bg-yellow-500',
    ringColor: 'ring-yellow-500',
    icon: '📦',
  },
  DELIVERED: {
    label: 'Delivered',
    description: 'Your package has been successfully delivered.',
    color: 'bg-emerald-600',
    ringColor: 'ring-emerald-600',
    icon: '✅',
  },
  RETURNED: {
    label: 'Returned to Sender',
    description: 'Your package was returned to the sender due to delivery issues.',
    color: 'bg-red-500',
    ringColor: 'ring-red-500',
    icon: '↩️',
  },
  FAILED_ATTEMPT: {
    label: 'Delivery Attempt Failed',
    description: 'The carrier attempted delivery but was unsuccessful. A new attempt will be scheduled.',
    color: 'bg-orange-500',
    ringColor: 'ring-orange-500',
    icon: '⚠️',
  },
  CUSTOMS_HOLD: {
    label: 'Held in Customs',
    description: 'Your package is undergoing customs inspection and may experience delays.',
    color: 'bg-purple-500',
    ringColor: 'ring-purple-500',
    icon: '🛃',
  },
};