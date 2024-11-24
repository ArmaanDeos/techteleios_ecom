import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authSlice/authSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
