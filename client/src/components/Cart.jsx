import React from 'react';
import './Cart.css';  // Importing Cart styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Import shopping cart icon
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice'; // Actions defined in cartSlice.js to modify the cart state.

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  console.log(cartItems);

  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const increaseQuantity = (id, quantity) => {
    handleQuantityChange(id, quantity + 1);
  };

  const decreaseQuantity = (id, quantity) => {
    if (quantity > 1) {
      handleQuantityChange(id, quantity - 1);
    }
  };

  return (
    <div className='cart-container'>
      <h1>My Cart <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" /></h1>
      <div className="cart-items">
        {cartItems.length === 0 && <p>Your cart is empty</p>}
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} />  
            <div>
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <div className="quantity-controls">
              <button onClick={() => increaseQuantity(item._id, item.quantity)}>+</button>
                <span>{item.quantity}</span>
              <button onClick={() => decreaseQuantity(item._id, item.quantity)}>-</button>
              <p>Total Price: ${item.price * item.quantity}</p>
              </div>
              <button onClick={() => handleRemove(item._id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      {/* <h3>Total: ${totalAmount}</h3> */}
      {/* Displays the total amount (totalAmount) only if there are items in the cart. */}
      {cartItems.length > 0 && <h3 className="cart-total">Total: ${totalAmount}</h3>}
    </div>
  );
};

export default Cart;
