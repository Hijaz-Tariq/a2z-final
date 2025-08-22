// "use client";

// import { useState, useEffect } from "react";
// import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
// import { Button } from "../../../components/ui/button";
// import { Check, ChevronDownIcon, ChevronsUpDown, Edit } from "lucide-react";
// import { Input } from "../../../components/ui/input";
// import Image from "next/image";
// import { Label } from "../../../components/ui/label";
// import React from "react";
// import { Textarea } from "../../../components/ui/textarea";
// import { Switch } from "../../../components/ui/switch";
// import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
// import { Calendar } from "../../../components/ui/calendar";
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../../components/ui/command";
// import { FileUpload } from "../../../components/upload-button";
// import { useCategories } from "../../../hooks/useCategories";
// import { cn } from "../../../lib/utils";

// interface EditDialogProps {
//     productId: string;
//     onSave?: () => void; // Callback to refresh list after update
// }

// export function EditDialog({ productId, onSave }: EditDialogProps) {
//     const [open, setOpen] = useState(false);
//     const [value, setValue] = React.useState("")
//     const { categories } = useCategories();
//     const [openDate, setOpenDate] = React.useState(false);
//      const [date, setDate] = React.useState<Date | undefined>(undefined)
//     const [loading, setLoading] = useState(false);
//     const [product, setProduct] = useState<any>(null);
//      const [images, setImages] = React.useState<string[]>([])
//     const [formData, setFormData] = React.useState({
//         name: "",
//         price: "",
//         categoryId: "",
//         description: "",
//         discountPrice: "",
//         isOnSale: false,
//         weight: "",
//         dimensions: "",
//         isAvailable: true,
//         sku: "",
//         stock: "",
//         mainImage: "",
//         serviceType: "",
//         averageRating: 0
//     })

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target
//         setFormData(prev => ({ ...prev, [name]: value }))
//     }

//     const handleSwitchChange = (name: string, checked: boolean) => {
//         setFormData(prev => ({ ...prev, [name]: checked }))
//     }

//     const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target
//         if (/^\d*\.?\d*$/.test(value)) {
//             setFormData(prev => ({ ...prev, [name]: value }))
//         }
//     }
//     // Fetch product details when dialog opens
//     useEffect(() => {
//         if (open && productId) {
//             setLoading(true);
//             fetch(`/api/products/${productId}`)
//                 .then((res) => res.json())
//                 .then((data) => {
//                     setProduct(data);
//                     setLoading(false);
//                 })
//                 .catch(() => setLoading(false));
//         }
//     }, [open, productId]);

//     const handleSave = async () => {
//         setLoading(true);
//         await fetch(`/api/products/${productId}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(product),
//         });
//         setLoading(false);
//         setOpen(false);
//         onSave?.();
//     };

//     return (
//         <Dialog open={open} onOpenChange={setOpen}>
//             <DialogTrigger asChild>
//                 <button className="text-green-600 hover:text-green-900 mr-3">
//                     <Edit className="h-4 w-4" />
//                 </button>
//             </DialogTrigger>
//             <DialogContent>
//                 <DialogHeader>
//                     <DialogTitle>Edit Product</DialogTitle>
//                 </DialogHeader>

//                 {loading ? (
//                     <p>Loading...</p>
//                 ) : product ? (
//                     //   <div className="space-y-4">
//                     //     <div>
//                     //       <Label>Name</Label>
//                     //       <Input
//                     //         value={product.name || ""}
//                     //         onChange={(e) => setProduct({ ...product, name: e.target.value })}
//                     //       />
//                     //     </div>
//                     //     <div>
//                     //       <Label>Price</Label>
//                     //       <Input
//                     //         type="number"
//                     //         value={product.price || ""}
//                     //         onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
//                     //       />
//                     //     </div>
//                     //     <div>
//                     //       <Label>Stock</Label>
//                     //       <Input
//                     //         type="number"
//                     //         value={product.stock || ""}
//                     //         onChange={(e) => setProduct({ ...product, stock: parseInt(e.target.value) })}
//                     //       />
//                     //     </div>

