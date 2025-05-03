// routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');

// Create a new order
router.post('/', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const cartItems = await Cart.find({ userId }).populate('productId');

    // If cart is empty, return an error
    if (!cartItems.length) return res.status(400).json({ message: 'Cart is empty' });

    // Prepare order items
    const items = cartItems.map(item => ({
      productId: item.productId._id,
      quantity: item.quantity
    }));

    // Calculate total amount
    const totalAmount = cartItems.reduce((sum, item) => sum + item.quantity * item.productId.price, 0);

    // Create new order
    const order = new Order({
      userId,
      items,
      totalAmount,
      address: user.address,
      country: user.country,  // Added country
      state: user.state,      // Added state
      paymentMethod: 'Cash on Delivery'
    });

    // Save the order to the database
    await order.save();

    // Clear the cart for the user after placing the order
    await Cart.deleteMany({ userId });

    res.status(200).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Order error:', error);
    res.status(500).json({ message: 'Checkout failed' });
  }
});

// Get all orders for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('items.productId');
    res.status(200).json(orders); // Include country and state in the response
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Cancel an order (and delete it)
router.put('/:orderId/cancel', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status === 'Shipped') {
      return res.status(400).json({ message: 'Cannot cancel a shipped order' });
    }

    // Delete the order instead of updating status
    await Order.findByIdAndDelete(req.params.orderId);

    res.status(200).json({ message: 'Order cancelled and deleted successfully' });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ message: 'Error cancelling order' });
  }
});

module.exports = router;
