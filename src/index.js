import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Toaster />
      <SoftUIControllerProvider>
        <App />
      </SoftUIControllerProvider>
    </BrowserRouter>
  </Provider>
);
