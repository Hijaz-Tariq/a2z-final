// // 'use client';

// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import { FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// // import { Input } from '@/components/ui/input';
// // import { Textarea } from '@/components/ui/textarea';
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // import { useFormContext, useFieldArray } from 'react-hook-form';
// // import { PickupFormData } from '../types/PickupPage';
// // import { Plus, Trash2 } from 'lucide-react';

// // export const PackageDetails = ({ onNext }: { onNext: () => void }) => {
// //     const { control } = useFormContext<PickupFormData>();
// //     const { fields, append, remove } = useFieldArray({
// //         control,
// //         name: "packages"
// //     });

// //     // Default package template
// //     const defaultPackage = {
// //         packageType: "parcel",
// //         weight: 0.1,
// //         dimensions: {
// //             length: 1,
// //             width: 1,
// //             height: 1
// //         },
// //         items: [{
// //             description: "",
// //             quantity: 1,
// //             value: 0,
// //             currency: "USD",
// //             hsCode: "",
// //             countryOfOrigin: ""
// //         }],
// //         specialNotes: ""
// //     };

// //     return (
// //         <Card>
// //             <CardHeader>
// //                 <CardTitle>Package Information</CardTitle>
// //             </CardHeader>
// //             <CardContent className="space-y-6">
// //                 {fields.map((field, index) => (
// //                     <div key={field.id} className="space-y-4 border p-4 rounded-lg">
// //                         <div className="flex justify-between items-center">
// //                             <h3 className="font-medium">Package {index + 1}</h3>
// //                             {fields.length > 1 && (
// //                                 <Button
// //                                     type="button"
// //                                     variant="ghost"
// //                                     size="sm"
// //                                     onClick={() => remove(index)}
// //                                 >
// //                                     <Trash2 className="h-4 w-4 text-destructive" />
// //                                 </Button>
// //                             )}
// //                         </div>

// //                         <FormField
// //                             control={control}
// //                             name={`packages.${index}.packageType`}
// //                             render={({ field }) => (
// //                                 <FormItem>
// //                                     <FormLabel>Package Type</FormLabel>
// //                                     <Select onValueChange={field.onChange} value={field.value}>
// //                                         <FormControl>
// //                                             <SelectTrigger>
// //                                                 <SelectValue placeholder="Select package type" />
// //                                             </SelectTrigger>
// //                                         </FormControl>
// //                                         <SelectContent>
// //                                             <SelectItem value="document">Document</SelectItem>
// //                                             <SelectItem value="parcel">Parcel</SelectItem>
// //                                             <SelectItem value="pallet">Pallet</SelectItem>
// //                                             <SelectItem value="envelope">Envelope</SelectItem>
// //                                         </SelectContent>
// //                                     </Select>
// //                                 </FormItem>
// //                             )}
// //                         />

// //                         <div className="grid grid-cols-2 gap-4">
// //                             <FormField
// //                                 control={control}
// //                                 name={`packages.${index}.weight`}
// //                                 render={({ field }) => (
// //                                     <FormItem>
// //                                         <FormLabel>Weight (kg)</FormLabel>
// //                                         <FormControl>
// //                                             <Input
// //                                                 type="number"
// //                                                 min="0.1"
// //                                                 step="0.1"
// //                                                 value={field.value}
// //                                                 onChange={(e) => field.onChange(parseFloat(e.target.value))}
// //                                             />
// //                                         </FormControl>
// //                                     </FormItem>
// //                                 )}
// //                             />

// //                             <div className="space-y-2">
// //                                 <FormLabel>Dimensions (cm)</FormLabel>
// //                                 <div className="flex gap-2">
// //                                     <FormField
// //                                         control={control}
// //                                         name={`packages.${index}.dimensions.length`}
// //                                         render={({ field }) => (
// //                                             <FormControl>
// //                                                 <Input
// //                                                     placeholder="L"
// //                                                     className="w-16"
// //                                                     type="number"
// //                                                     min="1"
// //                                                     value={field.value}
// //                                                     onChange={(e) => field.onChange(parseInt(e.target.value))}
// //                                                 />
// //                                             </FormControl>
// //                                         )}
// //                                     />
// //                                     <FormField
// //                                         control={control}
// //                                         name={`packages.${index}.dimensions.width`}
// //                                         render={({ field }) => (
// //                                             <FormControl>
// //                                                 <Input
// //                                                     placeholder="W"
// //                                                     className="w-16"
// //                                                     type="number"
// //                                                     min="1"
// //                                                     value={field.value}
// //                                                     onChange={(e) => field.onChange(parseInt(e.target.value))}
// //                                                 />
// //                                             </FormControl>
// //                                         )}
// //                                     />
// //                                     <FormField
// //                                         control={control}
// //                                         name={`packages.${index}.dimensions.height`}
// //                                         render={({ field }) => (
// //                                             <FormControl>
// //                                                 <Input
// //                                                     placeholder="H"
// //                                                     className="w-16"
// //                                                     type="number"
// //                                                     min="1"
// //                                                     value={field.value}
// //                                                     onChange={(e) => field.onChange(parseInt(e.target.value))}
// //                                                 />
// //                                             </FormControl>
// //                                         )}
// //                                     />
// //                                 </div>
// //                             </div>
// //                         </div>

// //                         <div className="space-y-4">
// //                             <div className="flex justify-between items-center">
// //                                 <h4 className="font-medium">Items in Package</h4>
// //                                 <Button
// //                                     type="button"
// //                                     variant="outline"
// //                                     size="sm"
// //                                     onClick={() =>
// //                                         append({
// //                                             description: "",
// //                                             quantity: 1,
// //                                             value: 0,
// //                                             currency: "USD",
// //                                             hsCode: "",
// //                                             countryOfOrigin: ""
// //                                         }, { focusName: `packages.${index}.items.0.description` })
// //                                     }
// //                                 >
// //                                     <Plus className="h-4 w-4 mr-2" />
// //                                     Add Item
// //                                 </Button>
// //                             </div>

