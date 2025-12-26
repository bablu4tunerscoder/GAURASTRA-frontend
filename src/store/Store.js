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
import couponReducer from "./slices/couponSlice"; // Add this line
import recommendedProductsReducer from "./slices/RecommendedProductsSlice";
import offerBannerReducer from './slices/offerBannerSlice';
import productByUniqueIdReducer from "./slices/ProductByUniqueIdSlice";
import { productsApi } from "./api/productsApi";
import { productSidebarApi } from "./api/productSidebarApi";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["products", "categories"], // ✅ productSlice को persist से ब्लैकलिस्ट किया ताकि filterProducts सही से अपडेट हो
};

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token", "isAuthenticated"], // ✅ Persist only essential auth data
};

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
  coupon: couponReducer, // Add this line
  recommendedProducts: recommendedProductsReducer,
  offerBanner: offerBannerReducer,
  productByUniqueId: productByUniqueIdReducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [productSidebarApi.reducerPath]: productSidebarApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false, // ✅ Disable to fix performance warning
      serializableCheck: false, // ✅ Redux Persist की वॉर्निंग हटाने के लिए
    }).concat(productsApi.middleware).concat(productSidebarApi.middleware),
});

export const persistor = persistStore(store);
