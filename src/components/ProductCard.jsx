"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

const DEFAULT_IMAGE = "/assets/default-product.png";

const ProductCard = ({
  name = "Untitled Product",
  link = "#",
  img = "/assets/product.jpg",
  category = "Unisex",
  price = 999,
  discountedPrice = 799,
  onAddToCart = () => {},
}) => {
  const discountPercent =
    price > discountedPrice ? Math.round(((price - discountedPrice) / price) * 100) : 0;
  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden bg-white transition hover:shadow">
      {/* Image */}
      <Link href={link}>
        <div className="h-56 w-full relative cursor-pointer overflow-hidden">
          <Image
            src={img || DEFAULT_IMAGE}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105 grayscale hover:grayscale-0"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 space-y-1">
        {/* Category */}
        <span className="text-xs text-gray-500 uppercase">{category}</span>

        {/* Name */}
        <Link href={link}>
          <h3 className="text-sm font-medium text-gray-900 hover:text-gray-700 cursor-pointer">
            {name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-gray-900">₹{discountedPrice}</span>
          {discountPercent > 0 && (
            <>
              <span className="text-xs line-through text-gray-400">₹{price}</span>
              <span className="text-xs text-gray-700 font-medium">{discountPercent}% OFF</span>
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