// //                             {field.items?.map((item, itemIndex) => (
// //                                 <div key={item.id} className="space-y-3 border p-3 rounded">
// //                                     <FormField
// //                                         control={control}
// //                                         name={`packages.${index}.items.${itemIndex}.description`}
// //                                         render={({ field }) => (
// //                                             <FormItem>
// //                                                 <FormLabel>Item Description</FormLabel>
// //                                                 <FormControl>
// //                                                     <Input placeholder="Detailed item description" {...field} />
// //                                                 </FormControl>
// //                                             </FormItem>
// //                                         )}
// //                                     />

// //                                     <div className="grid grid-cols-4 gap-3">
// //                                         <FormField
// //                                             control={control}
// //                                             name={`packages.${index}.items.${itemIndex}.quantity`}
// //                                             render={({ field }) => (
// //                                                 <FormItem>
// //                                                     <FormLabel>Quantity</FormLabel>
// //                                                     <FormControl>
// //                                                         <Input
// //                                                             type="number"
// //                                                             min="1"
// //                                                             {...field}
// //                                                             onChange={(e) => field.onChange(parseInt(e.target.value))}
// //                                                         />
// //                                                     </FormControl>
// //                                                 </FormItem>
// //                                             )}
// //                                         />

// //                                         <FormField
// //                                             control={control}
// //                                             name={`packages.${index}.items.${itemIndex}.value`}
// //                                             render={({ field }) => (
// //                                                 <FormItem>
// //                                                     <FormLabel>Value</FormLabel>
// //                                                     <FormControl>
// //                                                         <Input
// //                                                             type="number"
// //                                                             min="0"
// //                                                             step="0.01"
// //                                                             {...field}
// //                                                             onChange={(e) => field.onChange(parseFloat(e.target.value))}
// //                                                         />
// //                                                     </FormControl>
// //                                                 </FormItem>
// //                                             )}
// //                                         />

// //                                         <FormField
// //                                             control={control}
// //                                             name={`packages.${index}.items.${itemIndex}.currency`}
// //                                             render={({ field }) => (
// //                                                 <FormItem>
// //                                                     <FormLabel>Currency</FormLabel>
// //                                                     <Select onValueChange={field.onChange} value={field.value}>
// //                                                         <FormControl>
// //                                                             <SelectTrigger>
// //                                                                 <SelectValue placeholder="Select currency" />
// //                                                             </SelectTrigger>
// //                                                         </FormControl>
// //                                                         <SelectContent>
// //                                                             <SelectItem value="USD">USD</SelectItem>
// //                                                             <SelectItem value="EUR">EUR</SelectItem>
// //                                                             <SelectItem value="GBP">GBP</SelectItem>
// //                                                             {/* Add more currencies as needed */}
// //                                                         </SelectContent>
// //                                                     </Select>
// //                                                 </FormItem>
// //                                             )}
// //                                         />

// //                                         <FormField
// //                                             control={control}
// //                                             name={`packages.${index}.items.${itemIndex}.hsCode`}
// //                                             render={({ field }) => (
// //                                                 <FormItem>
// //                                                     <FormLabel>HS Code</FormLabel>
// //                                                     <FormControl>
// //                                                         <Input placeholder="Harmonized System code" {...field} />
// //                                                     </FormControl>
// //                                                 </FormItem>
// //                                             )}
// //                                         />
// //                                     </div>

// //                                     <FormField
// //                                         control={control}
// //                                         name={`packages.${index}.items.${itemIndex}.countryOfOrigin`}
// //                                         render={({ field }) => (
// //                                             <FormItem>
// //                                                 <FormLabel>Country of Origin</FormLabel>
// //                                                 <FormControl>
// //                                                     <Input placeholder="Item origin country" {...field} />
// //                                                 </FormControl>
// //                                             </FormItem>
// //                                         )}
// //                                     />
// //                                 </div>
// //                             ))}
// //                         </div>

// //                         <FormField
// //                             control={control}
// //                             name={`packages.${index}.specialNotes`}
// //                             render={({ field }) => (
// //                                 <FormItem>
// //                                     <FormLabel>Special Instructions</FormLabel>
// //                                     <FormControl>
// //                                         <Textarea placeholder="Fragile, temperature sensitive, etc." {...field} />
// //                                     </FormControl>
// //                                 </FormItem>
// //                             )}
// //                         />
// //                     </div>
// //                 ))}

// //                 <div className="flex justify-between pt-4">
// //                     <Button
// //                         type="button"
// //                         variant="outline"
// //                         onClick={() => append(defaultPackage)}
// //                     >
// //                         Add Another Package
// //                     </Button>
// //                     <Button type="button" onClick={onNext}>
// //                         Next
// //                     </Button>
// //                 </div>
// //             </CardContent>
// //         </Card>
// //     );
// // };

// // 'use client';

// // import { useFormContext, useFieldArray } from 'react-hook-form';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Card } from '@/components/ui/card';
// // import { PickupFormData } from '@/types/PickupPage';
// // import { PDetailsInput } from './PDetailsInput';
// // import { useEffect } from 'react';

// // export default function PackageDetails() {
// //   const {
// //     control,
// //     watch,
// //     setValue,
// //     getValues,
// //   } = useFormContext<PickupFormData>();

// //   const {
// //     fields: packages,
// //     append: appendPackage,
// //     remove: removePackage,
// //   } = useFieldArray({
// //     control,
// //     name: 'packages',
// //   });

// //   const {
// //     fields: items,
// //     append: appendItem,
// //   } = useFieldArray({
// //     control,
// //     name: 'items',
// //   });

// //   // Generate new item with unique ID
// //   const handleAddItem = () => {
// //     const id = crypto.randomUUID();
// //     appendItem({
// //       id,
// //       description: '',
// //       quantity: 1,
// //       value: 0,
// //       currency: 'USD',
// //     });
// //   };

// //   // Add or remove packages
// //   const handlePackageCountChange = (count: number) => {
// //     const current = getValues('packages');
// //     const diff = count - current.length;
// //     if (diff > 0) {
// //       for (let i = 0; i < diff; i++) {
// //         appendPackage({
// //           id: crypto.randomUUID(),
// //           packageType: 'parcel',
// //           weight: 0.1,
// //           dimensions: { length: 1, width: 1, height: 1 },
// //           itemIds: [],
// //           specialNotes: '',
// //         });
// //       }
// //     } else {
// //       for (let i = 0; i < -diff; i++) {
// //         removePackage(current.length - 1 - i);
// //       }
// //     }
// //   };

