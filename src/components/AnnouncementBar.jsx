"use client";
import { ChevronDownIcon, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  const phoneNumber = "1234567890";

  if (!open) return null;

  return (
    <div className="w-full bg-black text-gray-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 py-2 flex items-center justify-between text-xs sm:text-sm">

        {/* Left: Phone (hidden on very small screens) */}
        <a
          href={`tel:+91${phoneNumber}`}
          className="hidden sm:block whitespace-nowrap"
        >
          +91 {phoneNumber}
        </a>

        {/* Center: Announcement */}
        <p className="flex-1 text-center truncate px-2">
          Free Shipping on Orders Above ₹1000
        </p>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">

          {/* Login (hidden on mobile) */}
          <Link
            href="/login"
            className="hidden md:block uppercase whitespace-nowrap"
          >
            Login
          </Link>

          {/* Language Selector (hidden on mobile) */}
          <button className="hidden md:flex items-center gap-1 whitespace-nowrap">
            Eng <ChevronDownIcon size={14} />
          </button>

          {/* Close Button (always visible) */}
          <button
            onClick={() => setOpen(false)}
            className="hover:text-gray-300 transition"
            aria-label="Close announcement"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
