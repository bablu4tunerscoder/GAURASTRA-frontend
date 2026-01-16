"use client";

import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import axiosInstance from "@/helpers/axiosinstance";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HomeSearchDesktop = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notFound, setNotFound] = useState(false);

  /* ============================
      SEARCH HANDLER
  ============================ */
  const handleSearch = async () => {
    if (!query || query.trim().length < 2) return;

    try {
      setLoading(true);

      const res = await axiosInstance.get(
        `/api/home-search?search=${encodeURIComponent(query)}`
      );

      const productList = res?.data?.data?.products || [];

      if (productList.length === 0) {
        setProducts([]);
        setNotFound(true);
      } else {
        setProducts(productList);
        setNotFound(false);
      }

      setShowDropdown(true);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Search failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ============================
      DEBOUNCED SEARCH
  ============================ */
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setProducts([]);
      setNotFound(false);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  /* ============================
      CLEAR SEARCH
  ============================ */
  const clearSearch = () => {
    setQuery("");
    setProducts([]);
    setNotFound(false);
    setShowDropdown(false);
  };

  return (
    <div className="hidden sm:flex flex-1 max-w-xl relative">
      {/* ================= INPUT ================= */}
      <div className="relative w-full bg-gray-50 shadow-md rounded-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full px-6 py-3 pr-12 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm md:text-base"
        />

        {/* 🔍 / ❌ BUTTON */}
        <button
          type="button"
          onClick={query ? clearSearch : handleSearch}
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          {query ? (
            <X className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
          ) : (
            <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-800" />
          )}
        </button>

        {/* LOADER */}
        {loading && (
          <div className="absolute right-12 top-1/2 -translate-y-1/2 text-xs text-gray-500">
            Searching...
          </div>
        )}
      </div>

      {/* ================= DROPDOWN ================= */}
      {showDropdown && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
          {notFound ? (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">
              No products found
            </div>
          ) : (
            products.map((product) => {
              const variant = product?.variants?.[0];
              const image = variant?.images?.[0];

              return (
                <Link
                  key={product._id}
                  href={`/product/${product.slug}`}
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition"
                >
                  {/* PRODUCT IMAGE */}
                  <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100">
                    {image?.image_url && (
                      <Image
                        src={image.image_url}
                        alt={product.product_name}
                        width={60}
                        height={60}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* PRODUCT INFO */}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      {product.product_name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {product.brand}
                    </p>

                    {variant?.pricing && (
                      <p className="text-sm font-semibold text-amber-600">
                        ₹{variant.pricing.discounted_price}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

const HomeSearchMobile = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notFound, setNotFound] = useState(false);

  /* ============================
      SEARCH HANDLER
  ============================ */
  const handleSearch = async () => {
    if (!query || query.trim().length < 2) return;

    try {
      setLoading(true);

      const res = await axiosInstance.get(
        `/api/home-search?search=${encodeURIComponent(query)}`
      );

      const productList = res?.data?.data?.products || [];

      if (productList.length === 0) {
        setProducts([]);
        setNotFound(true);
      } else {
        setProducts(productList);
        setNotFound(false);
      }

      setShowDropdown(true);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Search failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ============================
      DEBOUNCED SEARCH
  ============================ */
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setProducts([]);
      setNotFound(false);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  /* ============================
      CLEAR SEARCH
  ============================ */
  const clearSearch = () => {
    setQuery("");
    setProducts([]);
    setNotFound(false);
    setShowDropdown(false);
  };

  return (
    <div className="sm:hidden mt-3 relative">
      {/* ================= INPUT ================= */}
      <div className="relative w-full bg-gray-50 shadow-md rounded-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full px-6 py-3 pr-12 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm md:text-base"
        />

        {/* 🔍 / ❌ BUTTON */}
        <button
          type="button"
          onClick={query ? clearSearch : handleSearch}
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          {query ? (
            <X className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
          ) : (
            <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-800" />
          )}
        </button>

        {/* LOADER */}
        {loading && (
          <div className="absolute right-12 top-1/2 -translate-y-1/2 text-xs text-gray-500">
            Searching...
          </div>
        )}
      </div>

      {/* ================= DROPDOWN ================= */}
      {showDropdown && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
          {notFound ? (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">
              No products found
            </div>
          ) : (
            products.map((product) => {
              const variant = product?.variants?.[0];
              const image = variant?.images?.[0];

              return (
                <Link
                  key={product._id}
                  href={`/product/${product.slug}`}
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition"
                >
                  {/* PRODUCT IMAGE */}
                  <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100">
                    {image?.image_url && (
                      <Image
                        src={image.image_url}
                        alt={product.product_name}
                        width={60}
                        height={60}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* PRODUCT INFO */}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      {product.product_name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {product.brand}
                    </p>

                    {variant?.pricing && (
                      <p className="text-sm font-semibold text-amber-600">
                        ₹{variant.pricing.discounted_price}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export  {HomeSearchDesktop ,HomeSearchMobile};