// //   // Handle item assignment
// //   const handlePackageSelect = (itemId: string, packageId: string) => {
// //     const packages = getValues('packages');
// //     const updatedPackages = packages.map((pkg) => {
// //       const hasItem = (pkg.itemIds || []).includes(itemId);
// //       const isTarget = pkg.id === packageId;

// //       return {
// //         ...pkg,
// //         itemIds: pkg.itemIds
// //           ? [
// //               ...pkg.itemIds.filter((id) => id !== itemId),
// //               ...(isTarget && !hasItem ? [itemId] : []),
// //             ]
// //           : isTarget ? [itemId] : [],
// //       };
// //     });
// //     setValue('packages', updatedPackages);
// //   };

// //   // Find assigned package index for an item
// //   const getCurrentPackageIndex = (itemId: string) => {
// //     const packages = getValues('packages');
// //     return packages.findIndex((pkg) => (pkg.itemIds || []).includes(itemId));
// //   };

// //   return (
// //     <div className="space-y-6">
// //       <div className="space-y-4">
// //         <h3 className="text-xl font-semibold">Items</h3>
// //         {items.map((item, index) => (
// //           <Card key={item.id} className="p-4 space-y-2">
// //             <Label>Description</Label>
// //             <Input {...{ name: `items.${index}.description` }} />

// //             <Label>Quantity</Label>
// //             <Input type="number" {...{ name: `items.${index}.quantity` }} />

// //             <Label>Assign to Package</Label>
// //             <select
// //               className="border p-2"
// //               value={getValues('packages')[getCurrentPackageIndex(item.id)]?.id || 'unassigned'}
// //               onChange={(e) => handlePackageSelect(item.id, e.target.value)}
// //             >
// //               <option value="unassigned">Unassigned</option>
// //               {packages.map((pkg) => (
// //                 <option key={pkg.id} value={pkg.id}>
// //                   Package {pkg.id.slice(-4)}
// //                 </option>
// //               ))}
// //             </select>
// //           </Card>
// //         ))}
// //         <Button onClick={handleAddItem}>Add Item</Button>
// //       </div>

// //       <div className="space-y-6">
// //         <h3 className="text-xl font-semibold">Packages</h3>
// //         {packages.map((pkg, pkgIndex) => (
// //           <Card key={pkg.id} className="p-4 space-y-4">
// //             <PDetailsInput pkgIndex={pkgIndex} />
// //             <div className="space-y-2">
// //               <h4 className="font-medium">Assigned Items</h4>
// //               {(getValues('packages')[pkgIndex].itemIds || []).length === 0 ? (
// //                 <p className="text-muted-foreground">No items assigned</p>
// //               ) : (
// //                 <div className="space-y-2">
// //                   {items
// //                     .filter((item) =>
// //                       (getValues('packages')[pkgIndex].itemIds || []).includes(item.id)
// //                     )
// //                     .map((item) => {
// //                       const itemIndex = items.findIndex((i) => i.id === item.id);
// //                       return (
// //                         <div
// //                           key={`assigned-${item.id}`}
// //                           className="flex items-center gap-4 p-2 border rounded bg-accent/30"
// //                         >
// //                           <span className="flex-1 font-medium">
// //                             {watch(`items.${itemIndex}.description`) || 'Unnamed item'}
// //                           </span>
// //                           <span className="text-sm">
// //                             Qty: {watch(`items.${itemIndex}.quantity`)}
// //                           </span>
// //                           <Button
// //                             type="button"
// //                             variant="ghost"
// //                             size="sm"
// //                             onClick={() => handlePackageSelect(item.id, 'unassigned')}
// //                             className="text-destructive"
// //                           >
// //                             Unassign
// //                           </Button>
// //                         </div>
// //                       );
// //                     })}
// //                 </div>
// //               )}
// //             </div>
// //           </Card>
// //         ))}
// //         <Button onClick={() => handlePackageCountChange(packages.length + 1)}>
// //           Add Package
// //         </Button>
// //       </div>
// //     </div>
// //   );
// // }


// 'use client';

// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { useFormContext, useFieldArray } from 'react-hook-form';
// import { PickupFormData } from '@/types/PickupPage';
// import { Plus, Trash2 } from 'lucide-react';

// export const PackageDetails = ({ onNext }: { onNext: () => void }) => {
//   const { control } = useFormContext<PickupFormData>();
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "packages"
//   });

