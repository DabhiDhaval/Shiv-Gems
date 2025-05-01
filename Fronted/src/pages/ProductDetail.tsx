import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Product {
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Fetching product with ID:", id); // Debugging: Check the ID
        const response = await axios.get<Product>(`http://localhost:8000/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching product:", err);
        setError(err.response?.data?.message || "Error fetching product");
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    } else {
      setError("Product ID is missing");
      setLoading(false);
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
      <img src={product?.image} alt={product?.name} className="w-full h-64 object-cover mb-4" />
      <p className="text-gray-700 mb-4">{product?.description}</p>
      <p className="text-2xl font-bold text-blue-600 mb-4">${product?.price}</p>
      <p className="text-gray-500">Stock: {product?.stock}</p>
    </div>
  );
};

export default ProductDetail;