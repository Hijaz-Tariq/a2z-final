// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { CommercialDocumentUpload } from "../components/upload-button";
// import { ChangeEvent,
//     //  useState 
//     } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
// import { Button } from "../components/ui/button";
// import {
//     FormField,
//     FormControl,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "../components/ui/form";
// import { Input } from "../components/ui/input";
// import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
// import { Checkbox } from "../components/ui/checkbox";
// import { Label } from "../components/ui/label";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "../components/ui/select";
// import { useFormContext } from "react-hook-form";
// import { PickupFormData } from "../types/PickupPage";
// import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input";
// import { CountrySelect, StateSelect } from "react-country-state-city";
// import "../app/styles/react-country-state-city.css";

// interface Country {
//     id: number;
//     name: string;
// }

// interface State {
//     id: number;
//     name: string;
// }

// const AddressSection = ({ type }: { type: "pickup" | "delivery" }) => {
//     const { control, watch, setValue } = useFormContext<PickupFormData>();
//     const locationType = watch(`${type}Details.locationType`);
//     const countryId = watch(`${type}Details.address.countryId`);
//     const countryName = watch(`${type}Details.address.country`);
//     const stateId = watch(`${type}Details.address.stateId`);
//     const stateName = watch(`${type}Details.address.state`);

//     const handleCountryChange = (e: ChangeEvent<HTMLInputElement> | Country) => {
//         if ('id' in e && 'name' in e) {
//             // Country object case
//             const country = e as Country;
//             setValue(`${type}Details.address.country`, country.name);
//             setValue(`${type}Details.address.countryId`, country.id);
//             setValue(`${type}Details.address.state`, '');
//             setValue(`${type}Details.address.stateId`, undefined);
//         } else {
//             // HTML input change case (if needed)
//             // const event = e as ChangeEvent<HTMLInputElement>;
//             // Handle raw input changes if necessary
//         }
//     };

//     const handleStateChange = (e: unknown) => {
//         const state = e as State;
//         if (state?.id) {
//             setValue(`${type}Details.address.state`, state.name);
//             setValue(`${type}Details.address.stateId`, state.id);
//         }
//     };

//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>
//                     {type === "pickup" ? "Origin" : "Destination"} Details
//                 </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//                 <FormField
//                     control={control}
//                     name={`${type}Details.locationType`}
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Location Type</FormLabel>
//                             <RadioGroup
//                                 onValueChange={field.onChange}
//                                 value={field.value}
//                                 className="flex gap-4"
//                             >
//                                 <div className="flex items-center space-x-2">
//                                     <RadioGroupItem value="custom" id={`${type}-custom`} />
//                                     <Label htmlFor={`${type}-custom`}>Custom Address</Label>
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                     <RadioGroupItem value="warehouse" id={`${type}-warehouse`} />
//                                     <Label htmlFor={`${type}-warehouse`}>Our Warehouse</Label>
//                                 </div>
//                             </RadioGroup>
//                         </FormItem>
//                     )}
//                 />

//                 {/* Country/State Selection - Always Visible */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <FormItem>
//                         <FormLabel>
//                             {type === "pickup" ? "Origin" : "Destination"} Country
//                         </FormLabel>
//                         <FormControl>
//                             <CountrySelect
//                                 src="/products"
//                                 onChange={handleCountryChange as any} // Type assertion needed due to complex union type
//                                 placeHolder={countryName || "Select country"}
//                                 containerClassName="w-full"
//                                 inputClassName="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                             />
//                         </FormControl>
//                     </FormItem>
//                     <FormItem>
//                         <FormLabel>
//                             {type === "pickup" ? "Origin" : "Destination"} State
//                         </FormLabel>
//                         <FormControl>
//                             <StateSelect
//                                 countryid={countryId || 0}
//                                 onChange={handleStateChange}
//                                 placeHolder={stateName || "Select state"}
//                                 containerClassName="w-full"
//                                 inputClassName="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                                 disabled={!countryId}
//                             />
//                         </FormControl>
//                     </FormItem>
//                 </div>

