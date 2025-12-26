"use client";

import { ChevronRight, Filter, Minus, Plus, X } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";

const PriceRangeSlider = ({ minPrice, maxPrice = 10000, onMinChange, onMaxChange }) => {
  const [isDraggingMin, setIsDraggingMin] = useState(false);
  const [isDraggingMax, setIsDraggingMax] = useState(false);
  const sliderRef = useRef(null);

  const MIN_VALUE = 0;
  const MAX_VALUE = 10000;
  const MIN_GAP = 50;

  const handleMouseMove = (e) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const value = Math.round(MIN_VALUE + percent * (MAX_VALUE - MIN_VALUE));

    if (isDraggingMin) {
      const newMin = Math.min(value, maxPrice - MIN_GAP);
      onMinChange(Math.max(MIN_VALUE, newMin));
    } else if (isDraggingMax) {
      const newMax = Math.max(value, minPrice + MIN_GAP);
      onMaxChange(Math.min(MAX_VALUE, newMax));
    }
  };

  const handleMouseUp = () => {
    setIsDraggingMin(false);
    setIsDraggingMax(false);
  };

  useEffect(() => {
    if (isDraggingMin || isDraggingMax) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDraggingMin, isDraggingMax, minPrice, maxPrice]);

  const minPercent = ((minPrice - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * 100;
  const maxPercent = ((maxPrice - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * 100;

  return (
    <>
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
            From
          </span>
          <input
            type="number"
            value={minPrice || ''}
            onChange={(e) => onMinChange(e.target.value)}
            placeholder="₹50"
            className="w-full pl-14 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
            to
          </span>
          <input
            type="number"
            value={maxPrice || ''}
            onChange={(e) => onMaxChange(e.target.value)}
            placeholder="₹550"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="relative pt-2 pb-4" ref={sliderRef}>
        <div className="absolute w-full h-0.5 bg-gray-300 rounded-full top-1/2 -translate-y-1/2" />

        <div
          className="absolute h-0.5 bg-primary rounded-full top-1/2 -translate-y-1/2"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`
          }}
        />

        <div
          className="absolute w-4 h-4 bg-white border-2 border-primary rounded-full cursor-pointer top-1/2 -translate-y-1/2 -translate-x-1/2 hover:scale-110 transition-transform shadow-sm"
          style={{ left: `${minPercent}%` }}
          onMouseDown={() => setIsDraggingMin(true)}
        />

        <div
          className="absolute w-4 h-4 bg-white border-2 border-primary rounded-full cursor-pointer top-1/2 -translate-y-1/2 -translate-x-1/2 hover:scale-110 transition-transform shadow-sm"
          style={{ left: `${maxPercent}%` }}
          onMouseDown={() => setIsDraggingMax(true)}
        />
      </div>
    </>
  );
};

const Sidebar = memo(({ slug, onChange, filters, onFilterChange }) => {
  const [open, setOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    color: false,
    discount: false,
    rating: false
  });

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

  const sizes = ["XS", "S", "M", "L", "XL", "2X"];
  const colors = [
    { name: "Black", hex: "#000000" },
    { name: "Yellow", hex: "#FCD34D" },
    { name: "Red", hex: "#DC2626" },
    { name: "Navy", hex: "#1E3A8A" },
    { name: "Teal", hex: "#14B8A6" },
    { name: "Pink", hex: "#FBB6CE" },
  ];
  const discounts = ["10 %", "20 %", "30 %", "40 %", "50 %", "60 %"];

  const hasActiveFilters =
    filters.search ||
    filters.min_price ||
    filters.max_price ||
    filters.sort ||
    filters.on_sale;

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed bottom-4 right-4 z-50 bg-black w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg"
      >
        <Filter size={28} />
      </button>

      <aside
        className={`
          col-span-12 md:col-span-3 
          fixed md:relative top-0 left-0 z-50 md:z-0
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="sticky md:top-8 top-0 w-72 md:w-auto bg-white">

          <div className="md:hidden flex justify-between items-center border-b p-4">
            <h2 className="text-lg font-bold">Filters</h2>
            <button onClick={() => setOpen(false)}>
              <X size={22} />
            </button>
          </div>

          {/* <div className="max-h-[calc(100vh-6rem)] overflow-y-auto  no-scrollbar p-4"> */}
          <div className=" no-scrollbar p-4 ps-0">
            <div className="space-y-2 mb-6">
              <div className="flex gap-2 items-center font-normal">
                <h2>Men's Wear</h2>
                <h2>-Total Items(7)</h2>
              </div>
              <h2 className="text-lg font-semibold text-primary font-serif">Filter</h2>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Category</h3>
              <div className="space-y-3">
                {items.map((it) => (
                  <div key={it.slug}>
                    <button
                      onClick={() => onChange(it.slug)}
                      className={`w-full flex justify-between items-center px-3 rounded-lg text-sm font-medium transition
                        ${slug[0] === it.slug.split("/")[0]
                          ? "text-primary"
                          : "text-gray-700 hover:text-primary"
                        }
                      `}
                    >
                      <span className="flex items-center gap-2">
                        <ChevronRight className={`w-3 h-3 transition-transform ${it.children && slug[0] === it.slug.split("/")[0] ? "rotate-90" : ""}`} />
                        {it.label}
                      </span>
                    </button>

                    {it.children && slug[0] === it.slug.split("/")[0] && (
                      <div className="ml-6 space-y-2 mt-2">
                        {it.children.map((child) => (
                          <button
                            key={child}
                            onClick={() => onChange(child)}
                            className={`w-full text-left px-2 py-1 text-xs transition flex items-center justify-between
                              ${slug.join("/") === child
                                ? "text-primary"
                                : "text-gray-600 hover:text-primary"
                              }
                            `}
                          >
                            {child.split("/")[1].replace(/-/g, " ")}
                            {slug.join("/") === child && (
                              <span className="text-primary">✓</span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3">

              {/* Size Section */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Size</h3>
                  <button onClick={() => toggleSection('size')}>
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      className="px-2 py-1 border border-gray-300 rounded text-sm hover:border-gray-900 transition"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Section */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Price</h3>
                  <button onClick={() => toggleSection('price')}>
                    {expandedSections.price ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </button>
                </div>
                {expandedSections.price && (
                  <PriceRangeSlider
                    minPrice={filters.min_price}
                    maxPrice={filters.max_price || 10000}
                    onMinChange={(val) => onFilterChange("min_price", val)}
                    onMaxChange={(val) => onFilterChange("max_price", val)}
                  />
                )}
              </div>
              {/* Color Section */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Color</h3>
                  <button onClick={() => toggleSection('color')}>
                    {expandedSections.color ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </button>
                </div>
                {expandedSections.color && (
                  <div className="flex flex-wrap gap-2">
                    {colors.map(color => (
                      <button
                        key={color.name}
                        title={color.name}
                        className="w-7 h-7 rounded-full border flex items-center justify-center transition"
                        style={{ borderColor: color.hex }}
                      >
                        <span
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>

                    ))}
                  </div>
                )}
              </div>

              {/* Discount Section */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Discount</h3>
                  <button onClick={() => toggleSection('discount')}>
                    {expandedSections.discount ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </button>
                </div>
                {expandedSections.discount && (
                  <div className="grid grid-cols-3 gap-2">
                    {discounts.map(discount => (
                      <button
                        key={discount}
                        className="px-3 py-2 border border-gray-300 rounded text-sm text-red-500 hover:border-gray-900 transition"
                      >
                        {discount}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Rating Section */}
              <div className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Rating</h3>
                  <button onClick={() => toggleSection('rating')}>
                    {expandedSections.rating ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </button>
                </div>
                {expandedSections.rating && (
                  <>Some other things goes here</>
                )}
              </div>
              <button className="text-sm text-red-500 hover:underline">
                See More
              </button>
            </div>

          </div>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
});

Sidebar.displayName = "Sidebar";
export default Sidebar;