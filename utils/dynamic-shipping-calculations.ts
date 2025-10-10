import { PackageData } from "./shipping-calculations";

// utils/dynamic-shipping-calculations.ts - UPDATED FOR YOUR API
interface DynamicShippingParams {
  packages: PackageData[];
  items: any[];
  originCountryId: number;
  destCountryId: number;
}

interface PricingResult {
  baseCost: number;
  extraCharges: number;
  totalCost: number;
  currency: string;
  totalWeight: number;
  totalValue: number;
  requiresDocs: boolean;
  breakdown: {
    baseCost: number;
    extraCharges: number;
    totalCost: number;
  };
}

export const calculateDynamicShipping = async ({
  packages,
  items,
  originCountryId,
  destCountryId
}: DynamicShippingParams): Promise<PricingResult> => {
  // Call YOUR API endpoint (the one you modified)
  const response = await fetch('/api/shipping/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      originCountryId,
      destCountryId,
      packages,
      items
    })
  });

  if (!response.ok) {
    throw new Error('Failed to calculate shipping');
  }

  return await response.json();
};