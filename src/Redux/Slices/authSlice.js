"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../Helper/axiosinstance";

// ✅ Check if code runs in browser
const isBrowser = typeof window !== "undefined";

// ✅ Define initial state safely
const initialState = {
  user: isBrowser ? JSON.parse(localStorage.getItem("user")) : null,
  token: isBrowser ? localStorage.getItem("token") : null,
  isAuthenticated: isBrowser ? !!localStorage.getItem("token") : false,
  status: "idle",
  error: null,
};

// ✅ Register user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/allRegister`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// ✅ Login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/allLogins`,
        credentials
      );
      const user = response.data.data;

      if (isBrowser) {
        localStorage.setItem("token", user.token);
        localStorage.setItem("user", JSON.stringify(user));
      }

      return {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        token: user.token,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// ✅ Logout user
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  if (isBrowser) localStorage.clear();
  return null;
});

// ✅ Unified Google Authentication (Login + Signup)
export const googleAuthUser = createAsyncThunk(
  "auth/googleAuthUser",
  async (token, { rejectWithValue }) => {
    try {
      // Attempt Google login
      const loginResponse = await axios.post(
        `${BASE_URL}/api/auth/google-login`,
        { token }
      );

      const { user, token: authToken } = loginResponse.data.data;
      if (isBrowser) {
        localStorage.setItem("token", authToken);
        localStorage.setItem("user", JSON.stringify(user));
      }

      return { ...user, token: authToken };
    } catch (loginError) {
      // If login fails, try Google signup
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
          if (isBrowser) {
            localStorage.setItem("token", authToken);
            localStorage.setItem("user", JSON.stringify(user));
          }

          return { ...user, token: authToken };
        } catch (signupError) {
          return rejectWithValue(
            signupError.response?.data?.message || "Google Signup failed"
          );
        }
      }

      return rejectWithValue(
        loginError.response?.data?.message || "Google Authentication failed"
      );
    }
  }
);

// ✅ Auth Slice
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

      if (isBrowser) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
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
        state.user = action.payload.user;
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

      // Unified Google Auth
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
