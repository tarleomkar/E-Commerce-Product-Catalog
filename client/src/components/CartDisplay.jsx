import React from "react";

const CartDisplay = ({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) => {
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
            {cart.map((item, index) => (
              <li key={item.id || index} className="cart-item">
                {" "}
                {/* Use item.id or fallback to index */}
                <img
                  src={`http://localhost:5000/images/${item.image}`}
                  alt={item.title}
                />
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
                  <button
                    className="quantity-controls-remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
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