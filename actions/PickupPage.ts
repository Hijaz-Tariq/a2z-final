import * as z from "zod";
import {
  calculateVolumetricWeight,
  convertToMetric,
} from "../utils/unit-conversions";

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
  updatedAt: z.number().optional(), // Add this line
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
  items: z.array(itemSchema).min(1, "At least one item is required"),
  packages: z.array(packageSchema).min(1, "At least one package is required"),
  // storageFeeAcknowledged: z
  //   .literal<boolean>(true, {
  //     errorMap: () => ({ message: "You must acknowledge the storage fees" }),
  //   })
  //   .optional(),
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
  // storageFeeAcknowledged: z.boolean()
  //   .refine(val => val === true, {
  //     message: "You must acknowledge the storage fees",
  //     path: ["storageFeeAcknowledged"],
  //   })
  //   .optional(),
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
  // timeWindow: z.string().min(1, "Time window is required"),
  commercialDocuments: z.record(z.string()).optional(),
  calculatedCost: z.number().optional(),
  costCurrency: z.string().optional().default("USD"),
});

export const validatePackage = (
  pkg: PackageData,
  unitSystem: "metric" | "imperial"
) => {
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

  const volumetricWeight = calculateVolumetricWeight(length, width, height);
  const actualWeightKg = weight;

  return {
    isValid: actualWeightKg > 0 && length > 0 && width > 0 && height > 0,
    chargeableWeight: Math.max(actualWeightKg, volumetricWeight),
    volumetricWeight,
  };
};

export type PickupFormData = z.infer<typeof pickupFormSchema>;
