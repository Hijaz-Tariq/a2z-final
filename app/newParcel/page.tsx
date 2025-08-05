/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { timeWindowFromDB } from "@/lib/timeWindow";
import { Form } from "../../components/ui/form";
import { StepIndicator } from "../../components/stepIndicator";
import { PackageDetails } from "../../components/PackageDetails";
import { AddressInformationStep } from "../../components/address";
import { ReviewStep } from "../../components/ReviewStep";
import { PickupFormData, pickupFormSchema } from "../../types/PickupPage";
import { v4 as uuidv4 } from "uuid";
// import { useActionState } from "react";
import { pickupAction } from "../../actions/pickupAction";

export default function PickupPage() {
    const initialItemId = uuidv4();
    const initialPackageId = uuidv4();

    const [currentStep, setCurrentStep] = useState(0);
    const steps = ["Package Details", "Address Information", "Review & Submit"];

    const form = useForm<PickupFormData>({
        resolver: zodResolver(pickupFormSchema) as any,
        defaultValues: {
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
                    weight: 0.1,
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
    const [actionState, formAction, isPending] = useActionState(
        pickupAction,
        { message: "", error: "" }
    );

    // Sync form data with hidden input
    useEffect(() => {
        const subscription = form.watch((value) => {
            setFormData(value as PickupFormData);
        });
        return () => subscription.unsubscribe();
    }, [form]);

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
            </Form>
        </div>
    );
}