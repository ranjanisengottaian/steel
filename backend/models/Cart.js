const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 },
});

// Add compound unique index for userId and productId
module.exports = mongoose.model('Cart', CartSchema);


