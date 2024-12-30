import React from "react";
const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <img src={`http://localhost:5000/images/${product.image}`} alt={product.title} />
      <h3>{product.title}</h3>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <button onClick={() => addToCart(product)}>Add to cart</button>
    </div>
  );
};

export default ProductCard;
