import React from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

const root = createRoot(document.getElementById("root")!);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

const state = {
  "Device_Transformer.getVoltageInputs()": {
    value: [
      {
        id: "Overall"
      },
      {
        id: "L6"
      }
    ]
  },
  values: {
    "Device_Transformer.VOLTAGE_ACTIVEL6": {
      value: "VOLTAGE ACTIVE L6"
    },
    "Device_Transformer.AAAAA_L6": {
      value: "VOLTAGE ACTIVE L6"
    },
    "Device_Transformer.VOLTAGE_ACTIVEOverall": {
      value: "VOLTAGE ACTIVE Overall"
    }
  }
} as const;

const idSelector = createSelector(
  [state => state["Device_Transformer.getVoltageInputs()"].value],
  listOfIds => listOfIds.map(x => x.id)
);

const valueSelector = createSelector(
  [idSelector, state => state["Device_Transformer.getVoltageInputs()"]],
  ids => ids.map(id => state)
);

function Component() {}
