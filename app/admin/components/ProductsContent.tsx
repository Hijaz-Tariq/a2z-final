/* eslint-disable @typescript-eslint/no-unused-vars */
// // ProductsContent.tsx
// import { Edit, Eye, Plus, Trash2 } from 'lucide-react';
// import StatusBadge from './StatusBadge';
// import { Button } from '../../../components/ui/button';
// import { Category } from '@prisma/client';
// // import { useProducts } from '../../../hooks/useProducts';

// // interface Product {
// //   id: string;
// //   name: string | null;
// //   category: Category;
// //   price: number | null;
// //   stock: string;
// //   status: string;
// //   updatedAt: string;
// // }
// export default function ProductsContent() {
//   const products = [
//     { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 99.99, stock: 50, status: 'In Stock' },
//     { id: 2, name: 'Smart Watch', category: 'Electronics', price: 199.99, stock: 25, status: 'Low Stock' },
//     { id: 3, name: 'Coffee Maker', category: 'Home', price: 79.99, stock: 0, status: 'Out of Stock' },
//     { id: 4, name: 'Desk Lamp', category: 'Home', price: 39.99, stock: 100, status: 'In Stock' },
//   ];

// // const products = useProducts()

//   return (

//     <div className="bg-white rounded-lg shadow">
//       <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//         <h3 className="text-lg font-medium text-gray-900">Products Management</h3>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
//           <Plus className="h-4 w-4 mr-2" />
//           Add Product
//         </button>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {products.map((product) => (
//               <tr key={product.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
//                 <td className="px-6 py-4 whitespace-nowrap"> <StatusBadge status={product.status} />
//                                  </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <button className="text-blue-600 hover:text-blue-900 mr-3">
//                     <Eye className="h-4 w-4" />
//                   </button>
//                   <Button className="text-green-600 hover:text-green-900 mr-3">
//                     <Edit className="h-4 w-4" />
//                   </Button>
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


// // "use client";

// // import { Edit, Eye, Plus, Trash2 } from "lucide-react";
// // import { Role } from "@prisma/client";
// // import { useState, useEffect } from "react";
// // import { useAdminEdit } from "../AdminEditProvider";
// // import SaveCancelBar from "./SaveCancelBar";

// // interface User {
// //   id: string;
// //   name: string | null;
// //   email: string | null;
// //   role: Role;
// //   status: string;
// //   createdAt: string;
// // }

// // export default function UsersContent() {
// //   const [users, setUsers] = useState<User[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const { editedUsers, setEditedUsers } = useAdminEdit();

// //   // Count of edited users (for showing in Save button label)
// //   const editedCount = Object.keys(editedUsers).length;
// //   const isDirty = editedCount > 0;

// //   // Fetch users from API
// //   async function fetchUsers() {
// //     setLoading(true);
// //     try {
// //       const res = await fetch("/api/admin/users");
// //       if (!res.ok) throw new Error("Failed to fetch users");
// //       const data: User[] = await res.json();
// //       setUsers(data);
// //     } catch (error) {
// //       console.error(error);
// //       setUsers([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   useEffect(() => {
// //     fetchUsers();
// //   }, []);

// //   // Update editedUsers state when role select changes
// //   function onRoleChange(userId: string, newRole: Role) {
// //     setEditedUsers((prev) => ({
// //       ...prev,
// //       [userId]: { ...prev[userId], role: newRole },
// //     }));
// //   }

// //   // Show the edited role if changed, otherwise original role
// //   function getRole(user: User): Role {
// //     return (editedUsers[user.id]?.role as Role) ?? user.role;
// //   }

// //   // Save all edited users in batch via API, then refresh users list
// //   const saveAll = async () => {
// //     try {
// //       const updates = Object.entries(editedUsers).map(([userId, changes]) => ({
// //         userId,
// //         role: changes.role,
// //       }));

// //       if (updates.length === 0) return;

// //       const res = await fetch("/api/admin/users", {
// //         method: "PATCH",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(updates),
// //       });

// //       if (!res.ok) throw new Error("Batch update failed");

// //       // Clear edits and refresh list
// //       setEditedUsers({});
// //       await fetchUsers();

// //       alert("All changes saved successfully!");
// //     } catch (error) {
// //       console.error(error);
// //       alert("Failed to save changes.");
// //     }
// //   };

// //   // Cancel all edits without refreshing
// //   const cancelAll = () => {
// //     setEditedUsers({});
// //   };

// //   if (loading) return <p>Loading users...</p>;
// //   if (!users.length) return <p>No users found.</p>;

// //   return (
// //     <div className="bg-white rounded-lg shadow">
// //       <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
// //         <div className="flex items-center space-x-3">
// //           <h3 className="text-lg font-medium text-gray-900">Users Management</h3>
// //           <SaveCancelBar
// //             isDirty={isDirty}
// //             editedCount={editedCount}
// //             onSave={saveAll}
// //             onCancel={cancelAll}
// //           />
// //         </div>

// //         <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
// //           <Plus className="h-4 w-4 mr-2" />
// //           Add User
// //         </button>
// //       </div>

// //       <div className="overflow-x-auto">
// //         <table className="min-w-full divide-y divide-gray-200">
// //           <thead className="bg-gray-50">
// //             <tr>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody className="bg-white divide-y divide-gray-200">
// //             {users.map((user) => (
// //               <tr key={user.id}>
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name ?? "—"}</td>
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email ?? "—"}</td>
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
// //                   <select
// //                     value={getRole(user)}
// //                     onChange={(e) => onRoleChange(user.id, e.target.value as Role)}
// //                     className="p-1 rounded border"
// //                   >
// //                     {Object.values(Role).map((r) => (
// //                       <option key={r} value={r}>{r}</option>
// //                     ))}
// //                   </select>
// //                 </td>
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                   {user.status}
// //                   /TODO: Verified, Active, Waiting ..etc */
// //                   </td>
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                   {new Date(user.createdAt).toLocaleDateString()}
// //                 </td>
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
// //                   <button className="text-blue-600 hover:text-blue-900 mr-3"><Eye className="h-4 w-4" /></button>
// //                   <button className="text-green-600 hover:text-green-900 mr-3"><Edit className="h-4 w-4" /></button>
// //                   <button className="text-red-600 hover:text-red-900"><Trash2 className="h-4 w-4" /></button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }

import { Edit, Eye, Plus, Trash2 } from 'lucide-react';
// import StatusBadge from './StatusBadge';
import { Button } from '../../../components/ui/button';
import { useProducts } from '../../../hooks/useProducts';
import { AddProduct } from './addProduct';
import { EditProduct } from './editDialog';

// interface Product {
//   id: string;
//   name: string | null;
//   category: {
//     name: string;
//   };
//   price: number | null;
//   stock: string;
//   status: string;
//   updatedAt: string;
// }

export default function ProductsContent() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Products Management</h3>
        {/* <Button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button> */}
        <AddProduct />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">on Sale</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products?.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category?.name || 'No Category'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${Number(product.price)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.isOnSale ? 'Yes' : 'NO'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* <StatusBadge status={product.status} /> */}
                </td>
                <td className="px-6 py-4 m-0.5 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    {/* <Eye className="h-4 w-4" /> */}
                  </button>
                  {/* <button className="text-green-600 hover:text-green-900 mr-3">
                    <Edit className="h-4 w-4" />
                  </button> */}
                  <EditProduct product={product}                    // productId={product.id}
                    // onSave={() => {
                      // Optional: Refetch products after update
                    // }}
                  />
                  <Button className="text-red-600 hover:text-red-900 p-1">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
