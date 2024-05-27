const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const auth = require('../../middleware/auth');

// Placeholder data for the sake of example
let orders = [];
let discountCodes = [];
const nthOrder = 10;

// Generate discount code
router.get('/generate-discount', auth, (req, res) => {
  const newDiscountCode = uuidv4();
  discountCodes.push(newDiscountCode);
  res.status(200).json({ message: 'Discount code generated', discountCode: newDiscountCode });
});

// Get admin stats
router.get('/stats', auth, (req, res) => {
  const itemCount = orders.reduce((acc, order) => acc + order.cart.length, 0);
  const totalPurchaseAmount = orders.reduce((acc, order) => acc + order.totalAmount, 0);
  const totalDiscountAmount = orders.reduce((acc, order) => acc + (order.discount || 0), 0);

  res.status(200).json({
    itemCount,
    totalPurchaseAmount,
    discountCodes,
    totalDiscountAmount
  });
});

module.exports = router;
