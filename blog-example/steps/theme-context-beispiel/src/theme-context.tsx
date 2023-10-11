import React, { useState } from "react";

type ThemeContextValue = {
  themeName: string;
  setThemeName(newThemeName: "light" | "dark"): void;
};

export const ThemeContext = React.createContext<ThemeContextValue | null>(null);

type ThemeContextProviderProps = { children: React.ReactNode };

export default function ThemeProvider({ children }: ThemeContextProviderProps) {
  const [currentTheme, setCurrentTheme] = useState("light");

  const contextValue: ThemeContextValue = {
    themeName: currentTheme,
    setThemeName(n: "light" | "dark") {
      setCurrentTheme(n);
    }
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export function useThemeContext(): ThemeContextValue {
  const themeContext = React.useContext(ThemeContext);
  if (themeContext === null) {
    // Type Guard
    throw new Error("ThemeContext is used wrong. Missing Provider component!");
  }

  return themeContext;
}
