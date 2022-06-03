import { createSlice } from "@reduxjs/toolkit";

import { START, END } from "./action-name-constants";

const gameplayInitial = {
  game: {
    hasStarted: false,
  },

  lives: {
    maxLives: 3,
    currentLiveNumber: 3,
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
      if (action.payload === START) state.hasStarted = true;
      if (action.payload === END) state.hasStarted = false;
    },
  },
});
