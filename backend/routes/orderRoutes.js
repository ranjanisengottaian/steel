// routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');

// ✅ Create a new order
router.post('/', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const cartItems = await Cart.find({ userId }).populate('productId');

    if (!cartItems.length) return res.status(400).json({ message: 'Cart is empty' });

    const items = cartItems.map(item => ({
      productId: item.productId._id,
      quantity: item.quantity
    }));

    const totalAmount = cartItems.reduce((sum, item) => sum + item.quantity * item.productId.price, 0);

    const order = new Order({
      userId,
      items,
      totalAmount,
      address: user.address,
      country: user.country,
      state: user.state,
      paymentMethod: 'Cash on Delivery'
    });

    await order.save();
    await Cart.deleteMany({ userId });

    res.status(200).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Order error:', error);
    res.status(500).json({ message: 'Checkout failed' });
  }
});

// ✅ Get all orders for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('items.productId');
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// ✅ Cancel an order
router.put('/:orderId/cancel', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (order.status === 'Shipped') {
      return res.status(400).json({ message: 'Cannot cancel a shipped order' });
    }

    await Order.findByIdAndDelete(req.params.orderId);
    res.status(200).json({ message: 'Order cancelled and deleted successfully' });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ message: 'Error cancelling order' });
  }
});

// ✅ NEW: Update order status (for admin panel)
router.patch('/update-status/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const updated = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({ message: 'Order status updated successfully', order: updated });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating status' });
  }
});

module.exports = router;
