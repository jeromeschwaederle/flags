import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import classes from "./index.module.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App className={classes.app} />
  </React.StrictMode>
);
