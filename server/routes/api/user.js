const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const auth = require('../../middleware/auth');

let cart = [];
let orders = [];
let discountCodes = ['VALIDCODE123'];
const nthOrder = 10;

// Add to cart
router.post('/add-to-cart', auth, (req, res) => {
  const { item, quantity } = req.body;
  if (!item || !quantity) {
    return res.status(400).json({ error: 'Item and quantity are required' });
  }
  cart.push({ item, quantity });
  res.status(200).json({ message: 'Item added to cart', cart });
});

router.get('/items', auth, (req, res) => {
  res.status(200).json({ items: cart });
});

router.put('/update', auth, (req, res) => {
  const { item, quantity } = req.body;
  const cartItem = cart.find(ci => ci.item === item);
  if (cartItem) {
    cartItem.quantity = quantity;
    res.status(200).json({ message: 'Item quantity updated' });
  } else {
    res.status(404).json({ message: 'Item not found in cart' });
  }
});

// Remove item from cart
router.delete('/remove', auth, (req, res) => {
  const { item } = req.body;
  cart = cart.filter(ci => ci.item !== item);
  res.status(200).json({ message: 'Item removed from cart' });
});

// Clear cart
router.post('/clear', auth, (req, res) => {
  cart = [];
  res.status(200).json({ message: 'Cart cleared' });
});

router.post('/checkout', auth, (req, res) => {
  const { discountCode } = req.body;
  let discount = 0;
  if (discountCode && discountCodes.includes(discountCode)) {
    discount = 0.1; // 10% discount
  }

  const totalAmount = cart.reduce((acc, item) => acc + (item.quantity * 10), 0); // Example price calculation
  const discountedAmount = totalAmount * (1 - discount);

  // Save order
  const order = {
    cart,
    totalAmount: discountedAmount,
    discount: totalAmount - discountedAmount,
  };
  orders.push(order);

  // Clear cart
  cart = [];

  res.status(200).json({ message: 'Order placed successfully', order });
});

// Validate discount code
router.post('/validate-discount', auth, (req, res) => {
  const { discountCode } = req.body;
  if (discountCodes.includes(discountCode)) {
    res.status(200).json({ valid: true, message: 'Discount code is valid' });
  } else {
    res.status(400).json({ valid: false, message: 'Invalid discount code' });
  }
});

module.exports = router;
