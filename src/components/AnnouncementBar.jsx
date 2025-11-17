"use client";
import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AnnouncementBar() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="w-full bg-black text-white text-sm md:text-base py-2 px-4 relative flex items-center justify-center border-b border-white/10">
      
      {/* Text */}
      <div className="flex flex-col md:flex-row items-center text-center gap-1 md:gap-2">
        
        {/* Line 1 */}
        <p className="tracking-wide">
          🚚 Free Shipping Pan India
        </p>

        {/* Divider only on md+ */}
        <span className="hidden md:inline text-gray-300">|</span>

        {/* Line 2 */}
        <p className="tracking-wide">
          🎁 Get flat ₹100 Off on Next Order just by{" "}
          <Link
            href="/signup"
            prefetch={true}
            className="hover:text-orange-500 hover:underline text-orange-600 font-bold transition"
          >
            SignUp
          </Link>
        </p>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setOpen(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition"
      >
        <X size={16} />
      </button>
    </div>
  );
}
