import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './OrderHistory.css';

const OrderHistory = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => {
        const updatedOrders = res.data.map(order => {
          const createdAt = new Date(order.createdAt);
          const now = new Date();
          const diffDays = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));
          const status = diffDays >= 3 ? 'Shipped' : 'Processing';
          return { ...order, status };
        });
        setOrders(updatedOrders);
      }).catch((error) => {
        console.error('Failed to fetch orders:', error);
      });
    }
  }, [token]);

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/orders/${orderId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the order status locally after successful cancellation
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: 'Cancelled' } : order
        )
      );
      alert('Order has been successfully cancelled');
    } catch (error) {
      console.error('Failed to cancel order:', error);
      alert('There was an error cancelling the order.');
    }
  };

  return (
    <div className="order-history-container">
      <h2>📜 Order History</h2>
      {orders.length === 0 ? (
        <p className="no-orders">No orders yet.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <span className="order-id">🧾 Order ID: {order._id}</span>
              <span className="order-date">📅 {new Date(order.createdAt).toLocaleString()}</span>
            </div>
            <div className={`order-status ${order.status.toLowerCase()}`}>
              🌀 Status: <span>{order.status}</span>
            </div>
            <div className="order-details">
              <p><strong>📍 Address:</strong> {order.address}, {order.state}, {order.country}</p>
              <p><strong>💰 Payment:</strong> {order.paymentMethod}</p>
              <ul className="order-items">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    🛒 {item.productId?.name} × {item.quantity}
                  </li>
                ))}
              </ul>
              <p><strong>🧾 Total:</strong> ₹{order.totalAmount}</p>
            </div>
            <div className="order-actions">
              {order.status === 'Processing' && (
                <button className="cancel-btn" onClick={() => handleCancelOrder(order._id)}>
                  ❌ Cancel Order
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
