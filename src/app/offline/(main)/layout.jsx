"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBilibili } from "react-icons/fa6";
import { FiHome, FiLogOut, FiShoppingBag } from "react-icons/fi";
import useSessionAuth from "../hook/useSessionAuth";

export default function MainLayout({ children }) {
  const [open, setOpen] = useState(true);
  const { isAuthenticated, loading, logout, user } = useSessionAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = "/offline/login";
    }
  }, [loading, isAuthenticated]);

  if (loading) return null;

  // 📌 Sidebar navigation items
  const menuItems = [
    { icon: FiHome, label: "Dashboard", href: "/offline/dashboard" },
    { icon: FaBilibili, label: "Billing", href: "/offline/billing" },
    { icon: FiShoppingBag, label: "Products", href: "/offline/add-products" },
    { icon: FiShoppingBag, label: "Products View", href: "/offline/view-products" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div
        className={`${open ? "w-60" : "w-12"} bg-white shadow-lg p-4 pt-6 transition-all duration-300`}
      >
        <h1 className="text-xl font-bold mb-8 text-blue-600">
          {open ? "Store Panel" : "SP"}
        </h1>

        {/* 📌 Auto-rendered menu items */}
        <nav className="space-y-4">
          {menuItems.map(({ icon: Icon, label, href }, index) => (
            <Link
              key={index}
              href={href}
              className="flex items-center gap-3 text-gray-700 font-medium hover:text-blue-600"
            >
              <Icon className="text-xl" />
              {open && <span>{label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={logout}
          className="mt-10 flex items-center gap-3 text-red-500 w-full font-medium"
        >
          <FiLogOut className="text-xl" />
          {open && <span>Logout</span>}
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1">

        {/* HEADER */}
        <div className="flex items-center justify-between bg-white shadow p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(!open)}
              className="text-2xl text-gray-700"
            >
              <Menu size={20} />
            </button>

            <h1 className="text-xl font-semibold text-gray-700">
              Offline Billing System
            </h1>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200"></div>
            <div>
              <span className="text-gray-600 text-sm">{user?.email}</span>
              <h3 className="text-gray-500 font-extralight text-xs">ShopKeeper</h3>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div>{children}</div>
      </div>
    </div>
  );
}
