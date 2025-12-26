import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/helper/axiosinstance";

export const fetchOfferBanners = createAsyncThunk(
  "offerBanner/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/banner/all`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const offerBannerSlice = createSlice({
  name: "offerBanner",
  initialState: {
    bannerList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOfferBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.bannerList = action.payload;
      })
      .addCase(fetchOfferBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default offerBannerSlice.reducer;
