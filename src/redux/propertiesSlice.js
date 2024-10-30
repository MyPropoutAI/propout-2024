import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  properties: null,
};

const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    setProperties: (state, actions) => {
      state.properties = actions.payload;
    },
    getProperties: (state) => {
      return state.properties;
    },
  },
});

export const { setProperties } = propertiesSlice.actions;

export default propertiesSlice.reducer;
