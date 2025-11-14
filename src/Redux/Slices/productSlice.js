import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../Helper/axiosinstance";

// ✅ Fetch Products API Call
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { filters, category_name, allProducts, status } = getState().products;

      // 🚫 Avoid extra API call if data already exists and not stale
      if (
        allProducts.length > 0 &&
        status === "succeeded" &&
        getState().products.category_name === category_name
      ) {
        // Return existing data directly (no API request)
        return allProducts;
      }

      const specialCategories = ["All Products", "New Arrivals", "On Sale"];
      const appliedFilters = specialCategories.includes(category_name)
        ? {}
        : filters;
      const response = await axios.post(
        `${BASE_URL}/api/Productes/filter-Products`,
        appliedFilters
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


// ✅ Fetch Single Product by Canonical URL
export const fetchProductByCanonicalURL = createAsyncThunk(
  "products/fetchProductByCanonicalURL",
  async (canonicalURL, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/Productes/by-canonical/${canonicalURL}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    currentProduct: null, // For single product view
    status: "idle",
    error: null,
    filters: {},
    category_name: "",
    subcategory_name: "",
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setCategoryName: (state, action) => {
      state.category_name = action.payload;
    },
    setSubcategoryName: (state, action) => {
      state.subcategory_name = action.payload;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let products = action.payload;


        if (state.category_name === "New Arrivals") {
          products = products.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
        }

        state.allProducts = products;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchProductByCanonicalURL.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByCanonicalURL.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductByCanonicalURL.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  setFilters,
  setCategoryName,
  setSubcategoryName,
  clearCurrentProduct,
} = productSlice.actions;
export default productSlice.reducer;

