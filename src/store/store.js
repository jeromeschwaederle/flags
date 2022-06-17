import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";
import uiReducer from "./uiSlice";

const store = configureStore({
  reducer: {
    game: gameReducer,
    ui: uiReducer,
  },
});

export default store;
