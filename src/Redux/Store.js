import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import cartReducer from "./Slices/cartSlice";
import filtersReducer from "./Slices/filterSlice";
import productReducer from "./Slices/productSlice";
import categoryReducer from "./Slices/categorySlice";
import authReducer from "./Slices/authSlice";
import userReducer from "./Slices/userSlice";
import landingReducer from "./Slices/landingSlice";
import BlogSliceReducer from "./Slices/blogSlice";
import orderReducer from "./Slices/orderSlice";
import paymentReducer from "./Slices/paymentSlice";
import eventReducer from "./Slices/eventSlice";
import couponReducer from "./Slices/couponSlice"; // Add this line
import recommendedProductsReducer from "./Slices/RecommendedProductsSlice";
import offerBannerReducer from './Slices/offerBannerSlice';
import productByUniqueIdReducer from "./Slices/ProductByUniqueIdSlice";
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
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false, // ✅ Disable to fix performance warning
      serializableCheck: false, // ✅ Redux Persist की वॉर्निंग हटाने के लिए
    }),
});

export const persistor = persistStore(store);