//                 {/* Warehouse Selection (Conditional) */}
//                 {locationType === "warehouse" && (
//                     <FormField
//                         control={control}
//                         name={`${type}Details.warehouseId`}
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Select Warehouse</FormLabel>
//                                 <Select
//                                     onValueChange={field.onChange}
//                                     value={field.value}
//                                     disabled={!countryId || !stateId}
//                                 >
//                                     <FormControl>
//                                         <SelectTrigger>
//                                             <SelectValue
//                                                 placeholder={
//                                                     countryId && stateId
//                                                         ? "Select warehouse"
//                                                         : "First select country & state"
//                                                 }
//                                             />
//                                         </SelectTrigger>
//                                     </FormControl>
//                                     <SelectContent>
//                                         {/* In a real app, you would fetch warehouses filtered by country/state */}
//                                         <SelectItem value="warehouse-1">
//                                             Amman Warehouse (Jordan)
//                                         </SelectItem>
//                                         <SelectItem value="warehouse-2">
//                                             New York Warehouse (USA)
//                                         </SelectItem>
//                                         <SelectItem value="warehouse-3">
//                                             Dubai Warehouse (UAE)
//                                         </SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </FormItem>
//                         )}
//                     />
//                 )}

//                 {/* Custom Address Fields (Conditional) */}
//                 {locationType === "custom" && (
//                     <div className="space-y-4">
//                         <FormField
//                             control={control}
//                             name={`${type}Details.address.line1`}
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Address Line 1</FormLabel>
//                                     <FormControl>
//                                         <Input placeholder="Street address" {...field} />
//                                     </FormControl>
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={control}
//                             name={`${type}Details.address.line2`}
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Address Line 2 (Optional)</FormLabel>
//                                     <FormControl>
//                                         <Input placeholder="Apt, suite, etc." {...field} />
//                                     </FormControl>
//                                 </FormItem>
//                             )}
//                         />
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <FormField
//                                 control={control}
//                                 name={`${type}Details.address.city`}
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>City</FormLabel>
//                                         <FormControl>
//                                             <Input {...field} />
//                                         </FormControl>
//                                     </FormItem>
//                                 )}
//                             />
//                             <FormField
//                                 control={control}
//                                 name={`${type}Details.address.postalCode`}
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Postal Code</FormLabel>
//                                         <FormControl>
//                                             <Input {...field} />
//                                         </FormControl>
//                                     </FormItem>
//                                 )}
//                             />
//                         </div>
//                     </div>
//                 )}

//                 {/* Contact Information (Always Visible) */}
//                 <div className="space-y-4">
//                     <h4 className="font-medium">
//                         {type === "pickup" ? "Pickup" : "Delivery"} Contact
//                     </h4>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <FormField
//                             control={control}
//                             name={`${type}Details.contact.name`}
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Name</FormLabel>
//                                     <FormControl>
//                                         <Input placeholder="Contact name" {...field} />
//                                     </FormControl>
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={control}
//                             name={`${type}Details.address.company`}
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Company (Optional)</FormLabel>
//                                     <FormControl>
//                                         <Input placeholder="Company Name" {...field} />
//                                     </FormControl>
//                                 </FormItem>
//                             )}
//                         />
//                     </div>
//                     <FormField
//                         control={control}
//                         name={`${type}Details.contact.phone`}
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Phone</FormLabel>
//                                 <FormControl>
//                                     <PhoneInput
//                                         international
//                                         defaultCountry="US"
//                                         value={field.value ?? ""}
//                                         onChange={field.onChange}
//                                         placeholder="Enter phone number"
//                                         inputComponent={Input} // Assuming your Input component is compatible
//                                     />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                     <FormField
//                         control={control}
//                         name={`${type}Details.contact.email`}
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Email (Optional)</FormLabel>
//                                 <FormControl>
//                                     <Input
//                                         type="email"
//                                         placeholder="contact@example.com"
//                                         {...field}
//                                     />
//                                 </FormControl>
//                             </FormItem>
//                         )}
//                     />
//                     {/* Commercial Document Upload (Conditional) */}
//                     <CommercialDocumentUpload
//                         countryId={countryId}
//                         // type={type}
//                         onUploadComplete={(url) => {
//                             setValue("commercialDocuments", {
//                                 ...(watch("commercialDocuments") || {}),
//                                 [`${type}Document`]: url,
//                             });
//                         }}
//                     />
//                 </div>
//             </CardContent>
//         </Card>
//     );
// };
// export const AddressInformationStep = ({
//     onNext,
//     onBack,
// }: {
//     onNext: () => void;
//     onBack: () => void;
// }) => {
//     const { watch, control } = useFormContext<PickupFormData>();
//     const isDeliveryWarehouse =
//         watch("deliveryDetails.locationType") === "warehouse";
//     // const { formState } = useFormContext<PickupFormData>();

