import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/slices/productsSlice';
import ProductCard from './ProductCard';
import Filter from './FilterSort'  // Import Filter Component
import './ProductList.css'; // Import the CSS for grid layout

const ProductList = () => {
  const dispatch = useDispatch();
  const { filteredItems, status } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Failed to fetch products.</p>;

  return (
    <div>
      <Filter />  {/* Include the Filter component */}
      <div className="product-list">
        {filteredItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
