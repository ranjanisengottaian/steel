import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './products.css';

const categoryOptions = [
  'All Categories',
  'Accessories & Fittings',
  'Fabrication Materials',
  'Structural Steel',
  'Steel Sheets & Plates',
  'Pipes & Tubes',
  'Stainless Steel',
  'TMT Bars'
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: ''
  });

  const { token } = useAuth();

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (filters.category && filters.category !== 'All Categories') {
        params.append('category', filters.category);
      }
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

      const res = await axios.get(`http://localhost:5000/api/products?${params.toString()}`);
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Failed to load products. Please try again later.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('⚠️ Please log in to add items to your cart.');
      return;
    }
    try {
      await axios.post(
        'http://localhost:5000/api/cart/add',
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('✅ Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('❌ Could not add to cart.');
    }
  };

  return (
    <div className="products-page">
      
      <div className="products-layout">
        <div className="sidebar-filters">
          <h3>🔎 Filter Options</h3>
          <form onSubmit={handleFilterSubmit}>
            <label>Category:</label>
            <select name="category" value={filters.category} onChange={handleInputChange}>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <label>Min Price:</label>
            <input
              type="number"
              name="minPrice"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={handleInputChange}
            />

            <label>Max Price:</label>
            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={handleInputChange}
            />

            <button type="submit">Apply Filters</button>
          </form>
        </div>

        <div className="products-content">
          {loading ? (
            <p className="products-subtitle">Loading products...</p>
          ) : error ? (
            <p className="products-subtitle error">{error}</p>
          ) : products.length > 0 ? (
            <div className="product-card-container">
              {products.map((product) => (
                <div className="product-card" key={product._id}>
                  <img
                    src={product.imageUrl || '/img/Steel-rod.jpg'}
                    alt={product.name}
                    onError={(e) => (e.target.src = '/img/Steel-rod.jpg')}
                  />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p className="product-price red-price">{`Rs.${product.price}/kg`}</p>
                  <button onClick={() => handleAddToCart(product._id)} className="add-to-cart-btn">
                    🛒 Add to Cart
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="products-subtitle">No products available with selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