//   // Default package template
//   const defaultPackage = {
//     packageType: "parcel",
//     weight: 0.1,
//     dimensions: {
//       length: 1,
//       width: 1,
//       height: 1
//     },
//     items: [{
//       description: "",
//       quantity: 1,
//       value: 0,
//       currency: "USD",
//       hsCode: "",
//       countryOfOrigin: ""
//     }],
//     specialNotes: ""
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Package Information</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         {fields.map((field, index) => (
//           <div key={field.id} className="space-y-4 border p-4 rounded-lg">
//             <div className="flex justify-between items-center">
//               <h3 className="font-medium">Package {index + 1}</h3>
//               {fields.length > 1 && (
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => remove(index)}
//                 >
//                   <Trash2 className="h-4 w-4 text-destructive" />
//                 </Button>
//               )}
//             </div>

//             <FormField
//               control={control}
//               name={`packages.${index}.packageType`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Package Type</FormLabel>
//                   <Select onValueChange={field.onChange} value={field.value}>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select package type" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="document">Document</SelectItem>
//                       <SelectItem value="parcel">Parcel</SelectItem>
//                       <SelectItem value="pallet">Pallet</SelectItem>
//                       <SelectItem value="envelope">Envelope</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </FormItem>
//               )}
//             />

//             <div className="grid grid-cols-2 gap-4">
//               <FormField
//                 control={control}
//                 name={`packages.${index}.weight`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Weight (kg)</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         min="0.1"
//                         step="0.1"
//                         value={field.value}
//                         onChange={(e) => field.onChange(parseFloat(e.target.value))}
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />

//               <div className="space-y-2">
//                 <FormLabel>Dimensions (cm)</FormLabel>
//                 <div className="flex gap-2">
//                   <FormField
//                     control={control}
//                     name={`packages.${index}.dimensions.length`}
//                     render={({ field }) => (
//                       <FormControl>
//                         <Input
//                           placeholder="L"
//                           className="w-16"
//                           type="number"
//                           min="1"
//                           value={field.value}
//                           onChange={(e) => field.onChange(parseInt(e.target.value))}
//                         />
//                       </FormControl>
//                     )}
//                   />
//                   <FormField
//                     control={control}
//                     name={`packages.${index}.dimensions.width`}
//                     render={({ field }) => (
//                       <FormControl>
//                         <Input
//                           placeholder="W"
//                           className="w-16"
//                           type="number"
//                           min="1"
//                           value={field.value}
//                           onChange={(e) => field.onChange(parseInt(e.target.value))}
//                         />
//                       </FormControl>
//                     )}
//                   />
//                   <FormField
//                     control={control}
//                     name={`packages.${index}.dimensions.height`}
//                     render={({ field }) => (
//                       <FormControl>
//                         <Input
//                           placeholder="H"
//                           className="w-16"
//                           type="number"
//                           min="1"
//                           value={field.value}
//                           onChange={(e) => field.onChange(parseInt(e.target.value))}
//                         />
//                       </FormControl>
//                     )}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <h4 className="font-medium">Items in Package</h4>
//                 <Button
//                   type="button"
//                   variant="outline"
//                   size="sm"
//                   onClick={() => 
//                     append({
//                       description: "",
//                       quantity: 1,
//                       value: 0,
//                       currency: "USD",
//                       hsCode: "",
//                       countryOfOrigin: ""
//                     }, { focusName: `packages.${index}.items.0.description` })
//                   }
//                 >
//                   <Plus className="h-4 w-4 mr-2" />
//                   Add Item
//                 </Button>
//               </div>

//               {field.items?.map((item, itemIndex) => (
//                 <div key={item.id} className="space-y-3 border p-3 rounded">
//                   <FormField
//                     control={control}
//                     name={`packages.${index}.items.${itemIndex}.description`}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Item Description</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Detailed item description" {...field} />
//                         </FormControl>
//                       </FormItem>
//                     )}
//                   />

//                   <div className="grid grid-cols-4 gap-3">
//                     <FormField
//                       control={control}
//                       name={`packages.${index}.items.${itemIndex}.quantity`}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Quantity</FormLabel>
//                           <FormControl>
//                             <Input
//                               type="number"
//                               min="1"
//                               {...field}
//                               onChange={(e) => field.onChange(parseInt(e.target.value))}
//                             />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={control}
//                       name={`packages.${index}.items.${itemIndex}.value`}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Value</FormLabel>
//                           <FormControl>
//                             <Input
//                               type="number"
//                               min="0"
//                               step="0.01"
//                               {...field}
//                               onChange={(e) => field.onChange(parseFloat(e.target.value))}
//                             />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={control}
//                       name={`packages.${index}.items.${itemIndex}.currency`}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Currency</FormLabel>
//                           <Select onValueChange={field.onChange} value={field.value}>
//                             <FormControl>
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select currency" />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent>
//                               <SelectItem value="USD">USD</SelectItem>
//                               <SelectItem value="EUR">EUR</SelectItem>
//                               <SelectItem value="GBP">GBP</SelectItem>
//                               {/* Add more currencies as needed */}
//                             </SelectContent>
//                           </Select>
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={control}
//                       name={`packages.${index}.items.${itemIndex}.hsCode`}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>HS Code</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Harmonized System code" {...field} />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                   </div>

//                   <FormField
//                     control={control}
//                     name={`packages.${index}.items.${itemIndex}.countryOfOrigin`}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Country of Origin</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Item origin country" {...field} />
//                         </FormControl>
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               ))}
//             </div>

//             <FormField
//               control={control}
//               name={`packages.${index}.specialNotes`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Special Instructions</FormLabel>
//                   <FormControl>
//                     <Textarea placeholder="Fragile, temperature sensitive, etc." {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//           </div>
//         ))}

//         <div className="flex justify-between pt-4">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={() => append(defaultPackage)}
//           >
//             Add Another Package
//           </Button>
//           <Button type="button" onClick={onNext}>
//             Next
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

//***************************************11/6 */

// "use client";

// import { useState } from "react";
// import { PickupFormData } from "@/types/PickupPage";
// // import { validatePackage } from "@/utils/validation";
// import { useFormContext, useFieldArray } from "react-hook-form";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import {
//     FormField,
//     FormControl,
//     FormItem,
//     FormLabel,
// } from "@/components/ui/form";
// import { Textarea } from "@/components/ui/textarea";

// import { PackageDetailsInput } from "./PDetailsInput";
// export const PackageDetails = ({ onNext }: { onNext: () => void }) => {
//     const { control, watch, setValue } = useFormContext<PickupFormData>();
//     const [activeTab, setActiveTab] = useState<"items" | "packages">("items");
//     const [isUpdatingPackages, setIsUpdatingPackages] = useState(false);
//     const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric");
//     const watchedPackages = watch("packages");
//     // Items management
//     const {
//         fields: items,
//         append: appendItem,
//         remove: removeItem,
//     } = useFieldArray({
//         control,
//         name: "items",
//     });

//     // Packages management
//     const { fields: packages, remove: removePackage } = useFieldArray({
//         control,
//         name: "packages",
//     });

//     const handlePackageCountChange = async (count: number) => {
//         setIsUpdatingPackages(true);

//         const currentCount = packages.length;
//         const newPackages = [];

//         if (count > currentCount) {
//             for (let i = 0; i < count; i++) {
//                 newPackages.push(
//                     i < currentCount
//                         ? packages[i]
//                         : {
//                             id: `pkg-${Date.now() + i}`,
//                             packageType: "parcel",
//                             weight: 0.1,
//                             dimensions: { length: 1, width: 1, height: 1 },
//                             itemIds: [],
//                             specialNotes: "",
//                         }
//                 );
//             }
//         } else {
//             newPackages.push(...packages.slice(0, count));
//         }

//         setValue("packages", newPackages);
//         await new Promise((resolve) => setTimeout(resolve, 50));
//         setIsUpdatingPackages(false);
//     };

//     // Helper to find current package for an item

//     const handlePackageSelect = (itemId: string, selectedValue: string) => {
//         // Get current packages array
//         const currentPackages = [...watch("packages")];

