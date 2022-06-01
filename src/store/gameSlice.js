import { createSlice } from "@reduxjs/toolkit";
import { START, END, TRUE, FALSE } from "./ActionNames";

const gameInitial = {
  isLoading: false,
  hasStarted: false,
  lives: 2,
  level: 0,
  data: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState: gameInitial,
  reducers: {
    setIsLoading(state, action) {
      if (action.payload === TRUE) state.isLoading = true;
      if (action.payload === FALSE) state.isLoading = false;
    },
    startOrEndGame(state, action) {
      if (action.payload === START) state.hasStarted = true;
      if (action.payload === END) state.hasStarted = false;
    },
    loadInitialData(state, action) {
      const data = action.payload;
      data.forEach(country => {
        state.data.push({
          name: country.name.common,
        });
      });
    },
  },
});

export const gameActions = gameSlice.actions;
export default gameSlice.reducer;
