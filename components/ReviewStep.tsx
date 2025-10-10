// // // // // // newParcel/components/ReviewStep.tsx
// 'use client';

// import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
// import { Button } from '../components/ui/button';
// import { useFormContext } from 'react-hook-form';
// import { TimeRangeSlider } from '../components/ui/slider';
// import { Checkbox } from '../components/ui/checkbox';
// import { calculatePackageShippingCost, PickupFormData } from "../utils/shipping-calculations";
// // import { costCalculations } from '../utils/calculations';
// import { useEffect } from 'react';
// // import { Calendar } from '../components/ui/calendar';
// import { DatePickerField } from './datePicker';

// export const ReviewStep = ({
//     onBack,
//     actionState,
//     isPending,
// }: {
//     onBack: () => void;
//     actionState: { message: string; error?: string };
//     isPending: boolean;
// }) => {
//     const { watch, setValue } = useFormContext<PickupFormData>();
//     const formData = watch();

//   // DEBUG: Log package data
//     console.log('PACKAGE DATA:', formData.packages);
//     console.log('ORIGIN Country ID:', formData.pickupDetails.address.countryId);
//     console.log('DEST Country ID:', formData.deliveryDetails.address.countryId);

//     const shippingCalculations = formData.packages.map(pkg =>
//         calculatePackageShippingCost(
//             pkg,
//             formData.pickupDetails.address.countryId,
//             formData.deliveryDetails.address.countryId
//         )
//     );

// // DEBUG: Check what's actually in shippingCalculations
// console.log('RAW shippingCalculations:', shippingCalculations);
// console.log('First item chargeableWeight:', shippingCalculations[0]?.chargeableWeight);
// console.log('First item cost:', shippingCalculations[0]?.cost);

//     const total = {
//         packages: formData.packages.length,
//         items: formData.items.length,
//         weight: formData.packages.reduce((sum, pkg) => sum + pkg.weight, 0),
//         chargeableWeight: shippingCalculations.reduce((sum, calc) => sum + calc.chargeableWeight, 0),
//         shippingCost: shippingCalculations.reduce((sum, calc) => sum + calc.cost, 0),
//         value: formData.items.reduce((sum, item) => sum + (item.value * item.quantity), 0),
//     };

//     console.log('TOTAL object:', total);

//     // const originCountryId = formData.pickupDetails.address.countryId;
//     // const destCountryId = formData.deliveryDetails.address.countryId;

//     const convertTimeToMinutes = (timeString: string) => {
//         const [hours, minutes] = timeString.split(':').map(Number);
//         return hours * 60 + minutes;
//     };

//     const convertMinutesToTime = (minutes: number) => {
//         const hours = Math.floor(minutes / 60);
//         const mins = minutes % 60;
//         return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
//     };


//   // DEBUG: Log the results from Function 2
//     console.log('SHIPPING RESULTS (Function 2):', shippingCalculations);

//     // const totalCost = shippingResults.reduce((sum, r) => sum + r.cost, 0);
//     const totalCost = shippingCalculations.reduce((sum, r) => sum + r.cost, 0);
//     const currency = shippingCalculations[0]?.currency || "$";

// // DEBUG: Log the totals
//     console.log('TOTAL from Function 1:', total);
//     console.log('TOTAL COST from Function 2:', totalCost);