//                     //     <Button onClick={handleSave} disabled={loading}>
//                     //       {loading ? "Saving..." : "Save Changes"}
//                     //     </Button>
//                     //   </div>
//                     <div className="grid gap-4 py-4">
//                         {/* Basic Information */}
//                         <div className="space-y-2">
//                             <h3 className="text-lg font-medium">Basic Information</h3>
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div className="grid gap-2">
//                                     <Label htmlFor="name">Product Name*</Label>
//                                     <Input
//                                         id="name"
//                                         name="name"
//                                         value={formData.name}
//                                         onChange={handleInputChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="grid gap-2">
//                                     <Label htmlFor="sku">SKU (Optional)</Label>
//                                     <Input
//                                         id="sku"
//                                         name="sku"
//                                         value={formData.sku}
//                                         onChange={handleInputChange}
//                                     />
//                                 </div>
//                             </div>

//                             <div className="grid gap-2">
//                                 <Label htmlFor="description">Description*</Label>
//                                 <Textarea
//                                     id="description"
//                                     name="description"
//                                     value={formData.description}
//                                     onChange={handleInputChange}
//                                     required
//                                     rows={3}
//                                 />
//                             </div>
//                         </div>

//                         {/* Pricing */}
//                         <div className="space-y-2">
//                             <h3 className="text-lg font-medium">Pricing</h3>
//                             <div className="grid grid-cols-3 gap-4">
//                                 <div className="grid gap-2">
//                                     <Label htmlFor="price">Price*</Label>
//                                     <Input
//                                         id="price"
//                                         name="price"
//                                         type="text"
//                                         value={formData.price}
//                                         onChange={handleNumberInput}
//                                         required
//                                         inputMode="decimal"
//                                     />
//                                 </div>

//                                 <div className="flex items-center gap-2">
//                                     <Switch
//                                         id="isOnSale"
//                                         checked={formData.isOnSale}
//                                         onCheckedChange={(checked) => handleSwitchChange('isOnSale', checked)}
//                                     />
//                                     <Label htmlFor="isOnSale">On Sale</Label>
//                                 </div>
//                             </div>
//                             {formData.isOnSale && (
//                                 <div className="grid gap-2">
//                                     <div className="grid gap-2">
//                                         <Label htmlFor="discountPrice">Discount Price</Label>
//                                         <Input
//                                             id="discountPrice"
//                                             name="discountPrice"
//                                             type="text"
//                                             value={formData.discountPrice}
//                                             onChange={handleNumberInput}
//                                             inputMode="decimal"
//                                         />
//                                     </div>
//                                     <Label>Sale Ends At</Label>
//                                     <Popover open={openDate} onOpenChange={setOpenDate}>
//                                         <PopoverTrigger asChild>
//                                             <Button
//                                                 variant="outline"
//                                                 id="date"
//                                                 className="w-48 justify-between font-normal"
//                                             >
//                                                 {date ? date.toLocaleDateString() : "Select date"}
//                                                 <ChevronDownIcon />
//                                             </Button>
//                                         </PopoverTrigger>
//                                         <PopoverContent className="w-auto overflow-hidden p-0" align="start">
//                                             <Calendar
//                                                 mode="single"
//                                                 selected={date}
//                                                 captionLayout="dropdown"
//                                                 onSelect={(date) => {
//                                                     setDate(date)
//                                                     setOpenDate(false)
//                                                 }}
//                                             />
//                                         </PopoverContent>
//                                     </Popover>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Inventory */}
//                         <div className="space-y-2">
//                             <h3 className="text-lg font-medium">Inventory</h3>
//                             <div className="grid grid-cols-3 gap-4">
//                                 <div className="grid gap-2">
//                                     <Label htmlFor="stock">Stock Quantity*</Label>
//                                     <Input
//                                         id="stock"
//                                         name="stock"
//                                         type="number"
//                                         min="0"
//                                         value={formData.stock}
//                                         onChange={handleInputChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <Switch
//                                         id="isAvailable"
//                                         checked={formData.isAvailable}
//                                         onCheckedChange={(checked) => handleSwitchChange('isAvailable', checked)}
//                                     />
//                                     <Label htmlFor="isAvailable">Available</Label>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Category */}
//                         <div className="space-y-2">
//                             <h3 className="text-lg font-medium">Category</h3>
//                             <div className="grid gap-2">
//                                 <Label htmlFor="category">Product Category*</Label>
//                                 <Popover open={open} onOpenChange={setOpen}>
//                                     <PopoverTrigger asChild>
//                                         <Button
//                                             variant="outline"
//                                             role="combobox"
//                                             aria-expanded={open}
//                                             className="w-full justify-between"
//                                         >
//                                             {value
//                                                 ? categories.find((category) => category.id === value)?.name
//                                                 : "Select category..."}
//                                             <ChevronsUpDown className="opacity-50" />
//                                         </Button>
//                                     </PopoverTrigger>
//                                     <PopoverContent className="w-full p-0">
//                                         <Command>
//                                             <CommandInput placeholder="Search category..." className="h-9" />
//                                             <CommandList>
//                                                 <CommandEmpty>No category found.</CommandEmpty>
//                                                 <CommandGroup>
//                                                     {categories.map((category) => (
//                                                         <CommandItem
//                                                             key={category.id}
//                                                             value={category.id}
//                                                             onSelect={(currentValue) => {
//                                                                 setValue(currentValue === value ? "" : currentValue)
//                                                                 setFormData(prev => ({ ...prev, categoryId: currentValue }))
//                                                                 setOpen(false)
//                                                             }}
//                                                         >
//                                                             {category.name}
//                                                             <Check
//                                                                 className={cn(
//                                                                     "ml-auto",
//                                                                     value === category.id ? "opacity-100" : "opacity-0"
//                                                                 )}
//                                                             />
//                                                         </CommandItem>
//                                                     ))}
//                                                 </CommandGroup>
//                                             </CommandList>
//                                         </Command>
//                                     </PopoverContent>
//                                 </Popover>
//                             </div>
//                         </div>

