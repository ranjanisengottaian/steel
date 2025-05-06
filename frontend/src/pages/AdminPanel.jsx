// src/pages/AdminPanel.js
import React from 'react';
import { Link, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AddProduct from './AddProduct';
import ViewOrders from './ViewOrders';
import Dashboard from './Dashboard';
import './Dashboard.css';

function AdminPanel() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔒 Prevent non-admins from accessing the admin panel
  if (!user || user.email !== "admin@gmail.com") {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate('/');
  };

  return (
    <div>
      <nav className="admin-navbar">
        <div className="admin-navbar-logo">Admin Panel</div>
        <div className="admin-navbar-links">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/add-product">Add Product</Link>
          <Link to="/admin/view-orders">View Orders</Link>
          <button className="admin-logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="view-orders" element={<ViewOrders />} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminPanel;
