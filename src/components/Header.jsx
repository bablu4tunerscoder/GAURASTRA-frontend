"use client";
import { Search, Heart, ShoppingCart, MapPin, Menu, X, User, CircleUserRound, Link2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import AnnouncementBar from './AnnouncementBar';
import { useSelector } from 'react-redux';
import Image from 'next/image';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemCount = useSelector(state =>
    state?.cart?.items?.reduce((total, item) => {

      return total + (item?.variants?.length || 0);
    }, 0) || 0
  );

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


  const mainNavLinks = [
    { label: 'Man', href: '/category/man' },
    { label: 'Women', href: '/category/women' },
    { label: 'Ethnic Wear', href: '/ethnic-wear' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' }
  ];

  const rightNavLinks = [
    { label: 'Store Location', href: '/stores', icon: MapPin },
    { label: 'Track your order', href: '/track-order' },
    { label: 'My Blogs', href: '/blogs' }
  ];

  return (
    <header className="w-full border-gray-200">
      <AnnouncementBar />
      {/* Top Section */}
      <div className="bg-white px-4 md:px-16 py-2">
        <div className=" mx-auto flex items-center justify-between gap-4 md:gap-8">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 ">
            <Image
              src="/assets/updated-logo.png"
              alt="Gaurastra Logo"
              width={150}
              height={70}
              className="w-auto h-auto max-h-12 md:max-h-16"
              style={{ width: "auto", height: "auto" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextSibling.style.display = "block";
              }}
            />

            <div className="hidden text-xl md:text-2xl font-bold text-gray-800">
              GAUR<span className="text-amber-600">A</span>STRA
            </div>
          </Link>

          {/* Search Bar - Hidden on small mobile */}
          <div className="hidden sm:flex flex-1 bg-gray-50 shadow-md rounded-full max-w-xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-6 py-3 pr-10  rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm md:text-base"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2">
                <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-800" />
              </button>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center  gap-2 md:gap-4">

            {
              isAuthenticated ? <Link href='/profile' className="p-2 flex gap-1 items-center ">
                <CircleUserRound className="w-5 h-5 md:w-6 md:h-6 text-gray-700" /> <span className='text-gray-700'>User</span>
              </Link> : <Link href='/login' className="p-2 flex gap-1 items-center">
                <CircleUserRound className="w-5 h-5 md:w-6 md:h-6 text-gray-700" /> <span className='text-gray-700'>Login</span>
              </Link>
            }

            {
              isAuthenticated ? <Link href='/wishlist' className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Heart className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
              </Link> : <Link href='/login' className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Heart className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
              </Link>
            }

            <Link
              href="/cart"
              className="relative p-2 rounded-full transition-colors"
            >
              {/* CART COUNT BADGE */}
              {cartItemCount > 0 && (
                <span
                  className="
        absolute
        top-0
        right-0
        min-w-[18px]
        h-[18px]
        px-1
        flex
        items-center
        justify-center
        rounded-full
        bg-primary
        text-white
        text-[10px]
        font-semibold
        leading-none
      "
                >
                  {cartItemCount}
                </span>
              )}

              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
            </Link>

          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="sm:hidden mt-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <Search className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:block bg-white px-16 py-3 border-t border-gray-100">
        <div className=" mx-auto flex items-center justify-between">
          {/* Left Menu */}
          <nav className="flex items-center gap-8">
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-amber-600  transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Center Logo */}
          <div className="text-2xl first-letter:text-3xl font-bold text-gray-800 tracking-wide">
            GAURASTRA
          </div>

          {/* Right Menu */}
          <div className="flex items-center gap-6">
            {rightNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors whitespace-nowrap"
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                <span className="">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <nav className="px-4 py-4 space-y-1">
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-amber-600 rounded-md transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-200 my-2"></div>
            {rightNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-amber-600 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}