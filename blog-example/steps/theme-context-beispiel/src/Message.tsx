import React from "react";
import { useThemeContext } from "./theme-context";

export default function Message({ msg, type = "error" }: { msg: string; type?: "error" | "info" }) {
  const themeContext = useThemeContext();

  const style = type === "error" ? { color: "red", fontWeight: "bold" } : { color: "green" };

  return (
    <p style={style}>
      (Current Theme: {themeContext.themeName}){msg}
    </p>
  );
}
