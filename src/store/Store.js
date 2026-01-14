import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
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
import { cartApi } from "./api/cartApi";

/* ============================
   Persist Configs
============================ */
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["products", "categories"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token", "isAuthenticated"],
};

/* ============================
   Root Reducer
============================ */
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
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

  // RTK Query APIs ✅
  [productsApi.reducerPath]: productsApi.reducer,
  [sidebarApi.reducerPath]: sidebarApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* ============================
   Store
============================ */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(productsApi.middleware)
      .concat(cartApi.middleware)
      .concat(sidebarApi.middleware),
});

export const persistor = persistStore(store);