//                         {/* Images */}
//                         <div className="space-y-2">
//                             <h3 className="text-lg font-medium">Images</h3>
//                             <FileUpload
//                                 endpoint="productImages"
//                                 onUploadComplete={(url) => {
//                                     if (url) {
//                                         setFormData(prev => ({ ...prev, mainImage: Array.isArray(url) ? url[0] : url }));
//                                     }
//                                 }}
//                                 label="Main Image (Required)"
//                                 required={true}
//                                 multiple={false}
//                             />
//                             {formData.mainImage && (
//                                 <div className="mt-2">
//                                     <Image
//                                         src={formData.mainImage}
//                                         alt="Main product preview"
//                                         className="h-32 object-contain border rounded-md "
//                                         width={96}
//                                         height={96}
//                                     />
//                                 </div>
//                             )}
//                             <FileUpload
//                                 endpoint="productImages"
//                                 onUploadComplete={(urls) => {
//                                     setImages(urls);
//                                 }}
//                                 label="Additional Images (Optional)"
//                                 multiple
//                             />
//                             {images.length > 0 && (
//                                 <div className="flex flex-wrap gap-2 mt-2">
//                                     {images.map((img, index) => (
//                                         <Image
//                                             key={index}
//                                             src={img}
//                                             alt={`Product image ${index + 1}`}
//                                             className="h-24 w-24 object-cover border rounded-md"
//                                             width={96}
//                                             height={96}
//                                         />
//                                     ))}
//                                 </div>
//                             )}
//                         </div>

//                         {/* Shipping */}
//                         <div className="space-y-2">
//                             <h3 className="text-lg font-medium">Shipping</h3>
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div className="grid gap-2">
//                                     <Label htmlFor="weight">Weight (kg, Optional)</Label>
//                                     <Input
//                                         id="weight"
//                                         name="weight"
//                                         type="text"
//                                         value={formData.weight}
//                                         onChange={handleNumberInput}
//                                         inputMode="decimal"
//                                     />
//                                 </div>
//                                 <div className="grid gap-2">
//                                     <Label htmlFor="dimensions">Dimensions (Optional)</Label>
//                                     <Input
//                                         id="dimensions"
//                                         name="dimensions"
//                                         value={formData.dimensions}
//                                         onChange={handleInputChange}
//                                         placeholder="LxWxH"
//                                     />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Additional Info */}
//                         <div className="space-y-2">
//                             <h3 className="text-lg font-medium">Additional Information</h3>
//                             <div className="grid gap-2">
//                                 <Label htmlFor="serviceType">Service Type (Optional)</Label>
//                                 <Input
//                                     id="serviceType"
//                                     name="serviceType"
//                                     value={formData.serviceType}
//                                     onChange={handleInputChange}
//                                 />
//                             </div>
//                             {/* Features JSON editor would go here */}
//                         </div>
//                     </div>
//                 ) : (
//                     <p>No product found.</p>
//                 )}
//                 <DialogFooter>
//                     <DialogClose asChild>
//                         <Button variant="outline">Cancel</Button>
//                     </DialogClose>
//                     {/* <Button
//                         type="submit"
//                         onClick={(e) => {
//                             handleSubmit(e);
//                         }}
//                     >Add Product</Button> */}
//                     <Button onClick={handleSave} disabled={loading}>
//                         {loading ? "Saving..." : "Save Changes"}
//                     </Button>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     );
// }