//     // Add these checks
//     const pickupCountryId = watch("pickupDetails.address.countryId");
//     const deliveryCountryId = watch("deliveryDetails.address.countryId");
//     const commercialDocuments = watch("commercialDocuments");

//     const requiresPickupDoc = [106, 169].includes(pickupCountryId);
//     const requiresDeliveryDoc = [106, 169].includes(deliveryCountryId);
//     const hasPickupDoc = commercialDocuments?.pickupDocument;
//     const hasDeliveryDoc = commercialDocuments?.deliveryDocument;

//     const isMissingRequiredDocs =
//         (requiresPickupDoc && !hasPickupDoc) ||
//         (requiresDeliveryDoc && !hasDeliveryDoc);

//     return (
//         <div className="space-y-6">
//             <AddressSection type="pickup" />
//             <AddressSection type="delivery" />

//             {/* Show warning if missing required docs */}
//             {isMissingRequiredDocs && (
//                 <div className="text-red-500 text-sm p-4 border rounded-lg bg-red-50">
//                     Please upload the required commercial documents for the selected countries
//                 </div>
//             )}

//             {/* Storage fee disclosure - Only shown for warehouse destinations */}
//             {isDeliveryWarehouse && (
//                 <FormField
//                     control={control}
//                     name="storageFeeAcknowledged"
//                     render={({ field }) => (
//                         <div className="rounded-lg border p-4">
//                             <div className="flex items-start">
//                                 {/* Checkbox with fixed dimensions */}
//                                 <div className="mr-2 h-5 flex-none">
//                                     <Checkbox
//                                         id="storage-fee-acknowledgement"
//                                         checked={field.value}
//                                         onCheckedChange={field.onChange}
//                                         required
//                                         className="size-4" // Fixed size
//                                         style={{ minWidth: "16px", minHeight: "16px" }} // Double protection
//                                     />
//                                 </div>

//                                 {/* Label with proper text wrapping */}
//                                 <label
//                                     htmlFor="storage-fee-acknowledgement"
//                                     className="text-sm leading-snug text-foreground"
//                                 >
//                                     *&quot;Need extra storage? First 15 days free, then
//                                     $20/box/month.&quot;*
//                                 </label>
//                             </div>
//                         </div>
//                     )}
//                 />
//             )}
//             <div className="flex justify-between pt-4">
//                 <Button type="button" variant="outline" onClick={onBack}>
//                     Back
//                 </Button>
//                 <Button
//                     type="button"
//                     onClick={onNext}
//                     disabled={isDeliveryWarehouse && !watch("storageFeeAcknowledged")}
//                 >
//                     Next
//                 </Button>
//             </div>
//         </div>
//     );
// };


