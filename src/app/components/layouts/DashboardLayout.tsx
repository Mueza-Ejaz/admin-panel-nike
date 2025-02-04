"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5">
        <h2 className="text-lg font-bold mb-5">Admin Dashboard</h2>
        <nav className="space-y-2">
          <Link href="/dashboard" className="block py-2 px-4 bg-gray-700 rounded">
            Dashboard
          </Link>
          <Link href="/products" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Products
          </Link>
          <Link href="/orders" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Orders
          </Link>
          <Link href="/users" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Users
          </Link>
          <Link href="/settings" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        {/* Header */}
        <header className="bg-white p-4 shadow-md flex justify-between">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </header>

        {/* Content Area */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
