import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/Helper/axiosinstance";

// 🔹 Async Thunk for Fetching a User by ID
export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/auth/users/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch user");
    }
  }
);

// 🔹 Async Thunk for Updating User Profile
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/auth/update/${userId}`,
        updatedData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data; // Updated user data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update profile"
      );
    }
  }
);

const initialState = {
  user: {},
  token: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔹 Handle fetching user
      .addCase(fetchUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Something went wrong!";
      })

      // 🔹 Handle updating user
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // .addCase(updateUser.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.user = action.payload;
      // })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          ...state.user,
          ...action.payload,
        };
      })

      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to update profile";
      });
  },
});

export default userSlice.reducer;
