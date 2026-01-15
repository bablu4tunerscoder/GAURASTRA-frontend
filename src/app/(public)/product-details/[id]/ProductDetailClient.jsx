"use client"
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const ProductDetailClient = ({ initialProducts }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { user } = useSelector((state) => state.auth);


  // Extract product data
  const product = initialProducts;


  const productName = product?.product_name || "Product Name";
  const description = product?.description || "";
  const pricing = product?.latest_pricing?.price_detail;
  const originalPrice = pricing?.original_price || 0;
  const discountedPrice = pricing?.discounted_price || 0;
  const discountPercent = pricing?.discount_percent || 0;
  const stockDetails = product?.stock_details || [];
  const images = product?.images || [];

  // Get available sizes from stock details
  const availableSizes = stockDetails
    .filter(stock => stock.is_available && stock.stock_quantity > 0)
    .map(stock => stock.size);

  // Prepare product images from the data
  const productImages = images
    .map(img =>
      img.image_url.startsWith("http")
        ? img.image_url
        : `https://backend.gaurastra.com${img.image_url}`
    );


  // Fallback if no images
  const displayImages = productImages.length > 0
    ? productImages
    : ["/assets/default-product.png"];

  // Parse description into structured data
  const parseDescription = (desc) => {
    const lines = desc.split('\n').filter(line => line.trim());
    const details = [];
    const features = [];

    lines.forEach(line => {
      if (line.includes(':')) {
        const cleaned = line.trim();
        if (cleaned) details.push(cleaned);
      }
    });

    return { details, features };
  };

  const { details } = parseDescription(description);

  const getStockForSize = (size) => {
    const stockItem = stockDetails.find(s => s.size === size);
    return stockItem?.stock_quantity || 0;
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setQuantity(1);
  };

  const handleIncreaseQuantity = () => {
    const currentStock = getStockForSize(selectedSize);
    if (quantity >= currentStock) {
      toast.error(`Only ${currentStock} items in stock!`, {
        duration: 3000,
        position: 'top-right',
      });
      return;
    }
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToBag = () => {
    if (!selectedSize) {
      toast.error("Please select a size", {
        duration: 3000,
      });
      return;
    }

    const stock = getStockForSize(selectedSize);
    if (quantity > stock) {
      toast.error(`Only ${stock} items in stock!`, {
        duration: 3000,
      });
      return;
    }

    // Dispatch with complete product structure + quantity


    toast.success("Item added to bag", {
      duration: 3000,
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      return toast.error("Please select a size before proceeding.");
    }
    if (!initialProducts) return;

    // If user NOT logged in → Save temporarily + redirect to login
    if (!user) {
      localStorage.setItem(
        "pendingBuyNowProduct",
        JSON.stringify({
          product: initialProducts,
          selectedSize,
          quantity,
          returnUrl: window.location.pathname,
        })
      );


      router.push(
        `/login?from=buyNow`
      );

      return;
    }

    // User logged in → set Buy Now item
    // dispatch(
    //   setBuyNowItem({
    //     ...initialProducts,
    //     selectedSize,
    //     quantity,
    //   })
    // );

    // Redirect to checkout
    router.push("/checkout");
  };

  // const products = []

  return (
    <section className="py-4">
      {/* new code  */}

      <div className="max-w-[1400px] w-full mx-auto px-4 lg:px-6 py-2 border-x-0 border-y border-dashed mt-2 border-[#E7E7E5]">
        <p className="text-red-700 text-sm">100 people bought in last 7 days</p>
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-4 lg:px-6 py-6 mt-6 lg:mt-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[2fr_1fr] md:gap-8 lg:grid-cols-[3fr_1fr]">
          <div className="w-full mx-auto px-4 lg:px-6">
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 lg:justify-between">
              <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-5">
                {/* LEFT: Thumbnails */}
                <div className="flex flex-row lg:flex-col  items-center gap-4 w-[19%] relative">
                  <button className="hidden lg:flex justify-center items-center border border-red-700  absolute -top-10 w-8 h-8">

                    <ChevronUp size={20} />
                  </button>

                  {displayImages.map((src, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedImageIndex(i)}
                      className={`min-w-20 min-h-20 md:w-16 md:h-16 rounded cursor-pointer overflow-hidden border-2 transition-all ${selectedImageIndex === i ? "border-gray-200" : "border-gray-200"
                        }`}
                    >
                      <Image
                        src={src || "/placeholder.svg"}
                        width={80}
                        height={80}
                        alt={`product-thumb-${i}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}

                  <button className="hidden lg:flex border justify-center items-center border-red-700 absolute -bottom-9 w-8 h-8">
                    <ChevronDown size={20} />
                  </button>
                </div>

                {/* CENTER: Main Image */}
                <div className="w-full lg:w-[70%] relative">
                  <div className="aspect-square w-full rounded-xl overflow-hidden">
                    <img
                      src={displayImages[selectedImageIndex] || "/placeholder.svg"}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Write review */}
                  <div className="absolute -top-6 right-4 flex items-center gap-2">
                    <span className="text-red-700 text-sm font-medium">
                      Write a Review
                    </span>
                    <img src="/repost.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-[50%] flex flex-col gap-0 ml-1">
                {/* RIGHT: Product Details */}
                <div className="">
                  <h1 className="text-2xl lg:text-3xl font-extrabold leading-tight">
                    Indigo Cotton <br /> Bandhani Bush Shirt
                  </h1>

                  {/* Price */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-2xl font-bold">₹2,499</span>
                    <span className="text-gray-400 line-through">
                      MRP ₹3000
                    </span>
                    <span className="text-red-500 font-medium">40% off</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">★★★★☆</span>
                    <span className="text-sm text-gray-500">
                      4.5 (212 reviews)
                    </span>
                  </div>

                  {/* Delivery */}
                  <p className="text-sm">
                    Delivery by{" "}
                    <span className="text-[#FEB92D] font-medium">
                      Tomorrow, before 11:00 pm
                    </span>
                  </p>

                  {/* Color */}
                  <p className="text-sm font-medium">
                    <span className="text-gray-500">Color:</span> Orange
                  </p>

                  {/* Sizes */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Size: L</span>
                      <a className="text-blue-500 cursor-pointer">
                        View size guide
                      </a>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {["L", "M", "XL", "2XL"].map((s) => (
                        <button
                          key={s}
                          className={`rounded-md px-7 py-0 text-sm font-medium ${s === "L"
                            ? "bg-red-700 text-white"
                            : "border border-gray-300 text-gray-700"
                            }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <button className="mt-4 w-full bg-[#9C0131] hover:bg-red-800 transition text-white rounded-lg py-3 pl-3 flex items-center justify-center lg:justify-start gap-3 font-semibold">
                    <img src="/cart.svg" alt="" />
                    ADD TO CART
                  </button>

                  <div className="border border-dashed border-gray-200 my-4"></div>

                  {/* Return Policy */}
                  <div>
                    <p className="font-medium text-lg">Return Policy</p>
                    <p className="text-gray-600">
                      Not returnable if clothes damaged{" "}
                      <span className="text-green-600 cursor-pointer">
                        read more
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COUPON PANEL */}
          <div className="border border-[#E7E7E5] rounded-lg lg:mt-0 mt-8">
            <div className=" p-4">
              <h3 className="text-lg font-semibold mb-4">Unlock Coupon Code</h3>
              <div className="w-full  border-2 border-dashed border-[#E7E7E5] mb-5"></div>
              <div className="w-full bg-[url('/subtract.png')] bg-no-repeat bg-cover flex flex-col  relative">
                <p className="font-medium text-sm">Extra 10% off</p>
                <p className="text-sm text-gray-600">
                  Get extra 10% off on your first <br /> purchase{" "}
                  <span className="text-red-500 cursor-pointer">see more</span>
                </p>
                <hr className="w-full mt-3 text-red-900" />
                <div className="flex flex-col  items-end mr-3 mt-3">
                  <p className="font-medium text-sm">Extra 15% off</p>
                  <p className="text-sm text-gray-600">
                    Extra 15% off upto ₹200
                    <br />{" "}
                    <span className="text-red-500 cursor-pointer">
                      see more
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mt-5">
                <input
                  placeholder="Enter delivery pincode"
                  className="border px-3 py-2 w-full"
                />
                <button className="text-red-600 font-medium">Apply</button>
              </div>
            </div>
            <div className="w-full mt-5">
              <hr className="w-full text-gray-900" />
            </div>
            <div className="p-4">
              <p className="text-red-500 text-sm mt-2">
                Provide Delivery Location
              </p>

              <div className="flex items-center justify-between border mt-4 p-2 rounded">
                <span>1 Shirt</span>
                <button className="text-red-600 text-xl">+</button>
              </div>
              <div>
                <button className="mt-6 w-full bg-[#9C0131] hover:bg-red-800 text-white py-3 flex items-center justify-center gap-2 font-medium capitalize rounded-lg">
                  ADD 1 T-SHIRT
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCT INFO SECTION */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-20 mt-8 grid-cols-1">
          {/* LEFT TABLE */}
          <div className="">
            <div className="border border-x-0 mb-3">
              <div className="flex gap-8  py-3 text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
                <button className="text-red-600 font-medium ">
                  KEY HIGHLIGHTS
                </button>
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
                <div
                  key={i}
                  className="grid grid-cols-2 px-6 py-4  last:border-b-0 text-sm"
                >
                  <span className="text-gray-600">{left}</span>
                  <span className="font-medium text-gray-600">{right}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT INFO */}
          <div className="flex hidden xl:block">
            <div className="flex items-center gap-6 flex-wrap justify-center lg:justify-start">
              {/* COD */}
              <div className="flex flex-col items-center text-center text-xs">
                <img src="/img1.svg" alt="" className="w-14" />
                <p className="mt-1 font-medium">COD available</p>
              </div>

              {/* RETURN */}
              <div className="flex flex-col items-center text-center text-xs">
                <img src="/img1.svg" alt="" className="w-14" />
                <p className="mt-1 font-medium">
                  7-day return & <br /> size exchange
                </p>
              </div>

              {/* SHIPPING */}
              <div className="flex flex-col items-center text-center text-xs">
                <img src="/img1.svg" alt="" className="w-14" />
                <p className="mt-1 font-medium">
                  Usually ships in <br /> 2 days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>




    </section>
  )
}

export default ProductDetailClient
