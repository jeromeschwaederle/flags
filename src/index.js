import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import classes from "./index.module.css";
import store from "./store/store";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App className={classes.app} />
    </Provider>
  </React.StrictMode>
);
