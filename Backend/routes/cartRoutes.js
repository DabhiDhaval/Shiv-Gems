const express = require("express");
const mongoose = require("mongoose");
const { getCart, updateCartItem, removeCartItem } = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const router = express.Router();

// GET /api/cart - fetch user's cart
router.get("/", protect, getCart);

// POST /api/cart - add item to cart
router.post("/", protect, async (req, res) => {
  // if MongoDB connection is not open, avoid attempts and return a friendly message
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: "Service unavailable. Please try again later." });
  }

  const { productId, quantity } = req.body;

  // guard against invalid ObjectId values (e.g. mock data ids like "2")
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    // don't try to query with an invalid id; treat as not found
    return res.status(404).json({ message: "Product not found" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cartItem = await Cart.findOne({ userId: req.user._id, productId });
    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();
    } else {
      cartItem = new Cart({ userId: req.user._id, productId, quantity: quantity || 1 });
      await cartItem.save();
    }

    res.status(201).json(cartItem);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    // send the real error message in development to aid debugging
    const msg = process.env.NODE_ENV === 'production' ? 'Server error' : error.message;
    res.status(500).json({ message: msg });
  }
});

// PUT /api/cart/:id - update quantity
router.put("/:id", protect, updateCartItem);

// DELETE /api/cart/:id - remove item
router.delete("/:id", protect, removeCartItem);

module.exports = router;