//         // Remove item from all packages first
//         currentPackages.forEach((pkg) => {
//             if (pkg.itemIds) {
//                 pkg.itemIds = pkg.itemIds.filter((id) => id !== itemId);
//             }
//         });

//         // Add to selected package if not "unassigned"
//         if (selectedValue !== "unassigned") {
//             const pkgIndex = parseInt(selectedValue);
//             currentPackages[pkgIndex].itemIds = [
//                 ...(currentPackages[pkgIndex].itemIds || []),
//                 itemId,
//             ];
//         }

//         // Update the form state
//         setValue("packages", currentPackages, {
//             shouldDirty: true,
//             shouldTouch: true,
//             shouldValidate: true,
//         });
//     };

//     const getCurrentPackageIndex = (itemId: string) => {
//         return packages.findIndex((pkg) => (pkg.itemIds || []).includes(itemId));
//     };

//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>Package Information</CardTitle>
//                 <div className="flex border-b">
//                     <button
//                         className={`px-4 py-2 ${activeTab === "items" ? "border-b-2 border-primary" : ""}`}
//                         onClick={() => setActiveTab("items")}
//                     >
//                         Items ({items.length})
//                     </button>
//                     <button
//                         className={`px-4 py-2 ${activeTab === "packages" ? "border-b-2 border-primary" : ""}`}
//                         onClick={() => setActiveTab("packages")}
//                     >
//                         Packages ({packages.length})
//                     </button>
//                 </div>
//             </CardHeader>

//             <CardContent className="space-y-6">
//                 {activeTab === "items" ? (
//                     <>
//                         <div className="grid grid-cols-4 gap-4 items-center">
//                             <FormLabel className="flex items-center">
//                                 Total Packages
//                             </FormLabel>
//                             <div className="col-span-2 flex gap-2">
//                                 <Select
//                                     value={packages.length.toString()}
//                                     onValueChange={(value) =>
//                                         handlePackageCountChange(parseInt(value))
//                                     }
//                                     disabled={isUpdatingPackages}
//                                 >
//                                     <SelectTrigger>
//                                         <SelectValue placeholder="Select package count" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
//                                             <SelectItem key={num} value={num.toString()}>
//                                                 {num}
//                                             </SelectItem>
//                                         ))}
//                                     </SelectContent>
//                                 </Select>
//                                 <Select
//                                     value={unitSystem}
//                                     onValueChange={(value: "metric" | "imperial") =>
//                                         setUnitSystem(value)
//                                     }
//                                 >
//                                     <SelectTrigger className="w-[120px]">
//                                         <SelectValue placeholder="Units" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="metric">kg/cm</SelectItem>
//                                         <SelectItem value="imperial">lb/in</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                         </div>
//                         <div className="space-y-4">
//                             {items.map((item) => {
//                                 const currentPackageIndex = getCurrentPackageIndex(item.id);
//                                 const itemIndex = items.findIndex((i) => i.id === item.id);

//                                 return (
//                                     <div
//                                         key={`item-${item.id}`}
//                                         className="border p-4 rounded-lg"
//                                     >
//                                         {/* Desktop Layout (5 columns) */}
//                                         <div className="hidden sm:grid grid-cols-5 gap-4">
//                                             <FormField
//                                                 control={control}
//                                                 name={`items.${itemIndex}.description`}
//                                                 render={({ field }) => (
//                                                     <FormItem>
//                                                         <FormLabel>Description</FormLabel>
//                                                         <FormControl>
//                                                             <Input
//                                                                 placeholder="Item description"
//                                                                 {...field}
//                                                             />
//                                                         </FormControl>
//                                                     </FormItem>
//                                                 )}
//                                             />

//                                             <FormField
//                                                 control={control}
//                                                 name={`items.${itemIndex}.quantity`}
//                                                 render={({ field }) => (
//                                                     <FormItem>
//                                                         <FormLabel>Quantity</FormLabel>
//                                                         <FormControl>
//                                                             <Input
//                                                                 type="number"
//                                                                 min="1"
//                                                                 value={field.value}
//                                                                 onChange={(e) =>
//                                                                     field.onChange(parseInt(e.target.value))
//                                                                 }
//                                                             />
//                                                         </FormControl>
//                                                     </FormItem>
//                                                 )}
//                                             />

//                                             <FormField
//                                                 control={control}
//                                                 name={`items.${itemIndex}.value`}
//                                                 render={({ field }) => (
//                                                     <FormItem>
//                                                         <FormLabel>Value</FormLabel>
//                                                         <FormControl>
//                                                             <Input
//                                                                 type="number"
//                                                                 min="0"
//                                                                 step="0.01"
//                                                                 value={field.value}
//                                                                 onChange={(e) =>
//                                                                     field.onChange(parseFloat(e.target.value))
//                                                                 }
//                                                             />
//                                                         </FormControl>
//                                                     </FormItem>
//                                                 )}
//                                             />

//                                             <div>
//                                                 <FormLabel>Package</FormLabel>
//                                                 <Select
//                                                     value={
//                                                         currentPackageIndex >= 0
//                                                             ? currentPackageIndex.toString()
//                                                             : "unassigned"
//                                                     }
//                                                     onValueChange={(value) =>
//                                                         handlePackageSelect(item.id, value)
//                                                     }
//                                                     disabled={packages.length === 0}
//                                                 >
//                                                     <SelectTrigger className="min-w-[120px]">
//                                                         <SelectValue>
//                                                             {currentPackageIndex >= 0
//                                                                 ? `Box ${currentPackageIndex + 1}`
//                                                                 : "Not assigned"}
//                                                         </SelectValue>
//                                                     </SelectTrigger>
//                                                     <SelectContent>
//                                                         <SelectItem value="unassigned">
//                                                             Not assigned
//                                                         </SelectItem>
//                                                         {packages.map((pkg, pkgIndex) => (
//                                                             <SelectItem
//                                                                 key={pkg.id}
//                                                                 value={pkgIndex.toString()}
//                                                                 className="data-[state=checked]:font-bold data-[state=checked]:bg-accent"
//                                                             >
//                                                                 Box {pkgIndex + 1}
//                                                             </SelectItem>
//                                                         ))}
//                                                     </SelectContent>
//                                                 </Select>
//                                             </div>

