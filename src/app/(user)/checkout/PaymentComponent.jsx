"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";

import {
  initiatePayment,
  resetPayment,
  verifyPayment,
} from "@/store/slices/paymentSlice";

import { createOrder, clearOrder } from "@/store/slices/orderSlice";

const PaymentComponent = ({ orderDetails, onBack }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [statusMessage, setStatusMessage] = useState("");
  const [retryAfter, setRetryAfter] = useState(0);
  const [showRetryButton, setShowRetryButton] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  const {
    order,
    loading: orderLoading,
    error: orderError,
  } = useSelector((state) => state.order);

  const {
    paymentUrl,
    paymentStatus,
    loading: paymentLoading,
    error: paymentError,
    merchantTransactionId,
  } = useSelector((state) => state.payment);

  // Log Transaction ID
  useEffect(() => {
    console.log("Current merchantTransactionId:", merchantTransactionId);
  }, [merchantTransactionId]);

  // Rate-limit handling
  useEffect(() => {
    if (paymentError?.isRateLimitError) {
      const waitTime = paymentError.retryAfter || 60;
      setRetryAfter(waitTime);
      setShowRetryButton(false);

      const timer = setInterval(() => {
        setRetryAfter((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowRetryButton(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [paymentError]);

  // Create order from Redux buy-now/checkout data
  useEffect(() => {
    if (orderDetails && !order) {
      const formattedOrder = {
        user_id: orderDetails.user_id,
        delivery_address: orderDetails.delivery_address,
        products: orderDetails.products.map((item) => ({
          product_id: item.product_id,
          name: item.product_name,
          price: item.price,
          quantity: item.quantity,
          size: item.selectedSize,
        })),
        total_order_amount: orderDetails.total_order_amount,
      };

      dispatch(createOrder(formattedOrder));
    }
  }, [orderDetails, order, dispatch]);

  // Initiate Payment
  useEffect(() => {
    if (order && !paymentUrl && !paymentLoading && !paymentInitiated) {
      setPaymentInitiated(true);
      dispatch(initiatePayment(order));
    }
  }, [order, paymentUrl, paymentLoading, dispatch, paymentInitiated]);

  // Redirect to PhonePe
  useEffect(() => {
    if (paymentUrl) {
      window.location.href = paymentUrl;
    }
  }, [paymentUrl]);

  // Payment verification function
  const verifyPaymentStatus = async () => {
    const txIdFromUrl = searchParams.get("merchantTransactionId");
    const statusFromUrl = searchParams.get("status");
    const txIdToVerify = txIdFromUrl || merchantTransactionId;

    if (!txIdToVerify) return;

    try {
      if (statusFromUrl === "cancelled") {
        router.replace(`/payment-cancelled?transactionId=${txIdToVerify}`);
        return;
      }

      const result = await dispatch(verifyPayment(txIdToVerify)).unwrap();

      if (result.paymentStatus === "SUCCESS") {
        dispatch(resetPayment());
        dispatch(clearOrder());

        router.replace(
          `/order-success?orderId=${result.orderId || order?.order_id}&txId=${txIdToVerify}`
        );
      } else if (result.paymentStatus === "FAILED") {
        router.replace(`/payment-failed?txId=${txIdToVerify}`);
      } else if (result.paymentStatus === "CANCELLED") {
        router.replace(`/payment-cancelled?txId=${txIdToVerify}`);
      }
    } catch (error) {
      router.replace(`/payment-failed?error=${error.message}`);
    }
  };

  // Auto verify when returned from PhonePe
  useEffect(() => {
    if (searchParams.get("merchantTransactionId")) {
      verifyPaymentStatus();
    }
  }, [searchParams]);

  // Back to checkout
  const handleBack = () => {
    dispatch(resetPayment());
    dispatch(clearOrder());
    onBack();
  };

  // Retry after rate limit
  const handleRetry = () => {
    dispatch(resetPayment());
    if (order) {
      dispatch(initiatePayment(order));
    }
    setShowRetryButton(false);
  };

  // Manual verify button
  const handleManualVerify = () => {
    dispatch(resetPayment());
    const txIdFromUrl = searchParams.get("merchantTransactionId");
    if (txIdFromUrl) {
      dispatch(verifyPayment(txIdFromUrl));
    }
  };

  // Loading UI
  if (orderLoading || paymentLoading) {
    return (
      <div className="payment-container">
        <div className="payment-loading">
          <h2>Processing Your Payment</h2>
          <p>Please wait while we connect you to PhonePe...</p>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  // Rate limit UI
  if (paymentError?.isRateLimitError) {
    return (
      <div className="payment-container">
        <div className="payment-error">
          <h2>Too Many Requests</h2>
          <p>{paymentError.message || "Please wait before trying again."}</p>

          {retryAfter > 0 && (
            <p>Please wait {retryAfter} seconds before retrying.</p>
          )}

          <div className="payment-actions">
            <button className="btn btn-primary" onClick={handleBack}>
              Back to Checkout
            </button>

            {showRetryButton && (
              <button className="btn btn-secondary" onClick={handleRetry}>
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Final UI
  return (
    <div className="payment-container">
      <div className="payment-processing">
        {statusMessage && (
          <div className="status-message">
            <p>{statusMessage}</p>
            {!paymentUrl && (
              <button className="btn btn-retry" onClick={handleManualVerify}>
                Check Payment Status
              </button>
            )}
          </div>
        )}

        {paymentUrl ? (
          <>
            <h2>Redirecting to PhonePe...</h2>
            <p>If not redirected automatically, click below:</p>

            <button
              className="btn btn-primary"
              onClick={() => (window.location.href = paymentUrl)}
            >
              Proceed to Payment
            </button>
          </>
        ) : (
          <>
            <h2>Payment Verification</h2>
            <p>We're verifying your payment status...</p>
          </>
        )}

        <button className="btn btn-secondary" onClick={handleBack}>
          Back to Checkout
        </button>
      </div>
    </div>
  );
};

export default PaymentComponent;
