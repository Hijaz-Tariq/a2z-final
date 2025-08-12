/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

// DashboardContent.tsx

import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  Truck, 
  FileText, 
  Settings, 
  Bell, 
  Search, 
  Menu, 
  X, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Filter,
  BarChart3,
  TrendingUp,
  DollarSign,
  UserCheck,
  Package2
} from 'lucide-react';
export default function DashboardContent() {
    // Mock data
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'CUSTOMER', status: 'Active', createdAt: '2023-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'AGENT', status: 'Active', createdAt: '2023-02-20' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'BROKER', status: 'Pending', createdAt: '2023-03-10' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'ADMIN', status: 'Active', createdAt: '2023-01-05' },
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 99.99, stock: 50, status: 'In Stock' },
    { id: 2, name: 'Smart Watch', category: 'Electronics', price: 199.99, stock: 25, status: 'Low Stock' },
    { id: 3, name: 'Coffee Maker', category: 'Home', price: 79.99, stock: 0, status: 'Out of Stock' },
    { id: 4, name: 'Desk Lamp', category: 'Home', price: 39.99, stock: 100, status: 'In Stock' },
  ]);

  const [orders, setOrders] = useState([
    { id: 'ORD-001', customer: 'John Doe', total: 149.98, status: 'Processing', date: '2023-04-01' },
    { id: 'ORD-002', customer: 'Jane Smith', total: 299.97, status: 'Shipped', date: '2023-04-02' },
    { id: 'ORD-003', customer: 'Bob Johnson', total: 79.99, status: 'Delivered', date: '2023-04-03' },
    { id: 'ORD-004', customer: 'Alice Brown', total: 39.99, status: 'Pending', date: '2023-04-04' },
  ]);

  const [pickups, setPickups] = useState([
    { id: 'PICK-001', type: 'OUTBOUND_SHIPMENT', status: 'SCHEDULED', date: '2023-04-05', customer: 'John Doe' },
    { id: 'PICK-002', type: 'WAREHOUSE_TRANSFER', status: 'COMPLETED', date: '2023-04-04', customer: 'Jane Smith' },
    { id: 'PICK-003', type: 'INBOUND_RETURN', status: 'PENDING', date: '2023-04-06', customer: 'Bob Johnson' },
  ]);
  const stats = [
    { title: 'Total Revenue', value: '$12,450', change: '+12%', icon: DollarSign, color: 'bg-green-500' },
    { title: 'Total Orders', value: '142', change: '+8%', icon: ShoppingCart, color: 'bg-blue-500' },
    { title: 'New Customers', value: '24', change: '+3%', icon: UserCheck, color: 'bg-purple-500' },
    { title: 'Products Sold', value: '342', change: '+5%', icon: Package2, color: 'bg-orange-500' },
  ];

  const getStatusColor = (status: any) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'in stock': return 'bg-green-100 text-green-800';
      case 'low stock': return 'bg-yellow-100 text-yellow-800';
      case 'out of stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };


  return (
    // <div className="bg-white rounded-lg shadow p-6">
    //   <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
    //   <p>Welcome to the admin dashboard. Use the sidebar to navigate between sections.</p>
    // </div>

  <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Users</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.slice(0, 5).map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    
  );
}

