/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import * as React from "react"
import { useCategories } from "../../../hooks/useCategories"
import { ChevronDownIcon, Plus } from "lucide-react"
import { Button } from "../../../components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../components/ui/dialog"
import { cn } from "../../../lib/utils"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Check, ChevronsUpDown } from "lucide-react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../../../components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../../components/ui/popover"
import { Switch } from "../../../components/ui/switch"
import { Textarea } from "../../../components/ui/textarea"
import { Calendar } from "../../../components/ui/calendar"
import { FileUpload } from "../../../components/upload-button"
import Image from "next/image"

export function AddProduct() {
    const [open, setOpen] = React.useState(false)
    const [openDate, setOpenDate] = React.useState(false)
    const [value, setValue] = React.useState("")
    const { categories } = useCategories();
    const [date, setDate] = React.useState<Date | undefined>(undefined)
    const [images, setImages] = React.useState<string[]>([])
    const [features, setFeatures] = React.useState<Record<string, any>>({})
    const [formData, setFormData] = React.useState({
        name: "",
        price: "",
        categoryId: "",
        description: "",
        discountPrice: "",
        isOnSale: false,
        weight: "",
        dimensions: "",
        isAvailable: true,
        sku: "",
        stock: "",
        mainImage: "",
        serviceType: "",
        averageRating: 0
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSwitchChange = (name: string, checked: boolean) => {
        setFormData(prev => ({ ...prev, [name]: checked }))
    }

    const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (/^\d*\.?\d*$/.test(value)) {
            setFormData(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Prepare the data for submission
            const productData = {
                ...formData,
                price: formData.price,
                discountPrice: formData.discountPrice || null,
                weight: formData.weight || null,
                stock: formData.stock || 0,
                saleEndsAt: date?.toISOString() || null,
                images: images,
                features: Object.keys(features).length > 0 ? features : null,
                categoryId: value,
                mainImage: formData.mainImage || images[0] || null
            };

            // Submit to API
            const response = await fetch('/api/admin/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                throw new Error('Failed to create product');
            }

            const data = await response.json();
            console.log('Product created:', data);

            // Reset form and close dialog
            setFormData({
                name: "",
                price: "",
                categoryId: "",
                description: "",
                discountPrice: "",
                isOnSale: false,
                weight: "",
                dimensions: "",
                isAvailable: true,
                sku: "",
                stock: "",
                mainImage: "",
                serviceType: "",
                averageRating: 0
            });
            setImages([]);
            setDate(undefined);
            setValue("");

            // Show success message or redirect
            alert('Product created successfully!');
            window.location.reload(); // or use a better state management approach

        } catch (error) {
            console.error('Error creating product:', error);
            alert('Error creating product. Please try again.');
        }
    };

    return (
        <Dialog>
            <form
                onSubmit={async (e) => {
                    e.preventDefault(); // Still need this
                    await handleSubmit(e);
                }}
            >
                <DialogTrigger asChild>
                    <Button variant="outline"><Plus className="h-4 w-4 mr-2" /> Add Product </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                        <DialogDescription>
                            Fill in all the required details for your new product.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {/* Basic Information */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">Basic Information</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Product Name*</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="sku">SKU (Optional)</Label>
                                    <Input
                                        id="sku"
                                        name="sku"
                                        value={formData.sku}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description*</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    rows={3}
                                />
                            </div>
                        </div>

                        {/* Pricing */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">Pricing</h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="price">Price*</Label>
                                    <Input
                                        id="price"
                                        name="price"
                                        type="text"
                                        value={formData.price}
                                        onChange={handleNumberInput}
                                        required
                                        inputMode="decimal"
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <Switch
                                        id="isOnSale"
                                        checked={formData.isOnSale}
                                        onCheckedChange={(checked) => handleSwitchChange('isOnSale', checked)}
                                    />
                                    <Label htmlFor="isOnSale">On Sale</Label>
                                </div>
                            </div>
                            {formData.isOnSale && (
                                <div className="grid gap-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="discountPrice">Discount Price</Label>
                                        <Input
                                            id="discountPrice"
                                            name="discountPrice"
                                            type="text"
                                            value={formData.discountPrice}
                                            onChange={handleNumberInput}
                                            inputMode="decimal"
                                        />
                                    </div>
                                    <Label>Sale Ends At</Label>
                                    <Popover open={openDate} onOpenChange={setOpenDate}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                id="date"
                                                className="w-48 justify-between font-normal"
                                            >
                                                {date ? date.toLocaleDateString() : "Select date"}
                                                <ChevronDownIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                captionLayout="dropdown"
                                                onSelect={(date) => {
                                                    setDate(date)
                                                    setOpenDate(false)
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            )}
                        </div>

                        {/* Inventory */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">Inventory</h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="stock">Stock Quantity*</Label>
                                    <Input
                                        id="stock"
                                        name="stock"
                                        type="number"
                                        min="0"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Switch
                                        id="isAvailable"
                                        checked={formData.isAvailable}
                                        onCheckedChange={(checked) => handleSwitchChange('isAvailable', checked)}
                                    />
                                    <Label htmlFor="isAvailable">Available</Label>
                                </div>
                            </div>
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">Category</h3>
                            <div className="grid gap-2">
                                <Label htmlFor="category">Product Category*</Label>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="w-full justify-between"
                                        >
                                            {value
                                                ? categories.find((category) => category.id === value)?.name
                                                : "Select category..."}
                                            <ChevronsUpDown className="opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command>
                                            <CommandInput placeholder="Search category..." className="h-9" />
                                            <CommandList>
                                                <CommandEmpty>No category found.</CommandEmpty>
                                                <CommandGroup>
                                                    {categories.map((category) => (
                                                        <CommandItem
                                                            key={category.id}
                                                            value={category.id}
                                                            onSelect={(currentValue) => {
                                                                setValue(currentValue === value ? "" : currentValue)
                                                                setFormData(prev => ({ ...prev, categoryId: currentValue }))
                                                                setOpen(false)
                                                            }}
                                                        >
                                                            {category.name}
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto",
                                                                    value === category.id ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        {/* Images */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">Images</h3>
                            <FileUpload
                                endpoint="productImages"
                                onUploadComplete={(url) => {
                                    if (url) {
                                        setFormData(prev => ({ ...prev, mainImage: Array.isArray(url) ? url[0] : url }));
                                    }
                                }}
                                label="Main Image (Required)"
                                required={true}
                                multiple={false}
                            />
                            {formData.mainImage && (
                                <div className="mt-2">
                                    <Image
                                        src={formData.mainImage}
                                        alt="Main product preview"
                                        className="h-32 object-contain border rounded-md "
                                        width={96}
                                        height={96}
                                    />
                                </div>
                            )}
                            <FileUpload
                                endpoint="productImages"
                                onUploadComplete={(urls) => {
                                    setImages(urls);
                                }}
                                label="Additional Images (Optional)"
                                multiple
                            />
                            {images.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {images.map((img, index) => (
                                        <Image
                                            key={index}
                                            src={img}
                                            alt={`Product image ${index + 1}`}
                                            className="h-24 w-24 object-cover border rounded-md"
                                            width={96}
                                            height={96}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Shipping */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">Shipping</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="weight">Weight (kg, Optional)</Label>
                                    <Input
                                        id="weight"
                                        name="weight"
                                        type="text"
                                        value={formData.weight}
                                        onChange={handleNumberInput}
                                        inputMode="decimal"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="dimensions">Dimensions (Optional)</Label>
                                    <Input
                                        id="dimensions"
                                        name="dimensions"
                                        value={formData.dimensions}
                                        onChange={handleInputChange}
                                        placeholder="LxWxH"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">Additional Information</h3>
                            <div className="grid gap-2">
                                <Label htmlFor="serviceType">Service Type (Optional)</Label>
                                <Input
                                    id="serviceType"
                                    name="serviceType"
                                    value={formData.serviceType}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {/* Features JSON editor would go here */}
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            onClick={(e) => {
                                handleSubmit(e);
                            }}
                        >Add Product</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}