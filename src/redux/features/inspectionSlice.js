import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  selectedDate: null,
  orderFood: false,
  inspectionRequested: false,
  showCongrats: false,
  agentAvailability: [],
};

const inspectionSlice = createSlice({
  name: "inspection",
  initialState,
  reducers: {
    openInspectionModal: (state, action) => {
      state.isModalOpen = true;
      state.agentAvailability = action.payload || [];
      console.log("Opening modal with availability:", action.payload); // Debug log
    },
    closeInspectionModal: (state) => {
      state.isModalOpen = false;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    toggleOrderFood: (state) => {
      state.orderFood = !state.orderFood;
    },
    setInspectionRequested: (state, action) => {
      state.inspectionRequested = action.payload;
    },
    setShowCongrats: (state, action) => {
      state.showCongrats = action.payload;
    },
    resetInspectionState: (state) => {
      return initialState;
    },
  },
});

export const {
  openInspectionModal,
  closeInspectionModal,
  setSelectedDate,
  toggleOrderFood,
  setInspectionRequested,
  setShowCongrats,
  resetInspectionState,
} = inspectionSlice.actions;

export default inspectionSlice.reducer;
