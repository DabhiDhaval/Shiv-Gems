const mongoose = require("mongoose");
const Product = require("./models/Product"); // Corrected path to Product model
require("dotenv").config();

mongoose.set("strictQuery", true); // Suppress strictQuery warning

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Define product data
    const products = [
      {
        name: "Princess Cut Diamond Ring",
        price: 3999,
        description: "1.5 Carat Princess Cut Diamond",
        image:
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        stock: 10, // Added stock field
      },
      {
        name: "Oval Diamond Necklace",
        price: 2499,
        description: "1 Carat Oval Diamond Pendant",
        image:
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        stock: 5, // Added stock field
      },
      {
        name: "Diamond Tennis Bracelet",
        price: 5999,
        description: "3 Carat Total Weight",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxI846TVnKfmh4bI--MikC0O4vugjl_6cX0Q&s",
        stock: 8, // Added stock field
      },
      {
        name: "Round Diamond Earrings",
        price: 1999,
        description: "0.5 Carat Round Diamonds, perfect for any occasion.",
        image:
          "https://lioridiamonds.com/cdn/shop/products/1-Studs_1024x1024.jpg?v=1672962751",
        stock: 15, // Added stock field
      },
      {
        name: "Emerald Cut Diamond Ring",
        price: 4999,
        description: "2 Carat Emerald Cut Diamond",
        image:
          "https://cdn-media.glamira.com/media/product/newgeneration/view/1/sku/dalinda-r/diamond/diamond-Brillant_AAA/stone2/diamond-Brillant_AAA/alloycolour/red.jpg",
        stock: 7, // Added stock field
      },
      {
          name: "Pear Diamond Pendant",
          price: 2999,
          description: "1 Carat Pear Diamond",
          image: "/uploads/pear.jpg",
          stock: 12,
      },
      
      {
        name: "Diamond Halo Ring",
        price: 3499,
        description: "1.2 Carat Center Diamond",
        image:
          "https://media.istockphoto.com/id/483048997/photo/three-stone-rings-on-black.jpg?s=612x612&w=0&k=20&c=meHNA6n_bk5eVO4cuGXnJYGxb2sF6PHnkKGUuWBMCH0=",
        stock: 9, // Added stock field
      },
      {
        name: "Sapphire and Diamond Ring",
        price: 4499,
        description: "2 Carat Sapphire with Diamonds",
        image:
          "https://thumbs.dreamstime.com/b/ornate-gold-ring-blue-sapphire-diamond-accents-black-background-featuring-vibrant-its-center-surrounded-351639186.jpg",
        stock: 6, // Added stock field
      },
      {
        name: "Gold Diamond Bracelet",
        price: 6999,
        description: "14K Gold with 2 Carat Diamonds",
        image:
          "https://priyaasi.com/cdn/shop/products/BA-PR-40343.CR.jpg?v=1716881116&width=1800",
        stock: 4, // Added stock field
      },
    ];

    // Insert products into the database
    await Product.insertMany(products);
    console.log("Products seeded!");

    // Disconnect from MongoDB
    mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding products:", error);
    mongoose.disconnect();
  }
};

seedProducts();