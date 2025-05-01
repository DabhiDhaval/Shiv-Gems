const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// Get product by ID
router.get("/products/:id", async (req, res) => {
  try {
    console.log("Product ID:", req.params.id); // Debugging: Check the ID being passed
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;