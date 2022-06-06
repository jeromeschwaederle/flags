import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";
// import gameplayReducer from "./gameplaySlice";
import uiReducer from "./uiSlice";

const store = configureStore({
  reducer: {
    game: gameReducer,
    // gameplay: gameplayReducer,
    ui: uiReducer,
  },
});

export default store;
