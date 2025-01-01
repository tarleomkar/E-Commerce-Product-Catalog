import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://e-commerce-product-catalog.onrender.com/api/products');
  return response.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    filteredItems: [],
    status: 'idle',
    error: null,
    filters: {
      category: '',
      priceRange: '', // We'll use this to filter by price range
    },
  },
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
    },
    filterProducts(state) {
      let filtered = [...state.items];
      
      // Filter by category
      if (state.filters.category) {
        filtered = filtered.filter((product) => product.category === state.filters.category);
      }

      // Filter by price range
      if (state.filters.priceRange === 'lowToHigh') {
        filtered = filtered.sort((a, b) => a.price - b.price);
      } else if (state.filters.priceRange === 'highToLow') {
        filtered = filtered.sort((a, b) => b.price - a.price);
      }

      state.filteredItems = filtered;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.filteredItems = action.payload; // Initially, no filters applied
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setFilters, filterProducts } = productsSlice.actions;
export default productsSlice.reducer;
