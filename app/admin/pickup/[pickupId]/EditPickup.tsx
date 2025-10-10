/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo } from "react";
import { ShippingStatus, PickupType } from "@prisma/client";

interface PickupUpdatePayload {
    status: ShippingStatus;
    type: PickupType;
    scheduledDate: string;
    timeWindow: string;
    pickupDetails: {
        contact: {
            name: string;
            phone: string;
            email: string;
        };
    };
    // Make createTracking optional
    createTracking?: {
        carrier: string;
        status: ShippingStatus;
    };
}

interface PickupContact {
    name: string;
    phone: string;
    email: string;
}

// interface PickupTimeWindow {
//     start: string;
//     end: string;
// }

interface PickupShippingTracking {
    trackingNumber: string;
}

interface PickupWithRelations {
    id: string;
    status: ShippingStatus;
    type: PickupType;
    scheduledDate: string;
    timeWindow: string | null;
    pickupContact: PickupContact;
    ShippingTracking: PickupShippingTracking[];
}

export default function EditPickup({ pickup }: { pickup: PickupWithRelations }) {
    // Original data for comparison
    const originalData = useMemo(() => ({
        status: pickup?.status || ShippingStatus.PENDING,
        type: pickup?.type || PickupType.OUTBOUND_SHIPMENT,
        scheduledDate: pickup?.scheduledDate
            ? new Date(pickup.scheduledDate).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0],
        timeWindow: {
            start: pickup?.timeWindow?.split("-")[0] || "09:00",
            end: pickup?.timeWindow?.split("-")[1] || "17:00",
        },
        pickupDetails: {
            contact: {
                name: pickup?.pickupContact?.name || "",
                phone: pickup?.pickupContact?.phone || "",
                email: pickup?.pickupContact?.email || "",
            },
        },
    }), [pickup]);

    // Form state
    const [formData, setFormData] = useState(originalData);
    const [hasChanges, setHasChanges] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // Get tracking number from pickup or set as empty if none exists
    const trackingNumber = pickup?.ShippingTracking?.[0]?.trackingNumber || "";

    // Check for changes and if status changed from PENDING
    useEffect(() => {
        const hasDifferences =
            formData.status !== originalData.status ||
            formData.type !== originalData.type ||
            formData.scheduledDate !== originalData.scheduledDate ||
            formData.timeWindow.start !== originalData.timeWindow.start ||
            formData.timeWindow.end !== originalData.timeWindow.end ||
            formData.pickupDetails.contact.name !== originalData.pickupDetails.contact.name ||
            formData.pickupDetails.contact.phone !== originalData.pickupDetails.contact.phone ||
            formData.pickupDetails.contact.email !== originalData.pickupDetails.contact.email;

        setHasChanges(hasDifferences);
    }, [formData, originalData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            // Handle nested properties
            const keys = name.split('.');
            setFormData(prev => {
                const newState = { ...prev };
                let current: any = newState;

                for (let i = 0; i < keys.length - 1; i++) {
                    // Type assertion to allow proper access to nested properties
                    if (current[keys[i]] === undefined || current[keys[i]] === null) {
                        current[keys[i]] = {};
                    }
                    current[keys[i]] = { ...current[keys[i]] };
                    current = current[keys[i]];
                }
                current[keys[keys.length - 1]] = value;
                return newState;
            });
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleTimeWindowChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            timeWindow: {
                ...prev.timeWindow,
                [field]: value
            }
        }));
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!hasChanges) return;

        setLoading(true);
        setSuccessMessage("");

        try {
            // Check if status is changing from PENDING to something else
            const isStatusChangingFromPending =
                originalData.status === ShippingStatus.PENDING &&
                formData.status !== ShippingStatus.PENDING &&
                !pickup?.ShippingTracking?.length;

            // Prepare the payload with proper typing
            const payload: PickupUpdatePayload = {
                status: formData.status,
                type: formData.type,
                scheduledDate: formData.scheduledDate,
                timeWindow: `${formData.timeWindow.start}-${formData.timeWindow.end}`,
                pickupDetails: {
                    contact: {
                        name: formData.pickupDetails.contact.name,
                        phone: formData.pickupDetails.contact.phone,
                        email: formData.pickupDetails.contact.email,
                    }
                }
            };

            // If status is changing from PENDING, include tracking info
            if (isStatusChangingFromPending) {
                payload.createTracking = {
                    carrier: "INTERNAL",
                    status: formData.status
                };
            }

            const response = await fetch(`/api/admin/pickups/${pickup.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const responseData = await response.json();
                const newTrackingNumber = responseData?.trackingNumber ||
                    (responseData.ShippingTracking?.[0]?.trackingNumber || null);

                if (newTrackingNumber) {
                    setSuccessMessage(`Pickup updated successfully! New tracking #: ${newTrackingNumber}`);
                } else {
                    setSuccessMessage("Pickup updated successfully!");
                }

                // Update original data to reflect changes
                setFormData(prev => ({
                    ...prev,
                    status: formData.status
                }));
                setHasChanges(false);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update pickup");
            }
        } catch (error) {
            console.error("Error updating pickup:", error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            setSuccessMessage(`Error: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    // Get enum values for dropdowns
    const shippingStatusOptions = Object.values(ShippingStatus);
    const pickupTypeOptions = Object.values(PickupType);

    // Check if we need to show a message about tracking number generation
    const willGenerateTracking =
        originalData.status === ShippingStatus.PENDING &&
        formData.status !== ShippingStatus.PENDING &&
        !pickup?.ShippingTracking?.length;

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
            <div className="border-b pb-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Edit Pickup</h2>
                <p className="text-sm text-gray-600">Admin Panel - Only modified fields can be saved</p>
            </div>

            {/* Success/Error Message */}
            {successMessage && (
                <div className={`p-3 rounded-md text-sm font-medium ${successMessage.includes("Error")
                    ? "bg-red-100 text-red-800 border border-red-200"
                    : "bg-green-100 text-green-800 border border-green-200"
                    }`}>
                    {successMessage}
                </div>
            )}

            {/* Tracking Number */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Track#:</label>
                <div className="relative">
                    <input
                        type="text"
                        value={trackingNumber || "Not assigned yet"}
                        readOnly
                        className={`w-full px-3 py-2 ${trackingNumber
                            ? "bg-gray-50 border border-gray-300"
                            : "bg-yellow-50 border border-yellow-300"
                            } rounded-md text-gray-700 cursor-not-allowed`}
                    />
                    {!trackingNumber && (
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                Not assigned
                            </span>
                        </div>
                    )}
                </div>
                {willGenerateTracking && !trackingNumber && (
                    <p className="text-xs text-blue-600 mt-1">
                        ✨ A tracking number will be automatically generated when you save this change
                    </p>
                )}
            </div>

            {/* Scheduled Date */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Scheduled Date:</label>
                <input
                    type="date"
                    name="scheduledDate"
                    value={formData.scheduledDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Pickup Status */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Pickup Status:</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {shippingStatusOptions.map((status) => (
                        <option key={status} value={status}>
                            {status.replace('_', ' ').replace(/([A-Z])/g, ' $1').trim()}
                        </option>
                    ))}
                </select>
                {originalData.status === ShippingStatus.PENDING && formData.status !== ShippingStatus.PENDING && !pickup?.ShippingTracking?.length && (
                    <p className="text-xs text-green-600 mt-1">
                        ✅ Changing from PENDING will generate a tracking number
                    </p>
                )}
            </div>

            {/* Pickup Type */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Pickup Type:</label>
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {pickupTypeOptions.map((type) => (
                        <option key={type} value={type}>
                            {type.replace('_', ' ').replace(/([A-Z])/g, ' $1').trim()}
                        </option>
                    ))}
                </select>
            </div>

            {/* Time Window */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Time Window:</label>
                <div className="flex gap-4">
                    <input
                        type="time"
                        placeholder="Start"
                        value={formData.timeWindow.start}
                        onChange={(e) => handleTimeWindowChange('start', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="time"
                        placeholder="End"
                        value={formData.timeWindow.end}
                        onChange={(e) => handleTimeWindowChange('end', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Pickup Contact */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">Pickup Contact</h3>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Name:</label>
                        <input
                            type="text"
                            name="pickupDetails.contact.name"
                            value={formData.pickupDetails.contact.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Phone:</label>
                        <input
                            type="text"
                            name="pickupDetails.contact.phone"
                            value={formData.pickupDetails.contact.phone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            name="pickupDetails.contact.email"
                            value={formData.pickupDetails.contact.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="pt-4">
                <button
                    type="submit"
                    disabled={!hasChanges || loading}
                    className={`w-full py-3 px-4 rounded-md font-medium text-white transition-all duration-200 ${!hasChanges
                        ? 'bg-gray-300 cursor-not-allowed'
                        : loading
                            ? 'bg-blue-400 cursor-wait'
                            : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                        }`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                        </span>
                    ) : hasChanges ? (
                        willGenerateTracking ? (
                            "Save Changes & Generate Tracking"
                        ) : (
                            "Save Changes"
                        )
                    ) : (
                        "No changes to save"
                    )}
                </button>
                {hasChanges && (
                    <p className="mt-2 text-xs text-gray-500 text-center">
                        {willGenerateTracking ? "⚠️ This will generate a tracking number" : "You have unsaved changes"}
                    </p>
                )}
            </div>
        </form>
    );
}
