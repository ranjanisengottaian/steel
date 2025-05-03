const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number
    }
  ],
  totalAmount: Number,
  address: String,
  country: String,    // Added country
  state: String,      // Added state
  paymentMethod: String,
}, { timestamps: true });

orderSchema.virtual('status').get(function () {
  const now = new Date();
  const placedAt = this.createdAt;
  const diffInDays = (now - placedAt) / (1000 * 60 * 60 * 24);
  return diffInDays >= 3 ? 'Shipped' : 'Processing';
});

orderSchema.set('toJSON', { virtuals: true });
orderSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Order', orderSchema);
