// frontend/ViewOrders.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewOrders.css'; // Assuming you are using this CSS for styling

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/orders');
      setOrders(res.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/update-status/${orderId}`, { status: newStatus });
      fetchOrders(); // Refresh after update
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="manage-orders-page">
      <h2>All Orders</h2>
      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Address</th>
              <th>Total</th>
              <th>Status</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId ? order.userId.name : 'N/A'}</td> {/* Display username */}
                <td>{order.userId ? order.userId.address : 'N/A'}</td> {/* Display address */}
                <td>₹{order.totalAmount}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <ul>
                    {order.items.map((item, i) => (
                      <li key={i}>
                        {item.productId ? item.productId.name : 'Product not found'} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewOrders;
