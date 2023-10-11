import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import ThemeProvider from "./theme-context";

const root = createRoot(document.getElementById("root")!);
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
// root.render(<App />);
