const express = require("express");
const { getCart, updateCartItem, removeCartItem } = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");
const Cart = require("../models/Cart"); // Ensure this is the correct path to your Cart model
const Product = require("../models/Product"); // Ensure this is the correct path to your Product model

const router = express.Router();

router.get("/", protect, getCart);
router.put("/:id", protect, updateCartItem);
router.delete("/:id", protect, removeCartItem);

// Add item to cart
router.post("/cart", async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the item is already in the cart
    let cartItem = await Cart.findOne({ productId });
    if (cartItem) {
      // Update the quantity if the item already exists
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Add a new item to the cart
      cartItem = new Cart({ productId, quantity });
      await cartItem.save();
    }

    res.status(201).json(cartItem);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;