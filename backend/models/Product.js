const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },  // ✅ Keep as Number
  unit: { type: String, default: "₹/kg" },  // ✅ New field
  category: String,
  imageUrl: String,
});

module.exports = mongoose.model('Product', productSchema);
