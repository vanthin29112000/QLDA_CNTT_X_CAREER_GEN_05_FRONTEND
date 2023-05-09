import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./reduxToolkit/store";
import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";
import viVN from "antd/lib/locale-provider/vi_VN";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <ConfigProvider locale={viVN}>
      <Provider store={store}>
         <App />
      </Provider>
   </ConfigProvider>
);

reportWebVitals();
