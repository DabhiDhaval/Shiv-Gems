const Order = require("../models/Order");

// ===============================
// CREATE ORDER (Frontend Cart)
// ===============================
const createOrder = async (req, res) => {
  try {
    console.log("NEW BACKEND VERSION RUNNING");
    
    const userId = req.user.id;
    const { items, totalAmount, shippingAddress } = req.body;

    console.log("Incoming Order Payload:", req.body);

    // Validate
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ message: "Invalid total amount" });
    }

    const order = await Order.create({
      userId,
      items,
      totalAmount,
      shippingAddress: shippingAddress || "",
      status: "pending",
    });

    res.status(201).json({
      message: "Order created successfully",
      orderId: order._id,
      order,
    });

  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({
      message: error.message || "Failed to create order"
    });
  }
};

// ===============================
// GET USER ORDERS
// ===============================
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {
    console.error("Get Orders Error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// ===============================
// GET ALL ORDERS (Admin)
// ===============================
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {
    console.error("Get All Orders Error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getAllOrders,
};