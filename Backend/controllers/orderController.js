const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Create an order from cart items
const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { shippingAddress } = req.body;

    // Get cart items
    const cartItems = await Cart.find({ userId }).populate("productId");

    if (!cartItems.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total and prepare order items
    let totalAmount = 0;
    const orderItems = cartItems.map((item) => {
      totalAmount += item.productId.price * item.quantity;
      return {
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      };
    });

    // Create order
    const order = new Order({
      userId,
      items: orderItems,
      totalAmount,
      shippingAddress: shippingAddress || "Not provided",
      status: "completed",
    });

    await order.save();

    // Clear cart
    await Cart.deleteMany({ userId });

    res.status(201).json({
      message: "Order created successfully",
      order,
      total: totalAmount,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

// Get all orders for a user
const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Get all orders (admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "email name")
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

module.exports = { createOrder, getOrders, getAllOrders };
