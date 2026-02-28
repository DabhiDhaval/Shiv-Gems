const Order = require("../models/Order");

// ===============================
// CREATE ORDER (From Frontend Cart)
// ===============================
const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, totalAmount, shippingAddress } = req.body;

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ message: "Invalid total amount" });
    }

    const order = new Order({
      userId,
      items,
      totalAmount,
      shippingAddress: shippingAddress || "",
      status: "pending"
    });

    await order.save();

    res.status(201).json({
      message: "Order created successfully",
      orderId: order._id,
      order
    });

  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

// ===============================
// GET USER ORDERS
// ===============================
const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// ===============================
// GET ALL ORDERS (Admin)
// ===============================
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId")
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getAllOrders,
};