//                                             <div className="flex items-end justify-end">
//                                                 <Button
//                                                     type="button"
//                                                     variant="destructive"
//                                                     onClick={() => removeItem(itemIndex)}
//                                                     disabled={items.length <= 1}
//                                                     hidden={items.length <= 1}
//                                                 >
//                                                     Remove
//                                                 </Button>
//                                             </div>
//                                         </div>

//                                         {/* Mobile Layout (stacked) */}
//                                         <div className="sm:hidden space-y-3">
//                                             {/* First row: Description + Package */}
//                                             <div className="grid grid-cols-2 gap-3">
//                                                 <FormField
//                                                     control={control}
//                                                     name={`items.${itemIndex}.description`}
//                                                     render={({ field }) => (
//                                                         <FormItem>
//                                                             <FormLabel>Description</FormLabel>
//                                                             <FormControl>
//                                                                 <Input
//                                                                     placeholder="Item description"
//                                                                     {...field}
//                                                                 />
//                                                             </FormControl>
//                                                         </FormItem>
//                                                     )}
//                                                 />

//                                                 <div>
//                                                     <FormLabel>Package</FormLabel>
//                                                     <Select
//                                                         value={
//                                                             currentPackageIndex >= 0
//                                                                 ? currentPackageIndex.toString()
//                                                                 : "unassigned"
//                                                         }
//                                                         onValueChange={(value) =>
//                                                             handlePackageSelect(item.id, value)
//                                                         }
//                                                         disabled={packages.length === 0}
//                                                     >
//                                                         <SelectTrigger>
//                                                             <SelectValue>
//                                                                 {currentPackageIndex >= 0
//                                                                     ? `Box ${currentPackageIndex + 1}`
//                                                                     : "Not assigned"}
//                                                             </SelectValue>
//                                                         </SelectTrigger>
//                                                         <SelectContent>
//                                                             <SelectItem value="unassigned">
//                                                                 Not assigned
//                                                             </SelectItem>
//                                                             {packages.map((pkg, pkgIndex) => (
//                                                                 <SelectItem
//                                                                     key={pkg.id}
//                                                                     value={pkgIndex.toString()}
//                                                                 >
//                                                                     Box {pkgIndex + 1}
//                                                                 </SelectItem>
//                                                             ))}
//                                                         </SelectContent>
//                                                     </Select>
//                                                 </div>
//                                             </div>

//                                             {/* Second row: Quantity + Value */}
//                                             <div className="grid grid-cols-2 gap-3">
//                                                 <FormField
//                                                     control={control}
//                                                     name={`items.${itemIndex}.quantity`}
//                                                     render={({ field }) => (
//                                                         <FormItem>
//                                                             <FormLabel>Quantity</FormLabel>
//                                                             <FormControl>
//                                                                 <Input
//                                                                     type="number"
//                                                                     min="1"
//                                                                     value={field.value}
//                                                                     onChange={(e) =>
//                                                                         field.onChange(parseInt(e.target.value))
//                                                                     }
//                                                                 />
//                                                             </FormControl>
//                                                         </FormItem>
//                                                     )}
//                                                 />

//                                                 <FormField
//                                                     control={control}
//                                                     name={`items.${itemIndex}.value`}
//                                                     render={({ field }) => (
//                                                         <FormItem>
//                                                             <FormLabel>Value</FormLabel>
//                                                             <FormControl>
//                                                                 <Input
//                                                                     type="number"
//                                                                     min="0"
//                                                                     step="0.01"
//                                                                     value={field.value}
//                                                                     onChange={(e) =>
//                                                                         field.onChange(parseFloat(e.target.value))
//                                                                     }
//                                                                 />
//                                                             </FormControl>
//                                                         </FormItem>
//                                                     )}
//                                                 />
//                                             </div>

//                                             {/* Third row: Remove button */}
//                                             <div className="flex justify-center pt-2">
//                                                 <Button
//                                                     type="button"
//                                                     variant="destructive"
//                                                     className="w-1/2"
//                                                     onClick={() => removeItem(itemIndex)}
//                                                     disabled={items.length <= 1}
//                                                     hidden={items.length <= 1}
//                                                 >
//                                                     Remove
//                                                 </Button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                         <div className="flex items-end">
//                             <Button
//                                 type="button"
//                                 onClick={() =>
//                                     appendItem({
//                                         id: `item-${Date.now()}`,
//                                         description: "",
//                                         quantity: 1,
//                                         value: 0,
//                                         currency: "USD",
//                                         hsCode: "",
//                                     })
//                                 }
//                                 className="w-full"
//                             >
//                                 + Add Item
//                             </Button>
//                         </div>
//                     </>
//                 ) : (
//                     <>
//                         {packages.map((pkg, pkgIndex) => (
//                             <div key={`pkg-${pkg.id}`} className="border p-4 rounded-lg">
//                                 <div className="flex justify-between items-center mb-4">
//                                     <h3 className="font-medium">Box {pkgIndex + 1}</h3>
//                                     <div className="flex gap-2">
//                                         <FormField
//                                             control={control}
//                                             name={`packages.${pkgIndex}.packageType`}
//                                             render={({ field }) => (
//                                                 <Select
//                                                     onValueChange={field.onChange}
//                                                     value={field.value}
//                                                 >
//                                                     <SelectTrigger className="w-[120px]">
//                                                         <SelectValue placeholder="Type" />
//                                                     </SelectTrigger>
//                                                     <SelectContent>
//                                                         <SelectItem value="document">Document</SelectItem>
//                                                         <SelectItem value="parcel">Parcel</SelectItem>
//                                                         <SelectItem value="pallet">Pallet</SelectItem>
//                                                     </SelectContent>
//                                                 </Select>
//                                             )}
//                                         />
//                                         {packages.length > 1 && (
//                                             <Button
//                                                 type="button"
//                                                 variant="destructive"
//                                                 size="sm"
//                                                 onClick={() => removePackage(pkgIndex)}
//                                                 disabled={isUpdatingPackages}
//                                             >
//                                                 Remove
//                                             </Button>
//                                         )}
//                                     </div>
//                                 </div>

