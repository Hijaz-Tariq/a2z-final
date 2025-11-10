/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShippingStatus, PickupType } from "@prisma/client";
// import { timeWindowFromDB } from "@/lib/timeWindow";
import { Form } from "../../components/ui/form";
import { StepIndicator } from "../../components/stepIndicator";
import { PackageDetails } from "../../components/PackageDetails";
import { AddressInformationStep } from "../../components/address";
import { ReviewStep } from "../../components/ReviewStep";
import { PickupFormData, pickupFormSchema } from "../../utils/shipping-calculations";
import { v4 as uuidv4 } from "uuid";
// import { useActionState } from "react";
import { pickupAction } from "../../actions/pickupAction";
import { SuccessAlert } from "./components/successAlert";
import { COUNTRY_CODE_TO_ID } from "@/lib/countryMapping";

export default function PickupPage() {
    const initialItemId = uuidv4();
    const initialPackageId = uuidv4();

    const [currentStep, setCurrentStep] = useState(0);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const steps = ["Package Details", "Address Information", "Review & Submit"];

    const form = useForm<PickupFormData>({
        resolver: zodResolver(pickupFormSchema) as any,
        defaultValues: {
            status: ShippingStatus.PENDING,
            type: PickupType.OUTBOUND_SHIPMENT,
            items: [
                {
                    id: initialItemId,
                    description: "",
                    quantity: 1,
                    value: 0,
                    currency: "USD",
                    hsCode: "",
                },
            ],
            packages: [
                {
                    id: initialPackageId,
                    packageType: "parcel",
                    weight: 1,
                    dimensions: { length: 1, width: 1, height: 1 },
                    itemIds: [initialItemId],
                    specialNotes: "",
                },
            ],
            pickupDetails: {
                locationType: "custom",
                warehouseId: "",
                address: {
                    line1: "",
                    line2: "",
                    company: "without",
                    city: "",
                    state: "",
                    postalCode: "",
                    country: "US",
                    countryId: 233,
                    stateId: undefined,
                },
                contact: { name: "", phone: "", email: "" },
            },
            deliveryDetails: {
                locationType: "custom",
                warehouseId: "",
                address: {
                    line1: "",
                    line2: "",
                    company: "without",
                    city: "",
                    state: "",
                    postalCode: "",
                    country: "US",
                    countryId: 233,
                    stateId: undefined,
                },
                contact: { name: "", phone: "", email: "" },
            },
            // pickupDate: new Date(), // Default to today
            timeWindow: {
                start: "09:00",
                end: "17:00",
            },
            storageFeeAcknowledged: false,
            acceptCallsForUpdates: false,
            scheduledDate: new Date(),
            // timeWindow: "morning",
        },
    });

    // Use Server Action + useActionState
    const [formData, setFormData] = useState<PickupFormData>(form.getValues());
    const [actionState, formAction, isPending,] = useActionState(
        pickupAction,
        { message: "", error: "" }
        // { message: "", error: "", paymentUrl: "" }
    );

    // Sync form data with hidden input
    useEffect(() => {
        const subscription = form.watch((value) => {
            setFormData(value as PickupFormData);
        });
        return () => subscription.unsubscribe();
    }, [form]);
    useEffect(() => {
        if (actionState.message && !actionState.error) {
            setShowSuccessAlert(true);
        }
    }, [actionState]);

    console.log('RAW FORM DATA packages:', formData.packages);
    console.log('Package 0 type:', typeof formData.packages[0].weight);
    console.log('Package 0 dimensions type:', typeof formData.packages[0].dimensions.length);
    // useEffect(() => {
    //     if (actionState.paymentUrl) {
    //         window.location.href = actionState.paymentUrl;
    //     }
    // }, [actionState.paymentUrl]);

    useEffect(() => {
        const prefillData = localStorage.getItem('prefillParcelData');
        if (prefillData) {
            try {
                const { role, customer } = JSON.parse(prefillData);

                if (role === 'sender') {
                    form.setValue('pickupDetails.contact.name', customer.name);
                    form.setValue('pickupDetails.contact.phone', customer.phone);
                    form.setValue('pickupDetails.contact.email', customer.email || '');
                    // if (customer.address) {
                    //     form.setValue('pickupDetails.address.line1', customer.address.line1 || '');
                    //     form.setValue('pickupDetails.address.city', customer.address.city || '');
                    //     form.setValue('pickupDetails.address.state', customer.address.state || '');
                    //     form.setValue('pickupDetails.address.postalCode', customer.address.postalCode || '');
                    //     form.setValue('pickupDetails.address.country', customer.address.country || 'US');
                    //     form.setValue('pickupDetails.locationType', 'custom');
                    // }
                    if (customer.address) {
                        const countryId = COUNTRY_CODE_TO_ID[customer.address.country] || 233; // fallback to US (233)
                        const type = 'pickup'
                        // Set BOTH country name AND country ID
                        form.setValue(`${type}Details.address.country`, customer.address.country);
                        form.setValue(`${type}Details.address.countryId`, countryId);

                        // Set state fields (if you have state mapping)
                        form.setValue(`${type}Details.address.state`, customer.address.state);
                        // form.setValue(`${type}Details.address.stateId`, ...); // optional

                        // Set other fields
                        form.setValue(`${type}Details.address.line1`, customer.address.line1);
                        form.setValue(`${type}Details.address.city`, customer.address.city);
                        form.setValue(`${type}Details.address.postalCode`, customer.address.postalCode);
                        form.setValue(`${type}Details.locationType`, 'custom');
                    }
                } else {
                    form.setValue('deliveryDetails.contact.name', customer.name);
                    form.setValue('deliveryDetails.contact.phone', customer.phone);
                    form.setValue('deliveryDetails.contact.email', customer.email || '');
                    if (customer.address) {
                        const countryId = COUNTRY_CODE_TO_ID[customer.address.country] || 233; // fallback to US (233)
                        const type = 'delivery'
                        // Set BOTH country name AND country ID
                        form.setValue(`${type}Details.address.country`, customer.address.country);
                        form.setValue(`${type}Details.address.countryId`, countryId);

                        // Set state fields (if you have state mapping)
                        form.setValue(`${type}Details.address.state`, customer.address.state);
                        // form.setValue(`${type}Details.address.stateId`, ...); // optional

                        // Set other fields
                        form.setValue(`${type}Details.address.line1`, customer.address.line1);
                        form.setValue(`${type}Details.address.city`, customer.address.city);
                        form.setValue(`${type}Details.address.postalCode`, customer.address.postalCode);
                        form.setValue(`${type}Details.locationType`, 'custom');
                    }
                }
            } catch (e) {
                console.error('Failed to parse prefill data', e);
            }
            localStorage.removeItem('prefillParcelData');
        }
    }, [form]); // ✅ Fixed: added `form` to deps

    return (
        <div className="max-w-4xl mx-auto py-4">
            <StepIndicator steps={steps} currentStep={currentStep} />
            <Form {...form}>
                <form action={formAction} className="space-y-6">
                    <input
                        type="hidden"
                        name="jsonData"
                        value={JSON.stringify(formData, (key, value) =>
                            value instanceof Date ? value.toISOString() : value
                        )}
                    />

                    {currentStep === 0 && (
                        <PackageDetails onNext={() => setCurrentStep(1)} />
                    )}
                    {currentStep === 1 && (
                        <AddressInformationStep
                            onNext={() => setCurrentStep(2)}
                            onBack={() => setCurrentStep(0)}
                        />
                    )}
                    {currentStep === 2 && (
                        <ReviewStep
                            onBack={() => setCurrentStep(1)}
                            actionState={actionState}
                            isPending={isPending}
                        />
                    )}
                </form>
                <SuccessAlert
                    open={showSuccessAlert}
                    onOpenChange={setShowSuccessAlert}
                    pickupId={actionState.pickupId}
                    formData={formData}
                />
            </Form>
        </div>
    );
}