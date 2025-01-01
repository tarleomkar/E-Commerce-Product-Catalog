import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters, filterProducts } from '../redux/slices/productsSlice';
import './Filter.css'
const Filter = () => {
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const dispatch = useDispatch();

  const handleApplyFilters = () => {
    dispatch(setFilters({ category, priceRange }));
    dispatch(filterProducts());
  };

  return (
    <div className="filter-container">
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="shoes">Shoes</option>
        {/* Add other categories dynamically */}
      </select>

      <select onChange={(e) => setPriceRange(e.target.value)} value={priceRange}>
        <option value="">Sort by Price</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
      </select>

      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
};

export default Filter;
