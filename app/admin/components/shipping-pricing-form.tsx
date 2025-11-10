/* eslint-disable @typescript-eslint/no-explicit-any */
// // components/admin/shipping-pricing-form.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { Button } from '../../components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
// import { Input } from '../../../components/ui/input';
// import { Label } from '../../../components/ui/label';
// import { Checkbox } from '../../../components/ui/checkbox';

// interface Country {
//   id: number;
//   name: string;
//   code: string;
//   requiresDocs: boolean;
// }

// interface PricingFormData {
//   originCountryId: number;
//   destCountryId: number;
//   originDocsRequired: boolean;
//   destDocsRequired: boolean;
//   tier1Price: number;
//   tier2Price: number;
//   tier3Price: number;
//   tier4Price: number;
//   tier5Price: number;
//   currency: string;
//   extraCharges: {
//     totalWeightThreshold?: number;
//     totalValueThreshold?: number;
//     weightValueCharge?: number;
//     dimensionThreshold?: number;
//     dimensionCharge?: number;
//     packageWeightThreshold?: number;
//     packageWeightCharge?: number;
//   };
// }

// interface ShippingPricingFormProps {
//   existingPricing?: any;
//   onSuccess?: () => void;
//   onCancel?: () => void;
// }

// export const ShippingPricingForm = ({ 
//   existingPricing, 
//   onSuccess, 
//   onCancel 
// }: ShippingPricingFormProps) => {
//   const [countries, setCountries] = useState<Country[]>([]);
//   const [loading, setLoading] = useState(false);

//   const { register, handleSubmit, watch, setValue } = useForm<PricingFormData>({
//     defaultValues: existingPricing ? {
//       originCountryId: existingPricing.originCountryId,
//       destCountryId: existingPricing.destCountryId,
//       originDocsRequired: existingPricing.originDocsRequired,
//       destDocsRequired: existingPricing.destDocsRequired,
//       tier1Price: existingPricing.tier1Price,
//       tier2Price: existingPricing.tier2Price,
//       tier3Price: existingPricing.tier3Price,
//       tier4Price: existingPricing.tier4Price,
//       tier5Price: existingPricing.tier5Price,
//       currency: existingPricing.currency,
//       extraCharges: existingPricing.extraCharges?.reduce((acc: any, rule: any) => {
//         if (rule.ruleType === 'TOTAL_WEIGHT_VALUE') {
//           acc.totalWeightThreshold = rule.conditionValue;
//           acc.totalValueThreshold = rule.conditionValue2;
//           acc.weightValueCharge = rule.chargeAmount;
//         } else if (rule.ruleType === 'DIMENSION_THRESHOLD') {
//           acc.dimensionThreshold = rule.conditionValue;
//           acc.dimensionCharge = rule.chargeAmount;
//         } else if (rule.ruleType === 'PACKAGE_WEIGHT') {
//           acc.packageWeightThreshold = rule.conditionValue;
//           acc.packageWeightCharge = rule.chargeAmount;
//         }
//         return acc;
//       }, {}) || {},
//     } : {
//       currency: 'USD',
//       originDocsRequired: false,
//       destDocsRequired: false,
//     },
//   });

//   useEffect(() => {
//     fetchCountries();
//   }, []);

//   const fetchCountries = async () => {
//     try {
//       const response = await fetch('/api/admin/countries');
//       if (response.ok) {
//         const data = await response.json();
//         setCountries(data);
//       }
//     } catch (error) {
//       console.error('Failed to fetch countries:', error);
//     }
//   };

//   const onSubmit = async (data: PricingFormData) => {
//     setLoading(true);
//     try {
//       const url = existingPricing 
//         ? `/api/admin/shipping-pricing/${existingPricing.id}`
//         : '/api/admin/shipping-pricing';

//       const method = existingPricing ? 'PATCH' : 'POST';

