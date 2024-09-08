import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { default as App } from "@/app";
import "@/styles/index.css";
import store from "./store";

const Root = () => {
  let basename = "/";

  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter basename={basename}>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
