// // // // // 'use client';

// // // // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // // // // import { Button } from '@/components/ui/button';
// // // // // import { useFormContext } from 'react-hook-form';
// // // // // import { calculatePackageShippingCost } from "@/utils/shipping-calculations";
// // // // // import { PickupFormData } from '@/types/PickupPage';
// // // // // import { costCalculations } from "@/data/calculations";
// // // // // import { Checkbox } from '@/components/ui/checkbox';
// // // // // import { useState } from 'react';
// // // // // import { TimeRangeSlider } from '@/components/ui/slider';
// // // // // import { toast } from 'sonner';

// // // // // export const ReviewStep = ({ onSubmit, onBack }: { onSubmit: (data: PickupFormData) => void; onBack: () => void }) => {
// // // // //     const { handleSubmit, watch } = useFormContext<PickupFormData>();
// // // // //     const [isSubmitting, setIsSubmitting] = useState(false);
// // // // //     const [submitError, setSubmitError] = useState<string | null>(null);
// // // // //     const handleFormSubmit = async (data: PickupFormData) => {
// // // // //         console.log("Form data being submitted:", data);
// // // // //         setIsSubmitting(true);
// // // // //         setSubmitError(null);

// // // // //         try {
// // // // //             await onSubmit(data);
// // // // //         } catch (error: any) {
// // // // //             console.error("Submission error:", error);
// // // // //             setSubmitError(error.message || "Failed to submit pickup");
// // // // //         } finally {
// // // // //             setIsSubmitting(false);
// // // // //         }
// // // // //     };


// // // // //     const formData = watch();
// // // // //     const [checked, setChecked] = useState(false);
// // // // //     const shippingCalculations = formData.packages.map(pkg =>
// // // // //         calculatePackageShippingCost(
// // // // //             pkg,
// // // // //             formData.pickupDetails.address.countryId,
// // // // //             formData.deliveryDetails.address.countryId
// // // // //         )
// // // // //     );

// // // // //     // Calculate totals
// // // // //     const total = {
// // // // //         packages: formData.packages.length,
// // // // //         items: formData.items.length,
// // // // //         weight: formData.packages.reduce((sum, pkg) => sum + pkg.weight, 0),
// // // // //         chargeableWeight: shippingCalculations.reduce((sum, calc) => sum + calc.chargeableWeight, 0),
// // // // //         shippingCost: shippingCalculations.reduce((sum, calc) => sum + calc.cost, 0),
// // // // //         value: formData.items.reduce((sum, item) => sum + (item.value * item.quantity), 0),
// // // // //     };

// // // // //     const originCountryId = formData.pickupDetails.address.countryId;
// // // // //     const destCountryId = formData.deliveryDetails.address.countryId;

// // // // //     // 2. Calculate costs only if we have valid country IDs
// // // // //     const shippingResults = formData.packages.map(pkg => {
// // // // //         return costCalculations({
// // // // //             weight: pkg.weight.toString(),
// // // // //             length: pkg.dimensions.length.toString(),
// // // // //             width: pkg.dimensions.width.toString(),
// // // // //             height: pkg.dimensions.height.toString(),
// // // // //             units: "kg-cm",
// // // // //             originCountryId: Number(originCountryId),
// // // // //             destCountryId: Number(destCountryId)
// // // // //         });
// // // // //     });

// // // // //     // 3. Debug output (temporary)
// // // // //     console.log("Shipping Results:", shippingResults);

// // // // //     const totalCost = shippingResults.reduce((sum, r) => sum + r.cost, 0);
// // // // //     const currency = shippingResults[0]?.currency || "$";


// // // // //     return (
// // // // //         <Card>
// // // // //             <CardHeader>
// // // // //                 <CardTitle>Review & Submit</CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent className="space-y-6">
// // // // //                 {/* Summary Section */}
// // // // //                 <div className="grid grid-cols-2 gap-4">
// // // // //                     <div>
// // // // //                         <p className="text-sm text-muted-foreground">Total Packages</p>
// // // // //                         <p className="font-medium">{total.packages}</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                         <p className="text-sm text-muted-foreground">Total Items</p>
// // // // //                         <p className="font-medium">{total.items}</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                         <p className="text-sm text-muted-foreground">Total Weight</p>
// // // // //                         <p className="font-medium">{total.weight.toFixed(2)} kg</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                         <p className="text-sm text-muted-foreground">Chargeable Weight</p>
// // // // //                         <p className="font-medium">{total.chargeableWeight.toFixed(2)} kg</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                         <p className="text-sm text-muted-foreground">Total Value</p>
// // // // //                         <p className="font-medium">{currency} {total.value.toFixed(2)}</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                         <p className="text-sm text-muted-foreground">Shipping Cost</p>
// // // // //                         <p className="font-medium">{currency} {total.shippingCost.toFixed(2)}</p>
// // // // //                         <h3>Shipping Cost: {currency}{totalCost.toFixed(2)}</h3>
// // // // //                         <h3>Total Cost: {currency}{totalCost.toFixed(2)}</h3>
// // // // //                     </div>
// // // // //                 </div>

// // // // //                 {/* Location Details */}
// // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // //                     <div className="space-y-2">
// // // // //                         <h3 className="font-medium">Pickup Location</h3>
// // // // //                         <p>
// // // // //                             {formData.pickupDetails.locationType === 'warehouse'
// // // // //                                 ? `Warehouse: ${formData.pickupDetails.warehouseId}`
// // // // //                                 : formData.pickupDetails.address.line1}
// // // // //                         </p>
// // // // //                         <p>{formData.pickupDetails.contact.name}</p>
// // // // //                     </div>

// // // // //                     <div className="space-y-2">
// // // // //                         <h3 className="font-medium">Delivery Location</h3>
// // // // //                         <p>
// // // // //                             {formData.deliveryDetails.locationType === 'warehouse'
// // // // //                                 ? `Warehouse: ${formData.deliveryDetails.warehouseId}`
// // // // //                                 : formData.deliveryDetails.address.line1}
// // // // //                         </p>
// // // // //                         <p>{formData.deliveryDetails.contact.name}</p>
// // // // //                     </div>
// // // // //                 </div>
// // // // //                 <div><TimeRangeSlider /></div>
// // // // //                 <div className="rounded-lg border p-4">
// // // // //                     <div className="flex items-start">
// // // // //                         {/* Checkbox with fixed dimensions */}
// // // // //                         <div className="mr-2 h-5 flex-none">
// // // // //                             <Checkbox
// // // // //                                 id="storage-fee-acknowledgement"
// // // // //                                 checked={checked}
// // // // //                                 onCheckedChange={() => setChecked(!checked)}
// // // // //                                 required
// // // // //                                 className="size-4" // Fixed size
// // // // //                                 style={{ minWidth: '16px', minHeight: '16px' }} // Double protection
// // // // //                             />
// // // // //                         </div>

// // // // //                         {/* Label with proper text wrapping */}
// // // // //                         <label
// // // // //                             htmlFor="storage-fee-acknowledgement"
// // // // //                             className="text-sm leading-snug text-foreground"
// // // // //                         >
// // // // //                             "By providing your phone number, you agree to receive updates about your parcel tracking, delivery issues, and occasional promotions (if opted-in). We respect your privacy—your number will only be used for shipping and store-related communications. View our Terms and Privacy Policy."
// // // // //                         </label>
// // // // //                     </div>
// // // // //                 </div>

// // // // //                 {/* Action Buttons */}
// // // // //                 {submitError && (
// // // // //                     <div className="text-red-500 text-sm">{submitError}</div>
// // // // //                 )}

// // // // //                 <div className="flex justify-between pt-4">
// // // // //                     <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
// // // // //                         Back
// // // // //                     </Button>
// // // // //                     <Button onClick={async () => {
// // // // //                         console.log("🔄 STARTING SUBMISSION");

// // // // //                         // 1. Get current form data
// // // // //                         const formData = watch();
// // // // //                         console.log("📦 FORM DATA:", JSON.stringify(formData, null, 2));

