// // // // UsersContent.tsx
// // // import { Edit, Eye, Plus, Trash2 } from 'lucide-react';
// // // import StatusBadge from './StatusBadge';

// // // export default function UsersContent() {
// // //   const users = [
// // //     // { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
// // //     // { id: 2, name: 'Eva Smith', email: 'eva@example.com', status: 'pending' },
// // //      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'CUSTOMER', status: 'Active', createdAt: '2023-01-15' },
// // //     { id: 2, name: 'Eva Smith', email: 'jane@example.com', role: 'AGENT', status: 'Active', createdAt: '2023-02-20' },
// // //     { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'BROKER', status: 'Pending', createdAt: '2023-03-10' },
// // //     { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'ADMIN', status: 'Active', createdAt: '2023-01-05' },
// // //   ];

// // //   return (
// // //     // <div className="bg-white rounded-lg shadow p-6">
// // //     //   <h2 className="text-xl font-semibold mb-4">Users</h2>
// // //     //   <table className="min-w-full table-auto">
// // //     //     <thead>
// // //     //       <tr>
// // //     //         <th className="px-4 py-2 text-left">Name</th>
// // //     //         <th className="px-4 py-2 text-left">Email</th>
// // //     //         <th className="px-4 py-2 text-left">Status</th>
// // //     //       </tr>
// // //     //     </thead>
// // //     //     <tbody>
// // //     //       {users.map(user => (
// // //     //         <tr key={user.id} className="border-t">
// // //     //           <td className="px-4 py-2">{user.name}</td>
// // //     //           <td className="px-4 py-2">{user.email}</td>
// // //     //           <td className="px-4 py-2"><StatusBadge status={user.status} /></td>
// // //     //         </tr>
// // //     //       ))}
// // //     //     </tbody>
// // //     //   </table>
// // //     // </div>

// // //  <div className="bg-white rounded-lg shadow">
// // //       <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
// // //         <h3 className="text-lg font-medium text-gray-900">Users Management</h3>
// // //         <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
// // //           <Plus className="h-4 w-4 mr-2" />
// // //           Add User
// // //         </button>
// // //       </div>
// // //       <div className="overflow-x-auto">
// // //         <table className="min-w-full divide-y divide-gray-200">
// // //           <thead className="bg-gray-50">
// // //             <tr>
// // //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
// // //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
// // //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
// // //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
// // //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
// // //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody className="bg-white divide-y divide-gray-200">
// // //             {users.map((user) => (
// // //               <tr key={user.id}>
// // //                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
// // //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
// // //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
// // //                 <td className="px-6 py-4 whitespace-nowrap">
// // //                   {/* <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}> */}
// // //                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${StatusBadge}`}>
// // //                     {user.status}
// // //                   </span>
// // //                 </td>
// // //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.createdAt}</td>
// // //                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
// // //                   <button className="text-blue-600 hover:text-blue-900 mr-3">
// // //                     <Eye className="h-4 w-4" />
// // //                   </button>
// // //                   <button className="text-green-600 hover:text-green-900 mr-3">
// // //                     <Edit className="h-4 w-4" />
// // //                   </button>
// // //                   <button className="text-red-600 hover:text-red-900">
// // //                     <Trash2 className="h-4 w-4" />
// // //                   </button>
// // //                 </td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>
// // //       </div>
// // //     </div>

// // //   );
// // // }

// // 'use client';

// // import { useState, useEffect } from "react";
// // import { Edit, Eye, Plus, Trash2 } from "lucide-react";
// // import StatusBadge from "./StatusBadge";
// // import UserRoleSelect from "./UserRoleSelect";

// // type User = {
// //   id: string;
// //   name: string | null;
// //   email: string | null;
// //   role: string;
// //   createdAt: string;
// // };

// // export default function UsersContent() {
// //   const [users, setUsers] = useState<User[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     async function fetchUsers() {
// //       setLoading(true);
// //       setError(null);
// //       try {
// //         const res = await fetch("/api/admin/users");
// //         if (!res.ok) throw new Error(`Error ${res.status}`);
// //         const data = await res.json();
// //         setUsers(data);
// //       } catch (err) {
// //         setError("Failed to load users.");
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }
// //     fetchUsers();
// //   }, []);

// //   if (loading) return <p className="p-4">Loading users...</p>;
// //   if (error) return <p className="p-4 text-red-600">{error}</p>;

// //   return (
// //     <div className="bg-white rounded-lg shadow">
// //       <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
// //         <h3 className="text-lg font-medium text-gray-900">Users Management</h3>
// //         <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition">
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
// //             {users.length === 0 ? (
// //               <tr>
// //                 <td colSpan={6} className="text-center py-4 text-gray-500">No users found.</td>
// //               </tr>
// //             ) : (
// //               users.map((user) => (
// //                 <tr key={user.id}>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name || "—"}</td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email || "—"}</td>
// //                   {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td> */}
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><UserRoleSelect userId={user.id} currentRole={user.role} /></td>
// //                   <td className="px-6 py-4 whitespace-nowrap">
// //                     {/* If you have a status, use StatusBadge here */}
// //                     <StatusBadge status={user.role === "ADMIN" ? "Active" : "Pending"} />
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                     {new Date(user.createdAt).toLocaleDateString()}
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-3">
// //                     <button className="text-blue-600 hover:text-blue-900" title="View">
// //                       <Eye className="h-4 w-4" />
// //                     </button>
// //                     <button className="text-green-600 hover:text-green-900" title="Edit">
// //                       <Edit className="h-4 w-4" />
// //                     </button>
// //                     <button className="text-red-600 hover:text-red-900" title="Delete">
// //                       <Trash2 className="h-4 w-4" />
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))
// //             )}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }

