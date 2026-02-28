const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

const router = express.Router();


// GET /api/admin/dashboard
router.get("/dashboard", protect, admin, async (req, res) => {
  try {
    const totalCustomers = await User.countDocuments({ role: "customer" });
    const totalProducts = await Product.countDocuments();
    const orders = await Order.find();
    const totalOrders = orders.length;
    const totalSales = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    res.json({
      totalSales,
      salesChange: "+12% from last month",
      totalOrders,
      ordersChange: "+8% from last month",
      totalCustomers,
      customersChange: "+5% from last month",
      totalProducts,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard data" });
  }
});

// GET /api/admin/users
router.get("/users", protect, admin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// DELETE /api/admin/users/:id
router.delete("/users/:id", protect, admin, async (req, res) => {
  try {
    if (req.params.id === req.user.id) {
      return res.status(400).json({ message: "Cannot delete your own account" });
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});

// GET /api/admin/orders
router.get("/orders", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("items.productId", "name price")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// PUT /api/admin/orders/:id - update order status
router.put("/orders/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const { status } = req.body;
    if (status) order.status = status;
    await order.save();
    const populated = await Order.findById(order._id)
      .populate("userId", "name email")
      .populate("items.productId", "name price");
    res.json(populated);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Failed to update order" });
  }
});

// DELETE /api/admin/orders/:id
router.delete("/orders/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Failed to delete order" });
  }
});

module.exports = router;
