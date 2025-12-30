// ProductByUniqueIdSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/helpers/axiosinstance";

export const fetchProductByUniqueId = createAsyncThunk(
  "product/fetchByUniqueId",
  async (productUniqueId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/Productes/by-unique/${productUniqueId}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const productSlice = createSlice({
  name: "productByUniqueId",
  initialState: {
    product: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductByUniqueId.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.product = null;
      })
      .addCase(fetchProductByUniqueId.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductByUniqueId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;

