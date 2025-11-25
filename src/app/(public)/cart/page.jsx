"use client";
import Image from "next/image";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "@/Redux/Slices/cartSlice";
import Link from "next/link";
// import { Link } from "next/link";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state?.cart?.items || []);

  // Price calculations
  const subtotal = cartProducts.reduce(
    (total, item) => total + item.discountedPrice * item.quantity,
    0
  );

  const totalDiscount = cartProducts.reduce(
    (total, item) =>
      total + (item.originalPrice - item.discountedPrice) * item.quantity,
    0
  );

  const shippingCharge = 0;
  const totalAmount = subtotal + shippingCharge;

  // Get primary image or first image
const getProductImage = (images) => {
  if (!images || images.length === 0) return "/assets/default-product.png";

  const primary =
    images.find((img) => img.is_primary) ||
    images[0] ||
    { image_url: "" };

  let url = primary.image_url || "";

  // 🔥 If URL does NOT start with http or https → add backend prefix
  if (!url.startsWith("http")) {
    url = `https://backend.gaurastra.com${url}`;
  }

  return url;
};


  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Your Cart</h1>
          <p className="text-gray-600 mt-2">{cartProducts.length} items</p>
        </div>

        {cartProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartProducts.map((item, index) => (
                <div
                  key={`${item.product_id}-${item.selectedSize}-${index}`}
                  className="bg-white rounded-xl shadow p-6 border border-gray-100"
                >
                  <div className="flex gap-6">
                    {/* Image */}
                    <div className="w-28 h-28 md:w-36 md:h-36 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={getProductImage(item.images)}
                        width={150}
                        height={150}
                        alt={item.product_name}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      {/* Title + Remove */}
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-lg">
                          {item.product_name}
                        </h3>
                        <button
                          onClick={() => dispatch(
                            removeFromCart(item)
                          )}
                          className="text-gray-500 hover:text-red-600 text-sm"
                        >
                          Remove
                        </button>
                      </div>

                      {item.brand && (
                        <p className="text-gray-500 text-sm mt-1">
                          {item.brand}
                        </p>
                      )}

                      <p className="text-gray-600 mt-1">
                        Size:{" "}
                        <span className="font-medium">
                          {item.selectedSize}
                        </span>
                      </p>

                      {/* Price */}
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-xl font-bold">
                          ₹{item.discountedPrice}
                        </span>

                        {item.originalPrice > item.discountedPrice && (
                          <>
                            <span className="line-through text-gray-400 text-sm">
                              ₹{item.originalPrice}
                            </span>
                            <span className="text-green-600 text-sm font-medium">
                              {Math.round(
                                ((item.originalPrice - item.discountedPrice) /
                                  item.originalPrice) *
                                100
                              )}
                              % off
                            </span>
                          </>
                        )}
                      </div>

                      {/* Quantity */}
                      <div className="mt-4 flex items-center gap-3">
                        <span className="text-gray-700 font-medium">Qty:</span>
                        <div className="bg-gray-100 rounded-full px-4 py-1">
                          <span className="font-medium">{item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white h-fit p-6 rounded-xl shadow border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-green-600 font-medium">
                  <span>Discount</span>
                  <span>-₹{totalDiscount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>

                <hr className="my-4" />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex  mt-6">
                <Link
                  href="/checkout"
                  className="bg-black text-center text-white rounded-lg py-2 px-3.5 flex-1  hover:bg-gray-800 transition"
                >
                  Proceed to Checkout
                </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;