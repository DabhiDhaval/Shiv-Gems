const express = require("express");
const mongoose = require("mongoose");
const { createOrder, getOrders, getAllOrders } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// make sure the database is connected before handling any order route
router.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: "Service unavailable. Please try again later." });
  }
  next();
});

// POST /api/orders - Create order from cart
router.post("/", protect, createOrder);

// GET /api/orders - Get user's orders
router.get("/", protect, getOrders);

// GET /api/orders/admin/all - Get all orders (admin only)
router.get("/admin/all", protect, getAllOrders);

module.exports = router;
