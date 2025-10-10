//utils/shipping-calculations.ts
import * as z from "zod";
import {
  calculateVolumetricWeight,
  convertToMetric,
} from "../utils/unit-conversions";
import {
  Address,
  Contact,
  GuestCheckout,
  GuestSession,
  Pickup,
  PickupItem,
  PickupPackage,
  PickupType,
  ShippingStatus,
  User,
} from "@prisma/client";

export interface PackageDimensions {
  length: number;
  width: number;
  height: number;
}

export interface PackageData {
  id?: string;
  packageType: string;
  weight: number;
  dimensions: PackageDimensions;
  itemIds: string[];
  specialNotes?: string;
}

const addressSchema = z.object({
  line1: z.string().min(1, "Address line is required"),
  line2: z.string().optional(),
  company: z.string().min(1, "Name is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required").default("US"),
  countryId: z.number().min(1, "Country ID is required"),
  stateId: z.number().optional(),
});

const itemSchema = z.object({
  id: z.string(),
  description: z.string().min(1, "Item description is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  value: z.number().min(0, "Value cannot be negative"),
  currency: z.string().min(1, "Currency is required").default("USD"),
  hsCode: z.string().optional(),
  assignedPackage: z.number().nullable().optional(),
  updatedAt: z.number().optional(),
});

const packageSchema = z.object({
  id: z.string(),
  packageType: z.string().min(1, "Package type is required"),
  weight: z.number().min(0.1, "Weight must be at least 0.1kg"),
  dimensions: z.object({
    length: z.number().min(1, "Length must be at least 1cm"),
    width: z.number().min(1, "Width must be at least 1cm"),
    height: z.number().min(1, "Height must be at least 1cm"),
  }),
  itemIds: z.array(z.string()).min(1, "At least one item is required"),
  specialNotes: z.string().optional(),
});

export const pickupFormSchema = z.object({
  status: z.nativeEnum(ShippingStatus),
  type: z.nativeEnum(PickupType),
  items: z.array(itemSchema).min(1, "At least one item is required"),
  packages: z.array(packageSchema).min(1, "At least one package is required"),
  pickupDetails: z.object({
    locationType: z.enum(["custom", "warehouse"]),
    warehouseId: z.string().optional(),
    address: addressSchema,
    contact: z.object({
      name: z.string().min(1, "Name is required"),
      phone: z.string().min(10, "Phone number must be at least 10 digits"),
      email: z.string().optional(),
    }),
  }),
  deliveryDetails: z.object({
    locationType: z.enum(["custom", "warehouse"]),
    warehouseId: z.string().optional(),
    address: addressSchema,
    contact: z.object({
      name: z.string().min(1, "Name is required"),
      phone: z.string().min(10, "Phone number must be at least 10 digits"),
      email: z.string().optional(),
    }),
  }),
  storageFeeAcknowledged: z.boolean().optional(),
  acceptCallsForUpdates: z
    .boolean({
      required_error: "You must agree to receive call updates",
    })
    .refine((val) => val === true, {
      message: "You must agree to receive call updates",
      path: ["acceptCallsForUpdates"],
    }),
  scheduledDate: z.date({
    required_error: "Pickup date is required",
  }),
  timeWindow: z.object({
    start: z.string().min(1, "Start time is required"),
    end: z.string().min(1, "End time is required"),
  }),
  commercialDocuments: z.record(z.string()).optional(),
  calculatedCost: z.number().optional(),
  costCurrency: z.string().optional().default("USD"),
});

// Dynamic Pricing Interfaces
export interface ShippingPricingData {
  tier1Price: number; // <=1kg
  tier2Price: number; // <=10kg
  tier3Price: number; // <=15kg
  tier4Price: number; // <=20kg
  tier5Price: number; // >20kg (per kg)
  currency: string;
  extraCharges: ExtraChargeRuleData[];
}

export interface ExtraChargeRuleData {
  ruleType: "TOTAL_WEIGHT_VALUE" | "DIMENSION_THRESHOLD" | "PACKAGE_WEIGHT";
  conditionValue: number | null;
  conditionValue2: number | null;
  chargeAmount: number;
  currency: string;
}

export interface ShippingCalculationParams {
  actualWeightKg: number;
  volumetricWeightKg: number;
  originCountryId: number;
  destCountryId: number;
  totalValue?: number;
  packages?: PackageData[];
}

export interface ShippingCalculationResult {
  cost: number;
  chargeableWeight: number;
  currency: string;
  breakdown: {
    baseCost: number;
    extraCharges: Array<{
      type: string;
      description: string;
      amount: number;
    }>;
  };
}

export interface PackageShippingCalculationResult
  extends ShippingCalculationResult {
  packageId: string;
  actualWeightKg: number;
  volumetricWeight: number;
  exactChargeableWeight: number;
  isRounded: boolean;
}

// Fetch dynamic pricing from your API
export const fetchShippingPricing = async (
  originCountryId: number,
  destCountryId: number
): Promise<ShippingPricingData> => {
  try {
    const response = await fetch(
      `/api/shipping/calculate?originCountryId=${originCountryId}&destCountryId=${destCountryId}`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch shipping pricing: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data.pricing) {
      throw new Error("No pricing data found for this route");
    }

    return data.pricing;
  } catch (error) {
    console.error("Error fetching shipping pricing:", error);
    throw new Error(
      `Unable to calculate shipping cost for this route. Please contact support.`
    );
  }
};

// Calculate base cost using dynamic pricing tiers
const calculateBaseCost = (
  chargeableWeight: number,
  pricing: ShippingPricingData
): number => {
  const roundedWeight = Math.ceil(chargeableWeight);

  if (roundedWeight <= 1) {
    return pricing.tier1Price;
  } else if (roundedWeight <= 10) {
    return pricing.tier1Price + (roundedWeight - 1) * pricing.tier2Price;
  } else if (roundedWeight <= 15) {
    return (
      pricing.tier1Price +
      9 * pricing.tier2Price +
      (roundedWeight - 10) * pricing.tier3Price
    );
  } else if (roundedWeight <= 20) {
    return (
      pricing.tier1Price +
      9 * pricing.tier2Price +
      5 * pricing.tier3Price +
      (roundedWeight - 15) * pricing.tier4Price
    );
  } else {
    return (
      pricing.tier1Price +
      9 * pricing.tier2Price +
      5 * pricing.tier3Price +
      5 * pricing.tier4Price +
      (roundedWeight - 20) * pricing.tier5Price
    );
  }
};

// Apply extra charges based on rules
const applyExtraCharges = (
  baseCost: number,
  pricing: ShippingPricingData,
  params: ShippingCalculationParams
): {
  finalCost: number;
  extraCharges: Array<{ type: string; description: string; amount: number }>;
} => {
  let finalCost = baseCost;
  const extraCharges: Array<{
    type: string;
    description: string;
    amount: number;
  }> = [];

  pricing.extraCharges.forEach((rule) => {
    let shouldApply = false;
    let description = "";

    switch (rule.ruleType) {
      case "TOTAL_WEIGHT_VALUE":
        // A: total weight < X AND total value > Y
        if (rule.conditionValue && rule.conditionValue2) {
          const totalWeight = params.actualWeightKg;
          const totalValue = params.totalValue || 0;
          if (
            totalWeight < rule.conditionValue &&
            totalValue > rule.conditionValue2
          ) {
            shouldApply = true;
            description = `Extra charge for high value shipment under ${rule.conditionValue}kg`;
          }
        }
        break;

      case "DIMENSION_THRESHOLD":
        // B: any dimension > X
        if (rule.conditionValue && params.packages) {
          const hasOversized = params.packages.some(
            (pkg) =>
              pkg.dimensions.length > rule.conditionValue! ||
              pkg.dimensions.width > rule.conditionValue! ||
              pkg.dimensions.height > rule.conditionValue!
          );
          if (hasOversized) {
            shouldApply = true;
            description = `Oversized package charge (dimension > ${rule.conditionValue}cm)`;
          }
        }
        break;

      case "PACKAGE_WEIGHT":
        // C: any package weight > X
        if (rule.conditionValue && params.packages) {
          const hasHeavyPackage = params.packages.some(
            (pkg) => pkg.weight > rule.conditionValue!
          );
          if (hasHeavyPackage) {
            shouldApply = true;
            description = `Heavy package charge (weight > ${rule.conditionValue}kg)`;
          }
        }
        break;
    }

    if (shouldApply) {
      finalCost += rule.chargeAmount;
      extraCharges.push({
        type: rule.ruleType,
        description,
        amount: rule.chargeAmount,
      });
    }
  });

  return { finalCost, extraCharges };
};

// Main shipping cost calculation with dynamic pricing ONLY
export const calculateShippingCost = async ({
  actualWeightKg,
  volumetricWeightKg,
  originCountryId,
  destCountryId,
  totalValue,
  packages = [],
}: ShippingCalculationParams): Promise<ShippingCalculationResult> => {
  console.log("🚚 calculateShippingCost - INPUTS:", {
    actualWeightKg,
    volumetricWeightKg,
    originCountryId,
    destCountryId,
    totalValue,
  });

  const chargeable = Math.max(actualWeightKg, volumetricWeightKg);
  const roundedWeight = Math.ceil(chargeable);

  console.log("⚖️ calculateShippingCost - WEIGHTS:", {
    chargeable,
    roundedWeight,
  });

  // Fetch dynamic pricing - this will throw if no pricing found
  const pricing = await fetchShippingPricing(originCountryId, destCountryId);

  // Use dynamic pricing
  const baseCost = calculateBaseCost(chargeable, pricing);
  const currency = pricing.currency;

  const { finalCost, extraCharges } = applyExtraCharges(baseCost, pricing, {
    actualWeightKg,
    volumetricWeightKg,
    originCountryId,
    destCountryId,
    totalValue,
    packages,
  });

  const calculatedCost = finalCost;

  console.log("💵 calculateShippingCost - DYNAMIC PRICING:", {
    baseCost,
    finalCost,
    currency,
    extraCharges,
  });

  const result = {
    cost: calculatedCost,
    chargeableWeight: roundedWeight,
    currency,
    breakdown: {
      baseCost:
        calculatedCost -
        extraCharges.reduce((sum, charge) => sum + charge.amount, 0),
      extraCharges,
    },
  };

  console.log("✅ calculateShippingCost - FINAL:", result);
  return result;
};

// Package-specific calculation
export const calculatePackageShippingCost = async (
  pkg: PackageData,
  originCountryId: number,
  destCountryId: number,
  unitSystem: "metric" | "imperial" = "metric"
): Promise<PackageShippingCalculationResult> => {
  const { actualWeightKg, volumetricWeight } = validatePackage(pkg, unitSystem);

  const shippingResult = await calculateShippingCost({
    actualWeightKg,
    volumetricWeightKg: volumetricWeight,
    originCountryId,
    destCountryId,
    packages: [pkg],
  });

  console.log(
    "💰 calculatePackageShippingCost - shippingResult:",
    shippingResult
  );

  const finalResult = {
    cost: shippingResult.cost,
    chargeableWeight: shippingResult.chargeableWeight,
    currency: shippingResult.currency,
    packageId: pkg.id || "",
    actualWeightKg,
    volumetricWeight,
    exactChargeableWeight: shippingResult.chargeableWeight,
    isRounded: shippingResult.chargeableWeight === Math.round(actualWeightKg),
    breakdown: shippingResult.breakdown,
  };

  console.log(
    "🎯 calculatePackageShippingCost - FINAL RESULT (DYNAMIC):",
    finalResult
  );
  return finalResult;
};

// Batch calculation for multiple packages
export const calculateBatchShippingCost = async (
  packages: PackageData[],
  originCountryId: number,
  destCountryId: number,
  totalValue: number,
  unitSystem: "metric" | "imperial" = "metric"
): Promise<ShippingCalculationResult> => {
  const validatedPackages = packages.map((pkg) =>
    validatePackage(pkg, unitSystem)
  );

  const totalActualWeight = validatedPackages.reduce(
    (sum, pkg) => sum + pkg.actualWeightKg,
    0
  );
  const totalVolumetricWeight = validatedPackages.reduce(
    (sum, pkg) => sum + pkg.volumetricWeight,
    0
  );

  return calculateShippingCost({
    actualWeightKg: totalActualWeight,
    volumetricWeightKg: totalVolumetricWeight,
    originCountryId,
    destCountryId,
    totalValue,
    packages,
  });
};

// Your existing validatePackage function remains the same
export const validatePackage = (
  pkg: PackageData,
  unitSystem: "metric" | "imperial"
) => {
  console.log("VALIDATE PACKAGE INPUT:", { pkg, unitSystem });
  const weight =
    unitSystem === "metric" ? pkg.weight : convertToMetric.weight(pkg.weight);
  const length =
    unitSystem === "metric"
      ? pkg.dimensions.length
      : convertToMetric.length(pkg.dimensions.length);
  const width =
    unitSystem === "metric"
      ? pkg.dimensions.width
      : convertToMetric.length(pkg.dimensions.width);
  const height =
    unitSystem === "metric"
      ? pkg.dimensions.height
      : convertToMetric.length(pkg.dimensions.height);

  console.log("CONVERTED VALUES:", { weight, length, width, height });

  const volumetricWeight = calculateVolumetricWeight(length, width, height);
  const actualWeightKg = weight;

  const result = {
    isValid: actualWeightKg > 0 && length > 0 && width > 0 && height > 0,
    chargeableWeight: Math.max(actualWeightKg, volumetricWeight),
    volumetricWeight,
    actualWeightKg,
  };

  console.log("VALIDATE PACKAGE RESULT:", result);

  return result;
};

// Your existing type definitions remain the same
export type PickupWithRelations = Pickup & {
  User: User[];
  GuestCheckout: GuestCheckout[];
  GuestSession: GuestSession[];
  pickupContact: Contact;
  deliveryContact?: Contact;
  items: PickupItem[];
  packages: PickupPackage[];
  customPickupAddress?: Address | null;
  customDeliveryAddress?: Address | null;
  ShippingTracking: Array<{
    trackingNumber: string;
    carrier: string;
    status: string;
  }>;
};

export type PickupFormData = z.infer<typeof pickupFormSchema>;
