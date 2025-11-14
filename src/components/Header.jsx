"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import Image from "next/image";


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

  const navLinks = [
    { name: "Ethnic Wear", href: "/ethnic-wear" },
    { name: "Women", href: "/category/women" },
    { name: "Men", href: "/category/men" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Blogs", href: "/blogs" },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between md:px-6 px-2  py-4">
        {/* Left Section - Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/loginbg.webp"
            alt="Gaurastra Logo"
            height={40}
            width={40}
            className="w-8 h-8 object-contain rounded"
          />
          <span className="font-semibold text-lg text-gray-800">Gaurastra</span>
        </Link>

        {/* Center Section - Navigation (Desktop) */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-blue-600 transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Section - Icons */}
        <div className="flex items-center gap-5 relative">
          <Link href="/cart">
            <ShoppingCart className="w-5 h-5 text-gray-700 hover:text-blue-600 cursor-pointer" />
          </Link>

          {/* User Icon with Dropdown */}
          <div className="relative">
            <User
              className="w-5 h-5 text-gray-700 hover:text-blue-600 cursor-pointer"
              onClick={toggleUserMenu}
            />
            {userMenuOpen && (
              <div onClick={()=>setUserMenuOpen(false)} className="absolute right-0 mt-3 w-40 bg-white shadow-lg border rounded-lg p-2 z-50">
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-700 hover:text-blue-600"
            onClick={toggleMenu}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-sm">
          <nav className="flex flex-col py-3 px-6 space-y-2 text-gray-700 font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-blue-600 transition"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
