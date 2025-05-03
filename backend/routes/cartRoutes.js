// routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Cart = require('../models/Cart');

// Add product to cart
router.post('/add', authMiddleware, async (req, res) => {
  const userId = req.user?.id;
  const { productId } = req.body;

  if (!userId) return res.status(400).json({ message: 'User ID is missing' });
  if (!productId) return res.status(400).json({ message: 'Product ID is required' });

  try {
    let cart = await Cart.findOne({ userId, productId });

    if (!cart) {
      cart = new Cart({ userId, productId, quantity: 1 });
    } else {
      cart.quantity += 1;
    }

    await cart.save();
    res.status(200).json({ message: 'Product added to cart' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's cart with populated product details
router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user?.id;

  if (!userId) return res.status(400).json({ message: 'User ID is missing' });

  try {
    const cartItems = await Cart.find({ userId }).populate("productId");
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update quantity (increase/decrease)
router.put('/update/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { type } = req.body;

  try {
    const cartItem = await Cart.findById(id);
    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });

    if (type === 'increase') {
      cartItem.quantity += 1;
    } else if (type === 'decrease') {
      cartItem.quantity = Math.max(1, cartItem.quantity - 1); // prevent 0
    }

    await cartItem.save();
    res.status(200).json({ message: 'Quantity updated' });
  } catch (error) {
    console.error('Error updating quantity:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete item from cart
router.delete('/delete/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    await Cart.findByIdAndDelete(id);
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
