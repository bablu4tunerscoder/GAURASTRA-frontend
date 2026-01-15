"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { useGetProductsQuery } from "@/store/api/productsApi";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { addToCartLocal } from "@/store/slices/cartSlice";

// Debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export default function CategoryPageClient({
  initialProducts = [],
  initialSlug = ["all-products"],
}) {


  const dispatch = useDispatch()
  const searchParams = useSearchParams();
  const [slug, setSlug] = useState(initialSlug);

  // Initialize filters from URL search params
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    min_price: searchParams.get("min_price") || "",
    max_price: searchParams.get("max_price") || "",
    sort: searchParams.get("sort") || "",
    on_sale: searchParams.get("on_sale") || "",
    color: searchParams.get("color") || "",
  });

  // Debounced filters for API calls
  const debouncedFilters = useDebounce(filters, 500);

  // Parse category and subcategory from slug
  const [categorySlug, subcategorySlug] = slug;

  // Build query payload
  const queryPayload = useMemo(() => {
    const payload = {
      category_name: categorySlug || "",
      subcategory_name: subcategorySlug || "",
    };


    // Add filters if they have values
    if (debouncedFilters.search) payload.search = debouncedFilters.search;
    if (debouncedFilters.min_price) payload.min_price = parseFloat(debouncedFilters.min_price);
    if (debouncedFilters.max_price) payload.max_price = parseFloat(debouncedFilters.max_price);
    if (debouncedFilters.sort) payload.sort = debouncedFilters.sort;
    if (debouncedFilters.on_sale) payload.on_sale = debouncedFilters.on_sale;
    if (debouncedFilters.color) payload.color = debouncedFilters.color;
    if (debouncedFilters.size) payload.size = debouncedFilters.size;

    return payload;
  }, [categorySlug, subcategorySlug, debouncedFilters]);


  // RTK Query hook
  const {
    data: products = initialProducts,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetProductsQuery(queryPayload);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    const queryString = params.toString();
    const newUrl = `/category/${slug.join("/")}${queryString ? `?${queryString}` : ""}`;

    window.history.replaceState({}, "", newUrl);
  }, [filters, slug]);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    if (key === "clear") {
      setFilters({
        search: "",
        min_price: "",
        max_price: "",
        sort: "",
        on_sale: "",
        color: "",
        size: "",
      });
    } else {
      setFilters(prev => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  // Handle category/subcategory navigation
  const handleCategoryChange = (category_name, subcategory_name = null) => {
    const newSlug = subcategory_name
      ? [category_name, subcategory_name]
      : [category_name];


    setSlug(newSlug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show loading state
  const showLoading = isLoading || (isFetching && products.length === 0);

  const handleAddToCart = (product) => {
    dispatch(addToCartLocal(product));

  };

  return (
    <section className="min-h-screen bg-white">
      <div className="md:px-16 px-4 py-6">
        <Breadcrumbs />
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <Sidebar
            slug={slug}
            filters={filters}
            onFilterChange={handleFilterChange}
            onCategoryChange={handleCategoryChange}
          />

          {/* Products */}
          <div className="col-span-12 md:col-span-9">
            {/* Fetching indicator */}
            {isFetching && !isLoading && (
              <div className="mb-2 text-sm text-gray-600">
                Updating products...
              </div>
            )}

            {/* Error State */}
            {isError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                <p className="font-bold">Error loading products</p>
                <p className="text-sm">
                  {error?.data?.message || "Something went wrong"}
                </p>
              </div>
            )}

            {/* Loading State */}
            {showLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(9)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((p) => (
                    <ProductCard key={p._id} product={p} onAddToCart={handleAddToCart} />
                  ))}
                </div>
                {/* Pagination */}
                <Pagination totalPages={4} />
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found.</p>
                <button
                  onClick={() => handleFilterChange("clear", null)}
                  className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}