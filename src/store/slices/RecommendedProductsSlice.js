import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../helpers/axiosinstance";

// Add this thunk:
export const fetchProductSuggestions = createAsyncThunk(
  "products/fetchSuggestions",
  async ({ canonicalURL }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/Productes/suggestions/${canonicalURL}`
      );
      return response.data.suggestions; // Assuming API returns { products: [...] }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const RecommendedProductsSlice = createSlice({
  name: "RecommendedProducts",
  initialState: {
    products: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    hasMore: true,
    currentVendor: null,
    suggestedProducts: [],
    suggestedLoading: false,
    suggestedError: null,
  },
  reducers: {
    clearProducts: (state) => {
      state.products = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.hasMore = true;
    },
    setCurrentVendor: (state, action) => {
      state.currentVendor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductSuggestions.pending, (state) => {
        state.suggestedLoading = true;
        state.suggestedError = null;
      })
      .addCase(fetchProductSuggestions.fulfilled, (state, action) => {
        state.suggestedLoading = false;
        state.suggestedProducts = action.payload;
      })
      .addCase(fetchProductSuggestions.rejected, (state, action) => {
        state.suggestedLoading = false;
        state.suggestedError = action.payload;
      });
  },
});

export const { clearProducts, setCurrentVendor } = RecommendedProductsSlice.actions;
export default RecommendedProductsSlice.reducer;