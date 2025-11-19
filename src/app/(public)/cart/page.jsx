"use client"
import Image from 'next/image';
import React, { useState } from 'react';

const CartPage = ({ cartItems = [] }) => {
  const [cart, setCart] = useState(cartItems);

  // Calculate totals
  const calculateSubtotal = () =>
    cart.reduce((total, item) => total + item.discounted_price * item.quantity, 0);

  const calculateTotalDiscount = () =>
    cart.reduce(
      (total, item) =>
        total + (item.original_price - item.discounted_price) * item.quantity,
      0
    );

  const shippingCharge = 0;
  const subtotal = calculateSubtotal();
  const totalDiscount = calculateTotalDiscount();
  const totalAmount = subtotal + shippingCharge;

  // Update quantity
  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prev =>
      prev.map(item =>
        item.product_id === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Remove item
  const removeItem = (productId, size) => {
    setCart(prev =>
      prev.filter(item => !(item.product_id === productId && item.size === size))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Your Cart</h1>
          <p className="text-gray-600 mt-2">{cart.length} items</p>
        </div>

        {cart.length === 0 ? (
          // Empty UI
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <Image
              src="/assets/lodergif1.gif"
              alt="empty"
              width={160}
              height={160}
              className="mx-auto opacity-70"
            />
            <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
            <p className="text-gray-600 mt-2">Start shopping to add items.</p>
            <button className="mt-6 px-8 py-3 rounded-lg bg-black text-white hover:bg-gray-800">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item, index) => (
                <div
                  key={`${item.product_id}-${item.size}-${index}`}
                  className="bg-white rounded-xl shadow p-6 border border-gray-100"
                >
                  <div className="flex gap-6">

                    {/* Image */}
                    <div className="w-28 h-28 md:w-36 md:h-36 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={item.image_url}
                        width={150}
                        height={150}
                        alt={item.product_name}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">

                      {/* Title & Remove */}
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-lg">{item.product_name}</h3>
                        <button
                          onClick={() => removeItem(item.product_id, item.size)}
                          className="text-gray-500 hover:text-red-600 text-sm"
                        >
                          Remove
                        </button>
                      </div>

                      {/* Size */}
                      <p className="text-gray-600 mt-1">
                        Size: <span className="font-medium">{item.size}</span>
                      </p>

                      {/* Pricing */}
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-xl font-bold">₹{item.discounted_price}</span>
                        {item.original_price > item.discounted_price && (
                          <>
                            <span className="line-through text-gray-400 text-sm">
                              ₹{item.original_price}
                            </span>
                            <span className="text-green-600 text-sm font-medium">
                              {Math.round(((item.original_price - item.discounted_price) / item.original_price) * 100)}% off
                            </span>
                          </>
                        )}
                      </div>

                      {/* Quantity Selector */}
                      <div className="mt-4 flex items-center gap-3">
                        <span className="text-gray-700 font-medium">Qty:</span>
                        <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                          <button
                            onClick={() => updateQuantity(item.product_id, item.size, item.quantity - 1)}
                            className="px-2 text-lg font-bold hover:text-black"
                          >
                            −
                          </button>
                          <span className="px-4 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product_id, item.size, item.quantity + 1)}
                            className="px-2 text-lg font-bold hover:text-black"
                          >
                            +
                          </button>
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

                <button className="mt-6 w-full bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
                  Proceed to Checkout
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
