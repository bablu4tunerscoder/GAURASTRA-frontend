import { createSlice } from "@reduxjs/toolkit";
 
const initialState = {
  items: [],
  buyNowItem: null, // For temporary Buy Now items
  popupOpen: false,
};
 
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize
      );
 
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) =>
          item.id !== action.payload.id ||
          item.selectedColor !== action.payload.selectedColor ||
          item.selectedSize !== action.payload.selectedSize
      );
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize
      );
      if (item) {
        item.quantity += action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter(
            (i) =>
              i.id !== item.id ||
              i.selectedColor !== item.selectedColor ||
              i.selectedSize !== item.selectedSize
          );
        }
      }
    },
    clearCart: (state) => {
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
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setBuyNowItem,
  clearBuyNowItem,
  toggleCartPopup,
} = cartSlice.actions;
export default cartSlice.reducer;
 
 