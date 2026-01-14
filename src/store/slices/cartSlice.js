import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  buyNowItem: null,
  popupOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartLocal: (state, action) => {

      const existingItem = state.items.find(
        (item) =>
          item._id === action.payload._id);

      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    increaseQuantityLocal: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) item.quantity += 1;
    },

    decreaseQuantityLocal: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },

    removeFromCartLocal: (state, action) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
    },

    clearCartLocal: (state) => {
      state.items = [];
    },

    setBuyNowItem: (state, action) => {
      state.buyNowItem = action.payload;
    },

    clearBuyNowItem: (state) => {
      state.buyNowItem = null;
    },

    toggleCartPopup: (state, action) => {
      state.popupOpen = action.payload;
    },
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
