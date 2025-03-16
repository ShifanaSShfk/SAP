import React from "react";
import ReactDOM from "react-dom/client";
import "./components/Login.css"; // Import Login styles
import Login from "./components/Login"; // Import Login component

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
);
