const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, min: 1 },
    }
  ],

  totalAmount: { type: Number, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  paymentMethod: { type: String, required: true },

  status: { type: String, default: 'Pending' },
}, { timestamps: true });

// Virtual status for auto-updated shipping status
orderSchema.virtual('autoStatus').get(function () {
  const now = new Date();
  const placedAt = this.createdAt;
  const diffInDays = (now - placedAt) / (1000 * 60 * 60 * 24);
  return diffInDays >= 3 ? 'Shipped' : 'Processing';
});

// Include virtuals in toJSON and toObject
orderSchema.set('toJSON', { virtuals: true });
orderSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Order', orderSchema);
