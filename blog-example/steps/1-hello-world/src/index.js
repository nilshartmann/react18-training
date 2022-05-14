import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PostEditor from "./PostEditor";

const root = createRoot(document.getElementById("root"));
root.render(<PostEditor />);
