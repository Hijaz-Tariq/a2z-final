/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StateSelect } from "react-country-state-city";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { GiCherry, GiJug } from "react-icons/gi";
import { E164Number } from "libphonenumber-js/core";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Button } from "../../../components/ui/button";
import { SuccessAlert } from "../components/successAlert";

interface ParcelFormData {
    sendername: string;
    senderemail: string;
    recipientname: string;
    recipientemail: string;
    oilQuantity: number;
    oliveQuantity: number;
    cost: number;
    date: string;
    note: string;

    // Recipient address state (for delivery)
    recipientState: string;
    recipientAddressLine1: string;
    recipientCity: string;
    recipientZipCode: string;

    // Final station/warehouse state (for internal routing)
    deliveryWarehouseId: string;
    senderAddressLine1: string;
    senderCity: string;
}

interface State {
    id: number;
    name: string;
}

interface Warehouse {
    id: string;
    name: string;
    address: {
        city: string;
        state: string;
    };
}
const EconomyParcel = () => {
    const [formData, setFormData] = useState<ParcelFormData>({
        sendername: "",
        senderemail: "",
        recipientname: "",
        recipientemail: "",
        oilQuantity: 0,
        oliveQuantity: 0,
        cost: 65,
        date: "",
        note: "",
        recipientState: "",
        recipientAddressLine1: "",
        recipientCity: "",
        recipientZipCode: "",
        // deliveryWarehouseId: "",
        deliveryWarehouseId: "",
        senderAddressLine1: "",
        senderCity: "",
    });


    const [senderPhone, setSenderPhone] = useState<E164Number | undefined>(undefined);
    const [recipientPhone, setRecipientPhone] = useState<E164Number | undefined>(undefined);
    const [isPaid, setIsPaid] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const [isLoadingWarehouses, setIsLoadingWarehouses] = useState(true);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [createdPickupId, setCreatedPickupId] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const response = await fetch('/api/warehouses');
                if (response.ok) {
                    const data = await response.json();
                    setWarehouses(data);
                } else {
                    toast.error("Failed to load warehouses");
                }
            } catch (error) {
                console.error('Error fetching warehouses:', error);
                toast.error("Error loading warehouses");
            } finally {
                setIsLoadingWarehouses(false);
            }
        };

        fetchWarehouses();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Calculate total weight (estimate: 1kg per unit)
            const totalWeight = formData.oilQuantity + formData.oliveQuantity;

            // Create items array for oil and olive
            const items = [];
            if (formData.oilQuantity > 0) {
                items.push({
                    description: "زيت",
                    quantity: formData.oilQuantity,
                    value: 200 * formData.oilQuantity,
                    currency: "USD",
                    weight: formData.oilQuantity, // 1kg per oil unit
                });
            }
            if (formData.oliveQuantity > 0) {
                items.push({
                    description: "زيتون",
                    quantity: formData.oliveQuantity,
                    value: 100 * formData.oliveQuantity,
                    currency: "USD",
                    weight: formData.oliveQuantity, // 1kg per olive unit
                });
            }

            const requestData = {
                pickupType: "WAREHOUSE_TRANSFER", // Using the enum value you specified
                isPaid: isPaid,
                pickupDetails: {
                    contact: {
                        name: formData.sendername,
                        phone: senderPhone, // From state
                        email: formData.senderemail || undefined,
                    },
                    // We'll need to handle address for pickup later
                    locationType: "custom", // or "warehouse" - need to decide
                    address: {
                        line1: formData.senderAddressLine1,
                        city: formData.senderCity,
                        state: "PS", // Palestine
                        postalCode: "00000", // Default for Palestine
                        country: "PS",
                    }
                },
                deliveryDetails: {
                    contact: {
                        name: formData.recipientname,
                        phone: recipientPhone, // From state
                        email: formData.recipientemail || undefined,
                    },
                    locationType: "custom", // Changed from warehouse - recipient's home address
                    address: {
                        line1: formData.recipientAddressLine1,
                        city: formData.recipientState,
                        state: formData.recipientState, // From StateSelect
                        postalCode: formData.recipientZipCode, // We need to add this field
                        country: "US", // Default for recipient
                    }// From our warehouse dropdown
                },
                // We'll map packages/items in the next step
                ...(canEdit() && { deliveryWarehouseId: formData.deliveryWarehouseId }),
                packages: [
                    {
                        packageType: "Economy",
                        weight: totalWeight, // Default weight for now
                        dimensions: {
                            length: 30,
                            width: 20,
                            height: 20
                        }, // Default dimensions
                        specialNotes: "Economy parcel - oil and olive products",
                    }
                ],
                items: items,
                scheduledDate: formData.date || new Date().toISOString(),
                specialNotes: formData.note,
                storageFeeAcknowledged: false,
                costCurrency: "USD",
                calculatedCost: totalCost,
                // deliveryWarehouseId: formData.deliveryWarehouseId
            };

            const response = await fetch('/api/pickup/economy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                // toast.success("Economy parcel created successfully!");
                // Reset form (keep your existing reset logic)
                const data = await response.json();
                setCreatedPickupId(data.id);
                setShowSuccessAlert(true);
                setFormData({
                    sendername: "",
                    senderemail: "",
                    recipientname: "",
                    recipientemail: "",
                    oilQuantity: 0,
                    oliveQuantity: 0,
                    cost: 65,
                    date: "",
                    note: "",
                    recipientState: "",
                    recipientAddressLine1: "",
                    recipientCity: "",
                    recipientZipCode: "",
                    // deliveryWarehouseId: "",
                    senderAddressLine1: "",
                    senderCity: "",
                    deliveryWarehouseId: "",
                });
                setSenderPhone(undefined);
                setRecipientPhone(undefined);
                setIsPaid(false);
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || "Failed to create parcel");
            }
        } catch (error) {
            console.error('Error creating parcel:', error);
            toast.error("Error creating parcel");
        } finally {
            setIsSubmitting(false);
        }
    };

    // const generateParcelTrack = (): string => {
    //     const timestamp = new Date().getTime();
    //     return `ECO${timestamp}`;
    // };

    const isState = (obj: any): obj is State => {
        return obj && typeof obj === 'object' && 'id' in obj && 'name' in obj;
    };

    const handleStateChange = (e: unknown) => {
        if (isState(e)) {
            setFormData(prev => ({
                ...prev,
                recipientState: e.name
            }));
        }
    };

    const totalCost = (formData.oilQuantity + formData.oliveQuantity) * formData.cost;
    const { data: session, status } = useSession();
    const userRole = session?.user?.role as Role;

    const canEdit = () => {
        return userRole === Role.ADMIN || userRole === Role.BROKER;
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-md" dir="rtl">
            <h1 className="text-2xl font-bold mb-6">Create Economy Parcel</h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sender Information */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold border-b pb-2">بيانات المرسل</h2>

                    <div>
                        <label className="block text-sm font-medium mb-1">* اسم المرسل</label>
                        <input
                            type="text"
                            name="sendername"
                            value={formData.sendername}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium mb-1">* عنوان المرسل</label>
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                type="text"
                                name="senderAddressLine1"
                                value={formData.senderAddressLine1}
                                onChange={handleChange}
                                placeholder="شارع، القرية "
                                required
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                name="senderCity"
                                value={formData.senderCity}
                                onChange={handleChange}
                                placeholder="المدينة"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">* هاتف المرسل</label>
                        <PhoneInput
                            value={senderPhone}
                            onChange={setSenderPhone}
                            defaultCountry="PS"
                            international
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">ايميل المرسل</label>
                        <input
                            type="email"
                            name="senderemail"
                            value={formData.senderemail}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                {/* Recipient Information */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold border-b pb-2">بيانات المستقبل</h2>

                    <div>
                        <label className="block text-sm font-medium mb-1">اسم المستقبل *</label>
                        <input
                            type="text"
                            name="recipientname"
                            value={formData.recipientname}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium mb-1">عنوان المستقبل *</label>
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                type="text"
                                name="recipientAddressLine1"
                                value={formData.recipientAddressLine1}
                                onChange={handleChange}
                                placeholder="العنوان"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <StateSelect
                                countryid={233}
                                onChange={handleStateChange}
                                value={formData.recipientState}
                                placeHolder={"اختر الولاية"}
                                containerClassName="w-full"
                                inputClassName="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">* هاتف المستقبل</label>
                        <PhoneInput
                            value={recipientPhone}
                            onChange={setRecipientPhone}
                            defaultCountry="US"
                            international
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">ايميل المستقبل</label>
                        <input
                            type="email"
                            name="recipientemail"
                            value={formData.recipientemail}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                </div>

                {/* Product Quantities */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold border-b pb-2">المحتويات</h2>

                    <div className="flex items-center space-x-2">
                        <input
                            type="number"
                            name="oilQuantity"
                            value={formData.oilQuantity}
                            onChange={handleChange}
                            min="0"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <GiJug className="text-2xl" />
                        <span>زيت</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="number"
                            name="oliveQuantity"
                            value={formData.oliveQuantity}
                            onChange={handleChange}
                            min="0"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <GiCherry className="text-2xl" />
                        <span>زيتون</span>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 ">سعر الوحدة</label>
                        <input
                            type="number"
                            name="cost"
                            value={formData.cost}
                            onChange={handleChange}
                            min="0"
                            step="1"
                            className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
                            disabled={!canEdit()}
                        />
                    </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold border-b pb-2">معلومات اضافية</h2>



                    {/* In your "Additional Information" section */}
                    {canEdit() && (
                        <div>
                            <label className="block text-sm font-medium mb-1">المحطة النهائية</label>
                            {isLoadingWarehouses ? (
                                <div className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 animate-pulse">
                                    Loading warehouses...
                                </div>
                            ) : (
                                <select
                                    name="deliveryWarehouseId"
                                    value={formData.deliveryWarehouseId}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">اختر المستودع</option>
                                    {warehouses.map((warehouse) => (
                                        <option key={warehouse.id} value={warehouse.id}>
                                            {warehouse.name} - {warehouse.address.city}, {warehouse.address.state}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-1">تاريخ الاستلام</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">ملاحظات</label>
                        <textarea
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            rows={3}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {!canEdit() ?
                        '' :
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={isPaid}
                                onChange={(e) => setIsPaid(e.target.checked)}
                                className="rounded"
                            />
                            <label>مدفوع</label>
                        </div>
                    }

                    {!canEdit() ?
                        <>
                            <div className="bg-yellow-100 p-3 rounded-md flex justify-between">
                                <strong>المجموع : ${totalCost.toFixed(2)}</strong>
                                <Button> دفع </Button>
                            </div>
                            <h4> ** يمكنك الدفع عبر البطاقات البنكية** </h4>
                        </>
                        : <div className="bg-yellow-100 p-3 rounded-md">
                            <strong>المجموع : ${totalCost.toFixed(2)}</strong>
                        </div>
                    }
                </div>

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition duration-200"
                    >
                        {isSubmitting ? "Creating..." : "Create Economy Parcel"}
                    </button>
                </div>
            </form>
            <SuccessAlert
                open={showSuccessAlert}
                onOpenChange={setShowSuccessAlert}
                pickupId={createdPickupId}
            />
            <ToastContainer />
        </div>
    );
};

export default EconomyParcel;
