// // // PickupsContent.tsx
// // import { Edit, Eye, Plus, Trash2 } from 'lucide-react';
// // import StatusBadge from './StatusBadge';

// // export default function PickupsContent() {
// //   const pickups = [
// // { id: 'PICK-001', type: 'OUTBOUND_SHIPMENT', status: 'SCHEDULED', date: '2023-04-05', customer: 'John Doe' },
// //      { id: 'PICK-002', type: 'WAREHOUSE_TRANSFER', status: 'COMPLETED', date: '2023-04-04', customer: 'Jane Smith' },
// //      { id: 'PICK-003', type: 'INBOUND_RETURN', status: 'PENDING', date: '2023-04-06', customer: 'Bob Johnson' },
// //   ];

// //   return (

// // <div className="bg-white rounded-lg shadow">
// //        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
// //          <h3 className="text-lg font-medium text-gray-900">Pickups Management</h3>
// //          <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
// //            <Plus className="h-4 w-4 mr-2" />
// //            Schedule Pickup
// //          </button>
// //        </div>
// //        <div className="overflow-x-auto">
// //          <table className="min-w-full divide-y divide-gray-200">
// //            <thead className="bg-gray-50">
// //              <tr>
// //                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup ID</th>
// //                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
// //                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
// //                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
// //                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
// //                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
// //              </tr>
// //            </thead>
// //            <tbody className="bg-white divide-y divide-gray-200">
// //              {pickups.map((pickup) => (
// //               <tr key={pickup.id}>
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pickup.id}</td>
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pickup.type.replace('_', ' ')}</td>
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pickup.customer}</td>
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pickup.date}</td>
// //                 <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={pickup.status} />
// //                   {/* <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(pickup.status)}`}>
// //                     {pickup.status}
// //                   </span> */}
// //                 </td>
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
// //                   <button className="text-blue-600 hover:text-blue-900 mr-3">
// //                     <Eye className="h-4 w-4" />
// //                   </button>
// //                   <button className="text-green-600 hover:text-green-900 mr-3">
// //                     <Edit className="h-4 w-4" />
// //                   </button>
// //                   <button className="text-red-600 hover:text-red-900">
// //                     <Trash2 className="h-4 w-4" />
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>

// //   );
// // }


// "use client"
// import { Edit, Eye, Plus, Trash2 } from 'lucide-react';
// import StatusBadge from './StatusBadge';
// import { useEffect, useState } from 'react';
// import { Pickup } from '@prisma/client';

// export default function PickupsContent() {
//   const [pickups, setPickups] = useState<Pickup[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   async function fetchPickups() {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/admin/pickups");
//       if (!res.ok) throw new Error("Failed to fetch pickups");
//       const data = await res.json();
//       setPickups(data);
//     } catch (error) {
//       console.error(error);
//       setError(error instanceof Error ? error.message : "Failed to load pickups");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchPickups();
//   }, []);

//   if (loading) {
//     return <div className="p-6">Loading pickups...</div>;
//   }

//   if (error) {
//     return <div className="p-6 text-red-500">Error: {error}</div>;
//   }

//   const formatPickupType = (type: string) => {
//     return type.toLowerCase()
//       .replace(/_/g, ' ')
//       .replace(/\b\w/g, l => l.toUpperCase());
//   };

//   return (
//     <div className="bg-white rounded-lg shadow">
//       <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//         <h3 className="text-lg font-medium text-gray-900">Pickups Management</h3>
//         <button 
//           className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition-colors"
//           onClick={() => {/* Add your pickup creation logic here */}}
//         >
//           <Plus className="h-4 w-4 mr-2" />
//           Schedule Pickup
//         </button>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup ID</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {pickups.map((pickup) => (
//               <tr key={pickup.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {pickup.id.substring(0, 8)}...{pickup.id.substring(pickup.id.length - 4)}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {formatPickupType(pickup.type)}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {new Date(pickup.scheduledDate).toLocaleDateString()}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <StatusBadge status={pickup.status} />
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <button className="text-blue-600 hover:text-blue-900 mr-3">
//                     <Eye className="h-4 w-4" />
//                   </button>
//                   <button className="text-green-600 hover:text-green-900 mr-3">
//                     <Edit className="h-4 w-4" />
//                   </button>
//                   <button className="text-red-600 hover:text-red-900">
//                     <Trash2 className="h-4 w-4" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

"use client"
import { Edit, Eye, Plus, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { useEffect, useState } from 'react';
import { PickupWithRelations } from '../../../types/PickupPage';

export default function PickupsContent() {
  const [pickups, setPickups] = useState<PickupWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPickups = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/pickups");
      if (!res.ok) throw new Error("Failed to fetch pickups");
      const data = await res.json();
      setPickups(data);
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "Failed to load pickups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPickups();
  }, []);

  const getCustomerInfo = (pickup: PickupWithRelations) => {
    // Check for registered user first
    if (pickup.User.length > 0) {
      return {
        name: pickup.User[0].name || pickup.User[0].email,
        type: "Registered User",
        contact: pickup.User[0].email
      };
    }

    // Check for guest checkout
    if (pickup.GuestCheckout.length > 0) {
      return {
        name: pickup.GuestCheckout[0].name || "Guest Customer",
        type: "Guest Checkout",
        contact: pickup.GuestCheckout[0].email
      };
    }

    // Check for guest session
    if (pickup.GuestSession.length > 0) {
      return {
        name: pickup.pickupContact?.name || "Guest Customer",
        type: "Guest Session",
        contact: pickup.pickupContact?.email || pickup.pickupContact?.phone || "No contact"
      };
    }

    // Fallback to pickup contact
    return {
      name: pickup.pickupContact?.name || "Unknown Customer",
      type: "Unknown Type",
      contact: pickup.pickupContact?.email || pickup.pickupContact?.phone || "No contact"
    };
  };

  const formatPickupType = (type: string) => {
    return type.replace(/_/g, ' ')
              .replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) return <div className="p-6">Loading pickups...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Pickups Management</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          New Pickup
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pickups.map((pickup) => {
              const customer = getCustomerInfo(pickup);
              return (
                <tr key={pickup.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {pickup.id.substring(0, 8)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.name}</div>
                    <div className="text-xs text-gray-500">{customer.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatPickupType(pickup.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.contact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(pickup.scheduledDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={pickup.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900 mr-3">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}