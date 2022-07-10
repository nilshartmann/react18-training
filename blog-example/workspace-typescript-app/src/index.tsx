import React from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

const root = createRoot(document.getElementById("root")!);

// TODO Übung "TanStack Query"
// - Erzeuge einen QueryClient (Default-Optionen)
// - Füge den QueryClient mittels des QueryClientProviders ein
//   (App soll ein Children von QueryClientProvider sein)

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
