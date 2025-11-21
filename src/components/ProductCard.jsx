"use client";
import Image from "next/image";
import Link from "next/link";

const DEFAULT_IMAGE = "/assets/default-product.png";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const ProductCard = ({ product}) => {
  if (!product) return null;

  // IMAGE
  const rawImg = product?.images?.[0]?.image_url;

  const finalImg =
    rawImg?.startsWith("http")
      ? rawImg
      : rawImg
        ? BASE_URL + rawImg
        : DEFAULT_IMAGE;

  // PRICE
  const price = product?.latest_pricing?.price_detail?.original_price || 0;
  const discountedPrice =
    (product?.latest_pricing?.price_detail?.discounted_price || price).toFixed(2);

  const discountPercent =
    price > discountedPrice
      ? Math.round(((price - discountedPrice) / price) * 100)
      : 0;
      
  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden bg-white transition hover:shadow relative">
      {/* CLICKABLE AREA */}
      <div className="block">
        <div className="h-56 w-full relative cursor-pointer overflow-hidden">
          <Link href={`/product/${product.seo.canonicalURL}`}>
            <Image
              src={finalImg}
              alt={product.product_name}
              width={400}
              height={400}
              className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105 grayscale hover:grayscale-0"
            />
          </Link>

        </div>

        <div className="p-4 space-y-1">
          <span className="text-xs text-gray-500 uppercase">
            {product.attributes?.gender || "Unisex"}
          </span>

          <h3 className="text-sm font-medium text-gray-900 hover:text-gray-700">
            {product.product_name}
          </h3>

          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-gray-900">
              ₹{discountedPrice}
            </span>

            {discountPercent > 0 && (
              <>
                <span className="text-xs line-through text-gray-400">
                  ₹{price}
                </span>
                <span className="text-xs text-gray-700 font-medium">
                  {discountPercent}% OFF
                </span>
              </>
            )}
          </div>
          
        </div>
      </div>


    </div>
  );
};

export default ProductCard;
