import { PackageData, validatePackage } from "../types/PickupPage";

export interface ShippingCalculationParams {
  actualWeightKg: number;
  volumetricWeightKg: number;
  originCountryId: number;
  destCountryId: number;
}

export interface ShippingCalculationResult {
  cost: number;
  chargeableWeight: number;
  currency: string;
}

export const calculateShippingCost = ({
  actualWeightKg,
  volumetricWeightKg,
  originCountryId,
  destCountryId,
}: ShippingCalculationParams): ShippingCalculationResult => {
  //   const chargeable = Math.max(actualWeightKg, volumetricWeightKg);
  //   const roundedWeight = Math.ceil(chargeable * 10)
  const chargeable = Math.max(actualWeightKg, volumetricWeightKg);
  const roundedWeight = Math.ceil(chargeable);
  let calculatedCost = 0;
  let currency = "$"; // Default currency

  // Check if shipping from US to Palestine
  if (originCountryId === 233 && destCountryId === 169) {
    // US to Palestine
    currency = "$";
    if (chargeable <= 1) {
      calculatedCost = 100;
    } else {
      calculatedCost = 100 + (roundedWeight - 1) * 15;
    }
  }
  // Check if shipping from Palestine to US
  else if (originCountryId === 169 && destCountryId === 233) {
    // Palestine to US
    currency = "₪";
    if (chargeable <= 1) {
      calculatedCost = 200;
    } else if (chargeable <= 10) {
      calculatedCost = 200 + (roundedWeight - 1) * 30;
    } else if (chargeable <= 19) {
      calculatedCost = 200 + 9 * 30 + (roundedWeight - 10) * 20;
    } else if (chargeable <= 20) {
      calculatedCost = 650;
    } else {
      calculatedCost = 650 + (roundedWeight - 20) * 30;
    }
  }
  // Default pricing for other routes
  else {
    currency = "$";
    calculatedCost = roundedWeight * 50;
  }

  return {
    cost: calculatedCost,
    chargeableWeight: roundedWeight,
    currency,
  };
};

export const calculatePackageShippingCost = (
  pkg: PackageData,
  originCountryId: number,
  destCountryId: number,
  unitSystem: "metric" | "imperial" = "metric"
) => {
  const { 
    // chargeableWeight,
     volumetricWeight } = validatePackage(
    pkg,
    unitSystem
  );

  return {
    ...calculateShippingCost({
      actualWeightKg: pkg.weight,
      volumetricWeightKg: volumetricWeight,
      originCountryId,
      destCountryId,
    }),
    packageId: pkg.id,
  };
};