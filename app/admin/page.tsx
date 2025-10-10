// // app/admin/page.tsx
// import Link from 'next/link'
// import { getAdmins } from './utils/getAdmins'

// export default async function AdminPage() {
//   const admins = await getAdmins()

//   return (
//     <div>
//       <h2 className="text-lg font-semibold mb-4">Select an Admin</h2>
//       <ul className="space-y-2">
//         {admins.map((admin) => (
//           <li key={admin.id}>
//             <Link href={`/admin/${admin.name}`} className="text-blue-600 hover:underline">
//               {admin.name || admin.email}&apos;s Dashboard
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// "use client"
// import React, { useState, useEffect } from 'react';
// import { 
//   LayoutDashboard, 
//   Users, 
//   Package, 
//   ShoppingCart, 
//   Truck, 
//   FileText, 
//   Settings, 
//   Bell, 
//   Search, 
//   Menu, 
//   X, 
//   Eye, 
//   Edit, 
//   Trash2, 
//   Plus, 
//   Filter,
//   BarChart3,
//   TrendingUp,
//   DollarSign,
//   UserCheck,
//   Package2
// } from 'lucide-react';

// const AdminDashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [searchQuery, setSearchQuery] = useState('');

//   // Mock data
//   const [users, setUsers] = useState([
    // { id: 1, name: 'John Doe', email: 'john@example.com', role: 'CUSTOMER', status: 'Active', createdAt: '2023-01-15' },
    // { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'AGENT', status: 'Active', createdAt: '2023-02-20' },
    // { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'BROKER', status: 'Pending', createdAt: '2023-03-10' },
    // { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'ADMIN', status: 'Active', createdAt: '2023-01-05' },
//   ]);

//   const [products, setProducts] = useState([
//     { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 99.99, stock: 50, status: 'In Stock' },
//     { id: 2, name: 'Smart Watch', category: 'Electronics', price: 199.99, stock: 25, status: 'Low Stock' },
//     { id: 3, name: 'Coffee Maker', category: 'Home', price: 79.99, stock: 0, status: 'Out of Stock' },
//     { id: 4, name: 'Desk Lamp', category: 'Home', price: 39.99, stock: 100, status: 'In Stock' },
//   ]);

//   const [orders, setOrders] = useState([
//     { id: 'ORD-001', customer: 'John Doe', total: 149.98, status: 'Processing', date: '2023-04-01' },
//     { id: 'ORD-002', customer: 'Jane Smith', total: 299.97, status: 'Shipped', date: '2023-04-02' },
//     { id: 'ORD-003', customer: 'Bob Johnson', total: 79.99, status: 'Delivered', date: '2023-04-03' },
//     { id: 'ORD-004', customer: 'Alice Brown', total: 39.99, status: 'Pending', date: '2023-04-04' },
//   ]);

//   const [pickups, setPickups] = useState([
//     { id: 'PICK-001', type: 'OUTBOUND_SHIPMENT', status: 'SCHEDULED', date: '2023-04-05', customer: 'John Doe' },
//     { id: 'PICK-002', type: 'WAREHOUSE_TRANSFER', status: 'COMPLETED', date: '2023-04-04', customer: 'Jane Smith' },
//     { id: 'PICK-003', type: 'INBOUND_RETURN', status: 'PENDING', date: '2023-04-06', customer: 'Bob Johnson' },
//   ]);

//   const stats = [
//     { title: 'Total Revenue', value: '$12,450', change: '+12%', icon: DollarSign, color: 'bg-green-500' },
//     { title: 'Total Orders', value: '142', change: '+8%', icon: ShoppingCart, color: 'bg-blue-500' },
//     { title: 'New Customers', value: '24', change: '+3%', icon: UserCheck, color: 'bg-purple-500' },
//     { title: 'Products Sold', value: '342', change: '+5%', icon: Package2, color: 'bg-orange-500' },
//   ];

//   const sidebarItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
//     { id: 'users', label: 'Users', icon: Users },
//     { id: 'products', label: 'Products', icon: Package },
//     { id: 'orders', label: 'Orders', icon: ShoppingCart },
//     { id: 'pickups', label: 'Pickups', icon: Truck },
//     { id: 'reports', label: 'Reports', icon: BarChart3 },
//     { id: 'settings', label: 'Settings', icon: Settings },
//   ];

  // const getStatusColor = (status) => {
  //   switch (status.toLowerCase()) {
  //     case 'active': return 'bg-green-100 text-green-800';
  //     case 'pending': return 'bg-yellow-100 text-yellow-800';
  //     case 'processing': return 'bg-blue-100 text-blue-800';
  //     case 'shipped': return 'bg-indigo-100 text-indigo-800';
  //     case 'delivered': return 'bg-green-100 text-green-800';
  //     case 'cancelled': return 'bg-red-100 text-red-800';
  //     case 'in stock': return 'bg-green-100 text-green-800';
  //     case 'low stock': return 'bg-yellow-100 text-yellow-800';
  //     case 'out of stock': return 'bg-red-100 text-red-800';
  //     default: return 'bg-gray-100 text-gray-800';
  //   }
  // };

