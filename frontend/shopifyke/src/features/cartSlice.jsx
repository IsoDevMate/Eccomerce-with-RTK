import { createSlice } from "@reduxjs/toolkit";
import { toast  } from 'react-toastify';


const initialState =[{
    cartItems:[],
    cartTotalQuantity:0,
    cartTotalAmount:0
}]

const CartSlice=createSlice({
    name: "cart",
  initialState,
  reducers: {
     addToCart(state, action) {
    

         //action to be taken when products are in the cart 
         //we have used itemindex to store the position of items in our cart
         const itemIndex=state.cartItems.findIndex(item=>item.id ===action.payload.id)
         if (itemIndex>=0){
          state.cartItems[itemIndex].cartQuantity += 1
          //add more than one product to cart 
          const notify = (message,position)=>{toast.info(message, {
            position: position,
            className: 'foobar'
          })
        }
         }else{
           //when we dont have products in the cart items 
            //state.cartItems.push(products)
        const tempProducts={...action.payload, cartQuantity:1}
        state.cartItems.push(tempProducts)//product comes from an action creator 
        //successfully added to cart popup
        const notifySuccess = (message,position)=>{toast.success(message, {
          position: position2,
          className: 'barfoo'
        })
         }
       
  },
}
})

export const {addToCart}=CartSlice.actions

export default CartSlice.reducer