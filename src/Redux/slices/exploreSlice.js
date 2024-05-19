import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import APIRequest from "../../API";
import * as APIPATHS from "../../API/path";
import toast from "react-hot-toast";

const initialState = {
  results: [],
  page: 0,
  limit: 10,
  totalPages: 0,
  totalResults: 0,
  loading: false,
};

export const fetchUsersList = createAsyncThunk(
  "creatorlist",
  async (requestPayload, { rejectWithValue }) => {
    try {
      toast.loading("Fetching creators...");
      const response = await APIRequest(APIPATHS.exploreList, {}, { ...requestPayload });
      toast.remove();
      if (response.error) throw new Error(response.error.message);
      return response.data;
    } catch (error) {
      return rejectWithValue({ reason: error.message ?? error.response.data });
    }
  }
);

const exploreSlice = createSlice({
  name: "explore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsersList.fulfilled, (state, action) => {
        // state.results.unshift(action.payload);
        Object.assign(state, action.payload);
        state.loading = false;
      })
      .addCase(fetchUsersList.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.reason);
      });
  },
});

export default exploreSlice.reducer;
