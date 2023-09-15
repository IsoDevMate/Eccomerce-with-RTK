import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
///conigure a store to hold the products
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
/* import productReducer,{ FetchProducts } from "./features/productslice"; */

import { productApi } from "./features/productAPIS.jsx";
import cartReducer, { getTotals } from './features/cartSlice.jsx'
/* import { setupListeners } from "@reduxjs/toolkit/dist/query/index.js" // Corrected import path */
const store = configureStore({
  reducer: {
   /*  products: productReducer, */
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  //Adding Api middleware enables  functionalities eg catching ,invalidating and polling etc
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware)
});

/* store.dispatch(FetchProducts());  */

store.dispatch(getTotals()); 

/* setupListeners(store.dispatch);  */

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
