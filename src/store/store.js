import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";
import gameplayReducer from "./gameplaySlice";
import uiReducer from "./uiSlice";

const store = configureStore({
  reducer: {
    countries: countriesReducer,
    gameplay: gameplayReducer,
    ui: uiReducer,
  },
});

export default store;