/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FileUpload } from "./upload-button";
import { ChangeEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import { useFormContext } from "react-hook-form";
import { PickupFormData } from '../utils/shipping-calculations'
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { CountrySelect, StateSelect } from "react-country-state-city";
import "../app/styles/react-country-state-city.css";

interface Country {
    id: number;
    name: string;
}

interface State {
    id: number;
    name: string;
}

const AddressSection = ({ type }: { type: "pickup" | "delivery" }) => {
    const { control, watch, setValue } = useFormContext<PickupFormData>();
    const locationType = watch(`${type}Details.locationType`);
    const countryId = watch(`${type}Details.address.countryId`);
    const countryName = watch(`${type}Details.address.country`);
    const stateId = watch(`${type}Details.address.stateId`);
    const stateName = watch(`${type}Details.address.state`);

    const handleCountryChange = (e: ChangeEvent<HTMLInputElement> | Country) => {
        if ('id' in e && 'name' in e) {
            const country = e as Country;
            setValue(`${type}Details.address.country`, country.name);
            setValue(`${type}Details.address.countryId`, country.id);
            setValue(`${type}Details.address.state`, '');
            setValue(`${type}Details.address.stateId`, undefined);
        }
    };

    const handleStateChange = (e: unknown) => {
        const state = e as State;
        if (state?.id) {
            setValue(`${type}Details.address.state`, state.name);
            setValue(`${type}Details.address.stateId`, state.id);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {type === "pickup" ? "Origin" : "Destination"} Details
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <FormField
                    control={control}
                    name={`${type}Details.locationType`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location Type</FormLabel>
                            <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex gap-4"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="custom" id={`${type}-custom`} />
                                    <Label htmlFor={`${type}-custom`}>Custom Address</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="warehouse" id={`${type}-warehouse`} />
                                    <Label htmlFor={`${type}-warehouse`}>Our Warehouse</Label>
                                </div>
                            </RadioGroup>
                        </FormItem>
                    )}
                />

                {/* Country/State Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormItem>
                        <FormLabel>
                            {type === "pickup" ? "Origin" : "Destination"} Country
                        </FormLabel>
                        <FormControl>
                            <CountrySelect
                                src="/products"
                                onChange={handleCountryChange as any}
                                placeHolder={countryName || "Select country"}
                                containerClassName="w-full"
                                inputClassName="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </FormControl>
                    </FormItem>
                    <FormItem>
                        <FormLabel>
                            {type === "pickup" ? "Origin" : "Destination"} State
                        </FormLabel>
                        <FormControl>
                            <StateSelect
                                countryid={countryId || 0}
                                onChange={handleStateChange}
                                placeHolder={stateName || "Select state"}
                                containerClassName="w-full"
                                inputClassName="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                disabled={!countryId}
                            />
                        </FormControl>
                    </FormItem>
                </div>

                {/* Warehouse Selection */}
                {locationType === "warehouse" && (
                    <FormField
                        control={control}
                        name={`${type}Details.warehouseId`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select Warehouse</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    disabled={!countryId || !stateId}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder={
                                                    countryId && stateId
                                                        ? "Select warehouse"
                                                        : "First select country & state"
                                                }
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="warehouse-1">
                                            Amman Warehouse (Jordan)
                                        </SelectItem>
                                        <SelectItem value="warehouse-2">
                                            New York Warehouse (USA)
                                        </SelectItem>
                                        <SelectItem value="warehouse-3">
                                            Dubai Warehouse (UAE)
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                )}

                {/* Custom Address Fields */}
                {locationType === "custom" && (
                    <div className="space-y-4">
                        <FormField
                            control={control}
                            name={`${type}Details.address.line1`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address Line 1</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Street address" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name={`${type}Details.address.line2`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address Line 2 (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Apt, suite, etc." {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={control}
                                name={`${type}Details.address.city`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name={`${type}Details.address.postalCode`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Postal Code</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                )}

                {/* Contact Information */}
                <div className="space-y-4">
                    <h4 className="font-medium">
                        {type === "pickup" ? "Pickup" : "Delivery"} Contact
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={control}
                            name={`${type}Details.contact.name`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contact name" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name={`${type}Details.address.company`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Company Name" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={control}
                        name={`${type}Details.contact.phone`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <PhoneInput
                                        international
                                        defaultCountry="US"
                                        value={field.value ?? ""}
                                        onChange={field.onChange}
                                        placeholder="Enter phone number"
                                        inputComponent={Input}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name={`${type}Details.contact.email`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email (Optional)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="contact@example.com"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Commercial Document Upload */}
                    {/* {[106, 169].includes(countryId) && (
            <FileUpload
              endpoint="commercialDocument"
              onUploadComplete={(url) => {
                setValue("commercialDocuments", {
                  ...(watch("commercialDocuments") || {}),
                  [`${type}Document`]: url,
                });
              }}
              label="Commercial Document (Required)"
              required={true}
              countryId={countryId}
            />
          )} */}
                    {[106, 169].includes(countryId) && (
                        // <FileUpload
                        //     endpoint="commercialDocument"
                        //     onUploadComplete={(url) => {
                        //         // Ensure we only use the first URL if multiple are returned
                        //         const documentUrl = Array.isArray(url) ? url[0] : url;
                        //         setValue("commercialDocuments", {
                        //             ...(watch("commercialDocuments") || {}),
                        //             [`${type}Document`]: documentUrl,
                        //         });
                        //         console.log(url)
                        //     }}
                        //     label="Commercial Document (Required)"
                        //     required={true}
                        //     countryId={countryId}
                        //     // multiple={false} // Explicitly set to false for single file upload
                        // />
                        <FileUpload
                            endpoint="commercialDocument"
                            onUploadComplete={(url) => {
                                // Get just the URL string (handle both array and string cases)
                                const documentUrl = Array.isArray(url) ? url[0] : url;

                                // Set the URL directly in the form field
                                setValue(
                                    `commercialDocuments.${type}Document`,
                                    documentUrl);

                                console.log("Stored URL:", documentUrl);
                            }}
                            label="Commercial Document (Required)"
                            required={true}
                            countryId={countryId}
                            multiple={false}
                        />
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export const AddressInformationStep = ({
    onNext,
    onBack,
}: {
    onNext: () => void;
    onBack: () => void;
}) => {
    const { watch, control } = useFormContext<PickupFormData>();
    const isDeliveryWarehouse =
        watch("deliveryDetails.locationType") === "warehouse";
    const pickupCountryId = watch("pickupDetails.address.countryId");
    const deliveryCountryId = watch("deliveryDetails.address.countryId");
    const commercialDocuments = watch("commercialDocuments");

    const requiresPickupDoc = [106, 169].includes(pickupCountryId);
    const requiresDeliveryDoc = [106, 169].includes(deliveryCountryId);
    const hasPickupDoc = commercialDocuments?.pickupDocument;
    const hasDeliveryDoc = commercialDocuments?.deliveryDocument;

    const isMissingRequiredDocs =
        (requiresPickupDoc && !hasPickupDoc) ||
        (requiresDeliveryDoc && !hasDeliveryDoc);

    return (
        <div className="space-y-6">
            <AddressSection type="pickup" />
            <AddressSection type="delivery" />

            {isMissingRequiredDocs && (
                <div className="text-red-500 text-sm p-4 border rounded-lg bg-red-50">
                    Please upload the required commercial documents for the selected countries
                </div>
            )}

            {isDeliveryWarehouse && (
                <FormField
                    control={control}
                    name="storageFeeAcknowledged"
                    render={({ field }) => (
                        <div className="rounded-lg border p-4">
                            <div className="flex items-start">
                                <div className="mr-2 h-5 flex-none">
                                    <Checkbox
                                        id="storage-fee-acknowledgement"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        required
                                        className="size-4"
                                    />
                                </div>
                                <label
                                    htmlFor="storage-fee-acknowledgement"
                                    className="text-sm leading-snug text-foreground"
                                >
                                    *&quot;Need extra storage? First 15 days free, then $20/box/month.&quot;*
                                </label>
                            </div>
                        </div>
                    )}
                />
            )}
            <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={onBack}>
                    Back
                </Button>
                <Button
                    type="button"
                    onClick={onNext}
                    disabled={isDeliveryWarehouse && !watch("storageFeeAcknowledged")}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};