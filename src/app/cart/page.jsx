"use client";
import { useDispatch, useSelector } from "react-redux";


import { useDecreaseCartMutation, useIncreaseCartMutation } from "@/store/api/cartApi";
import { clearCartLocal, decreaseQuantityLocal, increaseQuantityLocal, removeFromCartLocal } from "@/store/slices/cartSlice";
import { Eye, Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function CartPage() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  const [increaseCart] = useIncreaseCartMutation();
  const [decreaseCart] = useDecreaseCartMutation();

  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const cartSummaryImages = ["/assets/multiple-payment-options.png", "/assets/easy-returns.png", "/assets/secure-payment.png"]

  // Update quantity
  const updateQuantity = ({ itemId, variantSku, newQuantity }) => {
    if (newQuantity < 1) return;

    const item = cartItems.find((i) => i._id === itemId);
    if (!item) return;


    // Find the variant in the product's variants array
    const variant = item.variants?.find((v) => v.sku === variantSku);
    if (!variant) return;


    const maxQty = variant.stock?.stock_quantity || 1;
    const finalQty = Math.min(newQuantity, maxQty);

    // Get current quantity from the cart item's variant
    const currentQty = variant.quantity || 1;
    const diff = finalQty - currentQty;



    if (diff === 0) return; // No change needed


    if (isLoggedIn) {
      if (diff > 0) {
        increaseCart({ itemId, quantity: diff });
      } else if (diff < 0) {
        decreaseCart({ itemId, quantity: Math.abs(diff) });
      }
    } else {
      if (diff > 0) {
        dispatch(increaseQuantityLocal({ productId: itemId, sku: variantSku }));
      } else if (diff < 0) {

        dispatch(decreaseQuantityLocal({ productId: itemId, sku: variantSku }));
      }
    }
  };

  // Remove item
  const removeItem = (itemId) => {
    if (isLoggedIn) {
      decreaseCart({ itemId, remove: true });
    } else {
      dispatch(removeFromCartLocal(itemId));
    }
  };

  // Clear cart
  const clearCart = () => {
    if (isLoggedIn) {
      // Optional API endpoint if available
      // clearCartApi()
    }
    dispatch(clearCartLocal());
  };


  const subtotal = cartItems.reduce((sum, item) => {
    const variantTotal = item.variants.reduce((total, variant) => {
      const price =
        variant?.pricing?.discounted_price ??
        variant?.pricing?.original_price ??
        0;

      return total + price * variant.quantity;
    }, 0); // ✅ initial value

    return sum + variantTotal;
  }, 0);




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

                {cartItems.map((item) =>
                  item.variants.map((variant) => {
                    const primaryImage =
                      variant?.images?.find((img) => img.is_primary) ||
                      variant?.images?.[0];

                    const itemTotal =
                      variant?.pricing?.discounted_price * variant.quantity;

                    return (
                      <div
                        key={`${item._id}-${variant.sku}`}
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
                            <button
                              onClick={() =>
                                removeItem({
                                  productId: item._id,
                                  sku: variant.sku,
                                })
                              }
                              className="absolute -top-1 -right-1 w-4 h-4 bg-gray-700 text-white rounded-full flex items-center justify-center hover:bg-gray-900 transition"
                            >
                              <X size={10} strokeWidth={6} />
                            </button>
                          </div>

                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 mb-1">
                              {item.product_name}
                            </h3>

                            <p className="text-xs text-gray-500 flex items-center gap-2 mb-1">
                              Color: {variant?.attributes?.color}
                              <span
                                className="relative w-4 h-4 rounded-full flex items-center justify-center ring-1"
                                style={{
                                  boxShadow: `0 0 0 1px ${variant?.attributes?.color}`,
                                }}
                              >
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{
                                    backgroundColor: variant?.attributes?.color,
                                  }}
                                />
                              </span>
                            </p>

                            <p className="text-xs text-gray-500">
                              Size: {variant?.attributes?.size}
                            </p>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-1 md:col-span-2 text-left md:text-center">
                          <p className="font-semibold text-gray-900">
                            ₹{variant?.pricing?.discounted_price?.toFixed(2)}
                          </p>
                          {variant?.pricing?.original_price >
                            variant?.pricing?.discounted_price && (
                              <p className="text-xs text-gray-400 line-through">
                                ₹{variant?.pricing?.original_price?.toFixed(2)}
                              </p>
                            )}
                        </div>

                        {/* Quantity */}
                        <div className="col-span-1 md:col-span-3 flex items-center justify-start md:justify-center gap-2">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity({
                                  itemId: item._id,
                                  variantSku: variant.sku,
                                  newQuantity: variant.quantity - 1,
                                })
                              }
                              className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-gray-50 transition"
                            >
                              <Minus size={16} />
                            </button>

                            <span className="w-12 text-center font-medium">
                              {variant.quantity}
                            </span>

                            <button

                              onClick={() =>
                                updateQuantity({
                                  itemId: item._id,
                                  variantSku: variant.sku,
                                  newQuantity: variant.quantity + 1,
                                })
                              }
                              className="w-8 h-8 flex items-center justify-center text-green-500 hover:bg-gray-50 transition"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="col-span-1 md:col-span-2 text-left md:text-right">
                          <p className="font-bold text-gray-900">
                            ₹{itemTotal.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}

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
                <span>Subtotals:</span>
                <span className="font-semibold">
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount:</span>
                  <span className="font-semibold">
                    -₹{appliedDiscount.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="pt-4 border-t">
                <div className="flex justify-between text-lg font-bold">
                  <span>Totals:</span>
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