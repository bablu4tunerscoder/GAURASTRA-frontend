import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/helpers/axiosinstance";

const initialState = {
  blogData: [],
  loading: false,
  error: null,
};

export const getAllBlogs = createAsyncThunk(
  "/blog/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/blogs/findAllBlogs`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All Blogs
      .addCase(getAllBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogData = action.payload || [];
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch blogs";
      })
  },
});

export default blogSlice.reducer;

