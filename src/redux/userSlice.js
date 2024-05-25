import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVerified: false,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    verified: (state) => {
      state.isVerified = true;
    },
  },
});

export const { login, logout, verified } = authSlice.actions;

export default authSlice.reducer;
