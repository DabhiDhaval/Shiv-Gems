const Product = require("../models/Product");

const mockProducts = [
  {
    _id: "1",
    name: "Princess Cut Diamond Ring",
    price: 3999,
    description: "1.5 Carat Princess Cut Diamond set in 18K white gold with pavé band. GIA certified, VS1 clarity, F colour.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    stock: 10,
  },
  {
    _id: "2",
    name: "Oval Diamond Necklace",
    price: 2499,
    description: "1 Carat Oval Diamond Pendant on an 18\" 14K gold chain. Timeless elegance for any occasion.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
    stock: 5,
  },
  {
    _id: "3",
    name: "Diamond Tennis Bracelet",
    price: 5999,
    description: "3 Carat Total Weight diamond tennis bracelet in 14K white gold. 42 round brilliant diamonds.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80",
    stock: 8,
  },
  {
    _id: "4",
    name: "Round Diamond Earrings",
    price: 1999,
    description: "0.5 Carat each round brilliant diamond stud earrings. GIA certified, 18K white gold settings.",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80",
    stock: 15,
  },
  {
    _id: "5",
    name: "Emerald Cut Diamond Ring",
    price: 4999,
    description: "2 Carat Emerald Cut Diamond in a classic four-prong platinum setting. Step-cut facets for exceptional clarity.",
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80",
    stock: 7,
  },
  {
    _id: "6",
    name: "Pear Diamond Pendant",
    price: 2999,
    description: "1 Carat Pear Shape Diamond pendant, D colour, IF clarity. Set in 18K rose gold with diamond accent halo.",
    image: "https://images.unsplash.com/photo-1583937443739-00d5b43f0e35?auto=format&fit=crop&w=800&q=80",
    stock: 12,
  },
  {
    _id: "7",
    name: "Diamond Halo Ring",
    price: 3499,
    description: "1.2 Carat Center Diamond with stunning double halo of micro-pavé diamonds. 14K white gold band.",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80",
    stock: 9,
  },
  {
    _id: "8",
    name: "Sapphire and Diamond Ring",
    price: 4499,
    description: "2 Carat Ceylon Sapphire flanked by 0.5 TCW round brilliant diamonds. Inspired by royalty.",
    image: "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?auto=format&fit=crop&w=800&q=80",
    stock: 6,
  },
  {
    _id: "9",
    name: "Gold Diamond Bracelet",
    price: 6999,
    description: "14K Gold bangle with 2 Carat diamonds channel-set around the entire circumference. Timeless luxury.",
    image: "https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?auto=format&fit=crop&w=800&q=80",
    stock: 4,
  },
];

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      // DB connected but empty — return mock with header notice
      res.set("Access-Control-Expose-Headers", "X-Mock-Data");
      res.set("X-Mock-Data", "true");
      return res.json(mockProducts);
    }
    res.json(products);
  } catch (error) {
    console.log("Database error, using mock data:", error.message);
    res.set("Access-Control-Expose-Headers", "X-Mock-Data");
    res.set("X-Mock-Data", "true");
    res.json(mockProducts);
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      const mockProduct = mockProducts.find((p) => p._id === req.params.id);
      if (mockProduct) {
        res.set("Access-Control-Expose-Headers", "X-Mock-Data");
        res.set("X-Mock-Data", "true");
        return res.json(mockProduct);
      }
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    const mockProduct = mockProducts.find((p) => p._id === req.params.id);
    if (mockProduct) {
      res.set("Access-Control-Expose-Headers", "X-Mock-Data");
      res.set("X-Mock-Data", "true");
      return res.json(mockProduct);
    }
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

// Create product (admin)
const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, stock } = req.body;
    if (!name || !description || !price || !image || stock === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const product = await Product.create({ name, description, price, image, stock });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to create product" });
  }
};

// Update product (admin)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
  }
};

// Delete product (admin)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
