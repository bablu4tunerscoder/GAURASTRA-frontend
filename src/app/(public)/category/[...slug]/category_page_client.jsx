"use client";

import React, { memo } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

// Memoized Sidebar for fast rendering
const Sidebar = memo(({ slug = [] }) => {
  const categorySlug = slug[0] || "";

  const browseCategories = [
    { label: "All Products", slug: "all-products" },
    { label: "New Arrivals", slug: "new-arrivals" },
    {
      label: "Men",
      slug: "men",
      children: [{ label: "Shirts", slug: "men/shirts" }],
    },
    {
      label: "Women",
      slug: "women",
      children: [
        { label: "Festive Wear", slug: "women/festive-wear" },
        { label: "Short Kurti", slug: "women/short-kurti" },
      ],
    },
    {
      label: "Ethnic Wear",
      slug: "ethnic-wear",
      children: [
        { label: "Bridal Lehenga", slug: "ethnic-wear/bridal-lehenga" },
        { label: "Groom Sherwani", slug: "ethnic-wear/groom-sherwani" },
        { label: "Indo-Western", slug: "ethnic-wear/indo-western" },
        { label: "Men's Kurta", slug: "ethnic-wear/mens-kurta" },
      ],
    },
  ];

  return (
    <aside className="col-span-12 md:col-span-3 border p-4 rounded-lg h-fit z-30 sticky top-24 bg-white">
      <h2 className="text-xl font-semibold mb-4">Browse by</h2>
      <div className="flex flex-col gap-2">
        {browseCategories.map((cat) => {
          const isActiveParent = categorySlug === cat.slug.split("/")[0];
          return (
            <div key={cat.label}>
              <Link
                href={`/category/${cat.slug}`}
                className={`w-full block px-2 py-1 rounded ${isActiveParent ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
              >
                {cat.label}
              </Link>

              {cat.children && (
                <div className="ml-4 mt-1 flex flex-col gap-1 border-l pl-2">
                  {cat.children.map((child) => {
                    const isActiveChild = slug.join("/") === child.slug;
                    return (
                      <Link
                        key={child.label}
                        href={`/category/${child.slug}`}
                        className={`text-left px-2 py-1 rounded text-sm ${isActiveChild ? "bg-gray-800 text-white" : "hover:bg-gray-100"
                          }`}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
});

const CategoryPageClient = ({ products = [], slug = [] }) => {
  return (
    <section className="px-4 py-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <Sidebar slug={slug} />

        {/* Products */}
        <div className="col-span-12 md:col-span-9">
          <h2 className="text-2xl font-semibold capitalize">{slug.join("/") || "All Products"}</h2>
          <p className="text-md text-gray-500 mb-4">Discover {slug[0]} at Gaurastra
            <br />
            {products.length} products
          </p>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p) => (
                <ProductCard key={p.product_id} product={p} />
              ))}
            </div>
          ) : (
            <p className="text-lg text-gray-500">No products available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryPageClient;
