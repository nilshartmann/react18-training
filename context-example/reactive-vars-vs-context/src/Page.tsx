import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Page() {
  return (
    <div className="App">
      <div className="Page">
        <div className="Main">
          <Outlet />
        </div>
      </div>
      <div>
        <ul>
          <li>
            <Link to="/context">Context</Link>
          </li>
          <li>
            <Link to="/vars">Reactive Vars</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
