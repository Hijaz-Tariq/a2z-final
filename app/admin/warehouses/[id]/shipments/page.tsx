// app/admin/warehouses/[id]/shipments/page.tsx
'use client';

import { useCallback, useEffect, useState } from 'react';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../../../components/ui/table';
import { ArrowUp, ArrowDown, PackageSearch, Edit } from 'lucide-react';
import { Warehouse } from '@/types/warehouse'; // 👈 assumes you have shared types
import Link from 'next/link';
import { SendSmsModal } from '@/app/admin/components/SendSmsModal';
import { SendBulkSmsModal } from '@/app/admin/components/SendBulkSmsModal';

export default function WarehouseShipmentsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const router = useRouter();
    const [warehouse, setWarehouse] = useState<Warehouse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);
    const [selectedRecipient, setSelectedRecipient] = useState<{ name: string; phone: string } | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [bulkSmsRecipients, setBulkSmsRecipients] = useState<{ name: string; phone: string }[]>([]);
    const [isBulkSmsModalOpen, setIsBulkSmsModalOpen] = useState(false);
    const handleOpenSmsModal = (name: string, phone: string) => {
        setSelectedRecipient({ name, phone });
        setIsSmsModalOpen(true);
    };

    const handleCloseSmsModal = () => {
        setIsSmsModalOpen(false);
        setSelectedRecipient(null);
    };

    // Add SMS sender function
    const handleSendSms = async (phone: string, message: string) => {
        const response = await fetch('/api/admin/sms/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ to: phone, message }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'SMS send failed');
        }
    };


    const getOutboundRecipients = (): { name: string; phone: string }[] => {
        if (!warehouse) return [];
        return warehouse.outboundPickups
            .filter(p => p.deliveryContact?.name && p.deliveryContact?.phone)
            .map(p => ({
                name: p.deliveryContact!.name,
                phone: p.deliveryContact!.phone,
            }));
    };

    const getInboundRecipients = (): { name: string; phone: string }[] => {
        if (!warehouse) return [];
        return warehouse.inboundPickups
            .filter(p => p.deliveryContact?.name && p.deliveryContact?.phone)
            .map(p => ({
                name: p.deliveryContact!.name,
                phone: p.deliveryContact!.phone,
            }));
    };

    const openBulkSmsFor = (type: 'inbound' | 'outbound') => {
        const recipients = type === 'outbound' ? getOutboundRecipients() : getInboundRecipients();
        if (recipients.length === 0) {
            alert(`No ${type} recipients with valid contact info found.`);
            return;
        }
        setBulkSmsRecipients(recipients);
        setIsBulkSmsModalOpen(true);
    };

    const getAllDeliveryContacts = (): { name: string; phone: string }[] => {
        if (!warehouse) return [];

        const contacts: { name: string; phone: string }[] = [];

        // Outbound
        warehouse.outboundPickups.forEach(p => {
            if (p.deliveryContact?.name && p.deliveryContact?.phone) {
                contacts.push({
                    name: p.deliveryContact.name,
                    phone: p.deliveryContact.phone
                });
            }
        });

        // Inbound
        warehouse.inboundPickups.forEach(p => {
            if (p.deliveryContact?.name && p.deliveryContact?.phone) {
                contacts.push({
                    name: p.deliveryContact.name,
                    phone: p.deliveryContact.phone
                });
            }
        });

        return contacts;
    };

    // Button handler
    const handleOpenBulkSms = () => {
        const contacts = getAllDeliveryContacts();
        if (contacts.length === 0) {
            alert('No recipients with valid contact info found.');
            return;
        }
        setIsBulkSmsModalOpen(true);
    };

    const fetchWarehouse = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/admin/warehouses/${id}`);
            if (response.ok) {
                const data = await response.json();
                setWarehouse(data);
            } else {
                setError('Warehouse not found');
            }
        } catch (err) {
            console.error('Failed to fetch warehouse:', err);
            setError('Failed to load warehouse data');
        } finally {
            setLoading(false);
        }
    }, [id]); // ✅ Now correctly depends on `id`

    useEffect(() => {
        fetchWarehouse();
    }, [fetchWarehouse]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (loading) {
        return (
            <div className="container mx-auto py-8">
                <div className="flex justify-center">
                    <div className="text-lg">Loading shipments...</div>
                </div>
            </div>
        );
    }

    if (error || !warehouse) {
        return (
            <div className="container mx-auto py-8">
                <div className="text-center text-red-500">{error || 'Warehouse not found'}</div>
                <div className="text-center mt-4">
                    <Button onClick={() => router.back()}>← Back to Warehouses</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-6">
            {/* Back Button */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => router.back()}
                className="mb-6"
            >
                ← Back to Warehouses
            </Button>

            {/* Page Header */}
            <Card className="mb-6">
                <CardHeader>
                    <div>
                        <CardTitle className="flex items-center gap-3">
                            <PackageSearch className="w-6 h-6" />
                            Shipments for <span className="font-bold">{warehouse.name}</span>
                        </CardTitle>
                    </div>
                    <Button onClick={handleOpenBulkSms} size="sm">
                        📩 Send Bulk SMS
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4 text-sm text-gray-600">
                        <span>
                            <span className="font-medium">Total:</span>{' '}
                            {warehouse.outboundPickups.length + warehouse.inboundPickups.length}
                        </span>
                        <span>
                            <span className="font-medium">Outbound:</span> {warehouse.outboundPickups.length}
                        </span>
                        <span>
                            <span className="font-medium">Inbound:</span> {warehouse.inboundPickups.length}
                        </span>
                    </div>
                </CardContent>
            </Card>
            <Card className="mb-8">
                <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-2 text-lg">
                            <ArrowUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            <span>Outbound Shipments ({warehouse.outboundPickups.length})</span>
                        </div>

                        <Button
                            onClick={() => openBulkSmsFor('outbound')}
                            size="sm"
                            disabled={getOutboundRecipients().length === 0}
                            variant="outline"
                            className="w-full sm:w-auto whitespace-nowrap"
                        >
                            📩 Bulk SMS – Outbound ({getOutboundRecipients().length})
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {warehouse.outboundPickups.length === 0 ? (
                        <p className="text-gray-500 text-sm">No outbound shipments found.</p>
                    ) : (
                        <div className="border rounded-md overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Contact</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Scheduled</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {warehouse.outboundPickups.map((pickup) => (
                                        <TableRow key={pickup.id}>
                                            <TableCell className="font-mono text-sm min-w-[160px]">
                                                {pickup.deliveryContact ? (
                                                    <div>
                                                        <div className="font-medium">{pickup.deliveryContact.name}</div>
                                                        <div className="text-sm text-gray-500">{pickup.deliveryContact.phone}</div>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400">N/A</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <span className="px-2 py-1 rounded text-xs bg-gray-100 capitalize">
                                                    {pickup.status.replace(/_/g, ' ')}
                                                </span>
                                            </TableCell>
                                            <TableCell className="whitespace-nowrap">
                                                {formatDate(pickup.scheduledDate)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
            {/* Outbound Shipments */}


            {/* Inbound Shipments */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-2 text-lg">
                            <ArrowDown className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span>Inbound Shipments ({warehouse.inboundPickups.length})</span>
                        </div>

                        <Button
                            onClick={() => openBulkSmsFor('inbound')}
                            size="sm"
                            disabled={getInboundRecipients().length === 0}
                            variant="outline"
                            className="w-full sm:w-auto whitespace-nowrap"
                        >
                            📩 Bulk SMS – Inbound ({getInboundRecipients().length})
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {warehouse.inboundPickups.length === 0 ? (
                        <p className="text-gray-500 text-sm">No inbound shipments found.</p>
                    ) : (
                        <div className="border rounded-md overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Recipient</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                        <TableHead>Edit</TableHead>
                                        <TableHead>Scheduled</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {warehouse.inboundPickups.map((pickup) => (
                                        <TableRow key={pickup.id}>
                                            <TableCell className="font-mono text-sm min-w-[160px]">
                                                {pickup.deliveryContact ? (
                                                    <div>
                                                        <div className="font-medium">{pickup.deliveryContact.name}</div>
                                                        <div className="text-sm text-gray-500">{pickup.deliveryContact.phone}</div>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400">N/A</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <span className="px-2 py-1 rounded text-xs bg-gray-100 capitalize">
                                                    {pickup.status.replace(/_/g, ' ')}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {pickup.deliveryContact ? (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() =>
                                                            handleOpenSmsModal(
                                                                pickup.deliveryContact!.name,
                                                                pickup.deliveryContact!.phone
                                                            )
                                                        }
                                                    >
                                                        Send SMS
                                                    </Button>
                                                ) : (
                                                    <span className="text-gray-400">—</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="whitespace-nowrap">
                                                <Link href={`/admin/pickup/${pickup.id}`} className="text-blue-600 hover:underline">
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                            </TableCell>
                                            <TableCell className="whitespace-nowrap">
                                                {formatDate(pickup.scheduledDate)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
            <SendSmsModal
                isOpen={isSmsModalOpen}
                onClose={handleCloseSmsModal}
                recipientName={selectedRecipient?.name || ''}
                recipientPhone={selectedRecipient?.phone || ''}
                onSend={handleSendSms}
            />
            <SendBulkSmsModal
                isOpen={isBulkSmsModalOpen}
                onClose={() => setIsBulkSmsModalOpen(false)}
                recipients={getAllDeliveryContacts()}
                onSend={handleSendSms} // reuse same function
            />
        </div>
    );
}