//   const renderDashboard = () => (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => (
//           <div key={index} className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">{stat.title}</p>
//                 <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//                 <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
//               </div>
//               <div className={`${stat.color} p-3 rounded-full`}>
//                 <stat.icon className="h-6 w-6 text-white" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-lg shadow">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {orders.slice(0, 5).map((order) => (
//                   <tr key={order.id}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
//                         {order.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h3 className="text-lg font-medium text-gray-900">Recent Users</h3>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {users.slice(0, 5).map((user) => (
//                   <tr key={user.id}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
//                         {user.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderUsers = () => (
//     <div className="bg-white rounded-lg shadow">
//       <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//         <h3 className="text-lg font-medium text-gray-900">Users Management</h3>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
//           <Plus className="h-4 w-4 mr-2" />
//           Add User
//         </button>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {users.map((user) => (
//               <tr key={user.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
//                     {user.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.createdAt}</td>
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

  // const renderProducts = () => (
  //   <div className="bg-white rounded-lg shadow">
  //     <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
  //       <h3 className="text-lg font-medium text-gray-900">Products Management</h3>
  //       <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
  //         <Plus className="h-4 w-4 mr-2" />
  //         Add Product
  //       </button>
  //     </div>
  //     <div className="overflow-x-auto">
  //       <table className="min-w-full divide-y divide-gray-200">
  //         <thead className="bg-gray-50">
  //           <tr>
  //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
  //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
  //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
  //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
  //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
  //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
  //           </tr>
  //         </thead>
  //         <tbody className="bg-white divide-y divide-gray-200">
  //           {products.map((product) => (
  //             <tr key={product.id}>
  //               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
  //               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
  //               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
  //               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
  //               <td className="px-6 py-4 whitespace-nowrap">
  //                 <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(product.status)}`}>
  //                   {product.status}
  //                 </span>
  //               </td>
  //               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
  //                 <button className="text-blue-600 hover:text-blue-900 mr-3">
  //                   <Eye className="h-4 w-4" />
  //                 </button>
  //                 <button className="text-green-600 hover:text-green-900 mr-3">
  //                   <Edit className="h-4 w-4" />
  //                 </button>
  //                 <button className="text-red-600 hover:text-red-900">
  //                   <Trash2 className="h-4 w-4" />
  //                 </button>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );

//   const renderOrders = () => (
//     <div className="bg-white rounded-lg shadow">
//       <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//         <h3 className="text-lg font-medium text-gray-900">Orders Management</h3>
//         <div className="flex space-x-2">
//           <button className="border border-gray-300 px-4 py-2 rounded-md flex items-center">
//             <Filter className="h-4 w-4 mr-2" />
//             Filter
//           </button>
//         </div>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {orders.map((order) => (
//               <tr key={order.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
//                     {order.status}
//                   </span>
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

//   const renderPickups = () => (
//     <div className="bg-white rounded-lg shadow">
//       <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//         <h3 className="text-lg font-medium text-gray-900">Pickups Management</h3>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
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
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {pickups.map((pickup) => (
//               <tr key={pickup.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pickup.id}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pickup.type.replace('_', ' ')}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pickup.customer}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pickup.date}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(pickup.status)}`}>
//                     {pickup.status}
//                   </span>
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

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'dashboard': return renderDashboard();
//       case 'users': return renderUsers();
//       case 'products': return renderProducts();
//       case 'orders': return renderOrders();
//       case 'pickups': return renderPickups();
//       case 'reports': return <div className="bg-white rounded-lg shadow p-6">Reports Content</div>;
//       case 'settings': return <div className="bg-white rounded-lg shadow p-6">Settings Content</div>;
//       default: return renderDashboard();
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed md:relative md:translate-x-0 z-30 inset-y-0 left-0 w-64 bg-gray-800 transition duration-300 ease-in-out`}>
//         <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
//           <div className="flex items-center">
//             <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
//             <span className="ml-3 text-white font-bold text-xl">Admin Panel</span>
//           </div>
//           <button 
//             onClick={() => setSidebarOpen(false)}
//             className="md:hidden text-gray-400 hover:text-white"
//           >
//             <X className="h-6 w-6" />
//           </button>
//         </div>
//         <nav className="mt-5 px-2">
//           {sidebarItems.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => setActiveTab(item.id)}
//               className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition duration-150 ease-in-out ${
//                 activeTab === item.id
//                   ? 'bg-gray-900 text-white'
//                   : 'text-gray-300 hover:bg-gray-700 hover:text-white'
//               }`}
//             >
//               <item.icon className="h-5 w-5 mr-3" />
//               {item.label}
//             </button>
//           ))}
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="bg-white shadow">
//           <div className="flex items-center justify-between px-4 py-3">
//             <div className="flex items-center">
//               <button 
//                 onClick={() => setSidebarOpen(true)}
//                 className="md:hidden text-gray-500 hover:text-gray-700 mr-3"
//               >
//                 <Menu className="h-6 w-6" />
//               </button>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Search className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button className="text-gray-500 hover:text-gray-700 relative">
//                 <Bell className="h-6 w-6" />
//                 <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
//               </button>
//               <div className="flex items-center">
//                 <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
//                 <span className="ml-2 text-sm font-medium text-gray-700">Admin User</span>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Content */}
//         <main className="flex-1 overflow-y-auto p-4 md:p-6">
//           {renderContent()}
//         </main>
//       </div>

//       {/* Overlay for mobile */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         ></div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;

'use client';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardContent from './components/DashboardContent';
import UsersContent from './components/UsersContent';
import ProductsContent from './components/ProductsContent';
import OrdersContent from './components/OrdersContent';
import PickupsContent from './components/PickupsContent';
import PricesContent from './components/PricesContent';

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardContent />;
      case 'users': return <UsersContent />;
      case 'products': return <ProductsContent />;
      case 'orders': return <OrdersContent />;
      case 'pickups': return <PickupsContent />;
      case 'prices': return <PricesContent />;
      case 'reports': return <div className="bg-white rounded-lg shadow p-6">Reports Content</div>;
      case 'settings': return <div className="bg-white rounded-lg shadow p-6">Settings Content</div>;
      default: return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}
    </div>
  );
}
