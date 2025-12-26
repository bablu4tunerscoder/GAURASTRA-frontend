// Redux/Slices/landingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/helper/axiosinstance";

export const fetchLandingData = createAsyncThunk(
  "landing/fetchLandingData",
  async () => {
    const res = await axios.get(`${BASE_URL}/api/landing`);
    return res.data;
  }
);

const landingSlice = createSlice({
  name: "landing",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLandingData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLandingData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLandingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default landingSlice.reducer;
