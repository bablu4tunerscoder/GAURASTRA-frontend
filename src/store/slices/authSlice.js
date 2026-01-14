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

// Register User
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/allRegister`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, credentials);

      const { user, token } = response.data.data;

      // 👉 Store in Cookies
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("user", JSON.stringify(user), { expires: 7 });

      return { ...user, token };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  Cookies.remove("token");
  Cookies.remove("user");
  return null;
});

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
  },

  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

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

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.status = "idle";
      });
  },
});

export const { resetAuthState, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
