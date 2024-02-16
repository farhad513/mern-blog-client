import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/index.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeProvider from "./components/ThemeProvider.jsx";
import { PersistGate } from "redux-persist/integration/react";
import persist from "./store/index.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  // <PersistGate persistor={persist}>
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
  // </PersistGate>
);
