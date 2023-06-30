import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
///consigure a store to hold the products
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";
//import productReducer from "./features/productslice";

const store = ConfigureStore({
  reducer: {},
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
