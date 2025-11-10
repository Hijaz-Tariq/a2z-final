/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";
import { useRef } from "react";
import { Eye } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";

import { Pickup, Contact, Address, PickupPackage, PickupItem, User, GuestCheckout, GuestSession, ShippingStatus } from "@prisma/client";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../../../components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";
import Image from "next/image";
import { Badge } from "../../../components/ui/badge";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select";
interface EditPickupProps {
    pickup: Pickup & {
        pickupContact: Contact;
        deliveryContact: Contact | null;
        items: PickupItem[];
        packages: (PickupPackage & {
            items?: PickupItem[];
        })[];
        User: User[];
        GuestCheckout: GuestCheckout[];
        GuestSession: GuestSession[];

        // Keep these for UI convenience
        pickupAddress?: Address | null;
        deliveryAddress?: Address | null;

        // Still keep direct custom addresses too
        customPickupAddress?: Address | null;
        customDeliveryAddress?: Address | null;
    };
}

export function PickupDialog({ pickup }: EditPickupProps) {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = React.useState({
        id: pickup.id,
        name: pickup.pickupContact,
        dname: pickup.deliveryContact,
        pickupAddress: pickup.pickupAddress,
        deliveryAddress: pickup.deliveryAddress,
        status: pickup.status,
    });
    const statusOptions = Object.values(ShippingStatus);
    // Handle status change
    const handleStatusChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            status: value as ShippingStatus
        }));
        // Here you would typically make an API call to update the status
        // updatePickupStatus(pickup.id, value);
    };

    // Helper function to format address for display
    const formatAddress = (address: any) => {
        if (!address) return "No address specified";

        const parts = [
            address.line1,
            address.line2,
            `${address.city}, ${address.state} ${address.postalCode}`,
            address.country
        ].filter(part => part && part.trim() !== "");

        return parts.join(", ");
    };
    // Helper to get package dimensions as string
    const getPackageDimensions = (pkg: PickupPackage) => {
        if (!pkg.length || !pkg.width || !pkg.height) return "Dimensions not specified";
        return `${pkg.length} × ${pkg.width} × ${pkg.height} cm`;
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen} >
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" type="button">
                    <Eye className="h-4 w-4 mr-2" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto justify-items-center">
                <form>
                    <DialogHeader>
                        <DialogTitle>  <Select
                            value={formData.status}
                            onValueChange={handleStatusChange}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions.map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select></DialogTitle>
                        <DialogDescription>
                            <Label htmlFor="pickup">
                                Picup-Type: {pickup.type}
                            </Label>
                            <Label htmlFor="pickup">
                                Picup-Status: {pickup.status}
                            </Label>
                            <Label htmlFor="pickup">
                                Track-Id: {pickup.id}
                            </Label>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex w-full max-w-sm flex-col gap-6">
                        <Tabs defaultValue="package">
                            <TabsList>
                                <TabsTrigger value="package">Package</TabsTrigger>
                                <TabsTrigger value="sender">Sender</TabsTrigger>
                                <TabsTrigger value="reciever">Recipient</TabsTrigger>
                            </TabsList>
                            <TabsContent value="package">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Package Count: {pickup.packageCount}</CardTitle>
                                        <CardDescription>
                                            Total: {pickup.packageCount} packages, {pickup.totalWeight} {pickup.weightUnit}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-6">
                                        <div className="grid gap-3">
                                            <div>
                                                <Label>Total Cost</Label>
                                                <p className="text-lg font-semibold">{pickup.calculatedCost} {pickup.costCurrency}</p>
                                            </div>
                                            <div>
                                                <Label>Special Instructions</Label>
                                                <p>{pickup.specialNotes || "None"} , {pickup.commercialDocuments ?
                                                    (() => {
                                                        try {
                                                            const doc = typeof pickup.commercialDocuments === 'string'
                                                                ? JSON.parse(pickup.commercialDocuments)
                                                                : pickup.commercialDocuments;
                                                            const docUrl = doc?.deliveryDocument;
                                                            return docUrl ?
                                                                <Image src={docUrl} alt="Main" width={100} height={100} className="rounded border" />
                                                                : "Invalid document format";
                                                        } catch {
                                                            return "Invalid document format";
                                                        }
                                                    })()
                                                    : "no Documents"}
                                                </p>
                                            </div>

                                        </div>

                                    </CardContent>
                                    <CardFooter></CardFooter>
                                </Card>
                                {/* Package Cards with Horizontal Scrolling using Shadcn ScrollArea */}
                                <ScrollArea className="w-full rounded-md border mt-4 relative">
                                    <div className="flex w-max space-x-4 p-4"
                                        ref={scrollContainerRef}>
                                        {pickup.packages.map((pkg, index) => (
                                            <div key={pkg.id} className="w-[280px] shrink-0">
                                                <Card className="h-full">
                                                    <CardHeader className="bg-muted/30">
                                                        <CardTitle className="flex justify-between items-center">
                                                            <span>Package {index + 1}</span>
                                                            <Badge variant="secondary">{pkg.packageType}</Badge>
                                                        </CardTitle>
                                                        <CardDescription>
                                                            {pkg.weight} {pickup.weightUnit} • {getPackageDimensions(pkg)}
                                                            {pkg.specialNotes && ` • ${pkg.specialNotes}`}
                                                        </CardDescription>
                                                    </CardHeader>
                                                    <CardContent className="pt-4">
                                                        <Label className="mb-2 block">Contents:</Label>
                                                        <div className="border rounded-md divide-y">
                                                            {pkg.items && pkg.items.length > 0 ? (
                                                                pkg.items.map((item) => (
                                                                    <div key={item.id} className="p-3">
                                                                        <div className="flex justify-between items-start">
                                                                            <div>
                                                                                <p className="font-medium">{item.description}</p>
                                                                                <p className="text-sm text-muted-foreground">
                                                                                    Qty: {item.quantity} • Value: {item.value} {item.currency}
                                                                                    {item.hsCode && ` • HS Code: ${item.hsCode}`}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="p-4 text-center text-muted-foreground">
                                                                    No items in this package
                                                                </div>
                                                            )}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        ))}
                                    </div>
                                    <ScrollBar orientation="horizontal" />
                                </ScrollArea>
                            </TabsContent>
                            <TabsContent value="sender">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Scheduled Date: {new Date(pickup.scheduledDate).toLocaleDateString()}
                                            <Label htmlFor="pickup">{pickup.timeWindow}</Label>
                                        </CardTitle>
                                        <CardDescription>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-6">
                                        <Label htmlFor="name">
                                            Sender Name: {formData.name.name}
                                        </Label>
                                        <Label htmlFor="name">
                                            Phone: {formData.name.phone}
                                        </Label>
                                        <Label htmlFor="name">
                                            E-mail: {formData.name.email || "No e-mail"}
                                        </Label>
                                        <Label htmlFor="address">
                                            Address: {formatAddress(formData.pickupAddress)}
                                        </Label>
                                        <Label htmlFor="address">
                                            Company: {formatAddress(formData.name.company)}
                                        </Label>
                                    </CardContent>
                                    <CardFooter></CardFooter>
                                </Card>
                            </TabsContent>
                            <TabsContent value="reciever">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Estimated Date:</CardTitle>
                                        <CardDescription>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-6">
                                        <Label htmlFor="name">
                                            Recipient Name: {formData.dname!.name}
                                        </Label>
                                        <Label htmlFor="name">
                                            Phone: {formData.dname!.phone}
                                        </Label>
                                        <Label htmlFor="name">
                                            E-mail: {formData.dname!.email || "No e-mail"}
                                        </Label>
                                        <Label htmlFor="address">
                                            Address: {formatAddress(formData.deliveryAddress)}
                                        </Label>
                                        <Label htmlFor="address">
                                            Company: {formatAddress(formData.dname!.company)}
                                        </Label>
                                    </CardContent>
                                    <CardFooter></CardFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild></DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    );
}