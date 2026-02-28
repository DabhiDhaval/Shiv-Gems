const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();

mongoose.set("strictQuery", true);

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB...");

    // Check if admin already exists
    const adminExists = await User.findOne({ email: "admin@shivgems.com" });
    if (adminExists) {
      console.log("Admin user already exists!");
      mongoose.disconnect();
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = await User.create({
      name: "Admin",
      email: "admin@shivgems.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created successfully!");
    console.log("📧 Email: admin@shivgems.com");
    console.log("🔑 Password: admin123");
    console.log("\n⚠️  IMPORTANT: Change this password in production!");

    mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding admin:", error);
    mongoose.disconnect();
  }
};

seedAdmin();
