"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/Helper/axiosinstance";
import Image from "next/image";

import {
    clearBuyNowItem,
    setBuyNowItem,
    updateQuantity,
} from "@/Redux/Slices/cartSlice";
import { clearCoupon } from "@/Redux/Slices/couponSlice";
import { clearOrder } from "@/Redux/Slices/orderSlice";
import { resetPayment } from "@/Redux/Slices/paymentSlice";
import { updateUser } from "@/Redux/Slices/userSlice";

import CouponComponent from "./CouponComponent";
import PaymentComponent from "./PaymentComponent";
import toast from "react-hot-toast";

const CheckoutPage = ({ searchParams }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const passedProduct = searchParams?.product
        ? JSON.parse(searchParams.product)
        : null;

    const passedSize = searchParams?.size || null;
    const passedQty = searchParams?.quantity ? Number(searchParams.quantity) : 1;

    const cartItems = useSelector((state) => state.cart.items);
    const buyNowItem = useSelector((state) => state.cart.buyNowItem);
    const couponState = useSelector((state) => state.coupon);

    const storedUser =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("user")) || {}
            : {};

    const [showPayment, setShowPayment] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [addressSaved, setAddressSaved] = useState(false);
    const [foundCoupon, setFoundCoupon] = useState(null);

    useEffect(() => {
        dispatch(resetPayment());
        dispatch(clearOrder());
        return () => {
            dispatch(clearBuyNowItem());
        };
    }, [dispatch]);

    useEffect(() => {
        if (passedProduct) {
            dispatch(clearCoupon());
            dispatch(
                setBuyNowItem({
                    ...passedProduct,
                    selectedSize: passedSize,
                    quantity: passedQty,
                })
            );
        }
    }, [passedProduct, passedSize, passedQty, dispatch]);

    useEffect(() => {
        if (typeof window !== "undefined" && window.fbq) {
            window.fbq("track", "InitiateCheckout");
        }
    }, []);

    const itemsToDisplay = buyNowItem ? [buyNowItem] : cartItems;

    const formatPrice = (price) => {
        if (typeof price !== "number") return "0.00";
        return price.toFixed(2);
    };

    const getImageUrl = (url) => {
        if (!url) return "";
        if (url.startsWith("http") || url.startsWith("blob:")) return url;
        return `${BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
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

    const [address, setAddress] = useState({
        full_name: storedUser?.name || "",
        phone: storedUser?.phone === "0" ? "" : storedUser?.phone || "",
        flat_number: "",
        street: storedUser?.address || "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        isEditing: false,
    });

    const [errorMessages, setErrorMessages] = useState({
        full_name: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
    });

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let errors = {};
        let isValid = true;

        const check = (field, message, condition) => {
            if (condition) {
                errors[field] = message;
                isValid = false;
            } else errors[field] = "";
        };

        check("full_name", "Full Name is required.", !address.full_name);
        check(
            "phone",
            "Phone number must be 10 digits.",
            !address.phone || !/^\d{10}$/.test(address.phone)
        );
        check("street", "Street is required.", !address.street);
        check("city", "City is required.", !address.city);
        check("state", "State is required.", !address.state);
        check(
            "pincode",
            "Pincode must be 6 digits.",
            !address.pincode || !/^\d{6}$/.test(address.pincode)
        );

        setErrorMessages(errors);
        return isValid;
    };

    const handleSaveAddress = async () => {
        if (!validate()) return;

        try {
            const fullAddress = `${address.flat_number}, ${address.street}, ${address.landmark}, ${address.city}, ${address.state}, ${address.pincode}`;

            const result = await dispatch(
                updateUser({
                    userId: storedUser.user_id,
                    updatedData: {
                        name: address.full_name,
                        phone: address.phone,
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

            setAddress({ ...address, isEditing: false });
            setAddressSaved(true);

            setTimeout(() => setAddressSaved(false), 2500);
        } catch (err) {
            console.log(err);
            toast.error("Unable to save address.");
        }
    };

    const handleProceedToPayment = () => {
        if (!validate()) {
            toast.error("Please fill all required address fields.");
            return;
        }

        if (typeof window !== "undefined" && window.fbq) {
            window.fbq("track", "InitiateCheckout");
        }

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
            delivery_address: address,
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
                                    const primaryImage =
                                        item.images?.find((img) => img.is_primary) ||
                                        item.images?.[0] ||
                                        { image_url: "" };

                                    const discountedPrice =item.discountedPrice

                                    const originalPrice = item.originalPrice;

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
                                            {primaryImage.image_url && (
                                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-gray-100">
                                                    <Image
                                                        src={getImageUrl(primaryImage.image_url)}
                                                        alt={item.name}
                                                        width={128}
                                                        height={128}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}

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

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <input
                                                name="full_name"
                                                value={address.full_name}
                                                onChange={handleChange}
                                                placeholder="Full Name"
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                            />
                                            {errorMessages.full_name && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errorMessages.full_name}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <input
                                                name="phone"
                                                value={address.phone}
                                                onChange={handleChange}
                                                placeholder="Phone Number"
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                            />
                                            {errorMessages.phone && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errorMessages.phone}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <input
                                            name="flat_number"
                                            value={address.flat_number}
                                            onChange={handleChange}
                                            placeholder="Flat Number"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                        />
                                        <div>
                                            <input
                                                name="street"
                                                value={address.street}
                                                onChange={handleChange}
                                                placeholder="Street"
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                            />
                                            {errorMessages.street && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errorMessages.street}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <input
                                            name="landmark"
                                            value={address.landmark}
                                            onChange={handleChange}
                                            placeholder="Landmark"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                        />
                                        <div>
                                            <input
                                                name="city"
                                                value={address.city}
                                                onChange={handleChange}
                                                placeholder="City"
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                            />
                                            {errorMessages.city && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errorMessages.city}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <input
                                                name="state"
                                                value={address.state}
                                                onChange={handleChange}
                                                placeholder="State"
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                            />
                                            {errorMessages.state && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errorMessages.state}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <input
                                                name="pincode"
                                                value={address.pincode}
                                                onChange={handleChange}
                                                placeholder="Pincode"
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                            />
                                            {errorMessages.pincode && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errorMessages.pincode}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={handleSaveAddress}
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
                                </div>
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
                                    onClick={handleProceedToPayment}
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