//     useEffect(() => {
//         setValue("calculatedCost", totalCost);
//         setValue("costCurrency", currency);
//     }, [totalCost, currency, setValue]);
//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>Review & Submit</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//                 {/* Summary Section */}
//                 <div className="grid grid-cols-2 gap-4">
//                     <div>
//                         <p className="text-sm text-muted-foreground">Total Packages</p>
//                         <p className="font-medium">{total.packages}</p>
//                     </div>
//                     <div>
//                         <p className="text-sm text-muted-foreground">Total Items</p>
//                         <p className="font-medium">{total.items}</p>
//                     </div>
//                     <div>
//                         <p className="text-sm text-muted-foreground">Total Weight</p>
//                         <p className="font-medium">{total.weight.toFixed(2)} kg</p>
//                     </div>
//                     <div>
//                         <p className="text-sm text-muted-foreground">Chargeable Weight</p>
//                         <p className="font-medium">{total.chargeableWeight.toFixed(2)} kg</p>
//                     </div>
//                     <div>
//                         <p className="text-sm text-muted-foreground">Total Value</p>
//                         <p className="font-medium">{currency} {total.value.toFixed(2)}</p>
//                     </div>
//                     <div>
//                         <p className="text-sm text-muted-foreground">Shipping Cost</p>
//                         <p className="font-medium">{currency} {totalCost.toFixed(2)}</p>
//                     </div>
//                 </div>

//                 {/* Location Details */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                         <h3 className="font-medium">Pickup Location</h3>
//                         <p>
//                             {formData.pickupDetails.locationType === 'warehouse'
//                                 ? `Warehouse: ${formData.pickupDetails.warehouseId}`
//                                 : formData.pickupDetails.address.line1}
//                         </p>
//                         <p>{formData.pickupDetails.contact.name}</p>
//                     </div>
//                     <div className="space-y-2">
//                         <h3 className="font-medium">Delivery Location</h3>
//                         <p>
//                             {formData.deliveryDetails.locationType === 'warehouse'
//                                 ? `Warehouse: ${formData.deliveryDetails.warehouseId}`
//                                 : formData.deliveryDetails.address.line1}
//                         </p>
//                         <p>{formData.deliveryDetails.contact.name}</p>
//                     </div>
//                 </div>
//                 <div>
//                                       <TimeRangeSlider
//                         defaultValue={[
//                             convertTimeToMinutes(formData.timeWindow.start),
//                             convertTimeToMinutes(formData.timeWindow.end)
//                         ]}
//                         onChange={(value) => {
//                             if (Array.isArray(value) && value.length === 2) {
//                                 setValue("timeWindow.start", convertMinutesToTime(value[0]));
//                                 setValue("timeWindow.end", convertMinutesToTime(value[1]));
//                             }
//                         }}
//                     />

//                     <DatePickerField />
//                 </div>
//                 {/* Call Consent Checkbox (Always Required) */}
//                 <div className="rounded-lg border p-4">
//                     <div className="flex items-start">
//                         <div className="mr-2 h-5 flex-none">
//                             <Checkbox
//                                 id="call-consent"
//                                 checked={formData.acceptCallsForUpdates}
//                                 onCheckedChange={(checked) => {
//                                     setValue("acceptCallsForUpdates", checked === true);
//                                 }}
//                                 required
//                                 className="size-4"
//                                 style={{ minWidth: '16px', minHeight: '16px' }}
//                             />
//                         </div>
//                         <label htmlFor="call-consent" className="text-sm leading-snug text-foreground">
//                             &quot;By providing your phone number, you agree to receive updates about your parcel tracking...&quot;
//                         </label>
//                     </div>
//                 </div>

//                 {/* Action Buttons */}
//                 {actionState.error && (
//                     <div className="text-red-500 text-sm">{actionState.error}</div>
//                 )}
//                 {actionState.message && (
//                     <div className="text-green-500 text-sm">{actionState.message}</div>
//                 )}

//                 <div className="flex justify-between pt-4">
//                     <Button variant="outline" onClick={onBack} disabled={isPending}>
//                         Back
//                     </Button>
//                     <Button type="submit" disabled={isPending || !formData.acceptCallsForUpdates}>
//                         {isPending ? "Scheduling..." : "Schedule Pickup"}
//                     </Button>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// };



// newParcel/components/ReviewStep.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useFormContext } from 'react-hook-form';
import { TimeRangeSlider } from '../components/ui/slider';
import { Checkbox } from '../components/ui/checkbox';
import { calculateBatchShippingCost, PickupFormData } from "../utils/shipping-calculations";
import { useEffect, useState, useCallback } from 'react';
import { DatePickerField } from './datePicker';

