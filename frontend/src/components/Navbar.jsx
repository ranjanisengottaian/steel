import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeDropdown);
    return () => document.removeEventListener('mousedown', closeDropdown);
  }, []);

  const goToProfile = () => {
    navigate('/profile');
    setDropdownOpen(false);
  };

  const goToOrders = () => {
    navigate('/orders');
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="navbar-logo">SteelCo</Link>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        <div className="auth-section" ref={dropdownRef}>
          {user ? (
            <div className="user-dropdown">
              <span className="user-trigger" onClick={toggleDropdown}>
                {user.name} <span className="arrow">▼</span>
              </span>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={goToProfile}>👤 Profile</button>
                  <button onClick={goToOrders}>🧾 Orders</button> {/* ✅ New Orders Link */}
                  <button onClick={logout}>🚪 Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" className="auth-link">Login / Register</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
