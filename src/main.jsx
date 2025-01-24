import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeContextPovider } from "./services/theme/theme.contex.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeContextPovider>
      <App />
    </ThemeContextPovider>
  </React.StrictMode>
);
