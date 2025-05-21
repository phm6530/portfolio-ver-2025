import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// global.css
import "./global.css";
// 개인 라이브러리 CSS
import "./style/editor.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
