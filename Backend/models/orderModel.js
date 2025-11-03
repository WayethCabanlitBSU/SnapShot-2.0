import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: { type: String, required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    metadata: { type: Object },
    status: { type: String, default: 'paid' },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