"use client"
import * as React from "react"
import { useCategories } from "../../../hooks/useCategories"
import { ChevronDownIcon, Edit } from "lucide-react"
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
import { Product } from "@prisma/client"

interface EditProductProps {
  product: Product
}

export function EditProduct({ product }: EditProductProps) {
  //   const [open, setOpen] = React.useState(false)
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [categoryOpen, setCategoryOpen] = React.useState(false)
  const [openDate, setOpenDate] = React.useState(false)
  const { categories } = useCategories()
  const [date, setDate] = React.useState<Date | undefined>(
    product.saleEndsAt ? new Date(product.saleEndsAt) : undefined
  )
  const [images, setImages] = React.useState<string[]>(product.images || [])
  const [formData, setFormData] = React.useState({
    id: product.id,
    name: product.name,
    price: product.price.toString(),
    categoryId: product.categoryId,
    description: product.description,
    discountPrice: product.discountPrice ? product.discountPrice.toString() : "",
    isOnSale: product.isOnSale,
    weight: product.weight?.toString() || "",
    dimensions: product.dimensions || "",
    isAvailable: product.isAvailable,
    sku: product.sku || "",
    stock: product.stock.toString(),
    mainImage: product.mainImage,
    serviceType: product.serviceType || "",
    averageRating: product.averageRating || 0,
    features: product.features || null,
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
    e.preventDefault()

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        stock: parseInt(formData.stock) || 0,
        saleEndsAt: date?.toISOString() || null,
        images,
      }

      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      })

      if (!response.ok) throw new Error("Failed to update product")

      alert("Product updated successfully")
      setDialogOpen(false)
      window.location.reload()
    } catch (error) {
      console.error("Error updating product:", error)
      alert("Error updating product")
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" type="button">
          <Edit className="h-4 w-4 mr-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update product details below.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Basic Info */}
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required />
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" value={formData.price} onChange={handleNumberInput} />
              </div>
              <div className="flex items-center gap-2">
                <Switch id="isOnSale" checked={formData.isOnSale} onCheckedChange={c => handleSwitchChange("isOnSale", c)} />
                <Label htmlFor="isOnSale">On Sale</Label>
              </div>
            </div>

            {formData.isOnSale && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="discountPrice">Discount Price</Label>
                  <Input id="discountPrice" name="discountPrice" value={formData.discountPrice} onChange={handleNumberInput} />
                </div>
                <div className="grid gap-2">
                  <Label>Sale Ends At</Label>
                  <Popover open={openDate} onOpenChange={setOpenDate}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        {date ? date.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={d => {
                          setDate(d)
                          setOpenDate(false)
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </>
            )}

            {/* Category */}
            <div className="grid gap-2">
              <Label>Category</Label>
              <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" className="w-full justify-between">
                    {categories.find(c => c.id === formData.categoryId)?.name || "Select category"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search category..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No category found</CommandEmpty>
                      <CommandGroup>
                        {categories.map(category => (
                          <CommandItem
                            key={category.id}
                            value={category.id}
                            onSelect={currentValue => {
                              setFormData(prev => ({ ...prev, categoryId: currentValue }))
                              setCategoryOpen(false)
                            }}
                          >
                            {category.name}
                            <Check className={cn("ml-auto", formData.categoryId === category.id ? "opacity-100" : "opacity-0")} />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Images */}
            <div className="space-y-2">
              <Label>Main Image</Label>
              <FileUpload
                endpoint="productImages"
                multiple={false}
                onUploadComplete={url => {
                  if (url) {
                    setFormData(prev => ({ ...prev, mainImage: Array.isArray(url) ? url[0] : url }))
                  }
                }}
              />
              {formData.mainImage && <Image src={formData.mainImage} alt="Main" width={100} height={100} className="rounded border" />}
            </div>

            <div className="space-y-2">
              <Label>Additional Images</Label>
              <FileUpload
                endpoint="productImages"
                multiple
                onUploadComplete={urls => {
                  setImages(urls)
                }}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {images.map((img, idx) => (
                  <Image key={idx} src={img} alt={`img-${idx}`} width={80} height={80} className="rounded border" />
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
