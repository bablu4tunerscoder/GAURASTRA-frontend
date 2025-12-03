"use client";

import { useState, useEffect } from "react";
import { FiMenu, FiLogOut, FiHome, FiShoppingBag } from "react-icons/fi";
import useSessionAuth from "../hook/useSessionAuth";
import Link from "next/link";
import { FaBilibili } from "react-icons/fa6";

export default function MainLayout({ children }) {
  const [open, setOpen] = useState(true);
  const { isAuthenticated, loading, logout, user } = useSessionAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = "/offline/login";
    }
  }, [loading, isAuthenticated]);

  if (loading) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div
        className={`${open ? "w-60" : "w-12"
          } bg-white shadow-lg p-4 pt-6 transition-all duration-300`}
      >
        <h1 className="text-xl font-bold mb-8 text-blue-600">
          {open ? "Store Panel" : "SP"}
        </h1>

        <nav className="space-y-4">
          <Link
            href="/offline/dashboard"
            className="flex items-center gap-3 text-gray-700 font-medium hover:text-blue-600"
          >
            <FiHome className="text-xl" />
            {open && <span>Dashboard</span>}
          </Link>
          <Link
            href="/offline/billing"
            className="flex items-center gap-3 text-gray-700 font-medium hover:text-blue-600"
          >
            <FaBilibili className="text-xl" />
            {open && <span>Billing</span>}
          </Link>

          <Link
            href="/offline/add-products"
            className="flex items-center gap-3 text-gray-700 font-medium hover:text-blue-600"
          >
            <FiShoppingBag className="text-xl" />
            {open && <span>Products</span>}
          </Link>
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
          <button
            onClick={() => setOpen(!open)}
            className="text-2xl text-gray-700"
          >
            <FiMenu />
          </button>

          <h1 className="text-xl font-semibold text-gray-700">
            Offline Billing System
          </h1>

          <div>
            <span className="text-gray-500 text-sm">{user?.email}</span>
          </div>
        </div>

        {/* CONTENT */}
        <div>{children}</div>
      </div>
    </div>
  );
}
