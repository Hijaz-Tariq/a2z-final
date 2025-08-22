"use client"
import { Eye, Plus, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { useEffect, useState } from 'react';
import { PickupWithRelations } from '../../../types/PickupPage';
import { PickupDialog } from './editPickup';

export default function PickupsContent() {
  const [pickups, setPickups] = useState<PickupWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPickups = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/pickups");
      if (!res.ok) throw new Error("Failed to fetch pickups");
      const data = await res.json();
      setPickups(data);
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "Failed to load pickups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPickups();
  }, []);

  const getCustomerInfo = (pickup: PickupWithRelations) => {
    // Check for registered user first
    if (pickup.User.length > 0) {
      return {
        name: pickup.User[0].name || pickup.User[0].email,
        type: "Registered User",
        contact: pickup.User[0].email
      };
    }

    // Check for guest checkout
    if (pickup.GuestCheckout.length > 0) {
      return {
        name: pickup.GuestCheckout[0].name || "Guest Customer",
        type: "Guest Checkout",
        contact: pickup.GuestCheckout[0].email
      };
    }

    // Check for guest session
    if (pickup.GuestSession.length > 0) {
      return {
        name: pickup.pickupContact?.name || "Guest Customer",
        type: "Guest Session",
        contact: pickup.pickupContact?.email || pickup.pickupContact?.phone || "No contact"
      };
    }

    // Fallback to pickup contact
    return {
      name: pickup.pickupContact?.name || "Unknown Customer",
      type: "Unknown Type",
      contact: pickup.pickupContact?.email || pickup.pickupContact?.phone || "No contact"
    };
  };

  const formatPickupType = (type: string) => {
    return type.replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  // Transform the pickup data to match what PickupDialog expects
  const transformPickupForDialog = (pickup: PickupWithRelations) => {
    return {
      ...pickup,
      // Ensure we have the full address objects, not just IDs
      // pickupAddress: pickup.customPickupAddress || null,
      // deliveryAddress: pickup.customDeliveryAddress || null,
      pickupAddress: pickup.customPickupAddress ?? {
        id: "unknown",
        line1: "Unknown address",
        line2: null,
        city: "N/A",
        state: "N/A",
        postalCode: "N/A",
        country: "N/A",
        coordinates: null,
      },
      deliveryAddress: pickup.customDeliveryAddress ?? {
        id: "unknown",
        line1: "Unknown address",
        line2: null,
        city: "N/A",
        state: "N/A",
        postalCode: "N/A",
        country: "N/A",
        coordinates: null,
      },
      deliveryContact: pickup.deliveryContact ?? {
        id: "unknown",
        name: "Unknown Recipient",
        email: null,
        phone: "N/A",
        company: null
      }
    };
  };

  if (loading) return <div className="p-6">Loading pickups...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Pickups Management</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          New Pickup
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pickups.map((pickup) => {
              const customer = getCustomerInfo(pickup);
              return (
                <tr key={pickup.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {pickup.id.substring(0, 8)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.name}</div>
                    <div className="text-xs text-gray-500">{customer.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatPickupType(pickup.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.contact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(pickup.scheduledDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={pickup.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Eye className="h-4 w-4" />
                    </button>
                    <PickupDialog pickup={transformPickupForDialog(pickup)} />
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}