import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/helpers/axiosinstance";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const applyCoupon = createAsyncThunk(
  "coupon/apply",
  async (couponData, { rejectWithValue }) => {
    try {
      if (
        !couponData.code ||
        !couponData.user_id ||
        !couponData.product_id ||
        !couponData.cartAmount
      ) {
        throw new Error("All coupon fields are required");
      }

      const response = await api.post("/api/coupons/apply", couponData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message,
          details: error.response?.data?.details,
        }
      );
    }
  }
);

export const removeCoupon = createAsyncThunk(
  "coupon/remove",
  async (data, { rejectWithValue }) => {
    try {
      const { coupon_id, user_id } = data;

      if (!coupon_id || !user_id) {
        throw new Error("Invalid coupon removal request");
      }

      const response = await api.post("/api/coupons/remove-user-from-coupon", {
        coupon_id,
        user_id,
      });

      if (!response.data) throw new Error("Invalid response from server");
      return response.data;
    } catch (error) {
      // Handle specific error cases
      if (error.response?.status === 404) {
        return rejectWithValue({
          message: "Coupon not found",
          details: "This coupon may have been already removed or expired",
        });
      }
      return rejectWithValue(
        error.response?.data || {
          message: error.message,
          details: error.response?.data?.details,
        }
      );
    }
  }
);

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    appliedCoupon: null,
    loading: false,
    error: null,
    discountAmount: 0,
    finalAmount: 0,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCoupon: (state) => {
      state.appliedCoupon = null;
      state.discountAmount = 0;
      state.finalAmount = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.appliedCoupon = action.payload.coupon;
        state.discountAmount = action.payload.discountAmount;
        state.finalAmount = action.payload.finalAmount;
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCoupon.fulfilled, (state) => {
        state.loading = false;
        state.appliedCoupon = null;
        state.discountAmount = 0;
        state.finalAmount = 0;
      })
      .addCase(removeCoupon.rejected, (state, action) => {
        state.loading = false;
        // Clear coupon even if removal failed to maintain consistency
        state.appliedCoupon = null;
        state.discountAmount = 0;
        state.finalAmount = 0;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCoupon } = couponSlice.actions;
export default couponSlice.reducer;
