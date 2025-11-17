"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

const DEFAULT_IMAGE = "/assets/default-product.png";

// Change this to your backend URL
const BASE_URL = "https://backend.gaurastra.com";

const ProductCard = ({ product, onAddToCart = () => {} }) => {
  if (!product) return null;

  // -------------------------
  // 🖼 IMAGE HANDLING
  // -------------------------
  const rawImg = product?.images?.[0]?.image_url;

  const finalImg =
    rawImg?.startsWith("http")
      ? rawImg
      : rawImg
      ? BASE_URL + rawImg
      : DEFAULT_IMAGE;

  // -------------------------
  // 💰 PRICE HANDLING
  // -------------------------
  const price = product?.latest_pricing?.price_detail?.original_price || 0;

  const discountedPrice =
    product?.latest_pricing?.price_detail?.discounted_price || price;

  const discountPercent =
    price > discountedPrice
      ? Math.round(((price - discountedPrice) / price) * 100)
      : 0;

  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden bg-white transition hover:shadow">
      {/* Product Image */}
      <Link href={`/product/${product.seo.slug}`}>
        <div className="h-56 w-full relative cursor-pointer overflow-hidden">
          <Image
            src={finalImg||"/assets/default-product.png"}
            alt={product.product_name}
            loading="eager"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 hover:scale-105 grayscale hover:grayscale-0"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 space-y-1">
        {/* Category */}
        <span className="text-xs text-gray-500 uppercase">
          {product.attributes?.gender || "Unisex"}
        </span>

        {/* Name */}
        <Link href={`/product/${product.seo.slug}`}>
          <h3 className="text-sm font-medium text-gray-900 hover:text-gray-700 cursor-pointer">
            {product.product_name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-gray-900">₹{discountedPrice}</span>

          {discountPercent > 0 && (
            <>
              <span className="text-xs line-through text-gray-400">₹{price}</span>
              <span className="text-xs text-gray-700 font-medium">
                {discountPercent}% OFF
              </span>
            </>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={onAddToCart}
          className="w-full mt-2 flex items-center justify-center gap-1 bg-black hover:bg-gray-800 text-white text-sm py-1.5 rounded-md transition"
        >
          <ShoppingCart size={16} />
          Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
