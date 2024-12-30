import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import CartDisplay from "../components/CartDisplay";

const Home = () => {
  const [products, setProducts] = useState([]); // Products list
  const [cart, setCart] = useState([]); // Cart state
  const [category, setCategory] = useState(""); // Filter by category
  const [sortOrder, setSortOrder] = useState(""); // Sort by price
  const [showCart, setShowCart] = useState(false); // Toggle cart view

  // Fetch products based on category and sort order
  const fetchProducts = async () => {
    try {
      const queryParams = [];
      if (category) queryParams.push(`category=${category.toLowerCase()}`); // Normalize category
      if (sortOrder) queryParams.push(`sort=${sortOrder}`);
      const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

      console.log("Fetching products with query:", queryString); // Debugging query string

      const response = await fetch(`http://localhost:5000/api/products/filter${queryString}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch all products on component mount or when filters change
  useEffect(() => {
    fetchProducts();
  }, [category, sortOrder]);

  // console.log(products);
  

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Increase product quantity in the cart
  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease product quantity in the cart
  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <div className="container">
      <div className="product-list">
        <div className="header">
          {/* <h2>Product Catalog</h2> */}
          <div className="filters">
            {/* Category Filter Dropdown */}
            <label>
              Filter by Category:
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All</option>
                <option value="shoes">Shoes</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothes</option>
              </select>
            </label>

            {/* Sort Filter Dropdown */}
            <label>
              Sort by Price:
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Default</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </label>
          </div>

          <div className="cart-info">
            <button
              onClick={() => setShowCart(!showCart)}
              className="cart-button"
            >
              <i className="fas fa-shopping-cart"></i>
              View Cart ({cart.length})
            </button>
          </div>
        </div>

        <div className="products">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart} // Passing addToCart function to ProductCard
              />
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>

      {/* Show Cart */}
      {showCart && (
        <CartDisplay
          cart={cart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeFromCart={removeFromCart}
        />
      )}
    </div>
  );
};

export default Home;
