import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import Products from './pages/Products';
import Profile from './pages/Profile';
import ContactPage from './pages/Contact';
import Cart from './pages/Cart';
import Services from './pages/Services';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import AdminPanel from './pages/AdminPanel';

function App() {
  const location = useLocation();

  // Hide user navbar if route starts with "/admin"
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <>
        {!isAdminRoute && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/admin/*" element={<AdminPanel />} />
        </Routes>
      </>
    </AuthProvider>
  );
}

export default App;
