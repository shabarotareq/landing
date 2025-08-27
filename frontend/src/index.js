import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/style.css"; // إذا كان لديك CSS خارجي

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
