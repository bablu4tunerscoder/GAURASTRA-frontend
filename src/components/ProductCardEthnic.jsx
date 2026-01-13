"use client";
import React from 'react';
import { Heart, ShoppingBag } from "lucide-react";

const DEFAULT_IMAGE = "/assets/default-product.png";

const ProductCardEthnic = ({ product }) => {
  if (!product) return null;

  const defaultVariant = product?.variants?.[0];

  const finalImg = defaultVariant?.images?.find(img => img.is_primary)?.image_url
    || defaultVariant?.images?.[0]?.image_url || DEFAULT_IMAGE;

  // const finalImg =
  //   rawImg?.startsWith("http")
  //     ? rawImg
  //     : rawImg
  //       ? "https://backend.gaurastra.com" + rawImg
  //       : DEFAULT_IMAGE;

  const price = defaultVariant?.pricing?.original_price || 0;
  const discountedPrice =
    defaultVariant?.pricing?.discounted_price || price;

  const discountPercent =
    defaultVariant?.pricing?.discount_percent || 0;

  return (
    <div className="md:w-72 w-48 flex-shrink-0 relative group">
      <button
        // onClick={() => onToggleWishlist?.(product)}
        className="
          absolute top-3 right-3 md:top-4 md:right-4 z-10
          w-8 h-8 md:w-10 md:h-10
          rounded-full bg-white shadow
          flex items-center justify-center
          opacity-0 group-hover:opacity-100 transition
        "
      >
        <Heart className="w-4 h-4 md:w-5 md:h-5 text-gray-600 hover:text-red-500" />
      </button>

      <a href={`/product/${product?.canonicalURL}`}>
        <div className="
          relative w-full
          overflow-hidden 
          bg-no-repeat bg-cover
        ">
          <img
            src={finalImg}
            alt={product.product_name}
            className="object-cover w-full h-full"
          />

          {discountPercent > 0 && (
            <span className="text-xs absolute top-4 left-4 md:top-6 md:left-6 bg-red-200 px-2 py-0.5 text-red-600 font-medium">
              {discountPercent}% OFF
            </span>
          )}

          <button
            // onClick={(e) => {
            //   e.preventDefault();
            //   onAddToCart?.(product);
            // }}
            className="
              absolute bottom-6 left-1/2 -translate-x-1/2
              bg-white text-red-600
              px-8 py-1.5 md:py-2
              opacity-0 group-hover:opacity-100
              transition-opacity duration-200
              flex items-center gap-2
              whitespace-nowrap font-semibold text-lg
            "
          >
            <ShoppingBag className="w-6 h-6" />
            Add to Cart
          </button>
        </div>
      </a>

      <div className="pt-2 md:pt-3">
        <h3
          title={product.product_name}
          className="font-bold leading-tight text-primary line-clamp-2 text-sm md:text-base lg:text-lg mb-1"
        >
          {product.product_name}
        </h3>

        <span className="text-xs text-gray-600 capitalize block mb-2">
          {product?.brand}
        </span>

        <div className="flex items-center gap-2">
          <p className="font-bold text-sm md:text-base lg:text-lg text-gray-600 ">
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
export default ProductCardEthnic
