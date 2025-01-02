import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const productData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    if (productData) dispatch(addToCart(product)); // Dispatch the product to Redux cart
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} /> <h3>{product.title}</h3>
      <p>${product.price}</p>
      <p>Category: {product.category}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
