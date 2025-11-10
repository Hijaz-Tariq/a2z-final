// components/admin/warehouseForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { MapPin, Building, PersonStandingIcon } from 'lucide-react';
import { Warehouse } from '@/types/warehouse';

interface WarehouseFormData {
  name: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
}

interface Agent {
  id: string;
  name: string;
  contact: {
    phone: string;
  }
}

// interface Warehouse {
//   id: string;
//   status: 'ENABLED' | 'DISABLED';
//   name: string;
//   address: {
//     line1: string;
//     line2?: string;
//     city: string;
//     state: string;
//     postalCode: string;
//     country: string;
//     coordinates?: any;
//   };
//   outboundPickups: Array<{ id: string; status: string; scheduledDate: string }>;
//   inboundPickups: Array<{ id: string; status: string; scheduledDate: string }>;
//   createdAt: string;
//   agentId: string;
// }

interface WarehouseFormProps {
  existingWarehouse?: Warehouse | null;
  onSuccess?: () => void;
  onCancel?: () => void;
  onDeleted?: () => void;
}

export const WarehouseForm = ({
  existingWarehouse,
  onSuccess,
  onCancel,
  // onDeleted
}: WarehouseFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<string>('');
  const [warehouseStatus, setWarehouseStatus] = useState<'ENABLED' | 'DISABLED'>(
    existingWarehouse?.status || 'ENABLED'
  );
  const totalPickups =
      existingWarehouse!.outboundPickups.length +
      existingWarehouse!.inboundPickups.length;
    const canDisable = totalPickups === 0;
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<WarehouseFormData>({
    defaultValues: existingWarehouse ? {
      name: existingWarehouse.name,
      address: {
        line1: existingWarehouse.address.line1,
        line2: existingWarehouse.address.line2 || '',
        city: existingWarehouse.address.city,
        state: existingWarehouse.address.state,
        postalCode: existingWarehouse.address.postalCode,
        country: existingWarehouse.address.country,
        coordinates: existingWarehouse.address.coordinates || null,
      }
    } : {
      name: '',
      address: {
        line1: '',
        line2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'US',
        coordinates: null
      }
    }
  });

  useEffect(() => {
    // Set form values when existingWarehouse changes
    if (existingWarehouse) {
      setValue('name', existingWarehouse.name);
      setValue('address.line1', existingWarehouse.address.line1);
      setValue('address.line2', existingWarehouse.address.line2 || '');
      setValue('address.city', existingWarehouse.address.city);
      setValue('address.state', existingWarehouse.address.state);
      setValue('address.postalCode', existingWarehouse.address.postalCode);
      setValue('address.country', existingWarehouse.address.country);
    }
  }, [existingWarehouse, setValue, reset]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('/api/admin/agents'); // ← adjust endpoint as needed
        if (response.ok) {
          const data = await response.json();
          setAgents(data);

          // If editing, pre-select the warehouse's current agent
          if (existingWarehouse?.agentId) {
            setSelectedAgentId(existingWarehouse.agentId);
          } else if (data.length > 0) {
            // Optional: auto-select first agent for new warehouse
            setSelectedAgentId(data[0].id);
          }
        }
      } catch (err) {
        console.error('Failed to fetch agents:', err);
      }
    };

    fetchAgents();
  }, [existingWarehouse?.agentId]);

  const onSubmit = async (data: WarehouseFormData) => {
    setLoading(true);
    setError(null);

    try {
      const url = existingWarehouse
        ? `/api/admin/warehouses/${existingWarehouse.id}`
        : '/api/admin/warehouses';
      const method = existingWarehouse ? 'PUT' : 'POST';

      const requestData = existingWarehouse
        ? {
          id: existingWarehouse.id,
          agentId: selectedAgentId,
          status: warehouseStatus,
          ...data
        }
        : {
          agentId: selectedAgentId,
          status: warehouseStatus,
          ...data
        };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        onSuccess?.();
      } else {
        let errorMessage = `Failed to ${existingWarehouse ? 'update' : 'create'} warehouse`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // Handle HTML responses (like Next.js 404 page)
          errorMessage = `Server error (${response.status})`;
        }
        setError(errorMessage);
      }
    } catch (error) {
      console.error('Failed to save warehouse:', error);
      setError('Network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  // const handleDelete = async () => {
  //   if (!existingWarehouse) return;

  //   const totalPickups =
  //     existingWarehouse.outboundPickups.length +
  //     existingWarehouse.inboundPickups.length;
  //   const canDisable = totalPickups === 0;
  //   if (totalPickups > 0) {
  //     alert('Cannot delete warehouse with pickups (inbound or outbound).');
  //     return;
  //   }

  //   if (!confirm('Are you sure you want to permanently delete this warehouse?')) {
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`/api/admin/warehouses/${existingWarehouse.id}`, {
  //       method: 'DELETE',
  //     });

  //     if (response.ok) {
  //       // Notify parent to close form / refresh list
  //       onDeleted?.();
  //     } else {
  //       const errorData = await response.json().catch(() => ({}));
  //       alert(errorData.error || 'Failed to delete warehouse');
  //     }
  //   } catch (error) {
  //     console.error('Failed to delete warehouse:', error);
  //     alert('Error deleting warehouse');
  //   }
  // };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <div>
            <Building className="w-6 h-6" />
            {existingWarehouse ? 'Edit Warehouse' : 'Add New Warehouse'}
          </div>
          <div className="space-y-2">
            <Label htmlFor="agentId" className="flex items-center gap-2">
              <PersonStandingIcon className="w-4 h-4" />
              Assigned Agent *
            </Label>
            <select
              id="agentId"
              value={selectedAgentId}
              onChange={(e) => setSelectedAgentId(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="">Select an agent...</option>
              {agents.map(agent => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>
            {!selectedAgentId && (
              <p className="text-red-500 text-sm">Please select an agent</p>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Warehouse Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Warehouse Name *
            </Label>
            <Input
              id="name"
              placeholder="e.g., NYC Distribution Center"
              {...register('name', {
                required: 'Warehouse name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Address Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <h3 className="font-medium">Address Information</h3>
            </div>

            {/* Address Line 1 */}
            <div className="space-y-2">
              <Label htmlFor="address.line1">Street Address *</Label>
              <Input
                id="address.line1"
                placeholder="123 Main Street"
                {...register('address.line1', {
                  required: 'Street address is required'
                })}
                className={errors.address?.line1 ? 'border-red-500' : ''}
              />
              {errors.address?.line1 && (
                <p className="text-red-500 text-sm">{errors.address.line1.message}</p>
              )}
            </div>

            {/* Address Line 2 */}
            <div className="space-y-2">
              <Label htmlFor="address.line2">Address Line 2 (Optional)</Label>
              <Input
                id="address.line2"
                placeholder="Suite, Building, Unit, etc."
                {...register('address.line2')}
              />
            </div>

            {/* City, State, Postal Code */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address.city">City *</Label>
                <Input
                  id="address.city"
                  placeholder="City"
                  {...register('address.city', {
                    required: 'City is required'
                  })}
                  className={errors.address?.city ? 'border-red-500' : ''}
                />
                {errors.address?.city && (
                  <p className="text-red-500 text-sm">{errors.address.city.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address.state">State/Province *</Label>
                <Input
                  id="address.state"
                  placeholder="State"
                  {...register('address.state', {
                    required: 'State is required'
                  })}
                  className={errors.address?.state ? 'border-red-500' : ''}
                />
                {errors.address?.state && (
                  <p className="text-red-500 text-sm">{errors.address.state.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address.postalCode">Postal Code *</Label>
                <Input
                  id="address.postalCode"
                  placeholder="Postal Code"
                  {...register('address.postalCode', {
                    required: 'Postal code is required'
                  })}
                  className={errors.address?.postalCode ? 'border-red-500' : ''}
                />
                {errors.address?.postalCode && (
                  <p className="text-red-500 text-sm">{errors.address.postalCode.message}</p>
                )}
              </div>
            </div>

            {/* Country */}
            <div className="space-y-2">
              <Label htmlFor="address.country">Country *</Label>
              <select
                id="address.country"
                {...register('address.country', {
                  required: 'Country is required'
                })}
                className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.address?.country ? 'border-red-500' : ''
                  }`}
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="PS">Palestine</option>
                <option value="UK">United Kingdom</option>
                <option value="AE">United Arab Emirates</option>
                <option value="SA">Saudi Arabia</option>
                <option value="JO">Jordan</option>
                <option value="EG">Egypt</option>
                {/* Add more countries as needed */}
              </select>
              {errors.address?.country && (
                <p className="text-red-500 text-sm">{errors.address.country.message}</p>
              )}
            </div>
          </div>

          {/* Warehouse Statistics (Read-only for existing warehouse) */}
          {existingWarehouse && (
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Warehouse Statistics</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Total Pickups: </span>
                  <span className="font-medium">
                    {existingWarehouse.outboundPickups.length + existingWarehouse.inboundPickups.length}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Outbound: </span>
                  <span className="font-medium">
                    {existingWarehouse.outboundPickups.length}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Inbound: </span>
                  <span className="font-medium">
                    {existingWarehouse.inboundPickups.length}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Created: </span>
                  <span className="font-medium">
                    {new Date(existingWarehouse.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          )}
          {existingWarehouse && (
            <div className="flex items-center gap-2 pt-2">
              <Label>Status:</Label>
              <Button
                type="button"
                variant={warehouseStatus === 'ENABLED' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setWarehouseStatus('ENABLED')}
              >
                Enabled
              </Button>
              <Button
                type="button"
                size="sm"
                disabled={!canDisable}
                variant={warehouseStatus === 'DISABLED' ? 'default' : 'outline'}
                onClick={() => setWarehouseStatus('DISABLED')}
                title={!canDisable ? "Cannot disable: warehouse has pickups" : ""}
              >
                Disabled
              </Button>
            </div>
          )}
          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-4">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={loading}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="min-w-24"
            >
              {loading ? (
                'Saving...'
              ) : existingWarehouse ? (
                'Update Warehouse'
              ) : (
                'Create Warehouse'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};