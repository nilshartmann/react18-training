import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache({})
});

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Router>
    <App />
  </Router>
);
