import { createSlice } from "@reduxjs/toolkit";
import { cartApi } from "./cartAPI";

const initialState = {
  // Check if items are in the local storage
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
   extraReducers: (builder) => {
     builder.addMatcher(cartApi.endpoints.addToCart.matchPending, (state) => {
      state.status = "pending"
     })
     builder.addMatcher(cartApi.endpoints.addToCart.matchFulfilled, (state, action) => {
      state.status = "success"
      state.cartItems.push(action.payload)
     })
     builder.addMatcher(cartApi.endpoints.addToCart.matchRejected, (state, action) => {
      state.status = "rejected"
      state.error = action.payload //action.error.message 
     })
     builder.addMatcher(cartApi.endpoints.removeFromCart.matchPending, (state) => {
      state.status = "pending"
     })
     builder.addMatcher(cartApi.endpoints.removeFromCart.matchFulfilled, (state, action) => {
      state.status = "success"
      const index = state.cartItems.findIndex(item => item.id === action.meta.arg.id);
      if (index !== -1) {
        state.cartItems.splice(index, 1);
      }
     })
     builder.addMatcher(cartApi.endpoints.removeFromCart.matchRejected, (state, action) => {
      state.status = "rejected"
      state.error = action.payload //action.error.message 
     })
     builder.addMatcher(cartApi.endpoints.getTotals.matchPending, (state) => {
      state.status = "pending"
     })
     builder.addMatcher(cartApi.endpoints.getTotals.matchFulfilled, (state, action) => {
      state.status = "success"
      state.cartTotalQuantity = action.payload.quantity;
      state.cartTotalAmount = action.payload.total;
     })
     builder.addMatcher(cartApi.endpoints.getTotals.matchRejected, (state, action) => {
      state.status = "rejected"
      state.error = action.payload //action.error.message 
     })
     builder.addMatcher(cartApi.endpoints.clearCart.matchPending, (state) => {
      state.status = "pending"
     })
     builder.addMatcher(cartApi.endpoints.clearCart.matchFulfilled, (state) => {
      state.status = "success"
      state.cartItems = [];
     })
     builder.addMatcher(cartApi.endpoints.clearCart.matchRejected, (state, action) => {
      state.status = "rejected"
      state.error = action.payload //action.error.message 
     })
   }
});

export default CartSlice.reducer;
