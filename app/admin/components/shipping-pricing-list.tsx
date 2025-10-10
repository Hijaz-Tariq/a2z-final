// components/admin/shipping-pricing-list.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import {  Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface ShippingPricing {
  id: string;
  tier1Price: number;
  tier2Price: number;
  tier3Price: number;
  tier4Price: number;
  tier5Price: number;
  currency: string;
  isActive: boolean;
  originCountry: { id: number; name: string; code: string };
  destCountry: { id: number; name: string; code: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraCharges: any[];
  createdAt: string;
}

interface ShippingPricingListProps {
  onAddNew: () => void;
  onEdit: (pricing: ShippingPricing) => void;
}

export const ShippingPricingList = ({ onAddNew, onEdit }: ShippingPricingListProps) => {
  const [pricing, setPricing] = useState<ShippingPricing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    try {
      const response = await fetch('/api/admin/shipping-pricing');
      if (response.ok) {
        const data = await response.json();
        setPricing(data);
      }
    } catch (error) {
      console.error('Failed to fetch pricing:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this pricing rule?')) return;

    try {
      const response = await fetch(`/api/admin/shipping-pricing/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPricing(pricing.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete pricing:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Shipping Pricing Rules</CardTitle>
        <Button onClick={onAddNew}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Pricing
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pricing.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">
                    {item.originCountry.name} → {item.destCountry.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    ≤1kg: {item.currency} {item.tier1Price} | 
                    ≤10kg: {item.currency} {item.tier2Price} | 
                    ≤15kg: {item.currency} {item.tier3Price} | 
                    ≤20kg: {item.currency} {item.tier4Price} | 
                    &gt;20kg: +{item.currency} {item.tier5Price}/kg
                  </p>
                  {item.extraCharges.length > 0 && (
                    <p className="text-xs text-blue-600">
                      +{item.extraCharges.length} extra charge rule(s)
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <span className={`px-2 py-1 rounded ${
                  item.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {item.isActive ? 'Active' : 'Inactive'}
                </span>
                <span className="ml-4 text-gray-500">
                  Created: {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};