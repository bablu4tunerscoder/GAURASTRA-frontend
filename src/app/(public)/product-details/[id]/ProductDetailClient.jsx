"use client"
import { addToCartLocal } from "@/store/slices/cartSlice"
import { ChevronDown, ChevronUp, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"

const ProductDetailClient = ({ initialProducts }) => {

  // ================== HOOKS ==================
  const router = useRouter();
  const { user } = useSelector((state) => state.auth || {});
  const dispatch = useDispatch()

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // ================== PRODUCT DATA ==================
  const product = initialProducts?.details || {};
  const variants = product?.variants || [];


  // console.log(initialProducts)

  const productName = product?.product_name || "Product Name";

  // ================== UNIQUE ATTRIBUTES ==================
  const uniqueColors = useMemo(
    () => [...new Set(variants.map((v) => v?.attributes?.color).filter(Boolean))],
    [variants]
  );

  const uniqueSizes = useMemo(
    () => [...new Set(variants.map((v) => v?.attributes?.size).filter(Boolean))],
    [variants]
  );

  // ================== ATTRIBUTE MAPS ==================
  const colorsBySize = useMemo(() => {
    const map = {};
    uniqueSizes.forEach((size) => {
      map[size] = [
        ...new Set(
          variants
            .filter((v) => v?.attributes?.size === size)
            .map((v) => v?.attributes?.color)
            .filter(Boolean)
        ),
      ];
    });
    return map;
  }, [uniqueSizes, variants]);

  const sizesByColor = useMemo(() => {
    const map = {};
    uniqueColors.forEach((color) => {
      map[color] = [
        ...new Set(
          variants
            .filter((v) => v?.attributes?.color === color)
            .map((v) => v?.attributes?.size)
            .filter(Boolean)
        ),
      ];
    });
    return map;
  }, [uniqueColors, variants]);

  // ================== CURRENT VARIANT ==================
  const currentVariant = useMemo(
    () =>
      variants.find(
        (v) =>
          v?.attributes?.color === selectedColor &&
          v?.attributes?.size === selectedSize
      ),
    [selectedColor, selectedSize, variants]
  );

  // ================== PRICING & STOCK ==================
  const fallbackVariant = variants[0];

  const discountedPrice =
    currentVariant?.pricing?.discounted_price ||
    fallbackVariant?.pricing?.discounted_price ||
    0;

  const originalPrice =
    currentVariant?.pricing?.original_price ||
    fallbackVariant?.pricing?.original_price ||
    0;

  const stockQuantity = currentVariant?.stock?.stock_quantity || 0;
  const isAvailable = currentVariant?.stock?.is_available ?? true;

  const discountPercent =
    originalPrice > 0
      ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
      : 0;

  // ================== IMAGES ==================
  const variantImages =
    currentVariant?.images || fallbackVariant?.images || [];

  const displayImages =
    variantImages.length > 0
      ? variantImages.map((img) =>
        img?.image_url?.startsWith("http")
          ? img.image_url
          : `https://backend.gaurastra.com${img.image_url}`
      )
      : ["/placeholder.svg"];

  // ================== AVAILABLE OPTIONS ==================
  const availableSizes = useMemo(() => {
    if (!selectedColor) return uniqueSizes;
    return [
      ...new Set(
        variants
          .filter((v) => v?.attributes?.color === selectedColor)
          .map((v) => v?.attributes?.size)
          .filter(Boolean)
      ),
    ];
  }, [selectedColor, uniqueSizes, variants]);

  const availableColors = useMemo(() => {
    if (!selectedSize) return uniqueColors;
    return [
      ...new Set(
        variants
          .filter((v) => v?.attributes?.size === selectedSize)
          .map((v) => v?.attributes?.color)
          .filter(Boolean)
      ),
    ];
  }, [selectedSize, uniqueColors, variants]);

  // ================== HANDLERS ==================
  const handleColorChange = (color) => {
    setSelectedColor(color);
    setSelectedSize(sizesByColor[color]?.[0] || "");
    setSelectedImageIndex(0);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setSelectedColor(colorsBySize[size]?.[0] || "");
    setSelectedImageIndex(0);
  };

  const handleIncreaseQuantity = () => {
    if (quantity >= stockQuantity) {
      toast.error(`Only ${stockQuantity} items in stock!`);
      return;
    }
    setQuantity((prev) => prev + 1);
  };

  const handleAddToBag = (product) => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select color and size");
      return;
    }

    if (!isAvailable || quantity > stockQuantity) {
      toast.error(`Only ${stockQuantity} items in stock!`);
      return;
    }

    // Use currentVariant instead of selected_variant
    if (!currentVariant) {
      toast.error("Selected variant not found");
      return;
    }

    // Remove unwanted keys
    const { variants, selected_variant, ...rest } = product;

    // Build variant with quantity INSIDE using currentVariant
    const variantWithQuantity = {
      ...currentVariant,
      quantity: quantity, // Use the actual quantity state
    };

    const cartPayload = {
      ...rest,
      variant: variantWithQuantity,
    };

    if (!user) {
      dispatch(addToCartLocal(cartPayload));
      toast.success("Item added to Cart");
      return;
    }

    // Add your logged-in user cart logic here
    toast.success("Item added to bag");
  };


  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select color and size");
      return;
    }

    if (!user) {
      localStorage.setItem(
        "pendingBuyNowProduct",
        JSON.stringify({
          product: initialProducts,
          selectedColor,
          selectedSize,
          quantity,
          returnUrl: window.location.pathname,
        })
      );
      router.push("/login?from=buyNow");
      return;
    }

    router.push("/checkout");
  };

  // ================== EFFECTS ==================
  useEffect(() => {
    if (selectedColor && !availableSizes.includes(selectedSize)) {
      setSelectedSize("");
    }
  }, [selectedColor, availableSizes, selectedSize]);

  useEffect(() => {
    if (selectedSize && !availableColors.includes(selectedColor)) {
      setSelectedColor("");
    }
  }, [selectedSize, availableColors, selectedColor]);




  return (
    <section className="py-4">
      <div className="max-w-[1400px] w-full mx-auto px-4 lg:px-6 py-2 border-x-0 border-y border-dashed mt-2 border-[#E7E7E5]">
        <p className="text-red-700 text-sm">100 people bought in last 7 days</p>
      </div>
      {/* new code  */}

      <div className="max-w-[1400px] w-full mx-auto px-4 lg:px-6 py-2 border-x-0 border-y border-dashed mt-2 border-[#E7E7E5]">
        <p className="text-red-700 text-sm">100 people bought in last 7 days</p>
      </div>

      <div className="max-w-[1400px] w-full mx-auto py-6 mt-6 lg:mt-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[3fr_1fr] md:gap-4 lg:grid-cols-[3fr_1fr]">
          <div className="w-full mx-auto">
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-6">
              {/* LEFT SIDE: Images - 50% */}
              <div className="flex flex-col-reverse lg:flex-row w-full lg:w-[50%]">
                {/* Thumbnail Column with Arrows */}
                <div className="flex flex-row  lg:flex-col items-center gap-2 lg:w-[30%]">

                  {/* Up Arrow */}
                  <button className="hidden lg:flex justify-center items-center border border-gray-300 rounded w-8 h-8 hover:bg-gray-50">
                    <ChevronUp size={16} className="text-gray-600" />
                  </button>

                  {/* Thumbnails */}
                  <div className="flex flex-row lg:flex-col gap-2">
                    {displayImages.slice(0, 3).map((src, i) => (
                      <div
                        key={i}
                        onClick={() => setSelectedImageIndex(i)}
                        className={`w-26 h-26 lg:w-full lg:aspect-square rounded cursor-pointer overflow-hidden border-2 transition-all ${selectedImageIndex === i ? "border-red-700" : "border-gray-300"
                          }`}
                      >
                        <img
                          src={src || "/placeholder.svg"}
                          alt={`thumbnail-${i}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Down Arrow */}
                  <button className="hidden lg:flex justify-center items-center border border-gray-300 rounded w-8 h-8 hover:bg-gray-50">
                    <ChevronDown size={16} className="text-gray-600" />
                  </button>
                </div>

                {/* Main Image */}
                <div className="flex-1 lg:w-[70%]">
                  <div className="w-full aspect-square rounded-lg overflow-hidden ">
                    <img
                      src={displayImages[selectedImageIndex] || "/placeholder.svg"}
                      alt="product"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: Product Details - 50% */}
              <div className="w-full lg:w-[50%] flex flex-col">
                {/* Product Title */}
                <h1 className="text-2xl lg:text-3xl font-bold leading-tight">
                  {productName}
                </h1>

                {/* Price */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-3xl font-bold text-gray-900">₹{discountedPrice}</span>
                  <span className="text-lg text-gray-400 line-through">MRP ₹{originalPrice}</span>
                  <span className="text-red-600 font-semibold">{discountPercent}% off</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    <span>★★★★</span><span className="text-gray-300">★</span>
                  </div>
                  <span className="text-sm text-gray-600">4.5 (212 reviews)</span>
                </div>

                {/* Size Selection */}
                <div className="pt-2">
                  <p className="text-sm font-medium mb-3">
                    Size: <span className="font-bold">{selectedSize || "Select"}</span>
                  </p>

                  <div className="flex gap-3 flex-wrap">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeChange(size)}
                        className={`px-4 py-0.5 text-xs font-medium rounded border-2 transition-all ${selectedSize === size
                          ? "bg-red-700 text-white border-red-700"
                          : "border-gray-300 hover:border-gray-400 text-gray-700"
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div className="pt-2">
                  <p className="text-sm font-medium mb-3">
                    Color: <span className="font-bold">{selectedColor || "Select"}</span>
                  </p>

                  <div className="flex gap-3">
                    {availableColors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => handleColorChange(color)}
                        className={`relative w-7 h-7 p-0.5 rounded-full overflow-hidden transition-all ${selectedColor === color
                          ? "border-red-700 ring-2 ring-red-700"
                          : "border-gray-300 hover:border-gray-400"
                          }`}
                      >
                        <div
                          style={{ backgroundColor: color }}
                          className="w-full h-full rounded-full"
                        />
                      </button>
                    ))}
                  </div>
                </div>



                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToBag(product)}
                  disabled={!selectedColor || !selectedSize}
                  className="mt-4 w-full bg-red-700 hover:bg-red-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition text-white rounded-lg py-2.5 px-4 flex items-center gap-3 font-semibold text-base"
                >
                  <ShoppingCart size={20} />
                  ADD TO CART
                </button>

                {/* Return Policy */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="font-semibold text-base mb-1">Return Policy</p>
                  <p className="text-sm text-gray-600">
                    Not returnable if cloths damage{" "}
                    <span className="text-green-600 cursor-pointer hover:underline">read more</span>
                  </p>
                </div>
              </div>
            </div>

            {/* here goes the description */}

            {/* LEFT TABLE */}
            <div className="mt-10">
              <div className="border border-x-0 mb-3">
                <div className="flex gap-8 py-3 text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
                  <button className="text-red-600 font-medium">KEY HIGHLIGHTS</button>
                  <button className="text-gray-400">PRODUCT INFORMATION</button>
                  <button className="text-gray-400">DIRECTIONS FOR USE</button>
                  <button className="text-gray-400">SAFETY INFORMATION</button>
                  <button className="text-gray-400">FAQS</button>
                  <button className="text-gray-400">CUSTOMERS</button>
                </div>
              </div>
              <div className="border rounded-md">
                <div className="grid sm:grid-cols-1 lg:grid-cols-2 px-6 py-4 border-b text-xs tracking-widest text-gray-500">
                  <span>FEATURE</span>
                  <span>DETAILS</span>
                </div>

                {[
                  ["FABRIC100%", "PURE COTTON"],
                  ["PATTERN", "TRADITIONAL BANDHANI PRINT"],
                  ["COMFORT", "LIGHTWEIGHT & BREATHABLE"],
                  ["FIT", "REGULAR FIT"],
                  ["OCCASION", "CASUAL, FESTIVE, DAILY WEAR"],
                  ["ORIGIN", "MADE IN INDIA"],
                ].map(([left, right], i) => (
                  <div key={i} className="grid grid-cols-2 px-6 py-4 last:border-b-0 text-sm">
                    <span className="text-gray-600">{left}</span>
                    <span className="font-medium text-gray-600">{right}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* reviews goes here */}
            some reviews

          </div>

          <div>
            <div className="border border-[#E7E7E5] rounded-lg lg:mt-0">

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-4">Unlock Coupon Code</h3>
                <div className="w-full border-2 border-dashed border-[#E7E7E5] mb-5"></div>
                <div className="w-full bg-[url('/subtract.png')] bg-no-repeat bg-cover flex flex-col relative">
                  <p className="font-medium text-sm">Extra 10% off</p>
                  <p className="text-sm text-gray-600">
                    Get extra 10% off on your first <br /> purchase{" "}
                    <span className="text-red-500 cursor-pointer">see more</span>
                  </p>
                  <hr className="w-full mt-3 text-red-900" />
                  <div className="flex flex-col items-end mr-3 mt-3">
                    <p className="font-medium text-sm">Extra 15% off</p>
                    <p className="text-sm text-gray-600">
                      Extra 15% off upto ₹200
                      <br /> <span className="text-red-500 cursor-pointer">see more</span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mt-5">
                  <input placeholder="Enter delivery pincode" className="border px-3 py-2 w-full" />
                  <button className="text-red-600 font-medium">Apply</button>
                </div>
              </div>
              <div className="w-full mt-5">
                <hr className="w-full text-gray-900" />
              </div>
              <div className="p-4">
                <p className="text-red-500 text-sm mt-2">Provide Delivery Location</p>

                <div className="flex items-center justify-between border mt-4 p-2 rounded">
                  <span>
                    {quantity} {productName}
                  </span>
                  <button onClick={handleIncreaseQuantity} className="text-red-600 text-xl">
                    +
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleBuyNow}
                    className="mt-6 w-full bg-[#9C0131] hover:bg-red-800 text-white py-3 flex items-center justify-center gap-2 font-medium capitalize rounded-lg"
                  >
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
            {/* RIGHT INFO */}
            <div className="block">
              <div className="flex items-center gap-6 flex-wrap justify-center lg:justify-start">
                <div className="flex flex-col items-center text-center text-xs">
                  <img src="/img1.svg" alt="" className="w-14" />
                  <p className="mt-1 font-medium">COD available</p>
                </div>
                <div className="flex flex-col items-center text-center text-xs">
                  <img src="/img1.svg" alt="" className="w-14" />
                  <p className="mt-1 font-medium">
                    7-day return & <br /> size exchange
                  </p>
                </div>
                <div className="flex flex-col items-center text-center text-xs">
                  <img src="/img1.svg" alt="" className="w-14" />
                  <p className="mt-1 font-medium">
                    Usually ships in <br /> 2 days
                  </p>
                </div>
              </div>
            </div>

            {/* 2 product image with + goes here */}

            2 product image

          </div>


        </div>

        {/* PRODUCT INFO SECTION */}

      </div>
    </section >
  )
}

export default ProductDetailClient
