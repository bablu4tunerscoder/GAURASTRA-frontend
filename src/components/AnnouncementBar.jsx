"use client";

import { ChevronDownIcon, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";




export default function AnnouncementBar() {
  const [open, setOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // 👉 Check cookie on mount
  useEffect(() => {
    const isClosed = Cookies.get("announcement_closed");
    if (!isClosed) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    // 👉 Save cookie for 5 days
    Cookies.set("announcement_closed", "true", { expires: 5 });
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="w-full bg-black text-gray-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 py-2 flex items-center justify-between text-xs sm:text-sm">

        {/* Left */}
        <a
          href={`tel:+91${process.env.NEXT_PUBLIC_PHONE_NUMBER}`}
          className="hidden sm:block whitespace-nowrap"
        >
          +91 {process.env.NEXT_PUBLIC_PHONE_NUMBER}
        </a>

        {/* Center */}
        <p className="flex-1 text-center truncate px-2">
          Free Shipping on Orders Above ₹1000
        </p>

        {/* Right */}
        <div className="flex items-center gap-3 sm:gap-4">
          {
            !isAuthenticated ? <Link
            href="/login"
            className="hidden md:block uppercase whitespace-nowrap"
          >
            Login
          </Link> : <Link
            href="/profile"
            className="hidden md:block uppercase whitespace-nowrap"
          >
            Profile
          </Link>
          }
          

          {/* <button className="hidden md:flex items-center gap-1 whitespace-nowrap">
            Eng <ChevronDownIcon size={14} />
          </button> */}

          <button
            onClick={handleClose}
            className="hover:text-gray-300 ml-4 transition"
            aria-label="Close announcement"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
