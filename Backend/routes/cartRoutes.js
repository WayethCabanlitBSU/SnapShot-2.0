import express from 'express';
import Order from '../models/orderModel.js';

const router = express.Router();

// Fake products for demo
const PRODUCTS = [
  { _id: 'p1', title: 'Snapshot Camera', price: 149.99, description: 'Compact digital camera' },
  { _id: 'p2', title: 'Lens Kit', price: 79.99, description: 'Wide + tele lens combo' },
  { _id: 'p3', title: 'Memory Card 128GB', price: 24.99, description: 'Fast SD card for photos' },
];

// GET products
router.get('/products', (req, res) => {
  res.json(PRODUCTS);
});

// POST checkout
router.post('/checkout', async (req, res) => {
  try {
    const { items, total, metadata } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0)
      return res.status(400).json({ message: 'Cart is empty' });

    // verify totals server-side
    const serverTotal = items.reduce((sum, item) => {
      const product = PRODUCTS.find(p => p._id === item.productId);
      if (!product) return sum;
      return sum + product.price * item.qty;
    }, 0);

    if (Math.abs(serverTotal - total) > 0.5)
      return res.status(400).json({ message: 'Total mismatch detected' });

    const order = new Order({
      items,
      total: serverTotal,
      metadata,
      status: 'paid',
    });
    await order.save();

    res.json({ ok: true, order });
  } catch (err) {
    console.error('Checkout error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all orders (for testing/admin)
router.get('/orders', async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

export default router;
