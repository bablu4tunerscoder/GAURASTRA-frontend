"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { useGetProductsQuery } from "@/store/api/productsApi";
import {
  setFilter,
  clearFilters,
  setCategoryAndSubcategory,
  selectFilters,
  selectAllProducts,
} from "@/store/slices/productSlice";
import Pagination from "@/components/Pagination";

// Debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};


export default function CategoryPageClient({
  initialProducts = [],
  initialSlug = ["all-products"],
}) {
  console.log("initialProducts", initialProducts);
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(initialSlug);

  // Get filters from Redux
  const filters = useSelector(selectFilters);
  const productsFromRedux = useSelector(selectAllProducts);

  // Debounced filters for API calls
  const debouncedFilters = useDebounce(filters, 500);

  // Parse category and subcategory from slug
  const [categorySlug, subcategorySlug] = slug;
  const category = categorySlug?.split("-")?.join(" ");
  const subcategory = subcategorySlug?.split("-")?.join(" ") || "";

  // Update Redux with current category/subcategory
  useEffect(() => {
    dispatch(
      setCategoryAndSubcategory({
        category: category,
        subcategory: subcategory,
      })
    );
  }, [category, subcategory, dispatch]);

  // Build query payload
  const queryPayload = useMemo(() => {
    const payload = {
      category_name: category || "",
      subcategory_name: subcategory || "",
    };

    // Add filters if they have values
    if (debouncedFilters.search) {
      payload.search = debouncedFilters.search;
    }
    if (debouncedFilters.min_price) {
      payload.min_price = parseFloat(debouncedFilters.min_price);
    }
    if (debouncedFilters.max_price) {
      payload.max_price = parseFloat(debouncedFilters.max_price);
    }
    if (debouncedFilters.sort) {
      payload.sort = debouncedFilters.sort;
    }
    if (debouncedFilters.on_sale) {
      payload.on_sale = debouncedFilters.on_sale;
    }

    return payload;
  }, [category, subcategory, debouncedFilters]);

  // RTK Query hook - automatically handles caching and loading
  const {
    data: products = initialProducts,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetProductsQuery(queryPayload);


  // Handle filter changes
  const handleFilterChange = (key, value) => {
    if (key === "clear") {
      dispatch(clearFilters());
    } else {
      dispatch(setFilter({ key, value }));
    }
  };

  // Handle category/sidebar navigation
  const handleChange = (slugStr) => {
    const parts = slugStr.split("/");
    setSlug(parts);
    window.history.pushState({ slug: parts }, "", `/category/${slugStr}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Browser back/forward
  useEffect(() => {
    const handler = (e) => {
      const stateSlug = e.state?.slug || initialSlug;
      setSlug(stateSlug);
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, [initialSlug]);

  // Show loading state
  const showLoading = isLoading || (isFetching && products.length === 0);

  return (
    <section>
      <Image
        src="/assets/productPageBanner.png"
        alt="Category Banner"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />
      <div className="md:px-16 px-4 py-6">
        <Breadcrumbs />
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <Sidebar
            slug={slug}
            filters={filters}
            onFilterChange={handleFilterChange}
            onChange={handleChange}
          />

          {/* Products */}
          <div className="col-span-12 md:col-span-9">

            {/* Show fetching indicator when updating in background */}
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
                {[...Array(8)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((p) => (
                    <ProductCard key={p._id} product={p} />
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