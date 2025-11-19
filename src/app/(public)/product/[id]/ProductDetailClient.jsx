"use client"
import Image from 'next/image';
import { useState } from 'react';

const ProductDetailClient = ({ initialProducts }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");

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
    .sort((a, b) => (b.is_primary ? 1 : 0) - (a.is_primary ? 1 : 0))
    .map(img => img.image_url);

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

  return (
    <section className="py-4">

      {/* ------- MAIN GRID ------- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* ---------- Left Image Gallery ---------- */}
        <div className="md:col-span-5 flex flex-col gap-4">

          {/* Main Image */}
          <div className="w-full rounded-lg overflow-hidden bg-gray-50">
            <Image
              src={displayImages[selectedImageIndex]}
              width={600}
              height={600}
              alt="main-product"
              className="object-cover w-full"
            />
          </div>

          {/* Thumbnails (Horizontal Scroll on Mobile, Vertical on Desktop) */}
          <div className="flex gap-2 overflow-x-auto">
            {displayImages.map((src, i) => (
              <div
                key={i}
                onClick={() => setSelectedImageIndex(i)}
                className={`min-w-20 min-h-20 md:w-16 md:h-16 rounded cursor-pointer overflow-hidden border-2 transition-all ${selectedImageIndex === i ? "border-black" : "border-gray-200"
                  }`}
              >
                <Image
                  src={src}
                  width={80}
                  height={80}
                  alt={`product-thumb-${i}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>


        {/* ---------- Product Info ---------- */}
        <div className="md:col-span-7 space-y-4">

          <h1 className="text-2xl font-semibold">
            {productName}
          </h1>

          <div className="flex items-center gap-3">
            <span className="font-semibold text-2xl">₹{discountedPrice.toFixed(2)}</span>
            {discountPercent > 0 && (
              <>
                <span className="line-through text-gray-400">₹{originalPrice.toFixed(2)}</span>
                <span className="text-green-600 font-medium">{discountPercent}% off</span>
              </>
            )}
          </div>

          {/* Colors/Variants */}
          <div className="flex gap-3 mt-3">
            {displayImages.slice(0, 4).map((src, i) => (
              <div
                key={i}
                onClick={() => setSelectedImageIndex(i)}
                className={`w-12 h-12 rounded overflow-hidden cursor-pointer border-2 ${selectedImageIndex === i ? 'border-black' : 'border-gray-200'
                  }`}
              >
                <Image
                  src={src}
                  width={48}
                  height={48}
                  alt={`variant-${i}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>

          {/* Size Options */}
          {availableSizes.length > 0 && (
            <div className="mt-4">
              <p className="font-medium mb-2">Select Size</p>
              <div className="flex gap-3">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-4 py-2 rounded transition ${selectedSize === size
                      ? 'bg-black text-white'
                      : 'hover:bg-black hover:text-white'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stock Status */}
          <div className="mt-3">
            {availableSizes.length > 0 ? (
              <p className="text-green-600 text-sm">✓ In Stock</p>
            ) : (
              <p className="text-red-600 text-sm">Out of Stock</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              className="px-6 py-3 cursor-pointer bg-black text-white rounded w-full hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={availableSizes.length === 0}
            >
              Buy Now
            </button>
            <button
              className="px-6 py-3 cursor-pointer border border-black rounded w-full hover:bg-gray-50 transition disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed"
              disabled={availableSizes.length === 0}
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>

      {/* ------- PRODUCT DETAILS ------- */}
      <div className="mt-12 p-6 border rounded-lg bg-white">
        <h2 className="text-xl font-semibold mb-3">Product Details</h2>
        {details.length > 0 ? (
          <div className="space-y-2 text-gray-700">
            {details.map((detail, i) => (
              <div
                key={i}
                className="leading-relaxed text-sm"
                dangerouslySetInnerHTML={{ __html: detail }}
              />
            ))}

          </div>
        ) : (
          <p className="text-gray-700 leading-relaxed">
            {description || "Product details not available."}
          </p>
        )}

        {/* Additional Info */}
        {product?.brand && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Brand:</span> {product.brand}
            </p>
          </div>
        )}
        {product?.attributes && (
          <div className="mt-3 space-y-1">
            {product.attributes.gender && (
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Gender:</span> {product.attributes.gender}
              </p>
            )}
            {product.attributes.sleeve_length && (
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Sleeve Length:</span> {product.attributes.sleeve_length}
              </p>
            )}
          </div>
        )}
      </div>

    </section>
  )
}

export default ProductDetailClient