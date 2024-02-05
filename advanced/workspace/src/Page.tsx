import React from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";

export default function Page() {
  return (
    <div className="App">
      <AppHeader />
      <div className="Page">
        <div className="Main">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
