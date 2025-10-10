/* eslint-disable @typescript-eslint/no-explicit-any */
// //components/pricesContent.tsx
// 'use client';

// import { useState } from 'react';
// import { ShippingPricingList } from './shipping-pricing-list';
// import { ShippingPricingForm } from './shipping-pricing-form';

// export default function ShippingPricingAdminPage() {
//   const [showForm, setShowForm] = useState(false);
//   const [editingPricing, setEditingPricing] = useState<any>(null);

//   const handleEdit = (pricing: any) => {
//     setEditingPricing(pricing);
//     setShowForm(true);
//   };

//   const handleSuccess = () => {
//     setShowForm(false);
//     setEditingPricing(null);
//     window.location.reload();
//   };

//   const handleCancel = () => {
//     setShowForm(false);
//     setEditingPricing(null);
//   };

//   if (showForm) {
//     return (
//       <div className="container mx-auto py-6">
//         <ShippingPricingForm
//           existingPricing={editingPricing}
//           onSuccess={handleSuccess}
//           onCancel={handleCancel}
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-6">
//       <ShippingPricingList />
//     </div>
//   );
// }

// components/pricesContent.tsx
'use client';

import { useState } from 'react';
import { ShippingPricingList } from './shipping-pricing-list';
import { ShippingPricingForm } from './shipping-pricing-form';

export default function ShippingPricingAdminPage() {
    const [showForm, setShowForm] = useState(false);
    const [editingPricing, setEditingPricing] = useState<any>(null);

    const handleAddNew = () => {
        setEditingPricing(null);
        setShowForm(true);
    };

    const handleEdit = (pricing: any) => {
        setEditingPricing(pricing);
        setShowForm(true);
    };

    const handleSuccess = () => {
        setShowForm(false);
        setEditingPricing(null);
        window.location.reload();
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingPricing(null);
    };

    if (showForm) {
        return (
            <div className="container mx-auto py-6">
                <ShippingPricingForm
                    existingPricing={editingPricing}
                    onSuccess={handleSuccess}
                    onCancel={handleCancel}
                />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-6">
            <ShippingPricingList
                onAddNew={handleAddNew}
                onEdit={handleEdit}
            />
        </div>
    );
}