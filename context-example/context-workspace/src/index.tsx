import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import CounterApp from "./CounterApp";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(<CounterApp />);