//                                 <div className="space-y-4">
//                                     <h4 className="font-medium">Assigned Items</h4>
//                                     {items.filter((item) => (pkg.itemIds || []).includes(item.id))
//                                         .length === 0 ? (
//                                         <p className="text-muted-foreground">No items assigned</p>
//                                     ) : (
//                                         <div className="space-y-2">
//                                             {items
//                                                 .filter((item) => (pkg.itemIds || []).includes(item.id))
//                                                 .map((item) => {
//                                                     const itemIndex = items.findIndex(
//                                                         (i) => i.id === item.id
//                                                     );
//                                                     return (
//                                                         <div
//                                                             key={`assigned-${item.id}`}
//                                                             className="flex items-center gap-4 p-2 border rounded bg-accent/30"
//                                                         >
//                                                             <span className="flex-1 font-medium">
//                                                                 {watch(`items.${itemIndex}.description`) ||
//                                                                     "Unnamed item"}
//                                                             </span>
//                                                             <span className="text-sm">
//                                                                 Qty: {watch(`items.${itemIndex}.quantity`)}
//                                                             </span>
//                                                             <Button
//                                                                 type="button"
//                                                                 variant="ghost"
//                                                                 size="sm"
//                                                                 onClick={() =>
//                                                                     handlePackageSelect(item.id, "unassigned")
//                                                                 }
//                                                                 className="text-destructive"
//                                                             >
//                                                                 Unassign
//                                                             </Button>
//                                                         </div>
//                                                     );
//                                                 })}
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* ✨ Reusable component here ✨ */}
//                                 <PackageDetailsInput
//                                     control={control}
//                                     pkgIndex={pkgIndex}
//                                     disabled={isUpdatingPackages}
//                                     unitSystem={unitSystem}
//                                 />

//                                 <FormField
//                                     control={control}
//                                     name={`packages.${pkgIndex}.specialNotes`}
//                                     render={({ field }) => (
//                                         <FormItem className="mt-4">
//                                             <FormLabel>Special Instructions</FormLabel>
//                                             <FormControl>
//                                                 <Textarea
//                                                     placeholder="Fragile, temperature sensitive, etc."
//                                                     {...field}
//                                                     disabled={isUpdatingPackages}
//                                                 />
//                                             </FormControl>
//                                         </FormItem>
//                                     )}
//                                 />
//                             </div>
//                         ))}
//                     </>
//                 )}

//                 <div className="flex justify-between pt-4">
//                     {activeTab === "packages" && (
//                         <Button
//                             type="button"
//                             variant="outline"
//                             onClick={() => setActiveTab("items")}
//                             disabled={isUpdatingPackages}
//                         >
//                             ← Back to Items
//                         </Button>
//                     )}
//                     {activeTab === "items" && items.length > 0 && (
//                         <Button
//                             type="button"
//                             onClick={() => setActiveTab("packages")}
//                             disabled={isUpdatingPackages}
//                             className="ml-auto"
//                         >
//                             Continue to Packages →
//                         </Button>
//                     )}
//                     {activeTab === "packages" && (
//                         <Button
//                             type="button"
//                             onClick={onNext}
//                             disabled={isUpdatingPackages}
//                         >
//                             Next Step
//                         </Button>
//                     )}
//                 </div>
//             </CardContent>
//         </Card>
//     );
// };

//*****************************6:02 13/07 */
"use client";

import {
  useState,
  // useRef 
} from "react";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import { PickupFormData } from "../utils/shipping-calculations";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
} from "../components/ui/form";
import { Textarea } from "../components/ui/textarea";
import { PackageDetailsInput } from "./PDetailsInput";
import { ItemDescriptionCombobox } from "./itemDescription";

