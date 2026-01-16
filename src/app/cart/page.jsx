"use client";
import { useDispatch, useSelector } from "react-redux";
import { useDecreaseCartMutation, useIncreaseCartMutation, useGetCartQuery, useCleanCartMutation } from "@/store/api/cartApi";
import { clearCartLocal, decreaseQuantityLocal, increaseQuantityLocal, removeFromCartLocal } from "@/store/slices/cartSlice";
import { Eye, Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CartPage() {
  const dispatch = useDispatch();

  const { items: cartItems, cart_summary } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth || {});
  const isLoggedIn = !!user;

  const { data: cartData } = useGetCartQuery(undefined, { skip: !isLoggedIn });

  const [increaseCart] = useIncreaseCartMutation();
  const [decreaseCart] = useDecreaseCartMutation();
  const [cleanCart] = useCleanCartMutation();


  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const cartSummaryImages = [
    "/assets/multiple-payment-options.png",
    "/assets/easy-returns.png",
    "/assets/secure-payment.png"
  ];

  // Handle increase quantity
  const handleIncrease = async (item) => {
    if (isLoggedIn) {
      try {
        await increaseCart({
          product_id: item.product_id,
          sku: item.sku,
        }).unwrap();
      } catch (error) {
        console.error("Failed to increase quantity:", error);
      }
    } else {
      dispatch(increaseQuantityLocal({
        productId: item.product_id,
        sku: item.sku,
      }));
    }
  };

  // Handle decrease quantity
  const handleDecrease = async (item) => {
    // if (item.quantity <= 1) return;

    if (isLoggedIn) {
      try {
        await decreaseCart({
          product_id: item.product_id,
          sku: item.sku,
        }).unwrap();
      } catch (error) {
        console.error("Failed to decrease quantity:", error);
      }
    } else {
      dispatch(decreaseQuantityLocal({
        productId: item.product_id,
        sku: item.sku,
      }));
    }
  };

  // Handle remove item
  const handleRemove = async (item) => {
    if (isLoggedIn) {

      try {
        await removeFromCart({ product_id: item.product_id, sku: item.sku }).unwrap();

        console.log("Remove from API not implemented yet");
      } catch (error) {
        console.error("Failed to remove item:", error);
      }
    } else {
      dispatch(removeFromCartLocal({
        productId: item.product_id,
        sku: item.sku,
      }));
    }
  };

  // Clear cart
  const clearCart = async () => {
    if (isLoggedIn) {
      // Optional: Call clear cart API if available
      try {
        await cleanCart().unwrap();
        toast.success("Cart cleared!");
        return
      } catch (error) {
        console.log("Failed to clean cart", error)
      }
    }
    dispatch(clearCartLocal());
  };

  // Calculate subtotal from cart_summary or items
  const subtotal = cart_summary.subtotal || 0;
  const totalDiscount = cart_summary.total_discount || 0;

  const applyDiscount = () => {
    if (discountCode.toLowerCase() === "save10") {
      setAppliedDiscount(subtotal * 0.1);
    } else {
      setAppliedDiscount(0);
    }
  };

  const total = subtotal - appliedDiscount;

  return (
    <div className="min-h-screen">
      <Image
        src="/assets/cart-banner.png"
        alt="Background"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-8 gap-2 section-spacing">
        {/* Cart Items Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg md:p-6">
            <div className="md:mb-6">
              <h1 className="md:text-3xl text-xl font-bold font-serif">Cart</h1>
              <p className="text-gray-600 text-sm">
                Check items and proceed to checkout
              </p>
            </div>

            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 py-4 border-y border-gray-200 text-xl text-gray-900">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {/* Cart Items */}
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
                <a
                  href="/category/all-products"
                  className="inline-block px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                >
                  Continue Shopping
                </a>
              </div>
            ) : (
              <div className="divide-y">
                {cartItems.map((item) => {
                  const primaryImage = item.images?.find((img) => img.is_primary) || item.images?.[0];

                  return (
                    <div
                      key={`${item.product_id}-${item.sku}`}
                      className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                    >
                      {/* Product Info */}
                      <div className="col-span-1 md:col-span-5 flex gap-4">
                        <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100">
                          <Image
                            src={primaryImage?.image_url || "/placeholder.png"}
                            alt={item.product_name}
                            fill
                            loading="eager"
                            className="object-cover rounded-lg"
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 ">
                            {item.product_name}
                          </h3>

                          <p className="text-xs text-gray-500">
                            Brand: {item.brand}
                          </p>
                          {/* size */}
                          {/* <p className="text-xs text-gray-500">
                            Brand: {item.brand}
                          </p> */}
                          {/* color */}

                          {/* <p className="text-xs text-gray-500">
                            Brand: {item.brand}
                          </p> */}
                          {/* {console.log(item)} */}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-1 md:col-span-2 text-left md:text-center">
                        <p className="font-semibold text-gray-900">
                          ₹{item.price.discounted_price.toFixed(2)}
                        </p>
                        {item.price.original_price > item.price.discounted_price && (
                          <p className="text-xs text-gray-400 line-through">
                            ₹{item.price.original_price.toFixed(2)}
                          </p>
                        )}
                      </div>

                      {/* Quantity */}
                      <div className="col-span-1 md:col-span-3 flex items-center justify-start md:justify-center gap-2">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => handleDecrease(item)}
                            // disabled={item.quantity <= 1}
                            className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Minus size={16} />
                          </button>

                          <span className="w-12 text-center font-medium">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => handleIncrease(item)}
                            className="w-8 h-8 flex items-center justify-center text-green-500 hover:bg-gray-50 transition"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="col-span-1 md:col-span-2 text-left md:text-right">
                        <p className="font-bold text-gray-900">
                          ₹{item.item_total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {cartItems.length > 0 && (
              <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
                <button
                  onClick={clearCart}
                  className="px-6 py-2 bg-primary/90 text-white hover:bg-primary transition font-medium"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 sticky top-8">
            <h2 className="md:text-3xl text-xl font-bold font-serif">
              Summary Order
            </h2>

            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">
                Do you have any discount code?
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="SKD832"
                  className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:border-primary"
                />
                <button
                  onClick={applyDiscount}
                  className="w-20 h-12 bg-primary/90 text-white hover:bg-primary transition flex items-center justify-center"
                >
                  <Eye size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Items ({cart_summary.total_items}):</span>
                <span className="font-semibold">
                  {cart_summary.total_quantity} pcs
                </span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Subtotal:</span>
                <span className="font-semibold">
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>

              {totalDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Product Discount:</span>
                  <span className="font-semibold">
                    -₹{totalDiscount.toFixed(2)}
                  </span>
                </div>
              )}

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon Discount:</span>
                  <span className="font-semibold">
                    -₹{appliedDiscount.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="pt-4 border-t">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-primary flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Shipping & taxes calculated at checkout
              </p>
            </div>

            <button
              disabled={cartItems.length === 0}
              className="w-full py-2 bg-black text-white hover:bg-gray-800 transition font-medium disabled:bg-gray-300 disabled:cursor-not-allowed mb-4"
            >
              Proceed To Checkout
            </button>

            <div className="space-y-3 mt-4">
              {cartSummaryImages.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt="Payment Method"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}