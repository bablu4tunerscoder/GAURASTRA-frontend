"use client"
import Image from 'next/image';
import React from 'react'

const ProductDetailClient = ({initialProducts,initialId}) => {
    console.log(initialProducts)
     const productImages = [
        "/assets/default-product.png",
        "/assets/default-product.png",
      ];
    
      const reviews = [
        {
          user: "Ajay",
          rating: 5,
          review: "Perfect for everyday wear. Soft material and great fit.",
          date: "02 Jan 2024",
        },
    
      ];
    
      const bestSellers = [
        {
          img: "/assets/default-product.png",
          title: "Men's Jacket Hoodie",
          price: "₹2,199",
        },
        {
          img: "/assets/default-product.png",
          title: "Men's Jacket Hoodie",
          price: "₹2,199",
        },
        {
          img: "/assets/default-product.png",
          title: "Men's Jacket Hoodie",
          price: "₹2,199",
        },
    
      ];
  return (
       <section className="px-4 md:px-8 py-8">

      {/* ------- MAIN GRID ------- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* ---------- Left Image Gallery ---------- */}
        <div className="md:col-span-5 flex flex-col md:flex-row gap-4">

          {/* Thumbnails */}
          <div className="flex md:flex-col gap-2">
            {productImages.map((src, i) => (
              <div
                key={i}
                className="w-20 h-20 md:w-16 md:h-16 rounded cursor-pointer overflow-hidden"
              >
                <Image
                  src={src}
                  width={80}
                  height={80}
                  alt="product-thumb"
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full rounded-lg overflow-hidden">
            <Image
              src={productImages[0]}
              width={500}
              height={500}
              alt="main-product"
              className="object-cover w-full"
            />
          </div>
        </div>

        {/* ---------- Product Info ---------- */}
        <div className="md:col-span-7 space-y-4">

          <h1 className="text-2xl font-semibold">
            Ben Hogan Men's Solid Ottoman Golf Polo Shirt
          </h1>

          <div className="flex items-center gap-3">
            <span className="font-semibold text-lg">₹187.00</span>
            <span className="line-through text-gray-400">₹250.00</span>
            <span className="text-green-600">28% off</span>
          </div>

          {/* Colors */}
          <div className="flex gap-3 mt-3">
            <div className="w-10 h-10 rounded overflow-hidden">
              <Image
                src="/assets/default-product.png"
                width={40}
                height={40}
                alt="color"
              />
            </div>
          </div>

          {/* Size Options */}
          <div className="mt-4">
            <p className="font-medium mb-1">Select Size</p>
            <div className="flex gap-3">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  className="border px-4 py-2 rounded hover:bg-black hover:text-white transition"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="px-6 py-3 bg-black text-white rounded w-full">
              Buy Now
            </button>
            <button className="px-6 py-3 border rounded w-full">
              Add to Bag
            </button>
          </div>
        </div>
      </div>

      {/* ------- PRODUCT DETAILS ------- */}
      <div className="mt-12 p-6 border rounded-lg bg-white">
        <h2 className="text-xl font-semibold mb-3">Product Details</h2>
        <p className="text-gray-700 leading-relaxed">
          This polo shirt is made with soft moisture-wicking fabric suitable for
          casual wear. Perfect for everyday outdoor styling.
        </p>
        <ul className="list-disc ml-6 mt-3 text-gray-700">
          <li>100% Cotton</li>
          <li>Moisture Wicking</li>
          <li>Stretchable Fabric</li>
          <li>Easy Care</li>
        </ul>
      </div>

      {/* ------- REVIEWS SECTION ------- */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>

        {reviews.map((r, i) => (
          <div key={i} className="border p-4 rounded mb-4 bg-white">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{r.user}</h3>
              <span className="text-sm text-gray-500">{r.date}</span>
            </div>

            <p className="text-yellow-500 mt-1">
              {"★".repeat(r.rating)}{" "}
              <span className="text-gray-400">
                {"★".repeat(5 - r.rating)}
              </span>
            </p>

            <p className="text-gray-700 mt-2">{r.review}</p>
          </div>
        ))}
      </div>

      {/* ------- BEST SELLERS ------- */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Best Sellers</h2>

        <div className="flex flex-wrap gap-4">
          {bestSellers.map((item, i) => (
            <div key={i} className="p-1">
              <div className="w-48 h-48 relative overflow-hidden rounded">
                <Image
                  src={item.img}
                  alt="best-seller"
                  fill
                  className="object-cover object-center"
                />
              </div>

              <p className="text-sm font-medium mt-2 text-left">{item.title}</p>
              <p className="text-gray-600 text-sm text-left">{item.price}</p>
            </div>
          ))}
        </div>
      </div>


    </section>
  )
}

export default ProductDetailClient
