"use client";

import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const isBrowser = typeof window !== "undefined";

const initialState = {
  user: isBrowser && Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : null,
  token: isBrowser ? Cookies.get("token") : null,
  isAuthenticated: isBrowser ? !!Cookies.get("token") : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      // side-effects allowed if you want simplicity
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("user", JSON.stringify(user), { expires: 7 });
    },

    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      Cookies.remove("token");
      Cookies.remove("user");

      // reload after logout
      setTimeout(() => {
        window.location.reload();
      }, 0);
    },

  },
});

export const { loginSuccess, logoutUser } = authSlice.actions;
export default authSlice.reducer;
