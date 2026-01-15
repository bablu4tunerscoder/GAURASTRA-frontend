import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: localStorage.getItem("cart_items") ? JSON.parse(localStorage.getItem("cart_items")) : [],
  buyNowItem: null,
  popupOpen: false,
};

const saveCartToLocalStorage = (state) => {
  localStorage.setItem("cart_items", JSON.stringify(state.items));
  localStorage.setItem("buy_now_item", JSON.stringify(state.buyNowItem));
  localStorage.setItem("cart_popup_open", JSON.stringify(state.popupOpen));
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartLocal: (state, action) => {
      const { variant, ...product } = action.payload;

      const existingProduct = state.items.find(
        (item) => item._id === product._id
      );


      if (existingProduct) {

        const existingVariant = existingProduct.variants.find(
          (v) => v.sku === variant.sku
        );

        if (existingVariant) {
          existingVariant.quantity += variant.quantity || 1;
        } else {
          existingProduct.variants.push({
            ...variant,
            quantity: variant.quantity || 1,
          });
        }
      } else {
        state.items.push({
          ...product,
          variants: [
            variant,
          ],
        });
      }

      saveCartToLocalStorage(state);
    },


    increaseQuantityLocal: (state, action) => {
      const { productId, sku } = action.payload;
      console.log(productId, sku)

      const product = state.items.find((i) => i._id === productId);
      const variant = product?.variants.find((v) => v.sku === sku);

      if (variant) variant.quantity += 1;

      saveCartToLocalStorage(state);
    },


    decreaseQuantityLocal: (state, action) => {
      const { productId, sku } = action.payload;



      const product = state.items.find((i) => i._id === productId);
      if (!product) return;

      const variant = product.variants.find((v) => v.sku === sku);

      if (variant && variant.quantity > 1) {
        variant.quantity -= 1;
      }

      saveCartToLocalStorage(state);
    },


    removeFromCartLocal: (state, action) => {
      const { productId, sku } = action.payload;

      const product = state.items.find((i) => i._id === productId);
      if (!product) return;

      product.variants = product.variants.filter((v) => v.sku !== sku);

      if (product.variants.length === 0) {
        state.items = state.items.filter((i) => i._id !== productId);
      }

      saveCartToLocalStorage(state);
    },

    clearCartLocal: (state) => {
      state.items = [];
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
