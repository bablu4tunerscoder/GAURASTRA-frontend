 "use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  applyCoupon,
  removeCoupon,
  clearError,
  clearCoupon,
} from "@/Redux/Slices/couponSlice";

const CouponComponent = ({ itemsToDisplay, totalAmount, storedUser }) => {
  const dispatch = useDispatch();
  const couponState = useSelector((state) => state.coupon);

  const [enteredCode, setEnteredCode] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const clearMessages = () => {
    setErrorMessage(null);
    setErrorDetails(null);
    setSuccessMessage(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (errorMessage || successMessage) {
        clearMessages();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage, successMessage]);

  const formatPrice = (price) =>
    typeof price === "number" ? price.toFixed(2) : "0.00";

  useEffect(() => {
    const productId = itemsToDisplay[0]?.id || itemsToDisplay[0]?.product_id;
    if (productId && productId !== currentProductId) {
      setCurrentProductId(productId);
      if (couponState.appliedCoupon) {
        dispatch(clearCoupon());
      }
      setEnteredCode("");
      clearMessages();
    }
  }, [itemsToDisplay, currentProductId, dispatch, couponState.appliedCoupon]);

  useEffect(() => {
    const cleanupCoupon = async () => {
      if (couponState.appliedCoupon && storedUser?.user_id) {
        try {
          await dispatch(
            removeCoupon({
              coupon_id: couponState.appliedCoupon.coupon_id,
              user_id: storedUser.user_id,
            })
          ).unwrap();
        } catch (error) {
          console.error("Coupon removal failed:", error);
        } finally {
          dispatch(clearCoupon());
        }
      }
    };

    const handleBeforeUnload = () => cleanupCoupon();
    const handlePopState = () => cleanupCoupon();

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
      cleanupCoupon();
    };
  }, [couponState.appliedCoupon, storedUser?.user_id, dispatch]);

  useEffect(() => {
    if (couponState.error) {
      const { message, details } = couponState.error;
      setErrorMessage(message);
      setErrorDetails(details);
      dispatch(clearError());
    }
  }, [couponState.error, dispatch]);

  useEffect(() => {
    if (couponState.appliedCoupon) {
      clearMessages();
      setSuccessMessage("Coupon applied successfully!");
    }
  }, [couponState.appliedCoupon]);

  const validateCouponData = () => {
    clearMessages();

    if (!enteredCode.trim()) {
      setErrorMessage("Please enter a coupon code");
      return false;
    }

    const product_id = itemsToDisplay[0]?.id || itemsToDisplay[0]?.product_id;
    if (!product_id) {
      setErrorMessage("No product selected for coupon application");
      return false;
    }

    if (!storedUser?.user_id) {
      setErrorMessage("Please login to apply coupon");
      return false;
    }

    if (typeof totalAmount !== "number" || totalAmount <= 0) {
      setErrorMessage("Invalid cart amount");
      return false;
    }

    return true;
  };

  const handleApplyCoupon = async () => {
    if (!validateCouponData()) return;

    const product_id = itemsToDisplay[0]?.id || itemsToDisplay[0]?.product_id;

    setIsAnimating(true);
    try {
      await dispatch(
        applyCoupon({
          code: enteredCode.trim(),
          user_id: storedUser.user_id,
          product_id,
          cartAmount: Number(totalAmount),
        })
      ).unwrap();
      setEnteredCode("");
    } catch {}
    finally {
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

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
      setEnteredCode("");
      setSuccessMessage("Coupon removed successfully");
    } catch (error) {
      setErrorMessage("Failed to remove coupon");
    } finally {
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const renderErrorDetails = () => {
    if (!errorDetails) return null;

    return (
      <div className="text-sm text-gray-500 mt-1">
        {errorDetails.minCartAmount && (
          <p>
            Minimum cart: ₹{errorDetails.minCartAmount} (Current: ₹
            {errorDetails.currentCartAmount})
          </p>
        )}
        {errorDetails.expiresAt && (
          <p>Expired on: {new Date(errorDetails.expiresAt).toLocaleDateString()}</p>
        )}
      </div>
    );
  };

  return (
    <div
      className={` ${
        isAnimating ? "scale-[1.01]" : ""
      }`}
    >
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
        <div>
          <div className="flex gap-2">
            <input
              type="text"
              value={enteredCode}
              onChange={(e) => {
                setEnteredCode(e.target.value);
                clearMessages();
              }}
              placeholder="Enter coupon code"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
            />
            <button
              onClick={handleApplyCoupon}
              disabled={couponState.loading || !enteredCode.trim()}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:bg-gray-400"
            >
              {couponState.loading ? "Applying..." : "Apply"}
            </button>
          </div>

          {/* Error */}
          {errorMessage && (
            <div className="mt-3 bg-red-100 text-red-600 border border-red-300 rounded-lg p-3">
              <p className="font-medium">{errorMessage}</p>
              {renderErrorDetails()}
            </div>
          )}

          {/* Success */}
          {successMessage && (
            <div className="mt-3 bg-green-100 text-green-700 border border-green-300 rounded-lg p-3">
              <p className="font-medium">{successMessage}</p>
            </div>
          )}
        </div>
      ) : (
        /* Applied Coupon Card */
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
