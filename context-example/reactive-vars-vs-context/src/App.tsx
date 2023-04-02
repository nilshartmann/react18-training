import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContextApp from "./ContextApp";

import NotFoundPage from "./NotFound";
import Page from "./Page";
import ReactiveVarsApp from "./ReactiveVarsApp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Page />}>
        <Route index element={<ExampleList />} />
        <Route path="/context" element={<ContextApp />} />
        <Route path="/vars" element={<ReactiveVarsApp />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

function ExampleList() {
  return (
    <ul>
      <li>
        <Link to="/context">Context</Link>
      </li>
      <li>
        <Link to="/vars">Reactive Vars</Link>
      </li>
    </ul>
  );
}

export default App;
