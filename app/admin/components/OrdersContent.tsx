/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// OrdersContent.tsx
"use client"
import { Edit, Eye, Filter, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { useEffect, useState } from 'react';
import { Order } from '@prisma/client';

interface TableOrder {
  id: string;
  customer: string;
  total: number;
  status: string;
  date: string;
}

export default function OrdersContent() {
  const [orders, setOrders] = useState<TableOrder[]>([]);
  // const [orders, setOrders] = useState([
  //   { id: 'ORD-001', customer: 'John Doe', total: 149.98, status: 'Processing', date: '2023-04-01' },
  //   { id: 'ORD-002', customer: 'Jane Smith', total: 299.97, status: 'Shipped', date: '2023-04-02' },
  //   { id: 'ORD-003', customer: 'Bob Johnson', total: 79.99, status: 'Delivered', date: '2023-04-03' },
  //   { id: 'ORD-004', customer: 'Alice Brown', total: 39.99, status: 'Pending', date: '2023-04-04' },
  // ]);
const [loading, setLoading] = useState(true);
async function fetchOrders() {
  setLoading(true);
  try {
    const res = await fetch("/api/admin/orders");
    if (!res.ok) throw new Error("Failed to fetch orders");
    const data = await res.json();
    
    // Transform to table format
    const formattedOrders = data.map((order: any) => ({
      id: order.id,
      customer: order.user?.name || 'Guest Customer', // Fallback if no user
      total: order.total,
      status: order.status,
      date: new Date(order.createdAt).toISOString().split('T')[0]
    }));
    
    setOrders(formattedOrders);
  } catch (error) {
    console.error(error);
    setOrders([]);
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    fetchOrders();
  }, []);

 const createTestOrder = async () => {
    try {
      const response = await fetch('/api/admin/orders', {
        method: 'POST'
      });
      
      if (!response.ok) throw new Error('Failed to create order');
      
      const newOrder = await response.json();
      setOrders([...orders, {
        id: newOrder.id,
        customer: 'Test Customer',
        total: newOrder.total,
        status: newOrder.status,
        date: new Date().toISOString().split('T')[0]
      }]);
      
    } catch (error) {
      console.error('Error creating test order:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* <h2 className="text-xl font-semibold mb-4">Orders</h2> */}
           <div className="bg-white rounded-lg shadow">
       <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
         <h3 className="text-lg font-medium text-gray-900">Orders Management</h3>
         <div className="flex space-x-2">
           <button  onClick={createTestOrder}
               className="border border-gray-300 px-4 py-2 rounded-md flex items-center bg-blue-50 hover:bg-blue-100" >
                            <Filter className="h-4 w-4 mr-2" />
             Filter
           </button>
         </div>
       </div>
       </div>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Order ID</th>
            <th className="px-4 py-2 text-left">Customer</th>
            <th className="px-4 py-2 text-left">Total</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="border-t">
              <td className="px-4 py-2">{order.id}</td>
              <td className="px-4 py-2">{order.customer}</td>
              <td className="px-4 py-2">${order.total.toFixed(2)}</td>
              <td className="px-4 py-2"><StatusBadge status={order.status} /></td>
              <td className="px-4 py-2">{order.date}</td>
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
          ))}
        </tbody>
      </table>
    </div>
  );
}



// import { Edit, Eye, Filter, Trash2, Plus } from 'lucide-react';
// import StatusBadge from './StatusBadge';
// import { useState } from 'react';

// export default function OrdersContent() {
  // const [orders, setOrders] = useState([
  //   { id: 'ORD-001', customer: 'John Doe', total: 149.98, status: 'Processing', date: '2023-04-01' },
  //   { id: 'ORD-002', customer: 'Jane Smith', total: 299.97, status: 'Shipped', date: '2023-04-02' },
  //   { id: 'ORD-003', customer: 'Bob Johnson', total: 79.99, status: 'Delivered', date: '2023-04-03' },
  //   { id: 'ORD-004', customer: 'Alice Brown', total: 39.99, status: 'Pending', date: '2023-04-04' },
  // ]);

//   const createTestOrder = async () => {
//     try {
//       const response = await fetch('/api/admin/orders', {
//         method: 'POST'
//       });
      
//       if (!response.ok) throw new Error('Failed to create order');
      
//       const newOrder = await response.json();
//       setOrders([...orders, {
//         id: newOrder.id,
//         customer: 'Test Customer',
//         total: newOrder.total,
//         status: newOrder.status,
//         date: new Date().toISOString().split('T')[0]
//       }]);
      
//     } catch (error) {
//       console.error('Error creating test order:', error);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <div className="bg-white rounded-lg shadow">
//         <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//           <h3 className="text-lg font-medium text-gray-900">Orders Management</h3>
//           <div className="flex space-x-2">
//             <button 
//               onClick={createTestOrder}
//               className="border border-gray-300 px-4 py-2 rounded-md flex items-center bg-blue-50 hover:bg-blue-100"
//             >
//               <Plus className="h-4 w-4 mr-2" />
//               Create Test Order
//             </button>
//             <button className="border border-gray-300 px-4 py-2 rounded-md flex items-center">
//               <Filter className="h-4 w-4 mr-2" />
//               Filter
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* Rest of your table code remains the same */}
//     </div>
//   );
// }