//       const response = await fetch(url, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         onSuccess?.();
//       } else {
//         console.error('Failed to save pricing');
//       }
//     } catch (error) {
//       console.error('Failed to save pricing:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>
//           {existingPricing ? 'Edit Shipping Pricing' : 'Add New Shipping Pricing'}
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* Country Selection */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-4">
//               <Label htmlFor="originCountryId">Origin Country</Label>
//               <select
//                 id="originCountryId"
//                 {...register('originCountryId', { valueAsNumber: true })}
//                 className="w-full p-2 border rounded"
//                 required
//               >
//                 <option value="">Select origin country</option>
//                 {countries.map(country => (
//                   <option key={country.id} value={country.id}>
//                     {country.name} ({country.code})
//                   </option>
//                 ))}
//               </select>
//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   id="originDocsRequired"
//                   {...register('originDocsRequired')}
//                 />
//                 <Label htmlFor="originDocsRequired">
//                   Documents required for origin
//                 </Label>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <Label htmlFor="destCountryId">Destination Country</Label>
//               <select
//                 id="destCountryId"
//                 {...register('destCountryId', { valueAsNumber: true })}
//                 className="w-full p-2 border rounded"
//                 required
//               >
//                 <option value="">Select destination country</option>
//                 {countries.map(country => (
//                   <option key={country.id} value={country.id}>
//                     {country.name} ({country.code})
//                   </option>
//                 ))}
//               </select>
//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   id="destDocsRequired"
//                   {...register('destDocsRequired')}
//                 />
//                 <Label htmlFor="destDocsRequired">
//                   Documents required for destination
//                 </Label>
//               </div>
//             </div>
//           </div>

//           {/* Main Pricing Tiers */}
//           <div className="space-y-4">
//             <h3 className="font-medium">Base Pricing (by weight)</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//               <div>
//                 <Label htmlFor="tier1Price">Price for ≤1kg</Label>
//                 <Input
//                   id="tier1Price"
//                   type="number"
//                   step="0.01"
//                   {...register('tier1Price', { valueAsNumber: true })}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="tier2Price">Price for ≤10kg</Label>
//                 <Input
//                   id="tier2Price"
//                   type="number"
//                   step="0.01"
//                   {...register('tier2Price', { valueAsNumber: true })}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="tier3Price">Price for ≤15kg</Label>
//                 <Input
//                   id="tier3Price"
//                   type="number"
//                   step="0.01"
//                   {...register('tier3Price', { valueAsNumber: true })}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="tier4Price">Price for ≤20kg</Label>
//                 <Input
//                   id="tier4Price"
//                   type="number"
//                   step="0.01"
//                   {...register('tier4Price', { valueAsNumber: true })}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="tier5Price">Price per kg for &gt;20kg</Label>
//                 <Input
//                   id="tier5Price"
//                   type="number"
//                   step="0.01"
//                   {...register('tier5Price', { valueAsNumber: true })}
//                   required
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Extra Charges */}
//           <div className="space-y-4 border-t pt-6">
//             <h3 className="font-medium">Extra Charges (Optional)</h3>

//             {/* Rule A: Total weight & value */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded">
//               <div>
//                 <Label htmlFor="totalWeightThreshold">If total weight &lt;</Label>
//                 <Input
//                   id="totalWeightThreshold"
//                   type="number"
//                   step="0.01"
//                   {...register('extraCharges.totalWeightThreshold', { valueAsNumber: true })}
//                   placeholder="Weight in kg"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="totalValueThreshold">AND total value &gt;</Label>
//                 <Input
//                   id="totalValueThreshold"
//                   type="number"
//                   step="0.01"
//                   {...register('extraCharges.totalValueThreshold', { valueAsNumber: true })}
//                   placeholder="Value amount"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="weightValueCharge">Add charge</Label>
//                 <Input
//                   id="weightValueCharge"
//                   type="number"
//                   step="0.01"
//                   {...register('extraCharges.weightValueCharge', { valueAsNumber: true })}
//                   placeholder="Charge amount"
//                 />
//               </div>
//             </div>

//             {/* Rule B: Dimension threshold */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded">
//               <div>
//                 <Label htmlFor="dimensionThreshold">If any dimension &gt;</Label>
//                 <Input
//                   id="dimensionThreshold"
//                   type="number"
//                   step="0.01"
//                   {...register('extraCharges.dimensionThreshold', { valueAsNumber: true })}
//                   placeholder="Dimension in cm"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="dimensionCharge">Add charge</Label>
//                 <Input
//                   id="dimensionCharge"
//                   type="number"
//                   step="0.01"
//                   {...register('extraCharges.dimensionCharge', { valueAsNumber: true })}
//                   placeholder="Charge amount"
//                 />
//               </div>
//             </div>