// //app/admin/components/UsersContent.tsx
// "use client";

// import { Edit, Eye, Plus, Trash2 } from "lucide-react";
// import { Role } from "@prisma/client";
// import { useState, useEffect } from "react";
// import { useAdminEdit } from "../AdminEditProvider";
// import SaveCancelBar from "./SaveCancelBar";

// interface User {
//   id: string;
//   name: string | null;
//   email: string | null;
//   role: Role;
//   createdAt: string;
// }

// export default function UsersContent() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const { editedUsers, setEditedUsers } = useAdminEdit();
//   const [isDirty, setIsDirty] = useState(false);
//   // const { saveAll, cancelAll } = useAdminEdit();

//   useEffect(() => {
//     async function fetchUsers() {
//       setLoading(true);
//       try {
//         const res = await fetch("/api/admin/users");
//         if (!res.ok) throw new Error("Failed to fetch users");
//         const data: User[] = await res.json();
//         setUsers(data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchUsers();
//   }, []);

//   function onRoleChange(userId: string, newRole: Role) {
//     setEditedUsers((prev) => ({
//       ...prev,
//       [userId]: { ...prev[userId], role: newRole },
//     }));
//   }

//   // Get the role to display (edited or original)
//   function getRole(user: User): Role {
//     return (editedUsers[user.id]?.role as Role) ?? user.role;
//   }

//   if (loading) return <p>Loading users...</p>;
//   if (!users.length) return <p>No users found.</p>;



//   const saveAll = () => {
//     // save logic here
//     setIsDirty(false);
//   };

//   const cancelAll = () => {
//     // cancel logic here
//     setIsDirty(false);
//   };


//   return (
//     // <div className="bg-white rounded-lg shadow">
//     //   <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//     //     <h3 className="text-lg font-medium text-gray-900">Users Management</h3>
//     //     <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
//     //       <Plus className="h-4 w-4 mr-2" />
//     //       Add User
//     //     </button>
//     //   </div>
//     <>
//       <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//         <div className="flex items-center space-x-3">
//           <h3 className="text-lg font-medium text-gray-900">Users Management</h3>
//           <SaveCancelBar
//             isDirty={isDirty}
//             onSave={saveAll}
//             onCancel={cancelAll}
//           />
//         </div>

//         <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
//           <Plus className="h-4 w-4 mr-2" />
//           Add User
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Email
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Role
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Created
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {users.map((user) => (
//               <tr key={user.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {user.name ?? "—"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {user.email ?? "—"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                   <select
//                     value={getRole(user)}
//                     onChange={(e) => onRoleChange(user.id, e.target.value as Role)}
//                     className="p-1 rounded border"
//                   >
//                     {Object.values(Role).map((r) => (
//                       <option key={r} value={r}>
//                         {r}
//                       </option>
//                     ))}
//                   </select>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {new Date(user.createdAt).toLocaleDateString()}
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
//     </>
//   );
// }


"use client";

import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import { Role } from "@prisma/client";
import { useState, useEffect } from "react";
import { useAdminEdit } from "../AdminEditProvider";
import SaveCancelBar from "./SaveCancelBar";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: Role;
  status: string;
  createdAt: string;
}

export default function UsersContent() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { editedUsers, setEditedUsers } = useAdminEdit();

  // Count of edited users (for showing in Save button label)
  const editedCount = Object.keys(editedUsers).length;
  const isDirty = editedCount > 0;

  // Fetch users from API
  async function fetchUsers() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data: User[] = await res.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // Update editedUsers state when role select changes
  function onRoleChange(userId: string, newRole: Role) {
    setEditedUsers((prev) => ({
      ...prev,
      [userId]: { ...prev[userId], role: newRole },
    }));
  }

  // Show the edited role if changed, otherwise original role
  function getRole(user: User): Role {
    return (editedUsers[user.id]?.role as Role) ?? user.role;
  }

  // Save all edited users in batch via API, then refresh users list
  const saveAll = async () => {
    try {
      const updates = Object.entries(editedUsers).map(([userId, changes]) => ({
        userId,
        role: changes.role,
      }));

      if (updates.length === 0) return;

      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!res.ok) throw new Error("Batch update failed");

      // Clear edits and refresh list
      setEditedUsers({});
      await fetchUsers();

      alert("All changes saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save changes.");
    }
  };

  // Cancel all edits without refreshing
  const cancelAll = () => {
    setEditedUsers({});
  };

  if (loading) return <p>Loading users...</p>;
  if (!users.length) return <p>No users found.</p>;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-medium text-gray-900">Users Management</h3>
          <SaveCancelBar
            isDirty={isDirty}
            editedCount={editedCount}
            onSave={saveAll}
            onCancel={cancelAll}
          />
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name ?? "—"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email ?? "—"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <select
                    value={getRole(user)}
                    onChange={(e) => onRoleChange(user.id, e.target.value as Role)}
                    className="p-1 rounded border"
                  >
                    {Object.values(Role).map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.status}
                  /TODO: Verified, Active, Waiting ..etc */
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3"><Eye className="h-4 w-4" /></button>
                  <button className="text-green-600 hover:text-green-900 mr-3"><Edit className="h-4 w-4" /></button>
                  <button className="text-red-600 hover:text-red-900"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
