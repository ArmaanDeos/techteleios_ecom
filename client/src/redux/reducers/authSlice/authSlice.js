import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    isError: false,
    isAuthenticated: false,
    message: null, // Add message field for better error handling
  },
  reducers: {
    registerStart: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.message = null; // Clear previous messages
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isError = false;
      state.isAuthenticated = true; // Set authentication status
      state.message = null; // Clear error messages
    },
    registerFail: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload; // Set error message
    },
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.user = !action.payload.success ? null : action.payload.user;
      state.isAuthenticated = !action.payload.success ? false : true; // Set authentication status
      state.message = "Login successful";
    },
    loginFail: (state) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false; // Reset authentication status
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false; // Reset authentication status
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFail,
  logout,
  registerStart,
  registerSuccess,
  registerFail,
} = authSlice.actions;
export default authSlice.reducer;
