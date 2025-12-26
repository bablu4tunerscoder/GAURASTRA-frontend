"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  applyCoupon,
  removeCoupon,
  clearError,
  clearCoupon,
} from "@/store/slices/couponSlice";

const CouponComponent = ({ itemsToDisplay, totalAmount, storedUser }) => {
  const dispatch = useDispatch();
  const couponState = useSelector((state) => state.coupon);

  // Form setup with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const [isAnimating, setIsAnimating] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const formatPrice = (price) => (typeof price === "number" ? price.toFixed(2) : "0.00");

  // Clear messages after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (errorMessage || successMessage) {
        setErrorMessage(null);
        setSuccessMessage(null);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage, successMessage]);

  // Reset coupon logic when items change
  useEffect(() => {
    const productId = itemsToDisplay[0]?.id || itemsToDisplay[0]?.product_id;
    if (productId) {
      if (couponState.appliedCoupon) {
        dispatch(clearCoupon());
      }
      reset(); // Reset form when product changes
      setErrorMessage(null);
      setSuccessMessage(null);
    }
  }, [itemsToDisplay, couponState.appliedCoupon, dispatch, reset]);

  // Handle coupon application
  const onSubmit = async (data) => {
    if (!data.code.trim()) {
      setErrorMessage("Please enter a coupon code");
      return;
    }

    const product_id = itemsToDisplay[0]?.id || itemsToDisplay[0]?.product_id;
    if (!product_id) {
      setErrorMessage("No product selected for coupon application");
      return;
    }

    if (!storedUser?.user_id) {
      setErrorMessage("Please login to apply coupon");
      return;
    }

    if (typeof totalAmount !== "number" || totalAmount <= 0) {
      setErrorMessage("Invalid cart amount");
      return;
    }

    setIsAnimating(true);
    try {
      await dispatch(
        applyCoupon({
          code: data.code.trim(),
          user_id: storedUser.user_id,
          product_id,
          cartAmount: Number(totalAmount),
        })
      ).unwrap();
      setSuccessMessage("Coupon applied successfully!");
      reset(); // Reset form after successful application
    } catch (error) {
      setErrorMessage("Coupon application failed.");
    } finally {
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  // Handle coupon removal
  const handleRemoveCoupon = async () => {
    if (!storedUser?.user_id) {
      setErrorMessage("Please login to remove coupon");
      return;
    }

    if (!couponState.appliedCoupon) return;

    setIsAnimating(true);
    try {
      await dispatch(
        removeCoupon({
          coupon_id: couponState.appliedCoupon.coupon_id,
          user_id: storedUser.user_id,
        })
      ).unwrap();
      dispatch(clearCoupon());
      setSuccessMessage("Coupon removed successfully");
    } catch (error) {
      setErrorMessage("Failed to remove coupon");
    } finally {
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  return (
    <div className={`${isAnimating ? "scale-[1.01]" : ""}`}>
      {/* Subtotal */}
      <p className="text-lg font-semibold text-black mb-3">
        Subtotal: ₹{formatPrice(totalAmount)}
      </p>

      {/* Coupon Discount Row */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-black font-medium">Coupon Discount</span>
        <span className="text-black font-semibold">
          {couponState.appliedCoupon ? (
            <>
              -₹{formatPrice(couponState.discountAmount)}
              <button
                onClick={handleRemoveCoupon}
                className="text-sm text-red-500 ml-2 hover:underline"
              >
                (Remove)
              </button>
            </>
          ) : (
            "₹0.00"
          )}
        </span>
      </div>

      {/* Input + Apply */}
      {!couponState.appliedCoupon ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2">
            <input
              type="text"
              {...register("code", { required: "Please enter a coupon code" })}
              placeholder="Enter coupon code"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
            />
            <button
              type="submit"
              disabled={couponState.loading || isAnimating}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:bg-gray-400"
            >
              {couponState.loading ? "Applying..." : "Apply"}
            </button>
          </div>

          {/* Error */}
          {errors.code && (
            <div className="mt-3 bg-red-100 text-red-600 border border-red-300 rounded-lg p-3">
              <p className="font-medium">{errors.code.message}</p>
            </div>
          )}

          {/* Custom error messages */}
          {errorMessage && (
            <div className="mt-3 bg-red-100 text-red-600 border border-red-300 rounded-lg p-3">
              <p className="font-medium">{errorMessage}</p>
            </div>
          )}

          {/* Success */}
          {successMessage && (
            <div className="mt-3 bg-green-100 text-green-700 border border-green-300 rounded-lg p-3">
              <p className="font-medium">{successMessage}</p>
            </div>
          )}
        </form>
      ) : (
        // Applied Coupon Card
        <div className="border border-black rounded-lg p-4 bg-gray-50">
          <div className="text-lg font-bold text-black">
            {couponState.appliedCoupon.code}
          </div>
          <div className="text-sm text-gray-700">
            {couponState.appliedCoupon.discountType === "percentage"
              ? `Save ${couponState.appliedCoupon.discountValue}%`
              : `Save ₹${couponState.appliedCoupon.discountValue}`}
          </div>
        </div>
      )}

      {/* Final Amount */}
      {couponState.appliedCoupon && (
        <p className="text-lg font-semibold text-black mt-4">
          Final Amount: ₹{formatPrice(couponState.finalAmount)}
        </p>
      )}
    </div>
  );
};

export default CouponComponent;
