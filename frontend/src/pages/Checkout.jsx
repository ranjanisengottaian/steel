import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Checkout.css';

const Checkout = () => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [userAddress, setUserAddress] = useState('');
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(true);

  const DELIVERY_CHARGE = 50;

  useEffect(() => {
    const fetchCart = async () => {
      if (!token) {
        return;
      }
      try {
        const res = await axios.get('http://localhost:5000/api/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(res.data);
      } catch (err) {
        console.error('Failed to fetch cart:', err);
      }
    };

    const fetchProfile = async () => {
      if (!token) {
        return;
      }
      try {
        const res = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const address = res.data.address || 'No address available';
        setUserAddress(address);
        console.log('Fetched user address:', address);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setUserAddress('No address available');
      } finally {
        setIsLoadingAddress(false);
      }
    };

    fetchCart();
    fetchProfile();
  }, [token]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * (item.productId.price || 0),
    0
  );

  const grandTotal = subtotal + DELIVERY_CHARGE;

  const confirmOrder = async () => {
    if (!token) {
      alert('User not authenticated');
      return;
    }
    try {
      await axios.post(
        'http://localhost:5000/api/orders',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess(true);
      setCartItems([]);
    } catch (err) {
      alert('Order failed');
    }
  };

  if (success) {
    return (
      <div className="checkout-container success-screen">
        <div className="tick-animation">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="green" d="M9 11L12 14L15 10L16 11L12 15L8 11L9 11Z" />
          </svg>
        </div>
        <h2>Order Placed Successfully!</h2>
        <p >Your order is now being processed.</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>🧾 Checkout</h2>

      {step === 1 && (
        <>
          <h3>Order Summary</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id}>
                <div className="product-info">
                  <span>{item.productId.name} × {item.quantity}</span>
                  <span>₹{item.productId.price * item.quantity}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="totals">
            <p>Subtotal: ₹{subtotal}</p>
            <p>Delivery Charge: ₹{DELIVERY_CHARGE}</p>
            <h4>Grand Total: ₹{grandTotal}</h4>
          </div>
          <button onClick={() => setStep(2)}>Next: Confirm Address</button>
        </>
      )}

      {step === 2 && (
        <>
          <h3>Confirm Delivery Address</h3>
          {isLoadingAddress ? (
            <p>Loading address...</p>
          ) : (
            <textarea value={userAddress} readOnly rows={4} />
          )}
          <button onClick={() => setStep(3)}>Next: Payment</button>
        </>
      )}

      {step === 3 && (
        <>
          <h3>Payment</h3>
          <p>
            Payment Method: <strong>Cash on Delivery</strong>
          </p>
          <button onClick={confirmOrder}>Place Order</button>
        </>
      )}
    </div>
  );
};

export default Checkout;
