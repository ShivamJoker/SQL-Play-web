import React from "react";
import { createRoot } from "react-dom/client";
import "@styles/index.scss";
import App from "@components/App";
import { AppProvider } from "@contexts/AppContext";
import { registerSW } from "virtual:pwa-register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./utils/db";

const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});

const container = document.getElementById("root");

if (!container) {
  throw Error("container for react not found");
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
      <ToastContainer />
    </AppProvider>
  </React.StrictMode>
);