//             {/* Rule C: Package weight threshold */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded">
//               <div>
//                 <Label htmlFor="packageWeightThreshold">If any package weight &gt;</Label>
//                 <Input
//                   id="packageWeightThreshold"
//                   type="number"
//                   step="0.01"
//                   {...register('extraCharges.packageWeightThreshold', { valueAsNumber: true })}
//                   placeholder="Weight in kg"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="packageWeightCharge">Add charge</Label>
//                 <Input
//                   id="packageWeightCharge"
//                   type="number"
//                   step="0.01"
//                   {...register('extraCharges.packageWeightCharge', { valueAsNumber: true })}
//                   placeholder="Charge amount"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Form Actions */}
//           <div className="flex justify-end space-x-4">
//             {onCancel && (
//               <Button type="button" variant="outline" onClick={onCancel}>
//                 Cancel
//               </Button>
//             )}
//             <Button type="submit" disabled={loading}>
//               {loading ? 'Saving...' : (existingPricing ? 'Update Pricing' : 'Create Pricing')}
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// components/admin/ShippingPricingForm.tsx - BACK TO ORIGINAL
// components/admin/shipping-pricing-form.tsx (ENHANCED VERSION)
'use client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Checkbox } from '../../../components/ui/checkbox';
import { CountrySelect } from "react-country-state-city";
import "../../styles/react-country-state-city.css";

interface Country {
  id: number;
  name: string;
}

interface PricingFormData {
  originCountryId: number;
  destCountryId: number;
  originCountryName: string;
  destCountryName: string;
  originDocsRequired: boolean;
  destDocsRequired: boolean;
  tier1Price: number;
  tier2Price: number;
  tier3Price: number;
  tier4Price: number;
  tier5Price: number;
  currency: string;
  extraCharges: {
    totalWeightThreshold?: number;
    totalValueThreshold?: number;
    weightValueCharge?: number;
    dimensionThreshold?: number;
    dimensionCharge?: number;
    packageWeightThreshold?: number;
    packageWeightCharge?: number;
  };
}

interface ShippingPricingFormProps {
  existingPricing?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const ShippingPricingForm = ({
  existingPricing,
  onSuccess,
  onCancel
}: ShippingPricingFormProps) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm<PricingFormData>({
    defaultValues: existingPricing ? {
      originCountryId: existingPricing.originCountryId,
      destCountryId: existingPricing.destCountryId,
      originCountryName: existingPricing.originCountry?.name || '',
      destCountryName: existingPricing.destCountry?.name || '',
      originDocsRequired: existingPricing.originDocsRequired,
      destDocsRequired: existingPricing.destDocsRequired,
      tier1Price: existingPricing.tier1Price,
      tier2Price: existingPricing.tier2Price,
      tier3Price: existingPricing.tier3Price,
      tier4Price: existingPricing.tier4Price,
      tier5Price: existingPricing.tier5Price,
      currency: existingPricing.currency,
      extraCharges: existingPricing.extraCharges?.reduce((acc: any, rule: any) => {
        if (rule.ruleType === 'TOTAL_WEIGHT_VALUE') {
          acc.totalWeightThreshold = rule.conditionValue;
          acc.totalValueThreshold = rule.conditionValue2;
          acc.weightValueCharge = rule.chargeAmount;
        } else if (rule.ruleType === 'DIMENSION_THRESHOLD') {
          acc.dimensionThreshold = rule.conditionValue;
          acc.dimensionCharge = rule.chargeAmount;
        } else if (rule.ruleType === 'PACKAGE_WEIGHT') {
          acc.packageWeightThreshold = rule.conditionValue;
          acc.packageWeightCharge = rule.chargeAmount;
        }
        return acc;
      }, {}) || {},
    } : {
      currency: 'USD',
      originDocsRequired: false,
      destDocsRequired: false,
    },
  });

  const handleOriginCountryChange = (country: Country) => {
    setValue('originCountryId', country.id);
    setValue('originCountryName', country.name);
  };

  const handleDestCountryChange = (country: Country) => {
    setValue('destCountryId', country.id);
    setValue('destCountryName', country.name);
  };

