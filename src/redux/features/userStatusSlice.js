import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userStatus: null,
  kycStatus: null,
  isVerified: false,
};

const userStatusSlice = createSlice({
  name: "userStatus",
  initialState,
  reducers: {
    setUserStatus: (state, action) => {
      state.userStatus = action.payload;
      // Check if user is active
      state.isVerified = action.payload === "active";
    },
    setKycStatus: (state, action) => {
      state.kycStatus = action.payload;
      // Update verification status based on both user status and KYC
      state.isVerified =
        state.userStatus === "active" && action.payload === "verified";
    },
    resetStatus: (state) => {
      state.userStatus = null;
      state.kycStatus = null;
      state.isVerified = false;
    },
  },
});

// Export actions
export const { setUserStatus, setKycStatus, resetStatus } =
  userStatusSlice.actions;

// Selectors
export const selectUserStatus = (state) => state.userStatus.userStatus;
export const selectKycStatus = (state) => state.userStatus.kycStatus;
export const selectIsVerified = (state) => state.userStatus.isVerified;

export default userStatusSlice.reducer;
