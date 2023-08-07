import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
///conigure a store to hold the products
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productslice";
import { FetchProducts } from "./features/productslice";
const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

store.dispatch(FetchProducts());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
