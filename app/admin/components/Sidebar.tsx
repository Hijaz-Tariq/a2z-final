"use client";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Truck,
  BarChart3,
  Receipt,
  Settings,
  X,
} from "lucide-react";
import React from "react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "products", label: "Products", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "pickups", label: "Pickups", icon: Truck },
  { id: "prices", label: "Prices", icon: Receipt },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  return (
    <div
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed md:relative md:translate-x-0 z-30 inset-y-0 left-0 w-64 bg-gray-800 transition duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
        <div className="flex items-center">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
          <span className="ml-3 text-white font-bold text-xl">
            Admin Panel
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="mt-5 px-2">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition duration-150 ease-in-out ${
              activeTab === item.id
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
