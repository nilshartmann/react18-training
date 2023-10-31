import React from "react";
import { Link } from "react-router-dom";
import CurrentUser from "../user/registration/CurrentUser";

export default function AppHeader() {
  return (
    <header className="Flex">
      <Link to="/">
        <h1>React Training Blog</h1>
      </Link>
      <CurrentUser />
    </header>
  );
}
