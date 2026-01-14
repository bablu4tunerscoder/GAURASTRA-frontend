"use client";
import { Handbag, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const DEFAULT_IMAGE = "/assets/default-product.png";

const ProductCard = ({ product, onAddToCart, onToggleWishlist }) => {
  if (!product) return null;

  // 👉 DEFAULT VARIANT
  const defaultVariant = product?.variants?.[0];

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

  // STATE (after finalImg exists)
  const [imgSrc, setImgSrc] = useState(finalImg);



  // PRICE
  const price = defaultVariant?.pricing?.original_price || 0;
  const discountedPrice =
    defaultVariant?.pricing?.discounted_price || price;

  const discountPercent =
    defaultVariant?.pricing?.discount_percent || 0;

  return (
    <div className="w-full relative group">
      {/* Wishlist */}
      <button
        onClick={() => onToggleWishlist?.(product)}
        className="
          absolute top-3 right-3 md:top-4 md:right-4 z-10
          w-8 h-8 md:w-10 md:h-10
          rounded-full bg-white shadow
          flex items-center justify-center
          opacity-0 group-hover:opacity-100 transition
        "
      >
        <Heart className="w-4 h-4 md:w-5 md:h-5 text-gray-600 hover:text-primary" />
      </button>
      {/* Image Container */}
      <Link href={`/product-details/${product?.slug}`}>
        <div className="
          relative w-full aspect-[3/4]
          overflow-hidden 
          bg-[url('/assets/bgImageContainer.png')]
          bg-no-repeat bg-cover bg-center
          p-2 md:p-4
        ">
          <Image
            src={imgSrc}
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
            onClick={(e) => {
              e.preventDefault();
              onAddToCart?.(product);
            }}
            className="
              absolute bottom-6 left-1/2 -translate-x-1/2
              bg-white text-primary
              px-8 py-1.5 md:py-2
              opacity-0 group-hover:opacity-100
              transition-opacity duration-200
              flex items-center gap-2
              whitespace-nowrap font-semibold text-lg
            "
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
