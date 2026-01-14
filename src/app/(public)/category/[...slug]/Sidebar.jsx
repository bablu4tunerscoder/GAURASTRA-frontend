"use client";

import { useGetSidebarItemsQuery } from "@/store/slices/sidebarSlice";
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

      <div className="relative pt-2 mx-2 pb-4" ref={sliderRef}>
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

const Sidebar = memo(({ slug, filters, onFilterChange, onCategoryChange }) => {
  const [open, setOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    color: false,
    discount: false,
    rating: false,
    size: true
  });
  const [selectedColor, setSelectedColor] = useState(filters.color || "");
  const [selectedSize, setSelectedSize] = useState("");

  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
  } = useGetSidebarItemsQuery();

  const sidebarData = apiResponse?.data;

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleColorClick = (color) => {
    const newColor = selectedColor === color ? "" : color;
    setSelectedColor(newColor);
    onFilterChange("color", newColor);
  };

  const handleSizeClick = (size) => {
    const newSize = selectedSize === size ? "" : size;
    setSelectedSize(newSize);

    // Add size to filters if needed
    onFilterChange("size", newSize);
  };

  // Calculate total items from sizes
  const totalItems = sidebarData?.filters?.sizes?.reduce((sum, size) => sum + size.quantity, 0) || 0;

  if (isLoading) {
    return (
      <aside className="col-span-12 md:col-span-3">
        <div className="sticky md:top-8 top-0 w-72 md:w-auto bg-white p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-8 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    );
  }

  if (isError) {
    return (
      <aside className="col-span-12 md:col-span-3">
        <div className="sticky md:top-8 top-0 w-72 md:w-auto bg-white p-4">
          <div className="text-red-500 text-sm">
            Error loading filters: {error?.message || 'Please try again'}
          </div>
        </div>
      </aside>
    );
  }

  const categories = sidebarData?.categories || [];
  const colors = sidebarData?.filters?.colors || [];
  const sizes = sidebarData?.filters?.sizes || [];
  const discounts = ["10%", "20%", "30%", "40%", "50%", "60%"];

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

          <div className="no-scrollbar p-4 ps-0 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="space-y-2 mb-6">
              <div className="flex gap-2 items-center font-normal text-gray-600">
                <h2>All Products</h2>
                <h2>- Total Items ({totalItems})</h2>
              </div>
              <h2 className="text-lg font-semibold text-primary font-serif">Filter</h2>

              {/* Categories Section */}
              {categories.length > 0 && (
                <>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Category</h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category.category_id}>
                        <button
                          onClick={() => {
                            toggleCategory(category.category_id);
                            onCategoryChange(category.category_name.toLowerCase());
                          }}
                          className={`w-full flex justify-between items-center px-3 rounded-lg text-sm font-medium transition
                            ${slug[0] === category.category_id
                              ? "text-primary"
                              : "text-gray-700 hover:text-primary"
                            }
                          `}
                        >
                          <span className="flex items-center gap-2">
                            <ChevronRight
                              className={`w-3 h-3 transition-transform ${expandedCategories[category.category_id] ? "rotate-90" : ""
                                }`}
                            />
                            {category.category_name}
                          </span>
                        </button>

                        {expandedCategories[category.category_id] && category.subcategories && (
                          <div className="ml-6 space-y-2 mt-2">
                            {category.subcategories.map((subcategory) => (
                              <button
                                key={subcategory.subcategory_id}
                                onClick={() => onCategoryChange(category.category_name.toLowerCase(), subcategory.subcategory_name.toLowerCase())}
                                className={`w-full text-left px-2 py-1 text-xs transition flex items-center justify-between
                                  ${slug[1] === subcategory.subcategory_id
                                    ? "text-primary"
                                    : "text-gray-600 hover:text-primary"
                                  }
                                `}
                              >
                                {subcategory.subcategory_name}
                                {slug[1] === subcategory.subcategory_id && (
                                  <span className="text-primary">✓</span>
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3">
              {/* Size Section */}
              {sizes.length > 0 && (
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900">Size</h3>
                    <button className="text-gray-700" onClick={() => toggleSection('size')}>
                      {expandedSections.size ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>
                  {expandedSections.size && (
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((sizeObj) => (
                        <button
                          key={sizeObj.size}
                          onClick={() => handleSizeClick(sizeObj.size)}
                          className={`px-2 py-1 border rounded text-sm transition flex flex-col items-center min-w-[50px]
                            ${selectedSize === sizeObj.size
                              ? "border-primary text-primary bg-primary/5"
                              : "border-gray-300 text-gray-600 hover:border-gray-900"
                            }
                          `}
                        >
                          <span className="font-medium">{sizeObj.size}</span>
                          <span className="text-xs text-gray-400">({sizeObj.quantity})</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Price Section */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Price</h3>
                  <button className="text-gray-700" onClick={() => toggleSection('price')}>
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
              {colors.length > 0 && (
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900">Color</h3>
                    <button className="text-gray-700" onClick={() => toggleSection('color')}>
                      {expandedSections.color ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>
                  {expandedSections.color && (
                    <div className="flex flex-wrap gap-2">
                      {colors.map((color) => (
                        <button
                          key={color}
                          title={color}
                          onClick={() => handleColorClick(color)}
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition hover:scale-110
                            ${selectedColor === color ? "border-black shadow-md" : "border-gray-300"}
                          `}
                          style={{
                            borderColor: selectedColor === color ? "#000" : color
                          }}
                        >
                          <span
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Discount Section */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Discount</h3>
                  <button className="text-gray-700" onClick={() => toggleSection('discount')}>
                    {expandedSections.discount ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </button>
                </div>
                {expandedSections.discount && (
                  <div className="grid grid-cols-3 gap-2">
                    {discounts.map((discount) => (
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
                  <button className="text-gray-700" onClick={() => toggleSection('rating')}>
                    {expandedSections.rating ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </button>
                </div>
                {expandedSections.rating && (
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        className="w-full text-left px-2 py-1 text-sm text-gray-600 hover:text-primary transition flex items-center gap-1"
                      >
                        <span className="text-yellow-400">{"★".repeat(rating)}</span>
                        <span className="text-gray-300">{"★".repeat(5 - rating)}</span>
                        <span className="ml-1">& up</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Clear Filters Button */}
              <button
                onClick={() => {
                  setSelectedColor("");
                  setSelectedSize("");
                  onFilterChange("clear");
                }}
                className="w-full py-2 text-sm text-red-500 hover:underline"
              >
                Clear All Filters
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