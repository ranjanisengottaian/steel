import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Ensure you have AuthContext to manage token
import './products.css';

const categoryOptions = [
  'All Categories',
  'Accessories & Fittings',
  'Fabrication Materials'
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

  const { token } = useAuth(); // Access token from auth context

  // Fetch products from backend
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
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  
    if (!token) {
      alert('⚠️ Please log in to add items to your cart.');
      return;
    }
    alert(productId);
    try {
      await axios.post(
        'http://localhost:5000/api/cart/add',
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
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
      <h2 className="products-title">🛠️ Our Steel Products</h2>
      <p className="products-subtitle">Explore the strength and durability of our wide range of steel materials.</p>

      {/* Filter UI */}
      <form className="product-filters" onSubmit={handleFilterSubmit}>
        <select
          name="category"
          value={filters.category}
          onChange={handleInputChange}
        >
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleInputChange}
        />
        <button type="submit">🔍 Filter</button>
      </form>

      {/* Product List */}
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
              <p><strong>₹{product.price}</strong></p>
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
  );
};

export default Products;
