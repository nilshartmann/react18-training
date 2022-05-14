import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PostEditor from "./PostEditor";

function App() {
  return (
    <div className="Border">
      <h1>Blog Application</h1>
      <PostEditor initialTitle="Hello" initialBody="world" />
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
