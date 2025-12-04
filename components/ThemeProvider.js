"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  // Initialize and apply theme immediately on client-side
  useEffect(() => {
    // Get initial theme
    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme || "light";

    // Set state
    setTheme(initialTheme);

    // Apply to DOM immediately
    const root = document.documentElement;
    if (initialTheme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
  }, []);

  // Apply theme changes to document
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
