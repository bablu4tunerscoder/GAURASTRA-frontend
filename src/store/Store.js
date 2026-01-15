import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import cartReducer from "./slices/cartSlice";
import filtersReducer from "./slices/filterSlice";
import productReducer from "./slices/productSlice";
import categoryReducer from "./slices/categorySlice";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import landingReducer from "./slices/landingSlice";
import BlogSliceReducer from "./slices/blogSlice";
import orderReducer from "./slices/orderSlice";
import paymentReducer from "./slices/paymentSlice";
import eventReducer from "./slices/eventSlice";
import couponReducer from "./slices/couponSlice";
import recommendedProductsReducer from "./slices/RecommendedProductsSlice";
import offerBannerReducer from "./slices/offerBannerSlice";
import productByUniqueIdReducer from "./slices/ProductByUniqueIdSlice";

import { productsApi } from "./api/productsApi";
import sidebarReducer, { sidebarApi } from "./slices/sidebarSlice";
import wishlistReducer from "./slices/wishlistSlice";

import { cartApi } from "./api/cartApi";
import { wishlistApi } from "./api/wishlistApi";

const rootReducer = combineReducers({
  auth: authReducer,
  blog: BlogSliceReducer,
  cart: cartReducer,
  filters: filtersReducer,
  products: productReducer,
  categories: categoryReducer,
  user: userReducer,
  landing: landingReducer,
  order: orderReducer,
  payment: paymentReducer,
  event: eventReducer,
  coupon: couponReducer,
  recommendedProducts: recommendedProductsReducer,
  offerBanner: offerBannerReducer,
  productByUniqueId: productByUniqueIdReducer,
  sidebar: sidebarReducer,
  wishlist: wishlistReducer,

  [productsApi.reducerPath]: productsApi.reducer,
  [sidebarApi.reducerPath]: sidebarApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [wishlistApi.reducerPath]: wishlistApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(productsApi.middleware)
      .concat(cartApi.middleware)
      .concat(wishlistApi.middleware)
      .concat(sidebarApi.middleware),
});
