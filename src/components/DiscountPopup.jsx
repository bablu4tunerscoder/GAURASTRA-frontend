"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DiscountPopup() {
  const [open, setOpen] = useState(false);

  // ⏳ Auto open after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 🔹 Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* 🔹 Popup Box */}
      <div className="relative z-20 w-full max-w-3xl bg-white/10 backdrop-blur-md
                      border border-white/20 rounded-2xl overflow-hidden
                      shadow-2xl flex flex-col lg:flex-row m-4">

        {/* CLOSE BUTTON */}
        <button
          className="absolute right-4 top-4 text-white hover:text-gray-300 transition"
          onClick={() => setOpen(false)}
        >
          <X size={22} />
        </button>

        {/* LEFT SECTION – minimal brand block */}
        <div className="hidden lg:flex flex-col items-center justify-center w-1/2
                        bg-black/40 p-8 text-white text-center">
          <Image
            src="/assets/loginbg.webp"
            width={120}
            height={120}
            alt="Logo"
            className="rounded-full mb-4"
          />

          <h2 className="text-3xl font-semibold">Gaurastra</h2>
          <p className="text-gray-300 text-sm mt-2 max-w-xs">
            Handcrafted streetwear infused with tradition.
          </p>
        </div>

        {/* RIGHT SECTION – form */}
        <div className="w-full lg:w-1/2 p-8 bg-black/50 text-white">
          <h2 className="text-2xl font-semibold mb-2">Get ₹100 OFF</h2>
          <p className="text-gray-300 mb-6 text-sm">
            Sign up to unlock your exclusive discount code instantly.
          </p>

          <form className="space-y-4">
            <div>
              <label className="text-sm mb-1 block">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2
                           text-white placeholder-gray-400 outline-none"
              />
            </div>

            <div>
              <label className="text-sm mb-1 block">Mobile Number</label>
              <input
                type="tel"
                placeholder="10-digit mobile no."
                className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2
                           text-white placeholder-gray-400 outline-none"
              />
            </div>

            <button
              type="button"
              className="w-full bg-white text-black py-3 rounded-lg font-medium
                         hover:bg-gray-200 transition mt-4"
            >
              Reveal My Code →
            </button>
          </form>

          <p className="text-gray-400 text-xs mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