export const PackageDetails = ({ onNext }: { onNext: () => void }) => {
  const { control, watch, setValue } = useFormContext<PickupFormData>();
  const [activeTab, setActiveTab] = useState<"items" | "packages">("items");
  const [isUpdatingPackages, setIsUpdatingPackages] = useState(false);
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric");
  const watchedPackages = useWatch({ name: "packages", control });
  const watchedItems = useWatch({ name: "items", control });

  const {
    fields: items,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({ control, name: "items" });

  const { fields: packages, remove: removePackage } = useFieldArray({ control, name: "packages" });

  const handlePackageCountChange = async (count: number) => {
    setIsUpdatingPackages(true);
    const currentCount = packages.length;
    const newPackages = [];
    if (count > currentCount) {
      for (let i = 0; i < count; i++) {
        newPackages.push(
          i < currentCount
            ? packages[i]
            : {
              id: crypto.randomUUID(),
              packageType: "parcel",
              weight: 1,
              dimensions: { length: 1, width: 1, height: 1 },
              itemIds: [],
              specialNotes: "",
            }
        );
      }
    } else {
      newPackages.push(...packages.slice(0, count));
    }
    setValue("packages", newPackages);
    await new Promise((resolve) => setTimeout(resolve, 50));
    setIsUpdatingPackages(false);
  };

  const handlePackageSelect = (itemId: string, selectedValue: string) => {
    const currentPackages = [...watch("packages")];
    currentPackages.forEach((pkg) => {
      if (pkg.itemIds) {
        pkg.itemIds = pkg.itemIds.filter((id) => id !== itemId);
      }
    });
    if (selectedValue !== "unassigned") {
      const pkgIndex = parseInt(selectedValue);
      currentPackages[pkgIndex].itemIds = [
        ...(currentPackages[pkgIndex].itemIds || []),
        itemId,
      ];
    }
    setValue("packages", currentPackages, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const getCurrentPackageIndex = (itemId: string) => {
    return watchedPackages.findIndex((pkg) => (pkg.itemIds || []).includes(itemId));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Package Information</CardTitle>
        <div className="flex border-b">
          <button
            className={`px-4 py-2 ${activeTab === "items" ? "border-b-2 border-primary" : ""}`}
            onClick={() => setActiveTab("items")}
          >
            Contents ({items.length})
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "packages" ? "border-b-2 border-primary" : ""}`}
            onClick={() => setActiveTab("packages")}
          >
            Packages ({packages.length})
          </button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {activeTab === "items" ? (
          <>
            <div className="grid grid-cols-4 gap-4 items-center">
              <FormLabel className="flex items-center">Total Packages</FormLabel>
              <div className="col-span-2 flex gap-2">
                <Select
                  value={packages.length.toString()}
                  onValueChange={(value) => handlePackageCountChange(parseInt(value))}
                  disabled={isUpdatingPackages}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select package count" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={unitSystem}
                  onValueChange={(value: "metric" | "imperial") => setUnitSystem(value)}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Units" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric">kg/cm</SelectItem>
                    <SelectItem value="imperial">lb/in</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              {items.map((_, itemIndex) => {
                const itemId = watchedItems?.[itemIndex]?.id ?? items[itemIndex].id;
                const currentPackageIndex = getCurrentPackageIndex(itemId);
                return (
                  <div key={`item-${itemId}`} className="border p-4 rounded-lg">
                    <div className="hidden sm:grid grid-cols-5 gap-4">
                      <ItemDescriptionCombobox itemIndex={itemIndex} />
                      <FormField
                        control={control}
                        name={`items.${itemIndex}.quantity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                value={field.value}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name={`items.${itemIndex}.value`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Value</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                step="0.01"
                                value={field.value}
                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <div>
                        <FormLabel>Package</FormLabel>
                        <Select
                          value={currentPackageIndex >= 0 ? currentPackageIndex.toString() : "unassigned"}
                          onValueChange={(value) => handlePackageSelect(itemId, value)}
                          disabled={packages.length === 0}
                        >
                          <SelectTrigger className="min-w-[120px]">
                            <SelectValue>
                              {currentPackageIndex >= 0 ? `Box ${currentPackageIndex + 1}` : "Not assigned"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="unassigned">Not assigned</SelectItem>
                            {watchedPackages.map((pkg, pkgIndex) => (
                              <SelectItem key={pkg.id} value={pkgIndex.toString()}>
                                Box {pkgIndex + 1}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-end justify-end">
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => removeItem(itemIndex)}
                          disabled={items.length <= 1}
                          hidden={items.length <= 1}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="sm:hidden space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <ItemDescriptionCombobox itemIndex={itemIndex} />
                        <div>
                          <FormLabel>Package</FormLabel>
                          <Select
                            value={currentPackageIndex >= 0 ? currentPackageIndex.toString() : "unassigned"}
                            onValueChange={(value) => handlePackageSelect(itemId, value)}
                            disabled={packages.length === 0}
                          >
                            <SelectTrigger>
                              <SelectValue>
                                {currentPackageIndex >= 0 ? `Box ${currentPackageIndex + 1}` : "Not assigned"}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="unassigned">Not assigned</SelectItem>
                              {watchedPackages.map((pkg, pkgIndex) => (
                                <SelectItem key={pkg.id} value={pkgIndex.toString()}>
                                  Box {pkgIndex + 1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <FormField
                          control={control}
                          name={`items.${itemIndex}.quantity`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Quantity</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="1"
                                  value={field.value}
                                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name={`items.${itemIndex}.value`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Value</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={field.value}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex justify-center pt-2">
                        <Button
                          type="button"
                          variant="destructive"
                          className="w-1/2"
                          onClick={() => removeItem(itemIndex)}
                          disabled={items.length <= 1}
                          hidden={items.length <= 1}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-end">
              <Button
                type="button"
                onClick={() => {
                  const newItemId = crypto.randomUUID();
                  appendItem({
                    id: newItemId,
                    description: "",
                    quantity: 1,
                    value: 0,
                    currency: "USD",
                    hsCode: "",
                  });
                  if (packages.length === 1) {
                    const updatedPackages = [...packages];
                    updatedPackages[0].itemIds = [...(updatedPackages[0].itemIds || []), newItemId];
                    setValue("packages", updatedPackages, {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: true,
                    });
                  }
                }}
                className="w-full"
              >
                + Add Item
              </Button>
            </div>
          </>
        ) : (
          <>
            {watchedPackages.map((pkg, pkgIndex) => (
              <div key={`pkg-${pkg.id}`} className="border p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Box {pkgIndex + 1}</h3>
                  <div className="flex gap-2">
                    <FormField
                      control={control}
                      name={`packages.${pkgIndex}.packageType`}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="document">Document</SelectItem>
                            <SelectItem value="parcel">Parcel</SelectItem>
                            <SelectItem value="pallet">Pallet</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {packages.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removePackage(pkgIndex)}
                        disabled={isUpdatingPackages}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Assigned Items</h4>
                  {items.filter((_, itemIndex) => {
                    const itemId = watchedItems?.[itemIndex]?.id ?? items[itemIndex].id;
                    return (pkg.itemIds || []).includes(itemId);
                  }).length === 0 ? (
                    <p className="text-muted-foreground">No items assigned</p>
                  ) : (
                    <div className="space-y-2">
                      {items.map((_, itemIndex) => {
                        const itemId = watchedItems?.[itemIndex]?.id ?? items[itemIndex].id;
                        if (!(pkg.itemIds || []).includes(itemId)) return null;
                        return (
                          <div key={`assigned-${itemId}`} className="flex items-center gap-4 p-2 border rounded bg-accent/30">
                            <span className="flex-1 font-medium">
                              {watch(`items.${itemIndex}.description`) || "Unnamed item"}
                            </span>
                            <span className="text-sm">Qty: {watch(`items.${itemIndex}.quantity`)}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePackageSelect(itemId, "unassigned")}
                              className="text-destructive"
                            >
                              Unassign
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <PackageDetailsInput
                    control={control}
                    pkgIndex={pkgIndex}
                    disabled={isUpdatingPackages}
                    unitSystem={unitSystem}
                  />
                  <FormField
                    control={control}
                    name={`packages.${pkgIndex}.specialNotes`}
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Special Instructions</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Fragile, temperature sensitive, etc."
                            {...field}
                            disabled={isUpdatingPackages}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </>
        )}

        <div className="flex justify-between pt-4">
          {activeTab === "packages" && (
            <Button type="button" variant="outline" onClick={() => setActiveTab("items")} disabled={isUpdatingPackages}>
              ← Back to Items
            </Button>
          )}
          {activeTab === "items" && items.length > 0 && (
            <Button type="button" onClick={() => setActiveTab("packages")} disabled={isUpdatingPackages} className="ml-auto">
              Continue to Packages →
            </Button>
          )}
          {activeTab === "packages" && (
            <Button type="button" onClick={onNext} disabled={isUpdatingPackages}>
              Next Step
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
