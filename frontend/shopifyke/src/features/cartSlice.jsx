import { createSlice } from "@reduxjs/toolkit";

const InitialState =[{
    cartItems:[],
    cartTotalQuantity:0,
    cartTotalAmount:0
}]

const CartSlice=createSlice({
    name: "cart",
  InitialState,
  reducers: {
     addToCart(state, action) {
        //state.cartItems.push(products)
        state.cartItems.push(action.payload)//product comes from an action creator 
  },
}
})

export const {addToCart}=CartSlice.actions

export default CartSlice.reducer