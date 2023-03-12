import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./ContextApp";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Router>
    <App />
  </Router>
);
