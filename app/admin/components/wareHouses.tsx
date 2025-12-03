/* eslint-disable @typescript-eslint/no-unused-vars */
// components/admin/warehouses-page.tsx (or your current file)

'use client';

import router from "next/router";
import { useState, useEffect } from "react";
import { WarehousesList } from "./warehousesList";
import { WarehouseForm } from "./wareHousesForm";
import { Warehouse } from '@/types/warehouse';

export default function WareHousesPage() {
    const [showForm, setShowForm] = useState(false);
    const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null);
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [viewingShipments, setViewingShipments] = useState<Warehouse | null>(null);
    // ✅ Fetch warehouses
    const fetchWarehouses = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/admin/warehouses');
            if (response.ok) {
                const data = await response.json();
                setWarehouses(data);
            } else {
                setError('Failed to load warehouses');
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Error loading warehouses');
        } finally {
            setLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        fetchWarehouses();
    }, []);

    // Handlers
    const handleAddNew = () => {
        setEditingWarehouse(null);
        setShowForm(true);
    };

    const handleEdit = (warehouse: Warehouse) => {
        setEditingWarehouse(warehouse);
        setShowForm(true);
    };

  const handleViewShipments = (warehouse: Warehouse) => {
    router.push(`/admin/warehouses/${warehouse.id}/shipments`);
};

    const handleSuccess = () => {
        setShowForm(false);
        setEditingWarehouse(null);
        fetchWarehouses(); // ✅ Refetch instead of reload
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingWarehouse(null);
    };

    const handleDeleted = () => {
        setShowForm(false);
        setEditingWarehouse(null);
        fetchWarehouses(); // ✅ Refetch after delete
    };

    if (showForm) {
        return (
            <div className="container mx-auto py-6">
                {/* ✅ Add Back Button */}
                <button
                    type="button"
                    onClick={handleCancel}
                    className="mb-4 text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                    ← Back to Warehouses
                </button>
                <WarehouseForm
                    existingWarehouse={editingWarehouse}
                    onSuccess={handleSuccess}
                    onCancel={handleCancel}
                    onDeleted={handleDeleted}
                />
            </div>
        );
    }

    if (loading) return <div className="container mx-auto py-6">Loading...</div>;
    if (error) return <div className="container mx-auto py-6 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto py-6">
            <WarehousesList
                onAddNew={handleAddNew}
                onEdit={handleEdit}
                // onViewShipments={handleViewShipments} // ← pass new prop
            />
        </div>
    );
}