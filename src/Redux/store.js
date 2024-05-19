import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import exploreReducer from './slices/exploreSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    explore: exploreReducer,
    // users: usersReducer,
  },
});
