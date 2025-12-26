// store/slices/productSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { productsApi } from "../api/productsApi";

const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    currentProduct: null,
    status: "idle",
    error: null,

    filters: {
      search: "",
      min_price: "",
      max_price: "",
      sort: "",
      on_sale: false,
    },

    category_name: "",
    subcategory_name: "",
  },

  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    setFilter: (state, action) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },

    clearFilters: (state) => {
      state.filters = {
        search: "",
        min_price: "",
        max_price: "",
        sort: "",
        on_sale: false,
      };
    },

    setCategoryName: (state, action) => {
      state.category_name = action.payload;
    },

    setSubcategoryName: (state, action) => {
      state.subcategory_name = action.payload;
    },

    setCategoryAndSubcategory: (state, action) => {
      const { category, subcategory } = action.payload;
      state.category_name = category || "";
      state.subcategory_name = subcategory || "";
    },

    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // ========================================================
      // MATCHERS FOR getProducts
      // ========================================================
      .addMatcher(
        productsApi.endpoints.getProducts.matchPending,
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        productsApi.endpoints.getProducts.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.allProducts = action.payload;
        }
      )
      .addMatcher(
        productsApi.endpoints.getProducts.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      )

      // ========================================================
      // MATCHERS FOR getProductByCanonicalURL
      // ========================================================
      .addMatcher(
        productsApi.endpoints.getProductByCanonicalURL.matchPending,
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        productsApi.endpoints.getProductByCanonicalURL.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.currentProduct = action.payload;
        }
      )
      .addMatcher(
        productsApi.endpoints.getProductByCanonicalURL.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export const {
  setFilters,
  setFilter,
  clearFilters,
  setCategoryName,
  setSubcategoryName,
  setCategoryAndSubcategory,
  clearCurrentProduct,
} = productSlice.actions;

export default productSlice.reducer;

// ========================================================
// SELECTORS
// ========================================================
export const selectAllProducts = (state) => state.products.allProducts;
export const selectCurrentProduct = (state) => state.products.currentProduct;
export const selectStatus = (state) => state.products.status;
export const selectError = (state) => state.products.error;
export const selectFilters = (state) => state.products.filters;
export const selectCategoryName = (state) => state.products.category_name;
export const selectSubcategoryName = (state) => state.products.subcategory_name;