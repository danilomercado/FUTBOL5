import React, { useContext } from "react";

import { ThemeContext } from "../../services/theme/theme.contex";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
    >
      Cambiar a tema: {theme === "light" ? "oscuro" : "claro"}
    </button>
  );
};

export default ToggleTheme;
