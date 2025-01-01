import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      // Find if the product is already in the cart
      const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
      console.log(existingIndex)
        // If the product doesn't exist, add it to the cart with quantity 1
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      

      // Recalculate the total amount
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },

    removeFromCart(state, action) {
      // Ensure the id is passed correctly for the specific product
      const productId = action.payload.id;
      console.log(action.payload)

      // Remove the product with the matching id from the cart
      state.items = state.items.filter(item => item._id !== productId);

      // Recalculate the total amount
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingIndex = state.items.findIndex(item => item._id === id);

      if (existingIndex !== -1 && quantity > 0) {
        // Update the quantity of the specific item
        state.items[existingIndex].quantity = quantity;

        // Recalculate the total amount
        state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