  const onSubmit = async (data: PricingFormData) => {
    setLoading(true);
    try {
      const url = existingPricing
        ? `/api/admin/shipping-pricing/${existingPricing.id}`
        : '/api/admin/shipping-pricing';

      const method = existingPricing ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        onSuccess?.();
      } else {
        console.error('Failed to save pricing');
      }
    } catch (error) {
      console.error('Failed to save pricing:', error);
    } finally {
      setLoading(false);
    }
  };

  const originCountryName = watch('originCountryName');
  const destCountryName = watch('destCountryName');

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {existingPricing ? 'Edit Shipping Pricing' : 'Add New Shipping Pricing'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Country Selection - USING YOUR PACKAGE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label htmlFor="originCountry">Origin Country</Label>
              <CountrySelect
                src="/products"
                onChange={handleOriginCountryChange as any}
                placeHolder={originCountryName || "Select origin country"}
                containerClassName="w-full"
                inputClassName="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="originDocsRequired"
                  {...register('originDocsRequired')}
                />
                <Label htmlFor="originDocsRequired">
                  Documents required for origin
                </Label>
              </div>
            </div>

            <div className="space-y-4">
              <Label htmlFor="destCountry">Destination Country</Label>
              <CountrySelect
                src="/products"
                onChange={handleDestCountryChange as any}
                placeHolder={destCountryName || "Select destination country"}
                containerClassName="w-full"
                inputClassName="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="destDocsRequired"
                  {...register('destDocsRequired')}
                />
                <Label htmlFor="destDocsRequired">
                  Documents required for destination
                </Label>
              </div>
            </div>
          </div>

          {/* Rest of the form remains the same (pricing tiers & extra charges) */}
          {/* Main Pricing Tiers */}
          <div className="space-y-4">
            <h3 className="font-medium">Base Pricing (by weight)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="tier1Price">Price for ≤1kg</Label>
                <Input
                  id="tier1Price"
                  type="number"
                  step="0.01"
                  {...register('tier1Price', { valueAsNumber: true })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="tier2Price">Price for ≤10kg</Label>
                <Input
                  id="tier2Price"
                  type="number"
                  step="0.01"
                  {...register('tier2Price', { valueAsNumber: true })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="tier3Price">Price for ≤15kg</Label>
                <Input
                  id="tier3Price"
                  type="number"
                  step="0.01"
                  {...register('tier3Price', { valueAsNumber: true })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="tier4Price">Price for ≤20kg</Label>
                <Input
                  id="tier4Price"
                  type="number"
                  step="0.01"
                  {...register('tier4Price', { valueAsNumber: true })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="tier5Price">Price per kg for &gt;20kg</Label>
                <Input
                  id="tier5Price"
                  type="number"
                  step="0.01"
                  {...register('tier5Price', { valueAsNumber: true })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Extra Charges - Your A, B, C Rules */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="font-medium">Extra Charges (Optional)</h3>

            {/* Rule A: Total weight & value */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded">
              <div>
                <Label htmlFor="totalWeightThreshold">If total weight &lt;</Label>
                <Input
                  id="totalWeightThreshold"
                  type="number"
                  step="0.01"
                  {...register('extraCharges.totalWeightThreshold', { valueAsNumber: true })}
                  placeholder="Weight in kg"
                />
              </div>
              <div>
                <Label htmlFor="totalValueThreshold">AND total value &gt;</Label>
                <Input
                  id="totalValueThreshold"
                  type="number"
                  step="0.01"
                  {...register('extraCharges.totalValueThreshold', { valueAsNumber: true })}
                  placeholder="Value amount"
                />
              </div>
              <div>
                <Label htmlFor="weightValueCharge">Add charge</Label>
                <Input
                  id="weightValueCharge"
                  type="number"
                  step="0.01"
                  {...register('extraCharges.weightValueCharge', { valueAsNumber: true })}
                  placeholder="Charge amount"
                />
              </div>
            </div>

            {/* Rule B: Dimension threshold */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded">
              <div>
                <Label htmlFor="dimensionThreshold">If any dimension &gt;</Label>
                <Input
                  id="dimensionThreshold"
                  type="number"
                  step="0.01"
                  {...register('extraCharges.dimensionThreshold', { valueAsNumber: true })}
                  placeholder="Dimension in cm"
                />
              </div>
              <div>
                <Label htmlFor="dimensionCharge">Add charge</Label>
                <Input
                  id="dimensionCharge"
                  type="number"
                  step="0.01"
                  {...register('extraCharges.dimensionCharge', { valueAsNumber: true })}
                  placeholder="Charge amount"
                />
              </div>
            </div>

            {/* Rule C: Package weight threshold */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded">
              <div>
                <Label htmlFor="packageWeightThreshold">If any package weight &gt;</Label>
                <Input
                  id="packageWeightThreshold"
                  type="number"
                  step="0.01"
                  {...register('extraCharges.packageWeightThreshold', { valueAsNumber: true })}
                  placeholder="Weight in kg"
                />
              </div>
              <div>
                <Label htmlFor="packageWeightCharge">Add charge</Label>
                <Input
                  id="packageWeightCharge"
                  type="number"
                  step="0.01"
                  {...register('extraCharges.packageWeightCharge', { valueAsNumber: true })}
                  placeholder="Charge amount"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : (existingPricing ? 'Update Pricing' : 'Create Pricing')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};