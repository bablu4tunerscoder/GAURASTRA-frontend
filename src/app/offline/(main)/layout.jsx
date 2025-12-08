"use client";

import { Menu, Receipt, ShoppingBag, LogOut, Boxes } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useSessionAuth from "../hook/useSessionAuth";

export default function MainLayout({ children }) {
  const [open, setOpen] = useState(true);
  const { isAuthenticated, loading, logout, user } = useSessionAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = "/offline/login";
    }
  }, [loading, isAuthenticated]);

  useEffect(() => {
    // Auto collapse on small screens
    const handleResize = () => {
      if (window.innerWidth < 1024) setOpen(false);
      else setOpen(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return null;

  const menuItems = [
    { icon: Receipt, label: "Billing", href: "/offline/billing" },
    { icon: Boxes, label: "Add Products", href: "/offline/add-products" },
    { icon: ShoppingBag, label: "View Products", href: "/offline/view-products" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* ========= FIXED SIDEBAR ========= */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-[#111] text-white transition-all duration-300
          ${open ? "w-64" : "w-16"}
        `}
      >
        <div className="md:p-6 p-2">
          <div className="flex items-center gap-3 mb-10">
            <img src="/assets/loginbg.webp" className="w-10" alt="" />
            {open && <h2 className="text-lg font-semibold tracking-wide">Gaurastra</h2>}
          </div>

          {open && <p className="text-gray-400 text-xs">Store Panel</p>}
        </div>

        <nav className="space-y-2">
          {menuItems.map(({ icon: Icon, label, href }, index) => {
            const isActive = pathname === href;
            return (
              <Link
                key={index}
                href={href}
                className={`flex items-center gap-4 md:py-2.5 py-2 md:px-6 px-3 transition-all
                  ${isActive
                    ? "text-blue-500 border-l-4 border-blue-500"
                    : "text-gray-300 hover:text-blue-400 hover:bg-[#1a1a1a]"
                  }`}
              >
                <Icon size={20} />
                {open && <span className="text-sm">{label}</span>}
              </Link>
            );
          })}
        </nav>

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

      {/* ========= RIGHT SIDE (SCROLLABLE) ========= */}
      <div
        className={`
          transition-all duration-300
          ${open ? "ml-64" : "ml-16"}
        `}
      >
        {/* TOP NAVBAR */}
        <header className="flex items-center justify-between bg-white shadow-md px-6 py-4 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setOpen(!open)}>
              <Menu size={22} className="text-gray-700" />
            </button>
            <h1 className="text-lg font-semibold md:block hidden  text-gray-800">Offline Billing System</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>

            <div className="leading-tight">
              <p className="text-sm text-gray-700">{user?.email}</p>
              <p className="text-xs text-gray-500 -mt-1">Admin</p>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT AREA */}
        <div className="md:p-6 px-2 py-4 ">{children}</div>
      </div>
    </div>
  );
}
