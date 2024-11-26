import requestMethod from "@/utils/requestMethod";
import {
  loginFail,
  loginStart,
  loginSuccess,
  registerFail,
  registerStart,
  registerSuccess,
} from "../reducers/authSlice/authSlice";

export const registerUser = async (dispatch, formData) => {
  dispatch(registerStart());
  try {
    const res = await requestMethod.post("/auth/register", formData);
    dispatch(registerSuccess(res.data)); // Pass response data to reducer
    return res.data; // Return response for further use
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An error occurred. Please try again.";
    dispatch(registerFail(errorMessage)); // Pass error message to reducer
    throw new Error(errorMessage); // Throw error for further handling
  }
};

export const loginUser = async (dispatch, formData) => {
  dispatch(loginStart());
  try {
    const res = await requestMethod.post("/auth/login", formData);
    dispatch(loginSuccess(res.data));
    return res.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An error occurred. Please try again.";
    dispatch(loginFail(errorMessage)); // Pass error message to reducer
  }
};
