// types/warehouse.ts
export interface Contact {
  name: string;
  phone: string;
}

export interface Pickup {
  id: string;
  status: string;
  scheduledDate: string;
  deliveryContact?: Contact | null;
  pickupContact?: Contact | null;
}

export interface Warehouse {
  id: string;
  name: string;
  status: "ENABLED" | "DISABLED";
  agentId: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    coordinates?: any;
  };
  // ✅ USE THE PICKUP INTERFACE HERE
  outboundPickups: Pickup[];
  inboundPickups: Pickup[];
  createdAt: string;
}