// // // // //                         try {
// // // // //                             // 2. Log before fetch
// // // // //                             console.log("📡 SENDING REQUEST to /api/pickup");
// // // // //                             if (!checked) {
// // // // //                                 return
// // // // //                             };
// // // // //                             const res = await fetch('/api/pickup', {
// // // // //                                 method: 'POST',
// // // // //                                 headers: { 'Content-Type': 'application/json' },
// // // // //                                 body: JSON.stringify(formData),
// // // // //                                 credentials: 'include'
// // // // //                             });

// // // // //                             // 3. Log response status
// // // // //                             console.log("✅ RESPONSE STATUS:", res.status);

// // // // //                             if (!res.ok) {
// // // // //                                 const errorData = await res.json();
// // // // //                                 console.error("❌ SERVER ERROR:", errorData);
// // // // //                                 throw new Error(errorData.error || 'Request failed');
// // // // //                             }

// // // // //                             const result = await res.json();
// // // // //                             console.log("🎉 SUCCESS:", result);
// // // // //                             toast.success('Pickup scheduled!');

// // // // //                         } catch (error) {
// // // // //                             console.error("💥 CLIENT ERROR:", error);
// // // // //                             toast.error(error instanceof Error ? error.message : 'Failed to schedule pickup');
// // // // //                         }
// // // // //                     }}>
// // // // //                         Schedule Pickup
// // // // //                     </Button>
// // // // //                 </div>
// // // // //             </CardContent>
// // // // //         </Card>
// // // // //     );
// // // // // };

