import { createSlice } from "@reduxjs/toolkit";

import { TRUE, FALSE } from "./action-name-constants";

const uiInitial = {
  isLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: uiInitial,
  reducers: {
    setIsLoading(state, action) {
      if (action.payload === TRUE) state.isLoading = true;
      if (action.payload === FALSE) state.isLoading = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
