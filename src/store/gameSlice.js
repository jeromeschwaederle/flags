import { createSlice } from "@reduxjs/toolkit";
import { START, END } from "./ActionNames";

const gameInitial = {
  hasStarted: false,
  lives: 2,
  level: 0,
};

const gameSlice = createSlice({
  name: "game",
  initialState: gameInitial,
  reducers: {
    startOrEndGame(state, action) {
      if (action.payload === START) state.hasStarted = true;
      if (action.payload === END) state.hasStarted = false;
    },
  },
});

export const gameActions = gameSlice.actions;
export default gameSlice.reducer;
