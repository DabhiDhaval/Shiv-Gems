const Cart = require("../models/Cart");

// Get all cart items for a user
const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.user.id }).populate("productId");
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart items" });
  }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItem = await Cart.findByIdAndUpdate(req.params.id, { quantity }, { new: true });
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });
    res.json(cartItem);
  } catch (error) {
    res.status(400).json({ message: "Failed to update cart item" });
  }
};

// Remove a cart item
const removeCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });
    res.json({ message: "Cart item removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove cart item" });
  }
};

module.exports = { getCart, updateCartItem, removeCartItem };
