import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import Loader from "./Components/Loader/Loader"


import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/store";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Suspense fallback={<Loader/>}>
      <Provider store={store}>
        <App />
      </Provider>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);