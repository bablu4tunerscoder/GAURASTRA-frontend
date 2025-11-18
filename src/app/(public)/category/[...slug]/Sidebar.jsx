"use client";

import { useState, memo } from "react";
import { Search, DollarSign, SortAsc, Tag, X, ChevronRight, Filter, IndianRupee } from "lucide-react";

const Sidebar = memo(({ slug, onChange, filters, onFilterChange }) => {
  const [open, setOpen] = useState(false);

  const items = [
    { label: "All Products", slug: "all-products" },
    { label: "New Arrivals", slug: "new-arrivals" },
    { label: "Men", slug: "men", children: ["men/shirts"] },
    {
      label: "Women",
      slug: "women",
      children: ["women/festive-wear", "women/short-kurti"],
    },
    {
      label: "Ethnic Wear",
      slug: "ethnic-wear",
      children: [
        "ethnic-wear/bridal-lehenga",
        "ethnic-wear/groom-sherwani",
        "ethnic-wear/indo-western",
        "ethnic-wear/mens-kurta",
      ],
    },
  ];

  const hasActiveFilters =
    filters.search ||
    filters.min_price ||
    filters.max_price ||
    filters.sort ||
    filters.on_sale;

  return (
    <>
      {/* MOBILE FLOATING BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed bottom-4 right-4 z-50 bg-black w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg"
      >
        <Filter size={28} />
      </button>

      {/* SIDEBAR WRAPPER */}
      <aside
        className={`
          col-span-12 md:col-span-3 
          fixed md:relative top-0 left-0 z-50 md:z-0
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* CARD (YOUR ORIGINAL DESIGN) */}
        <div className="rounded-lg border border-gray-200 shadow-sm sticky md:top-24 top-0 w-72 md:w-auto bg-white">

          {/* MOBILE CLOSE HEADER */}
          <div className="md:hidden flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-bold">Filters</h2>
            <button onClick={() => setOpen(false)}>
              <X size={22} />
            </button>
          </div>

          {/* SCROLL AREA — EXACT SAME AS YOUR OLD DESIGN */}
          <div className="max-h-[calc(100vh-6rem)] overflow-y-auto custom-scroll p-5">

            {/* FILTERS */}
            <div className="border-b border-gray-200 pb-5 mb-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold hidden md:block">Filters</h2>
                {hasActiveFilters && (
                  <button
                    onClick={() => onFilterChange("clear", null)}
                    className="text-xs flex items-center gap-1 text-gray-600 hover:text-black"
                  >
                    <X size={12} /> Clear All
                  </button>
                )}
              </div>

              <div className="space-y-4">

                {/* SEARCH */}
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-700 mb-1 block">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={filters.search}
                      onChange={(e) => onFilterChange("search", e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm"
                      placeholder="Search products..."
                    />
                  </div>
                </div>

                {/* PRICE RANGE */}
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-700 mb-1 flex gap-1.5">
                    <IndianRupee className="w-3.5 h-3.5" /> Price Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={filters.min_price}
                      onChange={(e) => onFilterChange("min_price", e.target.value)}
                      placeholder="Min"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
                    />
                    <input
                      type="number"
                      value={filters.max_price}
                      onChange={(e) => onFilterChange("max_price", e.target.value)}
                      placeholder="Max"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>

                {/* SORT */}
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-700 mb-1 flex gap-1.5">
                    <SortAsc className="w-3.5 h-3.5" /> Sort By
                  </label>
                  <select
                    value={filters.sort}
                    onChange={(e) => onFilterChange("sort", e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="">Default</option>
                    <option value="price_low_to_high">Price: Low → High</option>
                    <option value="price_high_to_low">Price: High → Low</option>
                  </select>
                </div>

                {/* SALE */}
                <label className="flex items-center cursor-pointer gap-3">
                  <input
                    type="checkbox"
                    checked={filters.on_sale}
                    onChange={(e) => onFilterChange("on_sale", e.target.checked)}
                    className="w-5 h-5 border-2 cursor-pointer border-gray-300 rounded checked:bg-black checked:border-black"
                  />
                  <span className="text-sm font-medium flex gap-1.5">
                    <Tag className="w-4 h-4" /> On Sale Only
                  </span>
                </label>

              </div>
            </div>

            {/* CATEGORY LIST — UNCHANGED */}
            <div>
              <h2 className="text-lg font-bold mb-4">Categories</h2>
              <div className="space-y-1">
                {items.map((it) => (
                  <div key={it.slug}>
                    <button
                      onClick={() => onChange(it.slug)}
                      className={`w-full flex justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition
                        ${slug[0] === it.slug.split("/")[0]
                          ? "bg-black text-white"
                          : "text-gray-700 hover:bg-gray-100"
                        }
                      `}
                    >
                      {it.label}
                      {it.children && (
                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${slug[0] === it.slug.split("/")[0] ? "rotate-90" : ""
                            }`}
                        />
                      )}
                    </button>

                    {it.children && slug[0] === it.slug.split("/")[0] && (
                      <div className="ml-3 mt-1 border-l-2 pl-3 space-y-1">
                        {it.children.map((child) => (
                          <button
                            key={child}
                            onClick={() => onChange(child)}
                            className={`w-full text-left px-3 py-2 rounded-md text-xs transition
                              ${slug.join("/") === child
                                ? "bg-gray-900 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                              }
                            `}
                          >
                            {child.split("/")[1].replace(/-/g, " ").toUpperCase()}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </aside>

      {/* BACKDROP */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
});

Sidebar.displayName = "Sidebar";
export default Sidebar;