// // // // // newParcel/components/ReviewStep.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useFormContext } from 'react-hook-form';
import { PickupFormData } from '../types/PickupPage';
import { TimeRangeSlider } from '../components/ui/slider';
import { Checkbox } from '../components/ui/checkbox';
import { calculatePackageShippingCost } from "../utils/shipping-calculations";
import { costCalculations } from '../utils/calculations';
import { useEffect } from 'react';
// import { Calendar } from '../components/ui/calendar';
import { DatePickerField } from './datePicker';

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

    const shippingCalculations = formData.packages.map(pkg =>
        calculatePackageShippingCost(
            pkg,
            formData.pickupDetails.address.countryId,
            formData.deliveryDetails.address.countryId
        )
    );

    const total = {
        packages: formData.packages.length,
        items: formData.items.length,
        weight: formData.packages.reduce((sum, pkg) => sum + pkg.weight, 0),
        chargeableWeight: shippingCalculations.reduce((sum, calc) => sum + calc.chargeableWeight, 0),
        shippingCost: shippingCalculations.reduce((sum, calc) => sum + calc.cost, 0),
        value: formData.items.reduce((sum, item) => sum + (item.value * item.quantity), 0),
    };

    const originCountryId = formData.pickupDetails.address.countryId;
    const destCountryId = formData.deliveryDetails.address.countryId;

    const convertTimeToMinutes = (timeString: string) => {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const convertMinutesToTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    };

    const shippingResults = formData.packages.map(pkg =>
        costCalculations({
            weight: pkg.weight.toString(),
            length: pkg.dimensions.length.toString(),
            width: pkg.dimensions.width.toString(),
            height: pkg.dimensions.height.toString(),
            units: "kg-cm",
            originCountryId: Number(originCountryId),
            destCountryId: Number(destCountryId)
        })
    );

    const totalCost = shippingResults.reduce((sum, r) => sum + r.cost, 0);
    const currency = shippingResults[0]?.currency || "$";
    useEffect(() => {
        setValue("calculatedCost", totalCost);
        setValue("costCurrency", currency);
    }, [totalCost, currency, setValue]);
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
                        <p className="font-medium">{total.chargeableWeight.toFixed(2)} kg</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Total Value</p>
                        <p className="font-medium">{currency} {total.value.toFixed(2)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Shipping Cost</p>
                        <p className="font-medium">{currency} {totalCost.toFixed(2)}</p>
                    </div>
                </div>

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
                <div>
                    {/* <TimeRangeSlider /> */}
                    {/* <TimeRangeSlider
                        defaultValue={[
                            convertTimeToMinutes(formData.timeWindow.start),
                            convertTimeToMinutes(formData.timeWindow.end)
                        ]}
                        onChange={(value) => {
                            setValue("timeWindow.start", convertMinutesToTime(value[0]));
                            setValue("timeWindow.end", convertMinutesToTime(value[1]));
                        }}
                    /> */}

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
                    <Button variant="outline" onClick={onBack} disabled={isPending}>
                        Back
                    </Button>
                    <Button type="submit" disabled={isPending || !formData.acceptCallsForUpdates}>
                        {isPending ? "Scheduling..." : "Schedule Pickup"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

// // // // 'use client';

// // // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // // // import { Button } from '@/components/ui/button';
// // // // import { useFormContext } from 'react-hook-form';
// // // // import { PickupFormData } from '@/types/PickupPage';
// // // // import { format } from 'date-fns';

// // // // export const ReviewStep = ({ onSubmit, onBack }: { onSubmit: (data: PickupFormData) => void; onBack: () => void }) => {
// // // //   const { handleSubmit, watch } = useFormContext<PickupFormData>();
// // // //   const formData = watch();

// // // //   return (
// // // //     <Card>
// // // //       <CardHeader>
// // // //         <CardTitle>Review & Submit</CardTitle>
// // // //       </CardHeader>
// // // //       <CardContent className="space-y-6">
// // // //         <div className="space-y-4">
// // // //           <h3 className="font-medium">Package Details</h3>
// // // //           <div className="grid grid-cols-3 gap-4">
// // // //             <div>
// // // //               <p className="text-sm text-muted-foreground">Type</p>
// // // //               <p>{formData.packageType}</p>
// // // //             </div>
// // // //             <div>
// // // //               <p className="text-sm text-muted-foreground">Weight</p>
// // // //               <p>{formData.weight} kg</p>
// // // //             </div>
// // // //             <div>
// // // //               <p className="text-sm text-muted-foreground">Dimensions</p>
// // // //               <p>{formData.dimensions.length} × {formData.dimensions.width} × {formData.dimensions.height} cm</p>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         <div className="space-y-4">
// // // //           <h3 className="font-medium">Pickup Information</h3>
// // // //           <div>
// // // //             <p className="text-sm text-muted-foreground">Location</p>
// // // //             <p>
// // // //               {formData.pickupDetails.locationType === 'warehouse'
// // // //                 ? `Warehouse: ${formData.pickupDetails.warehouseId}`
// // // //                 : `${formData.pickupDetails.address?.line1}, ${formData.pickupDetails.address?.city}`}
// // // //             </p>
// // // //           </div>
// // // //           <div>
// // // //             <p className="text-sm text-muted-foreground">Contact</p>
// // // //             <p>{formData.pickupDetails.contact.name}</p>
// // // //             <p>{formData.pickupDetails.contact.phone}</p>
// // // //           </div>
// // // //         </div>

// // // //         <div className="space-y-4">
// // // //           <h3 className="font-medium">Delivery Information</h3>
// // // //           <div>
// // // //             <p className="text-sm text-muted-foreground">Location</p>
// // // //             <p>
// // // //               {formData.deliveryDetails.locationType === 'warehouse'
// // // //                 ? `Warehouse: ${formData.deliveryDetails.warehouseId}`
// // // //                 : `${formData.deliveryDetails.address?.line1}, ${formData.deliveryDetails.address?.city}`}
// // // //             </p>
// // // //           </div>
// // // //           <div>
// // // //             <p className="text-sm text-muted-foreground">Contact</p>
// // // //             <p>{formData.deliveryDetails.contact.name}</p>
// // // //             <p>{formData.deliveryDetails.contact.phone}</p>
// // // //           </div>
// // // //         </div>

// // // //         <div className="space-y-4">
// // // //           <h3 className="font-medium">Scheduling</h3>
// // // //           <div className="grid grid-cols-2 gap-4">
// // // //             <div>
// // // //               <p className="text-sm text-muted-foreground">Pickup Date</p>
// // // //               <p>{format(formData.scheduledDate, "PPP")}</p>
// // // //             </div>
// // // //             <div>
// // // //               <p className="text-sm text-muted-foreground">Time Window</p>
// // // //               <p>{formData.timeWindow}</p>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         <div className="flex justify-between pt-4">
// // // //           <Button type="button" variant="outline" onClick={onBack}>
// // // //             Back
// // // //           </Button>
// // // //           <Button type="button" onClick={handleSubmit(onSubmit)}>
// // // //             Schedule Pickup
// // // //           </Button>
// // // //         </div>
// // // //       </CardContent>
// // // //     </Card>
// // // //   );
// // // // };

// // // // reviewstep.tsx
// // // // 'use client';

// // // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // // // import { Button } from '@/components/ui/button';
// // // // import { useFormContext } from 'react-hook-form';
// // // // import { PickupFormData } from '@/types/PickupPage';
// // // // import { format } from 'date-fns';

// // // // export const ReviewStep = ({ onSubmit, onBack }: { onSubmit: (data: PickupFormData) => void; onBack: () => void }) => {
// // // //     const { handleSubmit, watch } = useFormContext<PickupFormData>();
// // // //     const formData = watch();

// // // //     // Calculate totals
// // // //     const totalPackages = formData.packages.length;
// // // //     const totalItems = formData.packages.reduce((sum, pkg) => sum + pkg.items.length, 0);
// // // //     const totalWeight = formData.packages.reduce((sum, pkg) => sum + pkg.weight, 0);
// // // //     const totalValue = formData.packages.reduce(
// // // //         (sum, pkg) => sum + pkg.items.reduce((itemSum, item) => itemSum + item.value * item.quantity, 0),
// // // //         0
// // // //     );
// // // //     const mainCurrency = formData.packages[0]?.items[0]?.currency || 'USD';

// // // //     return (
// // // //         <Card>
// // // //             <CardHeader>
// // // //                 <CardTitle>Review & Submit</CardTitle>
// // // //             </CardHeader>
// // // //             <CardContent className="space-y-6">
// // // //                 {/* Package Summary */}
// // // //                 <div className="space-y-4">
// // // //                     <h3 className="font-medium">Shipment Summary</h3>
// // // //                     <div className="grid grid-cols-4 gap-4">
// // // //                         <div>
// // // //                             <p className="text-sm text-muted-foreground">Total Packages</p>
// // // //                             <p className="font-medium">{totalPackages}</p>
// // // //                         </div>
// // // //                         <div>
// // // //                             <p className="text-sm text-muted-foreground">Total Items</p>
// // // //                             <p className="font-medium">{totalItems}</p>
// // // //                         </div>
// // // //                         <div>
// // // //                             <p className="text-sm text-muted-foreground">Total Weight</p>
// // // //                             <p className="font-medium">{totalWeight.toFixed(1)} kg</p>
// // // //                         </div>
// // // //                         <div>
// // // //                             <p className="text-sm text-muted-foreground">Total Value</p>
// // // //                             <p className="font-medium">{mainCurrency} {totalValue.toFixed(2)}</p>
// // // //                         </div>
// // // //                     </div>

// // // //                     {/* Package Types Summary */}
// // // //                     <div>
// // // //                         <p className="text-sm text-muted-foreground">Package Types</p>
// // // //                         <div className="flex gap-2 flex-wrap">
// // // //                             {Array.from(new Set(formData.packages.map(pkg => pkg.packageType))).map(type => (
// // // //                                 <span key={type} className="px-2 py-1 bg-muted rounded-md text-sm capitalize">
// // // //                                     {type}
// // // //                                 </span>
// // // //                             ))}
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>

// // // //                 {/* Pickup Information (unchanged) */}
// // // //                 <div className="space-y-4">
// // // //                     <h3 className="font-medium">Pickup Information</h3>
// // // //                     <div>
// // // //                         <p className="text-sm text-muted-foreground">Location</p>
// // // //                         <p>
// // // //                             {formData.pickupDetails.locationType === 'warehouse'
// // // //                                 ? `Warehouse: ${formData.pickupDetails.warehouseId}`
// // // //                                 : `${formData.pickupDetails.address.line1}, ${formData.pickupDetails.address.city}`}
// // // //                         </p>
// // // //                     </div>
// // // //                     <div>
// // // //                         <p className="text-sm text-muted-foreground">Contact</p>
// // // //                         <p>{formData.pickupDetails.contact.name}</p>
// // // //                         <p>{formData.pickupDetails.contact.phone}</p>
// // // //                     </div>
// // // //                 </div>

// // // //                 {/* Delivery Information (unchanged) */}
// // // //                 <div className="space-y-4">
// // // //                     <h3 className="font-medium">Delivery Information</h3>
// // // //                     <div>
// // // //                         <p className="text-sm text-muted-foreground">Location</p>
// // // //                         <p>
// // // //                             {formData.deliveryDetails.locationType === 'warehouse'
// // // //                                 ? `Warehouse: ${formData.deliveryDetails.warehouseId}`
// // // //                                 : `${formData.deliveryDetails.address.line1}, ${formData.deliveryDetails.address.city}`}
// // // //                         </p>
// // // //                     </div>
// // // //                     <div>
// // // //                         <p className="text-sm text-muted-foreground">Contact</p>
// // // //                         <p>{formData.deliveryDetails.contact.name}</p>
// // // //                         <p>{formData.deliveryDetails.contact.phone}</p>
// // // //                     </div>
// // // //                 </div>

// // // //                 {/* Scheduling (unchanged) */}
// // // //                 <div className="space-y-4">
// // // //                     <h3 className="font-medium">Scheduling</h3>
// // // //                     <div className="grid grid-cols-2 gap-4">
// // // //                         <div>
// // // //                             <p className="text-sm text-muted-foreground">Pickup Date</p>
// // // //                             <p>{format(formData.scheduledDate, "PPP")}</p>
// // // //                         </div>
// // // //                         <div>
// // // //                             <p className="text-sm text-muted-foreground">Time Window</p>
// // // //                             <p>{formData.timeWindow}</p>
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>

// // // //                 {/* Action Buttons */}
// // // //                 <div className="flex justify-between pt-4">
// // // //                     <Button type="button" variant="outline" onClick={onBack}>
// // // //                         Back
// // // //                     </Button>
// // // //                     <Button type="button" onClick={handleSubmit(onSubmit)}>
// // // //                         Schedule Pickup
// // // //                     </Button>
// // // //                 </div>
// // // //             </CardContent>
// // // //         </Card>
// // // //     );
// // // // };

// // // 'use client';

// // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // // import { Button } from '@/components/ui/button';
// // // import { useFormContext } from 'react-hook-form';
// // // // import { calculateShippingCost, calculatePackageShippingCost } from "@/utils/shipping-calculations";
// // // import { PickupFormData } from '@/types/PickupPage';
// // // import { format } from 'date-fns';
// // // import { calculateVolumetricWeight } from '@/utils/unit-conversions';
// // // import { costCalculations } from '@/utils/calculations';
// // // import { Checkbox } from '@/components/ui/checkbox';
// // // import { useState } from 'react';
// // // import { TimeRangeSlider } from '@/components/ui/slider';
// // // export const ReviewStep = ({ onSubmit, onBack }: { onSubmit: (data: PickupFormData) => void; onBack: () => void }) => {
// // //     const { handleSubmit, watch } = useFormContext<PickupFormData>();
// // //     const formData = watch();
// // //     const [checked, setChecked] = useState(false);
// // //     // Calculate totals
// // //     const totalPackages = formData.packages.length;
// // //     const totalItems = formData.items?.length || 0;
// // //     const totalWeight = formData.packages.reduce((sum, pkg) => sum + (pkg.weight || 0), 0);

// // //     // Calculate total value by looking up items through package.itemIds
// // //     const totalValue = formData.packages.reduce((sum, pkg) => {
// // //         if (!pkg.itemIds || !formData.items) return sum;

// // //         const packageItems = formData.items.filter(item =>
// // //             pkg.itemIds.includes(item.id)
// // //         );

// // //         return sum + packageItems.reduce(
// // //             (itemSum, item) => itemSum + (item.value || 0) * (item.quantity || 1),
// // //             0
// // //         );
// // //     }, 0);

// // //     // const shippingCosts = formData.packages.map(pkg => {
// // //     //     const actualWeightKg = pkg.weight || 0;
// // //     //     const volumetricWeightKg = calculateVolumetricWeight(
// // //     //       pkg.dimensions.length || 0,
// // //     //       pkg.dimensions.width || 0,
// // //     //       pkg.dimensions.height || 0
// // //     //     );

// // //     //     return calculateShippingCost({
// // //     //       actualWeightKg,
// // //     //       volumetricWeightKg,
// // //     //       originCountryId: formData.pickupDetails.countryId,
// // //     //       destCountryId: formData.deliveryDetails.countryId,
// // //     //     });
// // //     //   });

// // //     //   // Calculate total shipping cost
// // //     //   const totalShippingCost = shippingCosts.reduce(
// // //     //     (sum, cost) => sum + cost.cost,
// // //     //     0
// // //     //   );

// // //     const shippingCalculations = formData.packages.map(pkg =>
// // //         calculatePackageShippingCost(
// // //             pkg,
// // //             formData.pickupDetails.address.countryId,
// // //             formData.deliveryDetails.address.countryId
// // //         )
// // //     );

// // //     // Calculate totals
// // //     const total = {
// // //         packages: formData.packages.length,
// // //         items: formData.items.length,
// // //         weight: formData.packages.reduce((sum, pkg) => sum + pkg.weight, 0),
// // //         chargeableWeight: shippingCalculations.reduce((sum, calc) => sum + calc.chargeableWeight, 0),
// // //         shippingCost: shippingCalculations.reduce((sum, calc) => sum + calc.cost, 0),
// // //         value: formData.items.reduce((sum, item) => sum + (item.value * item.quantity), 0),
// // //     };

// // //     // const mainCurrency = formData.items?.[0]?.currency || 'USD';
// // //     // const currency = formData.items[0]?.currency || "USD";

// // //     const allCosts = formData.packages.map(pkg => {
// // //         return costCalculations({
// // //             weight: pkg.weight.toString(),
// // //             length: pkg.dimensions.length.toString(),
// // //             width: pkg.dimensions.width.toString(),
// // //             height: pkg.dimensions.height.toString(),
// // //             units: "kg-cm", // Your form already stores metric
// // //             originCountryId: formData.pickupDetails.address.countryId,
// // //             destCountryId: formData.deliveryDetails.address.countryId
// // //         });
// // //     });

// // //     // const totalCost = allCosts.reduce((sum, r) => sum + r.cost, 0);
// // //     // const currency = allCosts[0]?.currency || "$";

// // //     const originCountryId = formData.pickupDetails.address.countryId;
// // //     const destCountryId = formData.deliveryDetails.address.countryId;

// // //     // Debug: Verify we're getting actual numbers
// // //     console.log("Country IDs (raw):", {
// // //         origin: formData.pickupDetails.address.countryId,
// // //         dest: formData.deliveryDetails.address.countryId,
// // //         types: {
// // //             originType: typeof formData.pickupDetails.address.countryId,
// // //             destType: typeof formData.deliveryDetails.address.countryId
// // //         }
// // //     });

// // //     // 2. Calculate costs only if we have valid country IDs
// // //     const shippingResults = formData.packages.map(pkg => {
// // //         return costCalculations({
// // //             weight: pkg.weight.toString(),
// // //             length: pkg.dimensions.length.toString(),
// // //             width: pkg.dimensions.width.toString(),
// // //             height: pkg.dimensions.height.toString(),
// // //             units: "kg-cm",
// // //             originCountryId: Number(originCountryId),
// // //             destCountryId: Number(destCountryId)
// // //         });
// // //     });

// // //     // 3. Debug output (temporary)
// // //     console.log("Country IDs:", { originCountryId, destCountryId });
// // //     console.log("Shipping Results:", shippingResults);

// // //     const totalCost = shippingResults.reduce((sum, r) => sum + r.cost, 0);
// // //     const currency = shippingResults[0]?.currency || "$";


// // //     return (
// // //         // <Card>
// // //         //     <CardHeader>
// // //         //         <CardTitle>Review & Submit</CardTitle>
// // //         //     </CardHeader>
// // //         //     <CardContent className="space-y-6">
// // //         //         {/* Package Summary */}
// // //         //         <div className="space-y-4">
// // //         //             <h3 className="font-medium">Shipment Summary</h3>
// // //         //             <div className="grid grid-cols-4 gap-4">
// // //         //                 <div>
// // //         //                     <p className="text-sm text-muted-foreground">Total Packages</p>
// // //         //                     <p className="font-medium">{totalPackages}</p>
// // //         //                 </div>
// // //         //                 <div>
// // //         //                     <p className="text-sm text-muted-foreground">Total Items</p>
// // //         //                     <p className="font-medium">{totalItems}</p>
// // //         //                 </div>
// // //         //                 <div>
// // //         //                     <p className="text-sm text-muted-foreground">Total Weight</p>
// // //         //                     <p className="font-medium">{totalWeight.toFixed(1)} kg</p>
// // //         //                 </div>
// // //         //                 <div>
// // //         //                     <p className="text-sm text-muted-foreground">Total Value</p>
// // //         //                     <p className="font-medium">{mainCurrency} {totalValue.toFixed(2)}</p>
// // //         //                 </div>
// // //         //             </div>

// // //         //             {/* Package Types Summary */}
// // //         //             <div>
// // //         //                 <p className="text-sm text-muted-foreground">Package Types</p>
// // //         //                 <div className="flex gap-2 flex-wrap">
// // //         //                     {Array.from(new Set(formData.packages.map(pkg => pkg.packageType))).map(type => (
// // //         //                         <span key={type} className="px-2 py-1 bg-muted rounded-md text-sm capitalize">
// // //         //                             {type}
// // //         //                         </span>
// // //         //                     ))}
// // //         //                 </div>
// // //         //             </div>
// // //         //         </div>

// // //         //         {/* Pickup Information */}
// // //         //         <div className="space-y-4">
// // //         //             <h3 className="font-medium">Pickup Information</h3>
// // //         //             <div>
// // //         //                 <p className="text-sm text-muted-foreground">Location</p>
// // //         //                 <p>
// // //         //                     {formData.pickupDetails.locationType === 'warehouse'
// // //         //                         ? `Warehouse: ${formData.pickupDetails.warehouseId}`
// // //         //                         : `${formData.pickupDetails.address.line1}, ${formData.pickupDetails.address.city}`}
// // //         //                 </p>
// // //         //             </div>
// // //         //             <div>
// // //         //                 <p className="text-sm text-muted-foreground">Contact</p>
// // //         //                 <p>{formData.pickupDetails.contact.name}</p>
// // //         //                 <p>{formData.pickupDetails.contact.phone}</p>
// // //         //             </div>
// // //         //         </div>

// // //         //         {/* Delivery Information */}
// // //         //         <div className="space-y-4">
// // //         //             <h3 className="font-medium">Delivery Information</h3>
// // //         //             <div>
// // //         //                 <p className="text-sm text-muted-foreground">Location</p>
// // //         //                 <p>
// // //         //                     {formData.deliveryDetails.locationType === 'warehouse'
// // //         //                         ? `Warehouse: ${formData.deliveryDetails.warehouseId}`
// // //         //                         : `${formData.deliveryDetails.address.line1}, ${formData.deliveryDetails.address.city}`}
// // //         //                 </p>
// // //         //             </div>
// // //         //             <div>
// // //         //                 <p className="text-sm text-muted-foreground">Contact</p>
// // //         //                 <p>{formData.deliveryDetails.contact.name}</p>
// // //         //                 <p>{formData.deliveryDetails.contact.phone}</p>
// // //         //             </div>
// // //         //         </div>

// // //         //         {/* Scheduling */}
// // //         //         <div className="space-y-4">
// // //         //             <h3 className="font-medium">Scheduling</h3>
// // //         //             <div className="grid grid-cols-2 gap-4">
// // //         //                 <div>
// // //         //                     <p className="text-sm text-muted-foreground">Pickup Date</p>
// // //         //                     <p>{format(formData.scheduledDate, "PPP")}</p>
// // //         //                 </div>
// // //         //                 <div>
// // //         //                     <p className="text-sm text-muted-foreground">Time Window</p>
// // //         //                     <p>{formData.timeWindow}</p>
// // //         //                 </div>
// // //         //             </div>
// // //         //         </div>

// // //         //         {/* Action Buttons */}
// // //         //         <div className="flex justify-between pt-4">
// // //         //             <Button type="button" variant="outline" onClick={onBack}>
// // //         //                 Back
// // //         //             </Button>
// // //         //             <Button type="button" onClick={handleSubmit(onSubmit)}>
// // //         //                 Schedule Pickup
// // //         //             </Button>
// // //         //         </div>
// // //         //     </CardContent>
// // //         // </Card>

// // //         <Card>
// // //             <CardHeader>
// // //                 <CardTitle>Review & Submit</CardTitle>
// // //             </CardHeader>
// // //             <CardContent className="space-y-6">
// // //                 {/* Summary Section */}
// // //                 <div className="grid grid-cols-2 gap-4">
// // //                     <div>
// // //                         <p className="text-sm text-muted-foreground">Total Packages</p>
// // //                         <p className="font-medium">{total.packages}</p>
// // //                     </div>
// // //                     <div>
// // //                         <p className="text-sm text-muted-foreground">Total Items</p>
// // //                         <p className="font-medium">{total.items}</p>
// // //                     </div>
// // //                     <div>
// // //                         <p className="text-sm text-muted-foreground">Total Weight</p>
// // //                         <p className="font-medium">{total.weight.toFixed(2)} kg</p>
// // //                     </div>
// // //                     <div>
// // //                         <p className="text-sm text-muted-foreground">Chargeable Weight</p>
// // //                         <p className="font-medium">{total.chargeableWeight.toFixed(2)} kg</p>
// // //                     </div>
// // //                     <div>
// // //                         <p className="text-sm text-muted-foreground">Total Value</p>
// // //                         <p className="font-medium">{currency} {total.value.toFixed(2)}</p>
// // //                     </div>
// // //                     <div>
// // //                         <p className="text-sm text-muted-foreground">Shipping Cost</p>
// // //                         <p className="font-medium">{currency} {total.shippingCost.toFixed(2)}</p>
// // //                         <h3>Shipping Cost: {currency}{totalCost.toFixed(2)}</h3>
// // //                         <h3>Total Cost: {currency}{totalCost.toFixed(2)}</h3>
// // //                     </div>
// // //                 </div>

// // //                 {/* Location Details */}
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                     <div className="space-y-2">
// // //                         <h3 className="font-medium">Pickup Location</h3>
// // //                         <p>
// // //                             {formData.pickupDetails.locationType === 'warehouse'
// // //                                 ? `Warehouse: ${formData.pickupDetails.warehouseId}`
// // //                                 : formData.pickupDetails.address.line1}
// // //                         </p>
// // //                         <p>{formData.pickupDetails.contact.name}</p>
// // //                     </div>

// // //                     <div className="space-y-2">
// // //                         <h3 className="font-medium">Delivery Location</h3>
// // //                         <p>
// // //                             {formData.deliveryDetails.locationType === 'warehouse'
// // //                                 ? `Warehouse: ${formData.deliveryDetails.warehouseId}`
// // //                                 : formData.deliveryDetails.address.line1}
// // //                         </p>
// // //                         <p>{formData.deliveryDetails.contact.name}</p>
// // //                     </div>
// // //                 </div>
// // //                 <div><TimeRangeSlider /></div>
// // //                 <div className="rounded-lg border p-4">
// // //                     <div className="flex items-start">
// // //                         {/* Checkbox with fixed dimensions */}
// // //                         <div className="mr-2 h-5 flex-none">
// // //                             <Checkbox
// // //                                 id="storage-fee-acknowledgement"
// // //                                 checked={checked}
// // //                                 onCheckedChange={() => setChecked(!checked)}
// // //                                 required
// // //                                 className="size-4" // Fixed size
// // //                                 style={{ minWidth: '16px', minHeight: '16px' }} // Double protection
// // //                             />
// // //                         </div>

// // //                         {/* Label with proper text wrapping */}
// // //                         <label
// // //                             htmlFor="storage-fee-acknowledgement"
// // //                             className="text-sm leading-snug text-foreground"
// // //                         >
// // //                             "By providing your phone number, you agree to receive updates about your parcel tracking, delivery issues, and occasional promotions (if opted-in). We respect your privacy—your number will only be used for shipping and store-related communications. View our Terms and Privacy Policy."
// // //                         </label>
// // //                     </div>
// // //                 </div>

// // //                 {/* Action Buttons */}
// // //                 <div className="flex justify-between pt-4">
// // //                     <Button variant="outline" onClick={onBack}>
// // //                         Back
// // //                     </Button>
// // //                     <Button onClick={handleSubmit(onSubmit)} disabled={!checked}>
// // //                         Schedule Pickup
// // //                     </Button>
// // //                 </div>
// // //             </CardContent>
// // //         </Card>
// // //     );
// // // };

// // // 'use client';

// // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // // import { Button } from '@/components/ui/button';
// // // import { useFormContext } from 'react-hook-form';
// // // import { calculateShippingCost, calculatePackageShippingCost } from "@/utils/shipping-calculations";
// // // import { PickupFormData } from '@/types/PickupPage';
// // // import { costCalculations } from '@/utils/calculations';
// // // import { Checkbox } from '@/components/ui/checkbox';
// // // import { useState } from 'react';
// // // import { TimeRangeSlider } from '@/components/ui/slider';
// // // export const ReviewStep = ({ onSubmit, onBack }: { onSubmit: (data: PickupFormData) => void; onBack: () => void }) => {
// // //     const { handleSubmit, watch } = useFormContext<PickupFormData>();
// // //     const formData = watch();
// // //     const [checked, setChecked] = useState(false);
// // //     const shippingCalculations = formData.packages.map(pkg =>
// // //         calculatePackageShippingCost(
// // //             pkg,
// // //             formData.pickupDetails.address.countryId,
// // //             formData.deliveryDetails.address.countryId
// // //         )
// // //     );

// // //     const total = {
// // //         packages: formData.packages.length,
// // //         items: formData.items.length,
// // //         weight: formData.packages.reduce((sum, pkg) => sum + pkg.weight, 0),
// // //         chargeableWeight: shippingCalculations.reduce((sum, calc) => sum + calc.chargeableWeight, 0),
// // //         shippingCost: shippingCalculations.reduce((sum, calc) => sum + calc.cost, 0),
// // //         value: formData.items.reduce((sum, item) => sum + (item.value * item.quantity), 0),
// // //     };

// // //     const originCountryId = formData.pickupDetails.address.countryId;
// // //     const destCountryId = formData.deliveryDetails.address.countryId;

// // //     // Debug: Verify we're getting actual numbers
// // //     console.log("Country IDs (raw):", {
// // //         origin: formData.pickupDetails.address.countryId,
// // //         dest: formData.deliveryDetails.address.countryId,
// // //         types: {
// // //             originType: typeof formData.pickupDetails.address.countryId,
// // //             destType: typeof formData.deliveryDetails.address.countryId
// // //         }
// // //     });
// // //     const shippingResults = formData.packages.map(pkg => {
// // //         return costCalculations({
// // //             weight: pkg.weight.toString(),
// // //             length: pkg.dimensions.length.toString(),
// // //             width: pkg.dimensions.width.toString(),
// // //             height: pkg.dimensions.height.toString(),
// // //             units: "kg-cm",
// // //             originCountryId: Number(originCountryId),
// // //             destCountryId: Number(destCountryId)
// // //         });
// // //     });

// // //     console.log("Country IDs:", { originCountryId, destCountryId });
// // //     console.log("Shipping Results:", shippingResults);

// // //     const totalCost = shippingResults.reduce((sum, r) => sum + r.cost, 0);
// // //     const currency = shippingResults[0]?.currency || "$";


// // //     return (
// // //         <Card>
// // //             <CardHeader>
// // //                 <CardTitle>Review & Submit</CardTitle>
// // //             </CardHeader>
// // //             <CardContent className="space-y-6">
// // //                 {/* Summary Section */}
// // //                 <div className="grid grid-cols-2 gap-4">
// // //                     <div>
// // //                         <p className="text-sm text-muted-foreground">Total Packages</p>
// // //                         <p className="font-medium">{total.packages}</p>
// // //                     </div>
// // //                     <div>
// // //                         <p className="text-sm text-muted-foreground">Total Items</p>
// // //                         <p className="font-medium">{total.items}</p>
// // //                     </div>
// // //                     <div>
// // //                         <p className="text-sm text-muted-foreground">Total Weight</p>
// // //                         <p className="font-medium">{total.weight.toFixed(2)} kg</p>
// // //                     </div>
// // //                     <div>
// // //                         <p className="text-sm text-muted-foreground">Chargeable Weight</p>
// // //                         <p className="font-medium">{total.chargeableWeight.toFixed(2)} kg</p>
// // //                     </div>
// // //                     <div>
// // //                         <p className="text-sm text-muted-foreground">Total Value</p>
// // //                         <p className="font-medium">{currency} {total.value.toFixed(2)}</p>
// // //                     </div>
// // //                     <div>
// // //                         <p className="text-sm text-muted-foreground">Shipping Cost</p>
// // //                         <p className="font-medium">{currency} {total.shippingCost.toFixed(2)}</p>
// // //                         <h3>Shipping Cost: {currency}{totalCost.toFixed(2)}</h3>
// // //                         <h3>Total Cost: {currency}{totalCost.toFixed(2)}</h3>
// // //                     </div>
// // //                 </div>

// // //                 {/* Location Details */}
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                     <div className="space-y-2">
// // //                         <h3 className="font-medium">Pickup Location</h3>
// // //                         <p>
// // //                             {formData.pickupDetails.locationType === 'warehouse'
// // //                                 ? Warehouse : ${formData.pickupDetails.warehouseId}
// // //                                 : formData.pickupDetails.address.line1}
// // //                         </p>
// // //                         <p>{formData.pickupDetails.contact.name}</p>
// // //                     </div>

// // //                     <div className="space-y-2">
// // //                         <h3 className="font-medium">Delivery Location</h3>
// // //                         <p>
// // //                             {formData.deliveryDetails.locationType === 'warehouse'
// // //                                 ? Warehouse : ${formData.deliveryDetails.warehouseId}
// // //                                 : formData.deliveryDetails.address.line1}
// // //                         </p>
// // //                         <p>{formData.deliveryDetails.contact.name}</p>
// // //                     </div>
// // //                 </div>
// // //                 <div><TimeRangeSlider /></div>
// // //                 <div className="rounded-lg border p-4">
// // //                     <div className="flex items-start">
// // //                         {/* Checkbox with fixed dimensions */}
// // //                         <div className="mr-2 h-5 flex-none">
// // //                             <Checkbox
// // //                                 id="storage-fee-acknowledgement"
// // //                                 checked={checked}
// // //                                 onCheckedChange={() => setChecked(!checked)}
// // //                                 required
// // //                                 className="size-4" // Fixed size
// // //                                 style={{ minWidth: '16px', minHeight: '16px' }} // Double protection
// // //                             />
// // //                         </div>

// // //                         {/* Label with proper text wrapping */}
// // //                         <label
// // //                             htmlFor="storage-fee-acknowledgement"
// // //                             className="text-sm leading-snug text-foreground"
// // //                         >
// // //                             "By providing your phone number, you agree to receive updates about your parcel tracking, delivery issues, and occasional promotions (if opted-in). We respect your privacy—your number will only be used for shipping and store-related communications. View our Terms and Privacy Policy."
// // //                         </label>
// // //                     </div>
// // //                 </div>

// // //                 {/* Action Buttons */}
// // //                 <div className="flex justify-between pt-4">
// // //                     <Button variant="outline" onClick={onBack}>
// // //                         Back
// // //                     </Button>
// // //                     <Button onClick={handleSubmit(onSubmit)} disabled={!checked}>
// // //                         Schedule Pickup
// // //                     </Button>
// // //                 </div>
// // //             </CardContent>
// // //         </Card>
// // //     );
// // // };


// 'use client';

// import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
// import { Button } from '../components/ui/button';
// import { useFormContext } from 'react-hook-form';
// import { PickupFormData } from '../types/PickupPage';
// import { Checkbox } from '../components/ui/checkbox';
// import { calculatePackageShippingCost } from '../utils/shipping-calculations';
// import { costCalculations } from '../utils/calculations';
// // import { useState } from 'react';

// export const ReviewStep = ({
//     onBack,
//     actionState,
//     isPending,
// }: {
//     onBack: () => void;
//     actionState: { message: string; error?: string };
//     isPending: boolean;
// }) => {
//     const {
//         // handleSubmit,
//          watch, setValue } = useFormContext<PickupFormData>();
//     const formData = watch();

//     const shippingCalculations = formData.packages.map(pkg =>
//         calculatePackageShippingCost(
//             pkg,
//             formData.pickupDetails.address.countryId,
//             formData.deliveryDetails.address.countryId
//         )
//     );

//     const total = {
//         packages: formData.packages.length,
//         items: formData.items.length,
//         weight: formData.packages.reduce((sum, pkg) => sum + pkg.weight, 0),
//         chargeableWeight: shippingCalculations.reduce((sum, calc) => sum + calc.chargeableWeight, 0),
//         shippingCost: shippingCalculations.reduce((sum, calc) => sum + calc.cost, 0),
//         value: formData.items.reduce((sum, item) => sum + (item.value * item.quantity), 0),
//     };

//     const originCountryId = formData.pickupDetails.address.countryId;
//     const destCountryId = formData.deliveryDetails.address.countryId;

//     const shippingResults = formData.packages.map(pkg =>
//         costCalculations({
//             weight: pkg.weight.toString(),
//             length: pkg.dimensions.length.toString(),
//             width: pkg.dimensions.width.toString(),
//             height: pkg.dimensions.height.toString(),
//             units: "kg-cm",
//             originCountryId: Number(originCountryId),
//             destCountryId: Number(destCountryId)
//         })
//     );

//     const totalCost = shippingResults.reduce((sum, r) => sum + r.cost, 0);
//     const currency = shippingResults[0]?.currency || "$";
//     // const [value, serValue] = useState(false);
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


// //***********************11/6 */

// 'use client';

// import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
// import { Button } from '../components/ui/button';
// import { useFormContext } from 'react-hook-form';
// import {
//     // calculateShippingCost,
//      calculatePackageShippingCost } from "../utils/shipping-calculations";
// import { PickupFormData } from '../types/PickupPage';
// // import { format } from 'date-fns';
// // import { calculateVolumetricWeight } from '@/utils/unit-conversions';
// import { costCalculations } from "../data/calculations";
// import { Checkbox } from '../components/ui/checkbox';
// import { useState } from 'react';
// import { TimeRangeSlider } from '../components/ui/slider';
// export const ReviewStep = ({ onSubmit, onBack }: { onSubmit: (data: PickupFormData) => void; onBack: () => void }) => {
//     const { handleSubmit, watch } = useFormContext<PickupFormData>();
//     const formData = watch();
//     const [checked, setChecked] = useState(false);
//     // Calculate totals
//     // const totalPackages = formData.packages.length;
//     // const totalItems = formData.items?.length || 0;
//     // const totalWeight = formData.packages.reduce((sum, pkg) => sum + (pkg.weight || 0), 0);

//     // Calculate total value by looking up items through package.itemIds
//     // const totalValue = formData.packages.reduce((sum, pkg) => {
//     //     if (!pkg.itemIds || !formData.items) return sum;

//     //     const packageItems = formData.items.filter(item =>
//     //         pkg.itemIds.includes(item.id)
//     //     );

//     //     return sum + packageItems.reduce(
//     //         (itemSum, item) => itemSum + (item.value || 0) * (item.quantity || 1),
//     //         0
//     //     );
//     // }, 0);

//     // const shippingCosts = formData.packages.map(pkg => {
//     //     const actualWeightKg = pkg.weight || 0;
//     //     const volumetricWeightKg = calculateVolumetricWeight(
//     //       pkg.dimensions.length || 0,
//     //       pkg.dimensions.width || 0,
//     //       pkg.dimensions.height || 0
//     //     );

//     //     return calculateShippingCost({
//     //       actualWeightKg,
//     //       volumetricWeightKg,
//     //       originCountryId: formData.pickupDetails.countryId,
//     //       destCountryId: formData.deliveryDetails.countryId,
//     //     });
//     //   });

//     //   // Calculate total shipping cost
//     //   const totalShippingCost = shippingCosts.reduce(
//     //     (sum, cost) => sum + cost.cost,
//     //     0
//     //   );

//     const shippingCalculations = formData.packages.map(pkg =>
//         calculatePackageShippingCost(
//             pkg,
//             formData.pickupDetails.address.countryId,
//             formData.deliveryDetails.address.countryId
//         )
//     );

//     // Calculate totals
//     const total = {
//         packages: formData.packages.length,
//         items: formData.items.length,
//         weight: formData.packages.reduce((sum, pkg) => sum + pkg.weight, 0),
//         chargeableWeight: shippingCalculations.reduce((sum, calc) => sum + calc.chargeableWeight, 0),
//         shippingCost: shippingCalculations.reduce((sum, calc) => sum + calc.cost, 0),
//         value: formData.items.reduce((sum, item) => sum + (item.value * item.quantity), 0),
//     };

//     // const mainCurrency = formData.items?.[0]?.currency || 'USD';
//     // const currency = formData.items[0]?.currency || "USD";

//     // const allCosts = formData.packages.map(pkg => {
//     //     return costCalculations({
//     //         weight: pkg.weight.toString(),
//     //         length: pkg.dimensions.length.toString(),
//     //         width: pkg.dimensions.width.toString(),
//     //         height: pkg.dimensions.height.toString(),
//     //         units: "kg-cm", // Your form already stores metric
//     //         originCountryId: formData.pickupDetails.address.countryId,
//     //         destCountryId: formData.deliveryDetails.address.countryId
//     //     });
//     // });

//     // const totalCost = allCosts.reduce((sum, r) => sum + r.cost, 0);
//     // const currency = allCosts[0]?.currency || "$";

//     const originCountryId = formData.pickupDetails.address.countryId;
//     const destCountryId = formData.deliveryDetails.address.countryId;

//     // Debug: Verify we're getting actual numbers
//     console.log("Country IDs (raw):", {
//         origin: formData.pickupDetails.address.countryId,
//         dest: formData.deliveryDetails.address.countryId,
//         types: {
//             originType: typeof formData.pickupDetails.address.countryId,
//             destType: typeof formData.deliveryDetails.address.countryId
//         }
//     });

//     // 2. Calculate costs only if we have valid country IDs
//     const shippingResults = formData.packages.map(pkg => {
//         return costCalculations({
//             weight: pkg.weight.toString(),
//             length: pkg.dimensions.length.toString(),
//             width: pkg.dimensions.width.toString(),
//             height: pkg.dimensions.height.toString(),
//             units: "kg-cm",
//             originCountryId: Number(originCountryId),
//             destCountryId: Number(destCountryId)
//         });
//     });

//     // 3. Debug output (temporary)
//     console.log("Country IDs:", { originCountryId, destCountryId });
//     console.log("Shipping Results:", shippingResults);

//     const totalCost = shippingResults.reduce((sum, r) => sum + r.cost, 0);
//     const currency = shippingResults[0]?.currency || "$";


//     return (
//         // <Card>
//         //     <CardHeader>
//         //         <CardTitle>Review & Submit</CardTitle>
//         //     </CardHeader>
//         //     <CardContent className="space-y-6">
//         //         {/* Package Summary */}
//         //         <div className="space-y-4">
//         //             <h3 className="font-medium">Shipment Summary</h3>
//         //             <div className="grid grid-cols-4 gap-4">
//         //                 <div>
//         //                     <p className="text-sm text-muted-foreground">Total Packages</p>
//         //                     <p className="font-medium">{totalPackages}</p>
//         //                 </div>
//         //                 <div>
//         //                     <p className="text-sm text-muted-foreground">Total Items</p>
//         //                     <p className="font-medium">{totalItems}</p>
//         //                 </div>
//         //                 <div>
//         //                     <p className="text-sm text-muted-foreground">Total Weight</p>
//         //                     <p className="font-medium">{totalWeight.toFixed(1)} kg</p>
//         //                 </div>
//         //                 <div>
//         //                     <p className="text-sm text-muted-foreground">Total Value</p>
//         //                     <p className="font-medium">{mainCurrency} {totalValue.toFixed(2)}</p>
//         //                 </div>
//         //             </div>

//         //             {/* Package Types Summary */}
//         //             <div>
//         //                 <p className="text-sm text-muted-foreground">Package Types</p>
//         //                 <div className="flex gap-2 flex-wrap">
//         //                     {Array.from(new Set(formData.packages.map(pkg => pkg.packageType))).map(type => (
//         //                         <span key={type} className="px-2 py-1 bg-muted rounded-md text-sm capitalize">
//         //                             {type}
//         //                         </span>
//         //                     ))}
//         //                 </div>
//         //             </div>
//         //         </div>

//         //         {/* Pickup Information */}
//         //         <div className="space-y-4">
//         //             <h3 className="font-medium">Pickup Information</h3>
//         //             <div>
//         //                 <p className="text-sm text-muted-foreground">Location</p>
//         //                 <p>
//         //                     {formData.pickupDetails.locationType === 'warehouse'
//         //                         ? `Warehouse: ${formData.pickupDetails.warehouseId}`
//         //                         : `${formData.pickupDetails.address.line1}, ${formData.pickupDetails.address.city}`}
//         //                 </p>
//         //             </div>
//         //             <div>
//         //                 <p className="text-sm text-muted-foreground">Contact</p>
//         //                 <p>{formData.pickupDetails.contact.name}</p>
//         //                 <p>{formData.pickupDetails.contact.phone}</p>
//         //             </div>
//         //         </div>

//         //         {/* Delivery Information */}
//         //         <div className="space-y-4">
//         //             <h3 className="font-medium">Delivery Information</h3>
//         //             <div>
//         //                 <p className="text-sm text-muted-foreground">Location</p>
//         //                 <p>
//         //                     {formData.deliveryDetails.locationType === 'warehouse'
//         //                         ? `Warehouse: ${formData.deliveryDetails.warehouseId}`
//         //                         : `${formData.deliveryDetails.address.line1}, ${formData.deliveryDetails.address.city}`}
//         //                 </p>
//         //             </div>
//         //             <div>
//         //                 <p className="text-sm text-muted-foreground">Contact</p>
//         //                 <p>{formData.deliveryDetails.contact.name}</p>
//         //                 <p>{formData.deliveryDetails.contact.phone}</p>
//         //             </div>
//         //         </div>

//         //         {/* Scheduling */}
//         //         <div className="space-y-4">
//         //             <h3 className="font-medium">Scheduling</h3>
//         //             <div className="grid grid-cols-2 gap-4">
//         //                 <div>
//         //                     <p className="text-sm text-muted-foreground">Pickup Date</p>
//         //                     <p>{format(formData.scheduledDate, "PPP")}</p>
//         //                 </div>
//         //                 <div>
//         //                     <p className="text-sm text-muted-foreground">Time Window</p>
//         //                     <p>{formData.timeWindow}</p>
//         //                 </div>
//         //             </div>
//         //         </div>

//         //         {/* Action Buttons */}
//         //         <div className="flex justify-between pt-4">
//         //             <Button type="button" variant="outline" onClick={onBack}>
//         //                 Back
//         //             </Button>
//         //             <Button type="button" onClick={handleSubmit(onSubmit)}>
//         //                 Schedule Pickup
//         //             </Button>
//         //         </div>
//         //     </CardContent>
//         // </Card>

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
//                         <p className="font-medium">{currency} {total.shippingCost.toFixed(2)}</p>
//                         <h3>Shipping Cost: {currency}{totalCost.toFixed(2)}</h3>
//                         <h3>Total Cost: {currency}{totalCost.toFixed(2)}</h3>
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
//                 <div><TimeRangeSlider /></div>
//                 <div className="rounded-lg border p-4">
//                     <div className="flex items-start">
//                         {/* Checkbox with fixed dimensions */}
//                         <div className="mr-2 h-5 flex-none">
//                             <Checkbox
//                                 id="storage-fee-acknowledgement"
//                                 checked={checked}
//                                 onCheckedChange={() => setChecked(!checked)}
//                                 required
//                                 className="size-4" // Fixed size
//                                 style={{ minWidth: '16px', minHeight: '16px' }} // Double protection
//                             />
//                         </div>

//                         {/* Label with proper text wrapping */}
//                         <label
//                             htmlFor="storage-fee-acknowledgement"
//                             className="text-sm leading-snug text-foreground"
//                         >
//                             &quot;By providing your phone number, you agree to receive updates about your parcel tracking, delivery issues, and occasional promotions (if opted-in). We respect your privacy—your number will only be used for shipping and store-related communications. View our Terms and Privacy Policy.&quot;
//                         </label>
//                     </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex justify-between pt-4">
//                     <Button variant="outline" onClick={onBack}>
//                         Back
//                     </Button>
//                     <Button onClick={handleSubmit(onSubmit)} disabled={!checked}>
//                         Schedule Pickup
//                     </Button>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// };


// // 'use client';

// // import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
// // import { Button } from '../components/ui/button';
// // import { useFormContext } from 'react-hook-form';
// // import { PickupFormData } from '../types/PickupPage';
// // import { Checkbox } from '../components/ui/checkbox';
// // import { calculatePackageShippingCost } from '../utils/shipping-calculations';
// // import { costCalculations } from "../data/calculations";
// // import { useState } from 'react';

// // export const ReviewStep = ({
// //     onBack,
// //     actionState,
// //     isPending,
// // }: {
// //     onBack: () => void;
// //     actionState: { message: string; error?: string };
// //     isPending: boolean;
// // }) => {
// //     const { handleSubmit, watch, setValue } = useFormContext<PickupFormData>();
// //     const formData = watch();

// //     const shippingCalculations = formData.packages.map(pkg =>
// //         calculatePackageShippingCost(
// //             pkg,
// //             formData.pickupDetails.address.countryId,
// //             formData.deliveryDetails.address.countryId
// //         )
// //     );

// //     const total = {
// //         packages: formData.packages.length,
// //         items: formData.items.length,
// //         weight: formData.packages.reduce((sum, pkg) => sum + pkg.weight, 0),
// //         chargeableWeight: shippingCalculations.reduce((sum, calc) => sum + calc.chargeableWeight, 0),
// //         shippingCost: shippingCalculations.reduce((sum, calc) => sum + calc.cost, 0),
// //         value: formData.items.reduce((sum, item) => sum + (item.value * item.quantity), 0),
// //     };

// //     const originCountryId = formData.pickupDetails.address.countryId;
// //     const destCountryId = formData.deliveryDetails.address.countryId;

// //     const shippingResults = formData.packages.map(pkg =>
// //         costCalculations({
// //             weight: pkg.weight.toString(),
// //             length: pkg.dimensions.length.toString(),
// //             width: pkg.dimensions.width.toString(),
// //             height: pkg.dimensions.height.toString(),
// //             units: "kg-cm",
// //             originCountryId: Number(originCountryId),
// //             destCountryId: Number(destCountryId)
// //         })
// //     );

// //     const totalCost = shippingResults.reduce((sum, r) => sum + r.cost, 0);
// //     const currency = shippingResults[0]?.currency || "$";
// //     const [value, serValue] = useState(false);
// //     return (
// //         <Card>
// //             <CardHeader>
// //                 <CardTitle>Review & Submit</CardTitle>
// //             </CardHeader>
// //             <CardContent className="space-y-6">
// //                 {/* Summary Section */}
// //                 <div className="grid grid-cols-2 gap-4">
// //                     <div>
// //                         <p className="text-sm text-muted-foreground">Total Packages</p>
// //                         <p className="font-medium">{total.packages}</p>
// //                     </div>
// //                     <div>
// //                         <p className="text-sm text-muted-foreground">Total Items</p>
// //                         <p className="font-medium">{total.items}</p>
// //                     </div>
// //                     <div>
// //                         <p className="text-sm text-muted-foreground">Total Weight</p>
// //                         <p className="font-medium">{total.weight.toFixed(2)} kg</p>
// //                     </div>
// //                     <div>
// //                         <p className="text-sm text-muted-foreground">Chargeable Weight</p>
// //                         <p className="font-medium">{total.chargeableWeight.toFixed(2)} kg</p>
// //                     </div>
// //                     <div>
// //                         <p className="text-sm text-muted-foreground">Total Value</p>
// //                         <p className="font-medium">{currency} {total.value.toFixed(2)}</p>
// //                     </div>
// //                     <div>
// //                         <p className="text-sm text-muted-foreground">Shipping Cost</p>
// //                         <p className="font-medium">{currency} {totalCost.toFixed(2)}</p>
// //                     </div>
// //                 </div>

// //                 {/* Location Details */}
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                     <div className="space-y-2">
// //                         <h3 className="font-medium">Pickup Location</h3>
// //                         <p>
// //                             {formData.pickupDetails.locationType === 'warehouse'
// //                                 ? `Warehouse: ${formData.pickupDetails.warehouseId}`
// //                                 : formData.pickupDetails.address.line1}
// //                         </p>
// //                         <p>{formData.pickupDetails.contact.name}</p>
// //                     </div>
// //                     <div className="space-y-2">
// //                         <h3 className="font-medium">Delivery Location</h3>
// //                         <p>
// //                             {formData.deliveryDetails.locationType === 'warehouse'
// //                                 ? `Warehouse: ${formData.deliveryDetails.warehouseId}`
// //                                 : formData.deliveryDetails.address.line1}
// //                         </p>
// //                         <p>{formData.deliveryDetails.contact.name}</p>
// //                     </div>
// //                 </div>

// //                 {/* Call Consent Checkbox (Always Required) */}
// //                 <div className="rounded-lg border p-4">
// //                     <div className="flex items-start">
// //                         <div className="mr-2 h-5 flex-none">
// //                             <Checkbox
// //                                 id="call-consent"
// //                                 checked={formData.acceptCallsForUpdates}
// //                                 onCheckedChange={(checked) => {
// //                                     setValue("acceptCallsForUpdates", checked === true);
// //                                 }}
// //                                 required
// //                                 className="size-4"
// //                                 style={{ minWidth: '16px', minHeight: '16px' }}
// //                             />
// //                         </div>
// //                         <label htmlFor="call-consent" className="text-sm leading-snug text-foreground">
// //                             "By providing your phone number, you agree to receive updates about your parcel tracking..."
// //                         </label>
// //                     </div>
// //                 </div>

// //                 {/* Action Buttons */}
// //                 {actionState.error && (
// //                     <div className="text-red-500 text-sm">{actionState.error}</div>
// //                 )}
// //                 {actionState.message && (
// //                     <div className="text-green-500 text-sm">{actionState.message}</div>
// //                 )}

// //                 <div className="flex justify-between pt-4">
// //                     <Button variant="outline" onClick={onBack} disabled={isPending}>
// //                         Back
// //                     </Button>
// //                     <Button type="submit" disabled={isPending || !formData.acceptCallsForUpdates}>
// //                         {isPending ? "Scheduling..." : "Schedule Pickup"}
// //                     </Button>
// //                 </div>
// //             </CardContent>
// //         </Card>
// //     );
// // };
