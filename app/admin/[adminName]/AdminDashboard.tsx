/* eslint-disable @next/next/no-html-link-for-pages */
// app/admin/[adminName]/AdminDashboard.tsx
'use client'

type Props = {
  adminName: string
}

export default function AdminDashboard({ adminName }: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold">Welcome, {adminName}!</h2>
      <p className="mt-2 text-gray-600">Here you can manage users, orders, products, and pickups.</p>

      {/* Example actions */}
      <ul className="mt-4 space-y-2">
        <li>🔧 <a href="/admin/products">Manage Products</a></li>
        <li>📦 <a href="/admin/orders">View Orders</a></li>
        <li>🚚 <a href="/admin/pickups">Pickup Requests</a></li>
        <li>👤 <a href="/admin/users">User List</a></li>
      </ul>
    </div>
  )
}
