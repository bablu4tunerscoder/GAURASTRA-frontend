"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "@/helpers/axiosinstance";


const isBrowser = typeof window !== "undefined";

// Initial State from Cookies
const initialState = {
  user: isBrowser && Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
  token: isBrowser ? Cookies.get("token") : null,
  isAuthenticated: isBrowser ? !!Cookies.get("token") : false,
  status: "idle",
  error: null,
};


// Google Auth
export const googleAuthUser = createAsyncThunk(
  "auth/googleAuthUser",
  async (token, { rejectWithValue }) => {
    try {
      const loginResponse = await axios.post(`${BASE_URL}/api/auth/google-login`, { token });

      const { user, token: authToken } = loginResponse.data.data;

      Cookies.set("token", authToken, { expires: 7 });
      Cookies.set("user", JSON.stringify(user), { expires: 7 });

      return { ...user, token: authToken };
    } catch (loginError) {
      if (
        loginError.response?.data?.message?.includes("not found") ||
        loginError.response?.data?.message?.includes("not registered")
      ) {
        try {
          const signupResponse = await axios.post(
            `${BASE_URL}/api/auth/google-signin`,
            { token }
          );

          const { user, token: authToken } = signupResponse.data.data;

          Cookies.set("token", authToken, { expires: 7 });
          Cookies.set("user", JSON.stringify(user), { expires: 7 });

          return { ...user, token: authToken };
        } catch (signupError) {
          return rejectWithValue(signupError.response?.data?.message || "Google Signup failed");
        }
      }

      return rejectWithValue(
        loginError.response?.data?.message || "Google Authentication failed"
      );
    }
  }
);

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;

      Cookies.remove("token");
      Cookies.remove("user");
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    loginUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // Google Auth
      .addCase(googleAuthUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(googleAuthUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(googleAuthUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

  },
});

export const { resetAuthState, clearAuthError, loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
