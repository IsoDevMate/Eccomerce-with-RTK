/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
  // Check if items are in the local storage
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      // Action to be taken when products are in the cart
      // We have used itemIndex to store the position of items in our cart
      const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        // Add more than one product to cart
        toast.info(`increased ${state.cartItems[itemIndex].name} cart Quantity`, {
          position: toast.POSITION.TOP_RIGHT,
          className: 'foobar'
        });
      } else {
        // When we don't have products in the cart items
        // state.cartItems.push(products)
        const tempProducts = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProducts); // Product comes from an action creator
        // Successfully added to cart popup
      }
      toast.success(`added ${action.payload.name} to cart `, {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: 'barfoo'
      });
      // Add cart items to local storage key is {cartItems}
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(cartItem => cartItem.id !== action.payload);

      // Update the state of the cartItems
      state.cartItems = nextCartItems;

      // Update the localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

      toast.error(` ${action.payload.name} removed from cart`, {
        position: toast.POSITION.TOP_RIGHT,
        className: 'foobar'
      });
    },
    decreaseCart(state, action) {
      // Get the index of our cartItems by comparing the Id
      // Payload.id is the product.id for the item whose quantity is to be decreased
      const itemIndex = state.cartItems.findIndex(cartItem => cartItem.id === action.payload.id);

      // Accessing the cartQuantity
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info(`increased ${state.cartItems[itemIndex].name} cart Quantity`, {
          position: toast.POSITION.TOP_RIGHT,
          className: 'foobar'
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(cartItem => cartItem.id !== action.payload);

        // Update the state of the cartItems
        state.cartItems = nextCartItems;

        // Update the localStorage
        toast.error(` ${action.payload.name} removed from cart`, {
          position: toast.POSITION.TOP_RIGHT,
          className: 'foobar'
        });
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },
    clearCart(state) {
      state.cartItems = [];
      toast.success(`cart cleared`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: 'barfoo'
      });
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    getTotals(state) {
      let { total, quantity } = state.cartItems.reduce((cartTotal, cartItem) => {
        // Note cartTotal holds initial values of the initiated object { total: 0, quantity: 0 }
        // cartItem is the item returned on each iteration
        // Destructure the price and cartQuantity from cartItem
        const { price, cartQuantity } = cartItem;
        const itemTotal = price * cartQuantity;

        cartTotal.total += itemTotal;
        cartTotal.quantity += cartQuantity;

        return cartTotal;
      }, // Initial Value which is an Object
      {
        total: 0,
        quantity: 0
      });

      // Update our state of cartQuantity and cartTotalAmount
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    }
  }
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } = CartSlice.actions;

export default CartSlice.reducer;