interface CalculationState {
    totalCost: number;
    chargeableWeight: number;
    currency: string;
    isCalculating: boolean;
    error: string | null;
    breakdown?: {
        baseCost: number;
        extraCharges: Array<{
            type: string;
            description: string;
            amount: number;
        }>;
    };
}

export const ReviewStep = ({
    onBack,
    actionState,
    isPending,
}: {
    onBack: () => void;
    actionState: { message: string; error?: string };
    isPending: boolean;
}) => {
    const { watch, setValue } = useFormContext<PickupFormData>();
    const formData = watch();

    const [calculation, setCalculation] = useState<CalculationState>({
        totalCost: 0,
        chargeableWeight: 0,
        currency: 'USD',
        isCalculating: false,
        error: null
    });

    // DEBUG: Log package data
    console.log('PACKAGE DATA:', formData.packages);
    console.log('ORIGIN Country ID:', formData.pickupDetails.address.countryId);
    console.log('DEST Country ID:', formData.deliveryDetails.address.countryId);

    // Calculate shipping costs using dynamic pricing
    const calculateShipping = useCallback(async () => {
        if (!formData.packages.length || !formData.pickupDetails.address.countryId || !formData.deliveryDetails.address.countryId) {
            return;
        }

        setCalculation(prev => ({ ...prev, isCalculating: true, error: null }));

        try {
            const totalValue = formData.items.reduce((sum, item) => sum + (item.value * item.quantity), 0);

            const result = await calculateBatchShippingCost(
                formData.packages,
                formData.pickupDetails.address.countryId,
                formData.deliveryDetails.address.countryId,
                totalValue,
                'metric' // or get from formData if you have unit system preference
            );

            console.log('✅ DYNAMIC PRICING RESULT:', result);

            setCalculation({
                totalCost: result.cost,
                chargeableWeight: result.chargeableWeight,
                currency: result.currency,
                isCalculating: false,
                error: null,
                breakdown: result.breakdown
            });

        } catch (error) {
            console.error('❌ Error calculating shipping:', error);
            setCalculation(prev => ({
                ...prev,
                isCalculating: false,
                error: 'Failed to calculate shipping cost. Please try again.'
            }));
        }
    }, [
        formData.packages,
        formData.pickupDetails.address.countryId,
        formData.deliveryDetails.address.countryId,
        formData.items
    ]);

    // Recalculate when relevant form data changes
    useEffect(() => {
        calculateShipping();
    }, [calculateShipping]);

    const total = {
        packages: formData.packages.length,
        items: formData.items.length,
        weight: formData.packages.reduce((sum, pkg) => sum + pkg.weight, 0),
        chargeableWeight: calculation.chargeableWeight,
        shippingCost: calculation.totalCost,
        value: formData.items.reduce((sum, item) => sum + (item.value * item.quantity), 0),
    };

    console.log('TOTAL object:', total);

    const convertTimeToMinutes = (timeString: string) => {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const convertMinutesToTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    };

    // DEBUG: Log the results
    console.log('CALCULATION STATE:', calculation);

    // Update form values when calculation changes
    useEffect(() => {
        setValue("calculatedCost", calculation.totalCost);
        setValue("costCurrency", calculation.currency);
    }, [calculation.totalCost, calculation.currency, setValue]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Review & Submit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Summary Section */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Total Packages</p>
                        <p className="font-medium">{total.packages}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Total Items</p>
                        <p className="font-medium">{total.items}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Total Weight</p>
                        <p className="font-medium">{total.weight.toFixed(2)} kg</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Chargeable Weight</p>
                        <p className="font-medium">
                            {calculation.isCalculating ? (
                                <span className="text-muted-foreground">Calculating...</span>
                            ) : (
                                `${total.chargeableWeight.toFixed(2)} kg`
                            )}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Total Value</p>
                        <p className="font-medium">{calculation.currency} {total.value.toFixed(2)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Shipping Cost</p>
                        <p className="font-medium">
                            {calculation.isCalculating ? (
                                <span className="text-muted-foreground">Calculating...</span>
                            ) : (
                                `${calculation.currency} ${total.shippingCost.toFixed(2)}`
                            )}
                        </p>
                    </div>
                </div>

                {/* Cost Breakdown (Optional - show if you want detailed view) */}
                {calculation.breakdown && calculation.breakdown.extraCharges.length > 0 && (
                    <div className="rounded-lg border p-4">
                        <h4 className="font-medium mb-2">Cost Breakdown</h4>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span>Base Shipping:</span>
                                <span>{calculation.currency} {calculation.breakdown.baseCost.toFixed(2)}</span>
                            </div>
                            {calculation.breakdown.extraCharges.map((charge, index) => (
                                <div key={index} className="flex justify-between text-muted-foreground">
                                    <span>{charge.description}:</span>
                                    <span>+{calculation.currency} {charge.amount.toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="flex justify-between border-t pt-1 font-medium">
                                <span>Total:</span>
                                <span>{calculation.currency} {calculation.totalCost.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Calculation Error */}
                {calculation.error && (
                    <div className="text-red-500 text-sm p-3 border border-red-200 rounded-lg bg-red-50">
                        {calculation.error}
                        <Button
                            variant="outline"
                            size="sm"
                            className="ml-2"
                            onClick={calculateShipping}
                        >
                            Retry
                        </Button>
                    </div>
                )}

                {/* Location Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <h3 className="font-medium">Pickup Location</h3>
                        <p>
                            {formData.pickupDetails.locationType === 'warehouse'
                                ? `Warehouse: ${formData.pickupDetails.warehouseId}`
                                : formData.pickupDetails.address.line1}
                        </p>
                        <p>{formData.pickupDetails.contact.name}</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-medium">Delivery Location</h3>
                        <p>
                            {formData.deliveryDetails.locationType === 'warehouse'
                                ? `Warehouse: ${formData.deliveryDetails.warehouseId}`
                                : formData.deliveryDetails.address.line1}
                        </p>
                        <p>{formData.deliveryDetails.contact.name}</p>
                    </div>
                </div>

                {/* Time and Date Selection */}
                <div>
                    <TimeRangeSlider
                        defaultValue={[
                            convertTimeToMinutes(formData.timeWindow.start),
                            convertTimeToMinutes(formData.timeWindow.end)
                        ]}
                        onChange={(value) => {
                            if (Array.isArray(value) && value.length === 2) {
                                setValue("timeWindow.start", convertMinutesToTime(value[0]));
                                setValue("timeWindow.end", convertMinutesToTime(value[1]));
                            }
                        }}
                    />
                    <DatePickerField />
                </div>

                {/* Call Consent Checkbox (Always Required) */}
                <div className="rounded-lg border p-4">
                    <div className="flex items-start">
                        <div className="mr-2 h-5 flex-none">
                            <Checkbox
                                id="call-consent"
                                checked={formData.acceptCallsForUpdates}
                                onCheckedChange={(checked) => {
                                    setValue("acceptCallsForUpdates", checked === true);
                                }}
                                required
                                className="size-4"
                                style={{ minWidth: '16px', minHeight: '16px' }}
                            />
                        </div>
                        <label htmlFor="call-consent" className="text-sm leading-snug text-foreground">
                            &quot;By providing your phone number, you agree to receive updates about your parcel tracking...&quot;
                        </label>
                    </div>
                </div>

                {/* Action Buttons */}
                {actionState.error && (
                    <div className="text-red-500 text-sm">{actionState.error}</div>
                )}
                {actionState.message && (
                    <div className="text-green-500 text-sm">{actionState.message}</div>
                )}

                <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={onBack} disabled={isPending || calculation.isCalculating}>
                        Back
                    </Button>
                    <Button
                        type="submit"
                        disabled={isPending || !formData.acceptCallsForUpdates || calculation.isCalculating || calculation.error !== null}
                    >
                        {isPending ? "Scheduling..." :
                            calculation.isCalculating ? "Calculating..." : "Schedule Pickup"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};