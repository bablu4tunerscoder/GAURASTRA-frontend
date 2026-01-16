"use client";

import { createSlice } from "@reduxjs/toolkit";
import { cartApi } from "../api/cartApi";

const isBrowser = typeof window !== "undefined";

const initialState = {
  items: isBrowser ? JSON.parse(localStorage.getItem("cart_items")) || [] : [],
  cart_summary: {
    total_items: 0,
    total_quantity: 0,
    subtotal: 0,
    total_discount: 0,
    total_amount: 0,
  },
  buyNowItem: null,
  popupOpen: false,
};

const saveCartToLocalStorage = (state) => {
  localStorage.setItem("cart_items", JSON.stringify(state.items));
  localStorage.setItem("cart_summary", JSON.stringify(state.cart_summary));
  localStorage.setItem("buy_now_item", JSON.stringify(state.buyNowItem));
  localStorage.setItem("cart_popup_open", JSON.stringify(state.popupOpen));
};

// Helper function to calculate cart summary
const calculateCartSummary = (items) => {
  const total_quantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const total_items = items.length;
  const subtotal = items.reduce((sum, item) => sum + item.item_total, 0);
  const total_discount = items.reduce(
    (sum, item) =>
      sum +
      (item.price.original_price - item.price.discounted_price) * item.quantity,
    0
  );
  const total_amount = subtotal;

  return {
    total_items,
    total_quantity,
    subtotal,
    total_discount,
    total_amount,
  };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartLocal: (state, action) => {
      const { variant, ...product } = action.payload;

      // Check if item with same product_id and sku already exists
      const existingItemIndex = state.items.findIndex(
        (item) => item.product_id === product._id && item.sku === variant.sku
      );

      if (existingItemIndex !== -1) {
        // Item exists, increase quantity
        state.items[existingItemIndex].quantity += variant.quantity || 1;
        state.items[existingItemIndex].item_total =
          state.items[existingItemIndex].quantity *
          state.items[existingItemIndex].price.discounted_price;
      } else {
        // New item, add to cart with API format
        const newItem = {
          product_id: product._id,
          sku: variant.sku,
          quantity: variant.quantity || 1,
          product_name: product.product_name,
          slug: product.slug,
          brand: product.brand,
          price: {
            original_price: variant.pricing?.original_price || 0,
            discounted_price: variant.pricing?.discounted_price || 0,
            discount_percent: 0,
          },
          item_total: (variant.quantity || 1) * (variant.pricing?.discounted_price || 0),
          images: variant.images || [],
        };

        state.items.push(newItem);
      }

      // Recalculate cart summary
      state.cart_summary = calculateCartSummary(state.items);

      saveCartToLocalStorage(state);
    },

    increaseQuantityLocal: (state, action) => {
      const { productId, sku } = action.payload;

      const item = state.items.find(
        (i) => i.product_id === productId && i.sku === sku
      );

      if (item) {
        item.quantity += 1;
        item.item_total = item.quantity * item.price.discounted_price;
      }

      // Recalculate cart summary
      state.cart_summary = calculateCartSummary(state.items);

      saveCartToLocalStorage(state);
    },

    decreaseQuantityLocal: (state, action) => {
      const { productId, sku } = action.payload;

      const item = state.items.find(
        (i) => i.product_id === productId && i.sku === sku
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.item_total = item.quantity * item.price.discounted_price;
      }

      // Recalculate cart summary
      state.cart_summary = calculateCartSummary(state.items);

      saveCartToLocalStorage(state);
    },

    removeFromCartLocal: (state, action) => {
      const { productId, sku } = action.payload;

      state.items = state.items.filter(
        (item) => !(item.product_id === productId && item.sku === sku)
      );

      // Recalculate cart summary
      state.cart_summary = calculateCartSummary(state.items);

      saveCartToLocalStorage(state);
    },

    clearCartLocal: (state) => {
      state.items = [];
      state.cart_summary = {
        total_items: 0,
        total_quantity: 0,
        subtotal: 0,
        total_discount: 0,
        total_amount: 0,
      };
      saveCartToLocalStorage(state);
    },

    setBuyNowItem: (state, action) => {
      state.buyNowItem = action.payload;
      saveCartToLocalStorage(state);
    },

    clearBuyNowItem: (state) => {
      state.buyNowItem = null;
      saveCartToLocalStorage(state);
    },

    toggleCartPopup: (state, action) => {
      state.popupOpen = action.payload;
      saveCartToLocalStorage(state);
    },
  },

  extraReducers: (builder) => {
    builder
      // When getCart query is fulfilled, sync the cart items to Redux state
      .addMatcher(
        cartApi.endpoints.getCart.matchFulfilled,
        (state, action) => {
          if (action.payload?.data) {
            state.items = action.payload.data;
            state.cart_summary = action.payload.cart_summary || calculateCartSummary(action.payload.data);
          }
        }
      )
      // .addMatcher(
      //   cartApi.endpoints.addBulkCart.matchFulfilled,
      //   (state, action) => {
      //     if (action.payload?.data) {
      //       state.items = action.payload.data;
      //       state.cart_summary = action.payload.cart_summary || calculateCartSummary(action.payload.data);
      //     }
      //   }
      // )

      // When addToCart mutation is fulfilled, update local state
      .addMatcher(
        cartApi.endpoints.addToCart.matchFulfilled,
        (state, action) => {
          if (action.payload?.data) {
            state.items = action.payload.data;
            state.cart_summary = action.payload.cart_summary || calculateCartSummary(action.payload.data);
          }
        }
      )

      // When increaseCart mutation is fulfilled
      .addMatcher(
        cartApi.endpoints.increaseCart.matchFulfilled,
        (state, action) => {
          if (action.payload?.data) {
            state.items = action.payload.data;
            state.cart_summary = action.payload.cart_summary || calculateCartSummary(action.payload.data);
          }
        }
      )

      // When decreaseCart mutation is fulfilled
      .addMatcher(
        cartApi.endpoints.decreaseCart.matchFulfilled,
        (state, action) => {
          if (action.payload?.data) {
            state.items = action.payload.data;
            state.cart_summary = action.payload.cart_summary || calculateCartSummary(action.payload.data);
          }
        }
      )
      .addMatcher(
        cartApi.endpoints.cleanCart.matchFulfilled,
        (state, action) => {
          const items = action.payload?.data || [];
          state.items = items;
          state.cart_summary =
            action.payload?.cart_summary || calculateCartSummary(items);
        }
      )
      ;

  },
});

export const {
  addToCartLocal,
  increaseQuantityLocal,
  decreaseQuantityLocal,
  removeFromCartLocal,
  clearCartLocal,
  setBuyNowItem,
  clearBuyNowItem,
  toggleCartPopup,
} = cartSlice.actions;

export default cartSlice.reducer;