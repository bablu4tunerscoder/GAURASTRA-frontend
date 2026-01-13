"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {
    clearBuyNowItem,
    setBuyNowItem,
    updateQuantity,
} from "@/store/slices/cartSlice";
import { clearOrder } from "@/store/slices/orderSlice";
import { resetPayment } from "@/store/slices/paymentSlice";
import { updateUser } from "@/store/slices/userSlice";

import toast from "react-hot-toast";
import CouponComponent from "./CouponComponent";
import PaymentComponent from "./PaymentComponent";

const CheckoutPage = () => {
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state?.cart?.items);
    const buyNowItem = useSelector((state) => state?.cart?.buyNowItem);
    const couponState = useSelector((state) => state?.coupon);
    const user = useSelector((state) => state?.user?.user);

    const storedUser = user || {}

    const [showPayment, setShowPayment] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [addressSaved, setAddressSaved] = useState(false);
    const [foundCoupon, setFoundCoupon] = useState(null);

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            full_name: storedUser?.name || "",
            phone: storedUser?.phone === "0" ? "" : storedUser?.phone || "",
            flat_number: "",
            street: storedUser?.address || "",
            landmark: "",
            city: "",
            state: "",
            pincode: "",
        },
    });



    const itemsToDisplay = buyNowItem ? [buyNowItem] : cartItems;

    const formatPrice = (price) => {
        if (typeof price !== "number") return "0.00";
        return price.toFixed(2);
    };



    const calculateSubtotal = () => {
        return itemsToDisplay.reduce((total, item) => {
            const price =
                item.discountedPrice ||
                item.latest_pricing?.price_detail?.discounted_price ||
                item.latest_pricing?.price_detail?.original_price ||
                0;

            return total + price * item.quantity;
        }, 0);
    };

    const subtotal = calculateSubtotal();
    const finalAmount = couponState.appliedCoupon
        ? couponState.finalAmount
        : subtotal;

    const handleQuantityChange = (item, change) => {
        const currentQty = item.quantity;
        const selectedSize = item.selectedSize;

        const sizeData = item.attributes?.size?.find(
            (s) => s.name === selectedSize
        );

        const maxAvailableQty = sizeData?.quantity || 1;

        if (change > 0 && currentQty >= maxAvailableQty) {
            toast.error(`Only stock in quantity: ${maxAvailableQty}`);
            return;
        }

        if (buyNowItem) {
            dispatch(
                setBuyNowItem({
                    ...buyNowItem,
                    quantity: Math.max(1, currentQty + change),
                })
            );
        } else {
            dispatch(
                updateQuantity({
                    id: item.id,
                    selectedColor: item.selectedColor,
                    selectedSize: item.selectedSize,
                    quantity: change,
                })
            );
        }
    };

    const onSaveAddress = async (data) => {
        try {
            const fullAddress = `${data.flat_number}, ${data.street}, ${data.landmark}, ${data.city}, ${data.state}, ${data.pincode}`;

            const result = await dispatch(
                updateUser({
                    userId: storedUser.user_id,
                    updatedData: {
                        name: data.full_name,
                        phone: data.phone,
                        address: fullAddress,
                    },
                })
            ).unwrap();

            const updatedUser = result.data.user;

            if (updatedUser.availableCoupons?.length > 0) {
                const newCoupon = updatedUser.availableCoupons.find(
                    (c) => c !== couponState.appliedCoupon?.code
                );
                if (newCoupon) setFoundCoupon(newCoupon);
            }

            setAddressSaved(true);
            toast.success("Address saved successfully!");

            setTimeout(() => setAddressSaved(false), 2500);
        } catch (err) {
            toast.error("Unable to save address.");
        }
    };

    const onProceedToPayment = (data) => {


        const adjustedPrices = itemsToDisplay.map((item, index) => {
            const price =
                item.discountedPrice ||
                item.latest_pricing?.price_detail?.discounted_price ||
                item.latest_pricing?.price_detail?.original_price;

            return {
                price,
                quantity: item.quantity,
            };
        });

        const order = {
            user_id: storedUser?.user_id || null,
            email: storedUser?.email,
            delivery_address: data,
            products: itemsToDisplay.map((item, index) => ({
                product_id: item.id || item.product_id,
                product_name: item.name || item.product_name,
                price: adjustedPrices[index].price,
                quantity: item.quantity,
                selectedSize: item.selectedSize,
                images: item.images,
            })),
            total_order_amount: finalAmount,
            coupon: couponState.appliedCoupon
                ? {
                    code: couponState.appliedCoupon.code,
                    discountType: couponState.appliedCoupon.discountType,
                    discountValue: couponState.appliedCoupon.discountValue,
                    discountAmount: couponState.discountAmount,
                }
                : null,
        };

        setOrderDetails(order);
        setShowPayment(true);
    };

    const handlePaymentSuccess = () => { };



    useEffect(() => {
        dispatch(clearOrder());

        // Handle pending buy now product for non-logged in users
        const pendingProduct = localStorage.getItem("pendingBuyNowProduct");
        if (pendingProduct) {
            try {
                const productData = JSON.parse(pendingProduct);
                dispatch(setBuyNowItem(productData));
                localStorage.removeItem("pendingBuyNowProduct");
            } catch (err) {
                console.error("Error parsing pending product:", err);
            }
        }

        return () => {
            dispatch(resetPayment());
            dispatch(clearBuyNowItem());
        }

    }, [dispatch]);



    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            {showPayment && orderDetails ? (
                <PaymentComponent
                    orderDetails={orderDetails}
                    onBack={() => setShowPayment(false)}
                    onPaymentSuccess={handlePaymentSuccess}
                />
            ) : (
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <h2 className="text-3xl font-bold mb-8">Checkout</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* LEFT SIDE - ITEMS */}
                        <div className="lg:col-span-2 space-y-4">
                            {itemsToDisplay.length > 0 ? (
                                itemsToDisplay.map((item, index) => {
                                    const primaryImageObj =
                                        item.images?.find((img) => img.is_primary === true) ||
                                        item.images?.[0] ||
                                        { image_url: "" };
                                    // console.log(primaryImageObj)
                                    const primaryImage = primaryImageObj.image_url.startsWith("http")
                                        ? primaryImageObj.image_url
                                        : `https://backend.gaurastra.com${primaryImageObj.image_url}`;



                                    const discountedPrice = item.latest_pricing?.price_detail?.discounted_price || item.discountedPrice;

                                    const originalPrice = item.latest_pricing?.price_detail?.original_price || item.originalPrice;

                                    const showDiscount =
                                        discountedPrice != null &&
                                        originalPrice != null &&
                                        Number(discountedPrice) < Number(originalPrice);

                                    const displayPrice = showDiscount
                                        ? discountedPrice
                                        : originalPrice;

                                    const totalPrice = displayPrice * item.quantity;

                                    return (
                                        <div
                                            key={index}
                                            className="bg-white rounded-lg shadow p-6 flex gap-6"
                                        >
                                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-gray-100">
                                                <Image
                                                    src={primaryImage}
                                                    alt={item.product_name}
                                                    width={128}
                                                    height={128}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <div className="flex-1 space-y-2">
                                                <h3 className="font-semibold text-lg">
                                                    {item?.product_name}
                                                </h3>

                                                <div className="flex items-center gap-2">
                                                    {showDiscount ? (
                                                        <>
                                                            <span className="line-through text-gray-400">
                                                                ₹{formatPrice(originalPrice)}
                                                            </span>
                                                            <span className="text-xl font-bold">
                                                                ₹{formatPrice(discountedPrice)}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="text-xl font-bold">
                                                            ₹{formatPrice(displayPrice)}
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="text-gray-600">
                                                    Size: <span className="font-medium">{item.selectedSize}</span>
                                                </p>

                                                <div className="flex items-center gap-3">
                                                    <span className="text-gray-700 font-medium">
                                                        Quantity:
                                                    </span>
                                                    <div className="flex items-center bg-gray-100 rounded-full">
                                                        <button
                                                            onClick={() => handleQuantityChange(item, -1)}
                                                            disabled={item.quantity <= 1}
                                                            className="px-3 py-1 hover:bg-gray-200 rounded-l-full disabled:opacity-50 disabled:cursor-not-allowed transition"
                                                        >
                                                            −
                                                        </button>
                                                        <span className="px-4 font-medium">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => handleQuantityChange(item, 1)}
                                                            className="px-3 py-1 hover:bg-gray-200 rounded-r-full transition"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>

                                                <p className="text-lg font-semibold pt-2">
                                                    Total: ₹{formatPrice(totalPrice)}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="bg-white rounded-lg shadow p-8 text-center">
                                    <p className="text-gray-500">No items for checkout.</p>
                                </div>
                            )}
                        </div>

                        {/* RIGHT SIDE — SHIPPING + SUMMARY */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Shipping Address */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>

                                <form onSubmit={handleSubmit(onSaveAddress)} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <input
                                                {...register("full_name", {
                                                    required: "Full Name is required.",
                                                })}
                                                placeholder="Full Name"
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                            />
                                            {errors.full_name && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.full_name.message}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <input
                                                {...register("phone", {
                                                    required: "Phone number is required.",
                                                    pattern: {
                                                        value: /^\d{10}$/,
                                                        message: "Phone number must be 10 digits.",
                                                    },
                                                })}
                                                placeholder="Phone Number"
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                            />
                                            {errors.phone && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.phone.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <input
                                            {...register("flat_number")}
                                            placeholder="Flat Number"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                        />
                                        <div>
                                            <input
                                                {...register("street", {
                                                    required: "Street is required.",
                                                })}
                                                placeholder="Street"
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                            />
                                            {errors.street && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.street.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <input
                                            {...register("landmark")}
                                            placeholder="Landmark"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                        />
                                        <div>
                                            <input
                                                {...register("city", {
                                                    required: "City is required.",
                                                })}
                                                placeholder="City"
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                            />
                                            {errors.city && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.city.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <input
                                                {...register("state", {
                                                    required: "State is required.",
                                                })}
                                                placeholder="State"
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                            />
                                            {errors.state && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.state.message}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <input
                                                {...register("pincode", {
                                                    required: "Pincode is required.",
                                                    pattern: {
                                                        value: /^\d{6}$/,
                                                        message: "Pincode must be 6 digits.",
                                                    },
                                                })}
                                                placeholder="Pincode"
                                                type="number"
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                            />
                                            {errors.pincode && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.pincode.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            type="submit"
                                            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                                        >
                                            Save Address
                                        </button>

                                        {addressSaved && (
                                            <span className="text-green-600 font-medium">
                                                ✓ Address saved!
                                            </span>
                                        )}
                                    </div>
                                </form>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

                                {foundCoupon && !couponState.appliedCoupon && (
                                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300 rounded-lg p-4 mb-4">
                                        <p className="font-semibold text-purple-800">
                                            ✨ Signup coupon found! ✨
                                        </p>
                                        <span className="text-sm text-purple-700">
                                            Enter <strong>{foundCoupon}</strong> below.
                                        </span>
                                    </div>
                                )}

                                <CouponComponent
                                    itemsToDisplay={itemsToDisplay}
                                    totalAmount={subtotal}
                                    storedUser={storedUser}
                                />

                                <div className="space-y-2 mt-4">
                                    <p className="flex justify-between text-gray-700">
                                        <span>Total Items:</span>
                                        <span className="font-medium">{itemsToDisplay.length}</span>
                                    </p>

                                    <div className="border-t pt-2">
                                        <p className="flex justify-between text-lg font-semibold">
                                            <span>Total Amount:</span>
                                            <span>₹{formatPrice(finalAmount)}</span>
                                        </p>
                                    </div>
                                </div>

                                <button
                                    className="w-full mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium"
                                    onClick={handleSubmit(onProceedToPayment)}
                                >
                                    Proceed to Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;