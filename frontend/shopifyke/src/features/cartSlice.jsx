/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";
import { toast  } from 'react-toastify';


const initialState =[{
  //check if items are in the the local storage
    cartItems:localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')): [],
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
         toast.info(`increased ${state.cartItems[itemIndex].name}  cart Quantity`, {
            position:  toast.POSITION.TOP_RIGHT ,
            className: 'foobar'
      
        
            })
            
          }else{
            //when we dont have products in the cart items 
            //state.cartItems.push(products)
            const tempProducts={...action.payload, cartQuantity:1}
            state.cartItems.push(tempProducts)//product comes from an action creator 
            //successfully added to cart popup
          }
          toast.success(`added ${action.payload.name} to cart `, {
            position:  toast.POSITION.BOTTOM_RIGHT,
            className: 'barfoo'
          })
          //add cart items to local storage key is {cartItems}
          localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        },
        removeFromCart(state,action){
          const NextcartItems=state.cartItems.filter(cartItem=>cartItem.id !== action.payload)
          
          //update the state of the cartItems
          state.cartItem =NextcartItems
        
        //update the localStorage
        localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        toast.error(` ${action.payload.name} removed from cart`, {
           position:  toast.POSITION.TOP_RIGHT,
           className: 'foobar'
      })
          
        },
        decreaseCart(state,action){
          //get the Index of our cartItems by comparing the Id
          //payload.id is the product.id  for the item whose quantity is to be decreased
          const itemIndex=state.cartItems.findIndex(cartItem=>cartItem.id === action.payload.id)
          //accessing the cartQuantity
          if(state.cartItems[itemIndex].cartQuantity > 1){
            state.cartItems[itemIndex].cartQuantity -= 1
            toast.info(`increased ${state.cartItems[itemIndex].name}  cart Quantity`, {
              position:  toast.POSITION.TOP_RIGHT ,
              className: 'foobar'
          })
          }else if(state.cartItems[itemIndex].cartQuantity === 1){
          const NextcartItems=state.cartItems.filter(cartItem=>cartItem.id !== action.payload)
          
          //update the state of the cartItems
          state.cartItem =NextcartItems
        
        //update the localStorage
        toast.error(` ${action.payload.name} removed from cart`, {
          position:  toast.POSITION.TOP_RIGHT,
          className: 'foobar'
        })
        localStorage.setItem('cartItems',JSON.stringify(state.cartItems))

      }
    },
    clearCart(state){
      state.cartItems=[]
      toast.success(`cart cleared`, {
        position:  toast.POSITION.BOTTOM_RIGHT,
        className: 'barfoo'
      })
      localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
      },
      getTotals(state){
       let { total,quantity }=state.cartItems.reduce((cartTotal,cartItem)=>{
        //note cartTotal holds initial values of the initiated object { total:0,quantity:0 } 
        //cartItem is the item returned on each iteration
        //destructure the price and cartQuantity from cartItem
        const { price,cartQuantity } = cartItem
        const ItemTotal = price * cartQuantity

        cartTotal.total += ItemTotal
        cartTotal.quantity +=cartQuantity

        return cartTotal
       },
       //Initial Value which is an Object
       {
        total:0,
        quantity:0
       }
       )

       //update our state of cartQuantiti and 

       state.cartTotalQuantity=quantity
       state.cartTotalAmount= total
      }

}
})
export const {addToCart,removeFromCart,decreaseCart,clearCart,getTotals}=CartSlice.actions

export default CartSlice.reducer