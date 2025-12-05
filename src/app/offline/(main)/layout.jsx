"use client";

import { Menu, Home, Receipt, ShoppingBag, LogOut, Boxes } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useSessionAuth from "../hook/useSessionAuth";

export default function MainLayout({ children }) {
  const [open, setOpen] = useState(true);
  const { isAuthenticated, loading, logout, user } = useSessionAuth();
  const pathname = usePathname(); // ✅ Detects exact active route

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = "/offline/login";
    }
  }, [loading, isAuthenticated]);

  if (loading) return null;

  // Sidebar items
  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/offline/dashboard" },
    { icon: Receipt, label: "Billing", href: "/offline/billing" },
    { icon: Boxes, label: "Add Products", href: "/offline/add-products" },
    { icon: ShoppingBag, label: "View Products", href: "/offline/view-products" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ========= SIDEBAR ========= */}
      <div
        className={`${open ? "w-64" : "w-20"} bg-[#111] text-white transition-all duration-300`}
      >
        {/* Logo + Store Name */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <img src="/assets/loginbg.webp" className="w-10" alt="" />
            {open && (
              <h2 className="text-lg font-semibold tracking-wide">Gaurastra</h2>
            )}
          </div>

          {open && <p className="text-gray-400 text-xs">Store Panel</p>}
        </div>

        {/* ===== NAVIGATION LINKS ===== */}
        <nav className="space-y-2">
          {menuItems.map(({ icon: Icon, label, href }, index) => {
            const isActive = pathname === href; // ✅ works for all /offline/* routes

            return (
              <Link
                key={index}
                href={href}
                className={`
                  flex items-center gap-4 py-2.5 px-6  transition-all
                  ${isActive
                    ? "text-blue-500 border-l-4 border-blue-500"
                    : "text-gray-300 hover:text-blue-400 hover:bg-[#1a1a1a]"
                  }
                `}
              >
                <Icon
                  size={20}
                  className={isActive ? "text-blue-500" : "text-gray-300"}
                />

                {open && <span className="text-sm">{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <div className="p-6">

          <button
            onClick={logout}
            className="mt-10 flex items-center gap-4 text-red-400 hover:text-red-500 w-full text-sm"
          >
            <LogOut size={20} />
            {open && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* ========= MAIN CONTENT AREA ========= */}
      <div className="flex-1">

        {/* ========= TOP NAVBAR ========= */}
        <header className="flex items-center justify-between bg-white shadow-md px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => setOpen(!open)}>
              <Menu size={22} className="text-gray-700" />
            </button>

            <h1 className="text-lg font-semibold text-gray-800">
              Offline Billing System
            </h1>
          </div>

          {/* User Details */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>

            <div className="leading-tight">
              <p className="text-sm text-gray-700">{user?.email}</p>
              <p className="text-xs text-gray-500 -mt-1">Admin</p>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div>{children}</div>
      </div>
    </div>
  );
}
