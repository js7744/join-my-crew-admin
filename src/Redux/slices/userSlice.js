import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as PATH from "../../API/path";
import APIRequest from "../../API";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  userStatistic: null,
};

export const getUserDetails = createAsyncThunk("/user/details", async () => {
  try {
    const { data } = await APIRequest(PATH.userDetails);
    return data;
  } catch (error) {}
});

export const updateProfile = createAsyncThunk(
  "/user/update-profile",
  async (user, { dispatch, rejectWithValue }) => {
    try {
      delete user.email;
      delete user.id;

      toast.loading("updating profile...");

      const { data } = await APIRequest(PATH.updateUser, user);

      toast.remove();
      toast.success("profile updated successfully");
      return data;
    } catch (error) {
      return rejectWithValue({ reason: error.message ?? error.response.data });
    }
  }
);

export const fetchStatistic = createAsyncThunk(
  "statistic",
  async (payload, {rejectWithValue }) => {
    try {
      const { data } = await APIRequest(PATH.fetchStatistic, {}, { ...payload });
      return data;
    } catch (error) {
      return rejectWithValue({ reason: error.message ?? error.response.data });
    }
  }
);

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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, { payload }) {
      Object.assign(state, payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUserDetails.fulfilled, (state, { payload }) => {
      Object.assign(state, payload);
      state.loading = false;
    });

    builder.addCase(getUserDetails.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateProfile.fulfilled, (state, { payload }) => {
      payload.role = payload.role.id ?? "";
      Object.assign(state, payload);
      state.loading = false;
    });

    builder.addCase(updateProfile.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(fetchStatistic.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchStatistic.fulfilled, (state, { payload }) => {
      state.userStatistic = payload.results;
      state.loading = false;
    });

    builder.addCase(fetchStatistic.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
