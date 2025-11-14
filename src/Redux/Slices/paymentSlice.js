import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../Helper/axiosinstance";

const apiKey = "4a640925-ed46-48c5-a792-3a842ee867d8";

const withRetry = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (
      (error.response?.status === 429 ||
        error.message.includes("Too Many Requests")) &&
      retries > 0
    ) {
      await new Promise((res) => setTimeout(res, delay));
      return withRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

export const initiatePayment = createAsyncThunk(
  "payment/initiatePayment",
  async (orderData, { rejectWithValue }) => {
    try {
      console.log("Initiating payment for order:", orderData.order_id);
      const response = await withRetry(() =>
        axios.post(
          `${BASE_URL}/api/payments/initiate`, // 👈 plural
          {
            orderId: orderData.order_id,
            metadata: {
              udf1: "Order payment",
              udf2: JSON.stringify({
                userId: orderData.user_id,
                products: orderData.products.map((p) => p.product_id),
              }),
            },
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        )
      );

      console.log("Payment initiation response:", response.data);

      if (!response.data.success) {
        throw new Error(response.data.error || "Payment initiation failed");
      }

      return {
        paymentUrl: response.data.redirectUrl,
        paymentId: response.data.paymentId,
        merchantTransactionId: response.data.merchantTransactionId,
      };
    } catch (error) {
      console.error("Payment initiation error:", error);
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        isRateLimitError: error.response?.status === 429,
        retryAfter: error.response?.data?.retryAfter || 60,
      });
    }
  }
);

export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (merchantTransactionId, { rejectWithValue }) => {
    try {
      console.log(
        "Verifying payment with merchantTransactionId:",
        merchantTransactionId
      );
      const response = await axios.get(
        `${BASE_URL}/api/payments/verify/${merchantTransactionId}`, // 👈 plural
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      console.log("Verification response:", response.data);

      if (!response.data.success) {
        throw new Error(response.data.error || "Payment verification failed");
      }

      return {
        paymentStatus: response.data.paymentStatus,
        orderId: response.data.orderId,
        merchantTransactionId,
        updatedOrder: response.data.updatedOrder || null,
      };
    } catch (error) {
      console.error("Payment verification error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paymentUrl: null,
    paymentStatus: null,
    paymentId: null,
    merchantTransactionId: null,
    orderId: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetPayment: (state) => {
      state.paymentUrl = null;
      state.paymentStatus = null;
      state.paymentId = null;
      state.merchantTransactionId = null;
      state.orderId = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initiatePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initiatePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentUrl = action.payload.paymentUrl;
        state.paymentId = action.payload.paymentId;
        state.merchantTransactionId = action.payload.merchantTransactionId;
        console.log("Payment initiated successfully:", action.payload);
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Payment initiation failed:", action.payload);
      })
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentStatus = action.payload.paymentStatus;
        state.merchantTransactionId = action.payload.merchantTransactionId;
        state.orderId = action.payload.orderId;
        console.log("Payment verification completed:", action.payload);
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Payment verification failed:", action.payload);
      });
  },
});

export const { resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
