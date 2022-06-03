import { createSlice } from "@reduxjs/toolkit";

import { START, END } from "./action-name-constants";

const gameplayInitial = {
  game: {
    hasStarted: false,
  },

  lives: {
    maxLives: 3,
    currentLiveNumber: 2,
  },

  level: {
    currentLevel: 1,
    levelNumber: 10,
  },
};

const gameplaySlice = createSlice({
  name: "gameplay",
  initialState: gameplayInitial,
  reducers: {
    startOrEndGame(state, action) {
      console.log("GAMEPLAY SLICE");
      if (action.payload === START) state.game.hasStarted = true;
      if (action.payload === END) state.game.hasStarted = false;
    },
  },
});

export const gameplayActions = gameplaySlice.actions;
export default gameplaySlice.reducer;
