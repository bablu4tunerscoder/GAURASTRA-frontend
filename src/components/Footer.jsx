import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-700">
      <div className="max-w-7xl mx-auto md:px-6 px-2  py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
        {/* CATEGORIES */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">CATEGORIES</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/category/men" className="hover:text-blue-600 transition">
                Men
              </Link>
            </li>
            <li>
              <Link href="/category/women" className="hover:text-blue-600 transition">
                Women
              </Link>
            </li>
          </ul>
        </div>

        {/* INFORMATION */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">INFORMATION</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-blue-600 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="hover:text-blue-600 transition">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* LEGAL */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">LEGAL</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/policy/terms-conditions" className="hover:text-blue-600 transition">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/policy/privacy-policy" className="hover:text-blue-600 transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/policy/return-policy" className="hover:text-blue-600 transition">
                Return Policy
              </Link>
            </li>
            <li>
              <Link href="/policy/shipping-policy" className="hover:text-blue-600 transition">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link href="/policy/cancellation-policy" className="hover:text-blue-600 transition">
                Cancellation Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">SUPPORT</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/faq" className="hover:text-blue-600 transition">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-600 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* SOCIAL MEDIA */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">SOCIAL MEDIA</h3>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-5 h-5 hover:text-blue-600 transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5 hover:text-pink-600 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-5 h-5 hover:text-sky-500 transition" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <Youtube className="w-5 h-5 hover:text-red-600 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-6 text-center text-sm text-gray-600">
        <p>Gaurastra © 2025 All Rights Reserved.</p>
        <p className="mt-1">
          Designed & Developed by{" "}
          <a
            href="https://4tunerstech.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            4Tuners Technologies
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
