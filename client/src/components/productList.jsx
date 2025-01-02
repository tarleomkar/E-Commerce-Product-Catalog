import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/slices/productsSlice";
import ProductCard from "./productCard";
import Filter from "./FilterSort";
import "./ProductList.css";

const ProductList = () => {
  const dispatch = useDispatch();
  // filteredItems: The list of products from the Redux store, which may have been filtered based on some criteria (like price, category, etc.).
  // status: Represents the status of the product-fetching process (idle, loading, or failed).
  const { filteredItems, status } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Failed to fetch products.</p>;

  return (
    <div>
      <Filter /> {/* Include the Filter component */}
      <div className="product-list">
        {filteredItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
