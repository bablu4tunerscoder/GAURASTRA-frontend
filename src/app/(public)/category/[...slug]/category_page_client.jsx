"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import Sidebar from "./Sidebar";
import axiosInstance from "@/Helper/axiosinstance";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const API_URL = BASE_URL + "/api/Productes/filter-Products";

export default function CategoryPageClient({ initialProducts = [], initialSlug = ["all-products"] }) {
  

  const [products, setProducts] = useState(initialProducts);
  const [slug, setSlug] = useState(initialSlug);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    min_price: "",
    max_price: "",
    sort: "",
    on_sale: false,
  });


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

  // Debounced filter values
  const debouncedFilters = useDebounce(filters, 500);

  const handleFilterChange = (key, value) => {
    if (key === "clear") {
      setFilters({
        search: "",
        min_price: "",
        max_price: "",
        sort: "",
        on_sale: false,
      });
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  // Fetch products from API with filters
  const fetchProducts = useCallback(async (slugStr, filterParams = {}) => {
    let [category, subcategory] = slugStr.split("/");
    category = category?.split("-")?.join(" ");
    subcategory = subcategory?.split("-")?.join(" ");
    setLoading(true);
    try {
      const payload = {
        category_name: category,
        subcategory_name: subcategory || null,
      };

      // Add filters to payload if they have values
      if (filterParams.search) {
        payload.search = filterParams.search;
      }
      if (filterParams.min_price && filterParams.max_price) {
        payload.min_price = parseFloat(filterParams.min_price);
      }
      if (filterParams.max_price) {
        payload.max_price = parseFloat(filterParams.max_price);
      }
      if (filterParams.sort) {
        payload.sort = filterParams.sort;
      }
      if (filterParams.on_sale) {
        payload.on_sale = filterParams.on_sale;
      }

      const { data } = await axiosInstance.post(
      "/api/Productes/filter-Products", payload);

      setProducts(data?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Effect to fetch products when debounced filters change
  useEffect(() => {
    fetchProducts(slug.join("/"), debouncedFilters);
  }, [debouncedFilters, slug, fetchProducts]);

  // On sidebar category click
  const handleChange = (slugStr) => {
    const parts = slugStr.split("/");
    setSlug(parts);
    window.history.pushState({ slug: parts }, "", `/category/${slugStr}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Browser back/forward
  useEffect(() => {
    const handler = (e) => {
      const stateSlug = e.state?.slug || [];
      setSlug(stateSlug);
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  return (
    <section className="px-4 py-6">
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
          <h2 className="text-2xl font-semibold capitalize mb-2">
            {slug.length === 1 ? (
              slug[0] === "men"
                ? "Men's Wear"
                : slug[0] === "women"
                  ? "Women's Wear"
                  : slug[0].replace(/-/g, " ")
            ) : (
              slug.join(" / ").replace(/-/g, " ")
            )}
          </h2>



          <p className="text-md text-gray-500 mb-4">
            {products.length} product{products.length !== 1 ? "s" : ""}
          </p>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p) => (
                <ProductCard key={p.product_id} product={p} />
              ))}
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
    </section>
  );
}