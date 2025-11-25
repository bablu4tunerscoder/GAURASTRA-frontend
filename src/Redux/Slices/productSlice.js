import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/Helper/axiosinstance";

// ========================================================
//  FETCH PRODUCTS (POST API + CATEGORY/SUBCATEGORY CACHING)
// ========================================================
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState().products;

      const category = state.category_name;
      const subcategory = state.subcategory_name;

      const existingProducts = state.allProducts;

      // ------------------------------
      // CACHE CHECK
      // ------------------------------
      const isCached = state.filterCache.some(
        (item) =>
          item.category === category &&
          item.subcategory === subcategory
      );

      if (existingProducts.length > 0 && isCached) {
        return existingProducts;
      }

      // ------------------------------
      // BUILD FILTER BODY
      // ------------------------------
      const filters = {
        category_name: category || "",
        subcategory_name: subcategory || "",
        ...state.filters,
      };

      const response = await axios.post(
        `${BASE_URL}/api/Productes/filter-Products`,
        filters
      );

      const data = response.data.data;

      // attaching for sorting usage
      data.category_name = category;
      data.subcategory_name = subcategory;

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ========================================================
//  FETCH SINGLE PRODUCT
// ========================================================
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

// ========================================================
//  SLICE
// ========================================================
const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    currentProduct: null,
    status: "idle",
    error: null,

    filters: {},
    filterCache: [], // <── CACHE HERE

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

  // ========================================================
  //  EXTRA REDUCERS
  // ========================================================
  extraReducers: (builder) => {
    builder
      // -----------------------------
      // FETCH PRODUCTS
      // -----------------------------
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";

        let products = action.payload || [];

        // ------------------------------
        // SAVE CACHE ENTRY (category + subcategory)
        // ------------------------------
        const combo = {
          category: state.category_name,
          subcategory: state.subcategory_name,
        };

        const exists = state.filterCache.some(
          (item) =>
            item.category === combo.category &&
            item.subcategory === combo.subcategory
        );

        if (!exists) {
          state.filterCache.push(combo);
        }

        // ------------------------------
        // SORT FOR NEW ARRIVALS
        // ------------------------------
        if (state.category_name === "New Arrivals") {
          products = products.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
        }

        // Save products
        state.allProducts = products;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // -----------------------------
      // FETCH SINGLE PRODUCT
      // -----------------------------
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
