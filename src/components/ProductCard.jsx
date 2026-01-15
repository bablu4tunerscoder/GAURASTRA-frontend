"use client";
import { Handbag, Heart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, Activity } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCartLocal } from "@/store/slices/cartSlice";
import Modal from "./Modal";
import { useAddWishlistItemMutation } from "@/store/api/wishlistApi";
import { useRouter } from 'next/navigation';


const DEFAULT_IMAGE = "/assets/default-product.png";

const ProductCard = ({ product, onAddToCart, onToggleWishlist }) => {
  if (!product) return null;

  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth || {});

  const [modalData, setModalData] = useState(null);
  const [imgSrc, setImgSrc] = useState(DEFAULT_IMAGE);

  // Modal state
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // 👉 DEFAULT VARIANT
  const defaultVariant = product?.variants?.[0];
  const variants = product?.variants || [];

  // IMAGE (raw)
  const rawImg =
    defaultVariant?.images?.find(img => img.is_primary)?.image_url ||
    defaultVariant?.images?.[0]?.image_url;

  // FINAL IMAGE (absolute url or fallback)
  const finalImg = rawImg
    ? rawImg.startsWith("http")
      ? rawImg
      : `https://backend.gaurastra.com${rawImg}`
    : DEFAULT_IMAGE;

  // PRICE
  const price = defaultVariant?.pricing?.original_price || 0;
  const discountedPrice = defaultVariant?.pricing?.discounted_price || price;
  const discountPercent = defaultVariant?.pricing?.discount_percent || 0;

  // ================== MODAL LOGIC ==================
  const uniqueColors = useMemo(
    () => [...new Set(variants.map((v) => v?.attributes?.color).filter(Boolean))],
    [variants]
  );

  const uniqueSizes = useMemo(
    () => [...new Set(variants.map((v) => v?.attributes?.size).filter(Boolean))],
    [variants]
  );

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

  const currentVariant = useMemo(
    () =>
      variants.find(
        (v) =>
          v?.attributes?.color === selectedColor &&
          v?.attributes?.size === selectedSize
      ),
    [selectedColor, selectedSize, variants]
  );

  const availableSizes = useMemo(() => {
    if (!selectedColor) return uniqueSizes;
    return sizesByColor[selectedColor] || [];
  }, [selectedColor, uniqueSizes, sizesByColor]);

  const availableColors = useMemo(() => {
    if (!selectedSize) return uniqueColors;
    return colorsBySize[selectedSize] || [];
  }, [selectedSize, uniqueColors, colorsBySize]);

  const modalDiscountedPrice = currentVariant?.pricing?.discounted_price || discountedPrice;
  const modalOriginalPrice = currentVariant?.pricing?.original_price || price;
  const modalDiscountPercent = modalOriginalPrice > 0
    ? Math.round(((modalOriginalPrice - modalDiscountedPrice) / modalOriginalPrice) * 100)
    : 0;

  const stockQuantity = currentVariant?.stock?.stock_quantity || 0;
  const isAvailable = currentVariant?.stock?.is_available ?? true;

  const variantImages = currentVariant?.images || defaultVariant?.images || [];
  const displayImage = variantImages.length > 0
    ? variantImages[0]?.image_url?.startsWith("http")
      ? variantImages[0].image_url
      : `https://backend.gaurastra.com${variantImages[0].image_url}`
    : finalImg;

  // ================== HANDLERS ==================
  const handleColorChange = (color) => {
    setSelectedColor(color);
    setSelectedSize(sizesByColor[color]?.[0] || "");
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setSelectedColor(colorsBySize[size]?.[0] || "");
  };

  const handleAddToCartModal = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select color and size");
      return;
    }

    if (!isAvailable || quantity > stockQuantity) {
      toast.error(`Only ${stockQuantity} items in stock!`);
      return;
    }

    if (!currentVariant) {
      toast.error("Selected variant not found");
      return;
    }

    const { variants, selected_variant, ...rest } = product;

    const variantWithQuantity = {
      ...currentVariant,
      quantity: quantity,
    };

    const cartPayload = {
      ...rest,
      variant: variantWithQuantity,
    };

    if (!user) {
      dispatch(addToCartLocal(cartPayload));
      toast.success("Item added to Cart");
      setModalData(null);
      return;
    }

    toast.success("Item added to bag");
    setModalData(null);
  };


  const openModal = (e) => {
    e.preventDefault();
    setSelectedColor(uniqueColors[0] || "");
    setSelectedSize(uniqueSizes[0] || "");
    setQuantity(1);
    setModalData(product);
  };

  const closeModal = () => {

    setModalData(null);
    setSelectedColor("");
    setSelectedSize("");
    setQuantity(1);
  };
  const [addWishlistItem] = useAddWishlistItemMutation();

  const handleWishlist = async ({ product_id, sku }) => {

    if (!user) {
      toast.error("Please login to add to wishlist");
      return;
    }

    try {
      await addWishlistItem({ product_id, sku }).unwrap();

      toast.success("Added to wishlist ❤️");
    } catch (error) {
      toast.error(
        error?.data?.message || "Failed to add to wishlist"
      );
    }
  };

  return (
    <div className="w-full relative group">
      {/* Wishlist */}
      <button
        onClick={() => handleWishlist({ product_id: product?._id, sku: product?.variants[0]?.sku })}
        className="absolute top-3 right-3 md:top-4 md:right-4 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
      >
        <Heart className="w-4 h-4 md:w-5 md:h-5 text-gray-600 hover:text-primary" />
      </button>

      {/* Modal */}
      <Activity mode={modalData ? "visible" : "hidden"} >
        <Modal data={modalData} onClose={closeModal}>

          <>

            {/* Top Section: Image + Details */}
            <div className="flex gap-4">
              {/* Product Image */}
              <div className="w-1/4">
                <img
                  src={displayImage}
                  alt={product?.product_name}
                  className="w-full h-auto object-cover"
                  onError={(e) => e.target.src = DEFAULT_IMAGE}
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 flex flex-col gap-2">
                <h2 className="text-3xl font-bold">
                  {product?.product_name}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">₹{modalDiscountedPrice}</span>
                  {modalDiscountedPrice < modalOriginalPrice && (
                    <span className="text-gray-400 text-sm line-through">MRP ₹{modalOriginalPrice}</span>
                  )}
                  {modalDiscountPercent > 0 && (
                    <span className="text-red-600 font-medium">{modalDiscountPercent}% off</span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-400">
                    <span>★★★★</span><span className="text-gray-300">★</span>
                  </div>
                  <span className="text-gray-500 text-sm">4.5 (212 reviews)</span>
                </div>



                {/* Add to Cart */}
                <button
                  onClick={handleAddToCartModal}
                  disabled={!selectedColor || !selectedSize}
                  className="w-full flex items-center px-4 gap-2 bg-primary/90 text-white py-3 rounded-lg hover:bg-primary transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <Handbag className="w-5 h-5" />
                  ADD TO CART
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 mt-4 mb-3" />

            {/* Bottom Section: Delivery Info & Cancel Button */}
            <div className="flex justify-between items-center">

              <div className="flex flex-col gap-3">
                {/* Size Selection */}
                <div className="flex gap-2 items-center flex-wrap">
                  <span>Size: </span>
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeChange(size)}
                      className={`px-6 py-1 font-medium rounded border-2 transition-all ${selectedSize === size
                        ? "bg-primary text-white border-primary"
                        : "border-gray-300 hover:border-gray-400 text-gray-700"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2 items-center flex-wrap">

                  <span>Color:</span>
                  {availableColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => handleColorChange(color)}
                      className={`relative w-7 h-7 p-0.5 rounded-full overflow-hidden transition-all ${selectedColor === color
                        ? "ring-2 ring-primary"
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


              <div className="flex flex-col items-end">

                <div className="text-sm text-gray-600">
                  FREE Delivery sat 17 Jan
                </div>
                <Link href={`/product-details/${product?.slug}`} className="text-green-600 cursor-pointer">
                  See item details
                </Link>
                <button
                  onClick={closeModal}
                  className="px-6 py-1 cursor-pointer border border-primary text-primary rounded-full transition "
                >
                  Cancel
                </button>
              </div>
              {/* Color Selection */}
            </div>
          </>
        </Modal>
      </Activity>


      {/* Image Container */}
      <Link href={`/product-details/${product?.slug}`}>
        <div className="relative w-full aspect-[3/4] overflow-hidden bg-[url('/assets/bgImageContainer.png')] bg-no-repeat bg-cover bg-center p-2 md:p-4">
          <Image
            src={finalImg}
            alt={product.product_name}
            fill
            className="object-cover p-3 w-full h-full"
            onError={() => setImgSrc(DEFAULT_IMAGE)}
          />

          {discountPercent > 0 && (
            <span className="text-xs absolute top-4 left-4 md:top-6 md:left-6 bg-red-200 px-2 py-0.5 text-primary font-medium">
              {discountPercent}% OFF
            </span>
          )}

          {/* Add to Cart */}
          <button
            onClick={openModal}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-primary px-8 py-1.5 md:py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2 whitespace-nowrap font-semibold text-lg"
          >
            <Handbag className="w-6 h-6" />
            Add to Cart
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="pt-2 md:pt-3">
        <span className="text-secondary text-xs md:text-sm capitalize block mb-1">
          just In
        </span>

        <h3
          title={product.product_name}
          className="font-bold leading-tight text-gray-700 line-clamp-2 text-sm md:text-base lg:text-lg mb-1"
        >
          {product.product_name}
        </h3>

        <span className="text-xs text-gray-600 capitalize block mb-2">
          {product?.brand}
        </span>

        <div className="flex items-center gap-2">
          <p className="font-bold text-sm md:text-base lg:text-lg text-gray-600">
            ₹{discountedPrice}
          </p>

          {discountPercent > 0 && (
            <span className="text-xs md:text-sm line-through text-gray-600">
              ₹{price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;