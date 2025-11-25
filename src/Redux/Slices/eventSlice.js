// src/Redux/Slices/eventSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/Helper/axiosinstance";

// Async thunk to handle the API call using Axios
export const sendEvent = createAsyncThunk(
  "event/sendEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/facebook/events`,
        eventData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const initialState = {
  eventName: "",
  eventTime: Math.floor(Date.now() / 1000),
  eventSourceUrl: "",
  currency: "INR",
  actionSource: "website",
  userData: {
    email: "",
    phone: "",
    gender: "",
    firstName: "",
    town: "",
    county: "",
    postcode: "",
    country: "INDIA",
    externalId: "",
    userAgent: "",
    clientIp: "",
  },
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEventDetails: (state, action) => {
      const { eventName, eventSourceUrl, currency, userData } = action.payload;

      state.eventName = eventName || state.eventName;
      state.eventSourceUrl = eventSourceUrl || state.eventSourceUrl;
      state.currency = currency || state.currency;
      state.userData = { ...state.userData, ...userData };
      state.eventTime = Math.floor(Date.now() / 1000);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Log the response when the event is successfully sent
        // console.log("Event sent to Facebook:", action.payload);
      })
      .addCase(sendEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        console.error("Error sending event:", action.payload);
      });
  },
});

export const { setEventDetails } = eventSlice.actions;

export default eventSlice.reducer;
