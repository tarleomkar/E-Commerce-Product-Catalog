import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);  // State to hold the products in the cart

  useEffect(() => {
    // Fetching the products from the static JSON file
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  const addToCart = (product) => {
    // Add product to the cart
    setCart([...cart, product]);
  };

  return (
    <div className="product-list">
      <h2>Product Catalog</h2>
      <div className="cart-info">
        <h3>Cart: {cart.length} items</h3>
      </div>

      <div className="products">
        {products.map((product) => {
          return (
            <ProductCard 
              key={product.id} 
              product={product} 
              addToCart={addToCart} // Passing addToCart function to ProductCard
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
