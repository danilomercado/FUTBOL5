import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const themeValue = localStorage.getItem("theme");

export const ThemeContextPovider = ({ children }) => {
  const [theme, setTheme] = useState(themeValue);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", themeValue);
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");

      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");

      setTheme("light");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
