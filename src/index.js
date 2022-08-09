import React from "react";
import ReactDOM from "react-dom/client";
import "mapbox-gl/dist/mapbox-gl.css";
import "simplebar/dist/simplebar.min.css";
import "antd/dist/antd.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
