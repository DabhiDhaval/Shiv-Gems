import { useState, useEffect } from 'react';
import axios from 'axios';
import { Filter, Search } from "lucide-react";
import { Link } from 'react-router-dom';

// Define the Product interface outside the component
interface Product {
  _id: string; // Add _id property
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<number[]>([]); // Store product IDs in the cart
  const [products, setProducts] = useState<Product[]>([]); // Store fetched products
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>('http://localhost:8000/api/products');
      setProducts(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error fetching products');
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product: Product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add to Cart Functionality
  const handleAddToCart = async (productId: number) => {
    try {
      await axios.post("http://localhost:8000/api/cart", {
        productId,
        quantity: 1, // Default quantity is 1
      });
      alert("Product added to cart!");
    } catch (err: any) {
      console.error("Error adding product to cart:", err);
      alert(err.response?.data?.message || "Failed to add product to cart");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* 🔍 Search & Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="relative w-full md:w-96 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
          <Filter className="h-5 w-5" />
          <span>Filter</span>
        </button>
      </div>

      {/* 🛍️ Product Grid */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link key={product._id} to={`/products/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover transition-opacity duration-300 hover:opacity-80"
              />
            </Link>
          ))}
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            <Link to={`/products/67f5fe07db1559bd78252e10`}>
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Princess Cut Diamond Ring"
                className="w-full h-64 object-cover transition-opacity duration-300 hover:opacity-80"
              />
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 text-xl">😞 No products found.</p>
      )}
    </div>
  );
};

export default Products;
