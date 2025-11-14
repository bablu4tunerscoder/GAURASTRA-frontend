"use client";
import Link from "next/link";
import { useState } from "react";
import { X, Filter } from "lucide-react";

export default function CategoryLayout({ children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileSidebarOpen(false); // Close on mobile after click
  };

  return (
    <section className="min-h-screen flex bg-white overflow-hidden">
      {/* 🔹 Mobile Filter Button (Right Top) */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-md shadow"
        >
          <Filter size={18} /> Filter
        </button>
      </div>

      {/* 🔹 Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-gray-50 border-r border-gray-200 p-6 space-y-8 z-40
          transform transition-transform duration-300 ease-in-out
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:flex md:flex-col md:overflow-y-auto md:sticky
        `}
      >
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-end mb-4">
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="p-1 rounded hover:bg-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500">
          <Link href="/" onClick={handleLinkClick} className="hover:underline">
            Home
          </Link>{" "}
          &gt; <span className="text-gray-800 font-medium">Men</span>
        </div>

        {/* Browse Section */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Browse by</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link href="/category/all" onClick={handleLinkClick} className="hover:text-gray-900">
                All Products
              </Link>
            </li>
            <li>
              <Link
                href="/category/new-arrivals"
                onClick={handleLinkClick}
                className="hover:text-gray-900"
              >
                New Arrivals
              </Link>
            </li>
          </ul>
        </div>

        {/* Men Section */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Men</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link href="/category/men" onClick={handleLinkClick} className="hover:text-gray-900">
                All Men
              </Link>
            </li>
            <li>
              <Link
                href="/category/men/shirts"
                onClick={handleLinkClick}
                className="hover:text-gray-900"
              >
                Shirts
              </Link>
            </li>
          </ul>
        </div>

        {/* Women Section */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Women</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link href="/category/women" onClick={handleLinkClick} className="hover:text-gray-900">
                All Women
              </Link>
            </li>
            <li>
              <Link
                href="/category/women/festive-wear"
                onClick={handleLinkClick}
                className="hover:text-gray-900"
              >
                Festive Wear
              </Link>
            </li>
            <li>
              <Link
                href="/category/women/short-kurti"
                onClick={handleLinkClick}
                className="hover:text-gray-900"
              >
                Short Kurti
              </Link>
            </li>
          </ul>
        </div>

        {/* Ethnic Wear */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Ethnic Wear</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link
                href="/category/ethnic-wear"
                onClick={handleLinkClick}
                className="hover:text-gray-900"
              >
                All Ethnic Wear
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        ></div>
      )}

      {/* 🔹 Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen no-scrollbar">
        {children}
      </main>
    </section>
  );
}
