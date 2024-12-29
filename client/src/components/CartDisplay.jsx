import React from "react";

const CartDisplay = ({ cart, increaseQuantity, decreaseQuantity, removeFromCart }) => {
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={`http://localhost:5000/images/${item.image}`} alt={item.title} />
                <div className="cart-item-info">
                  <h3>{item.title}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Category: {item.category}</p>
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                  <p>Total: ${item.price * item.quantity}</p>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="total">
            <h3>Total Price: ${calculateTotalPrice()}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDisplay;
