const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ✅ GET all products with optional filters (category, minPrice, maxPrice)
router.get('/', async (req, res) => {
  const { category, minPrice, maxPrice } = req.query;

  const filter = {};
  if (category) filter.category = category;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }

  try {
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
});

// ✅ Test route
router.get('/test', (req, res) => {
  res.send('Product route working ✅');
});

// ✅ Seed route to insert a test product (now includes category)
router.get('/seed', async (req, res) => {
  try {
    const sample = await Product.create({
      name: "Test Steel Rod",
      description: "High-strength steel rod for industrial use.",
      price: 120.5,
      category: "Structural Steel",
      imageUrl: "https://via.placeholder.com/200"
    });
    res.status(201).json(sample);
  } catch (err) {
    res.status(500).json({ message: 'Error seeding product', error: err.message });
  }
});

module.exports = router;
