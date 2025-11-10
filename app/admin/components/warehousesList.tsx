// components/admin/components/warehousesList.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Plus, MapPin, Package, PackageSearch, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Warehouse } from '@/types/warehouse';
import { SendBulkSmsModal } from './SendBulkSmsModal';

interface WarehousesListProps {
  onAddNew: () => void;
  onEdit: (warehouse: Warehouse) => void;
  onViewShipments: (warehouse: Warehouse) => void;
}

export const WarehousesList = ({ onAddNew, onEdit}: WarehousesListProps) => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGlobalSmsModalOpen, setIsGlobalSmsModalOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      setError(null);
      // ✅ Use admin endpoint
      const response = await fetch('/api/admin/warehouses');
      if (response.ok) {
        const data = await response.json();
        setWarehouses(data); // no normalization needed — data is complete
      } else {
        setError('Failed to fetch warehouses');
      }
    } catch (error) {
      console.error('Failed to fetch warehouses:', error);
      setError('Error loading warehouses');
    } finally {
      setLoading(false);
    }
  };

  const getTotalPickups = (warehouse: Warehouse) => {
    const outbound = warehouse.outboundPickups ?? [];
    const inbound = warehouse.inboundPickups ?? [];
    return outbound.length + inbound.length;
  };

  const getActivePickups = (warehouse: Warehouse) => {
    const activeStatuses = ['PENDING', 'PROCESSING', 'IN_TRANSIT', 'OUT_FOR_DELIVERY'];

    const outbound = warehouse.outboundPickups ?? [];
    const inbound = warehouse.inboundPickups ?? [];

    const outboundActive = outbound.filter(p =>
      activeStatuses.includes(p.status)
    ).length;

    const inboundActive = inbound.filter(p =>
      activeStatuses.includes(p.status)
    ).length;

    return outboundActive + inboundActive;
  };

  if (loading) return <div className="flex justify-center p-8">Loading warehouses...</div>;
  if (error) return <div className="text-red-500 p-4 text-center">{error}</div>;

  const getAllCustomers = (): { name: string; phone: string }[] => {
    const contacts: { name: string; phone: string }[] = [];
    warehouses.forEach(warehouse => {
      // Outbound
      warehouse.outboundPickups.forEach(p => {
        if (p.deliveryContact?.name && p.deliveryContact?.phone) {
          contacts.push({ name: p.deliveryContact.name, phone: p.deliveryContact.phone });
        }
      });
      // Inbound
      warehouse.inboundPickups.forEach(p => {
        if (p.deliveryContact?.name && p.deliveryContact?.phone) {
          contacts.push({ name: p.deliveryContact.name, phone: p.deliveryContact.phone });
        }
      });
    });
    // Deduplicate by phone
    return Array.from(new Map(contacts.map(c => [c.phone, c])).values());
  };

  // Open modal
  const handleOpenGlobalSms = () => {
    const customers = getAllCustomers();
    if (customers.length === 0) {
      alert('No customer contacts found.');
      return;
    }
    setIsGlobalSmsModalOpen(true);
  };

  // Reuse your existing SMS sender (same as in shipments page)
  const handleSendSms = async (phone: string, message: string) => {
    const response = await fetch('/api/admin/sms/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: phone, message }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'SMS send failed');
    }
  };

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Warehouses Management</CardTitle>
          <div className="flex gap-2">
            <Button onClick={handleOpenGlobalSms} variant="secondary" size="sm">
              📩 SMS All Customers
            </Button>
            <Button onClick={onAddNew}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Warehouse
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {warehouses.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No warehouses found. Create your first warehouse to get started.</p>
              </div>
            ) : (
              warehouses.map((warehouse) => (
                <div key={warehouse.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <span className={`px-2 py-0.5 text-xs rounded ${warehouse.status === 'ENABLED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {warehouse.status}
                      </span>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{warehouse.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Package className="w-4 h-4" />
                            <span>{getTotalPickups(warehouse)} total pickups</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>{getActivePickups(warehouse)} active</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <p>{warehouse.address.line1}</p>
                          {warehouse.address.line2 && <p>{warehouse.address.line2}</p>}
                          <p>
                            {warehouse.address.city}, {warehouse.address.state} {warehouse.address.postalCode}
                          </p>
                          <p className="text-gray-500">{warehouse.address.country}</p>
                        </div>
                      </div>

                      {/* Pickup Statistics */}
                      <div className="flex gap-6 mt-3 text-xs text-gray-600">
                        <div>
                          <span className="font-medium">Outbound: </span>
                          {warehouse.outboundPickups.length}
                        </div>
                        <div>
                          <span className="font-medium">Inbound: </span>
                          {warehouse.inboundPickups.length}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/admin/warehouses/${warehouse.id}/shipments`)}
                        title="View shipments"
                      >
                        <PackageSearch className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(warehouse)}
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                      {/* <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(warehouse.id)}
                      disabled={getTotalPickups(warehouse) > 0}
                      title={getTotalPickups(warehouse) > 0 ? "Cannot delete warehouse with active pickups" : "Delete warehouse"}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button> */}
                    </div>
                  </div>

                  <div className="flex items-center mt-3 text-sm text-gray-500">
                    <span>
                      Created: {new Date(warehouse.createdAt).toLocaleDateString()}
                    </span>
                    {getTotalPickups(warehouse) > 0 && (
                      <span className="ml-4 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        Active
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
      {isGlobalSmsModalOpen && (
        <SendBulkSmsModal
          isOpen={isGlobalSmsModalOpen}
          onClose={() => setIsGlobalSmsModalOpen(false)}
          recipients={getAllCustomers()}
          onSend={handleSendSms}
        />
      )}
    </div>
  );
};