import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, CheckCircle, ArrowLeft, AlertCircle } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [usingMock, setUsingMock] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchProduct = () => {
    if (!id) {
      setError("Product ID is missing");
      setLoading(false);
      return;
    }

    setLoading(true);

    axiosInstance.get<Product>(`/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setUsingMock(res.headers['x-mock-data'] === 'true');
        setError(null);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.message || "Error fetching product");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;

    setActionError(null);

    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });

    if (isAuthenticated && !usingMock) {
      try {
        await axiosInstance.post('/cart', {
          productId: product._id,
          quantity: 1
        });
      } catch (err: any) {
        console.warn('Backend cart sync failed:', err.response?.data?.message);
      }
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <button
          onClick={() => navigate('/products')}
          className="text-blue-600 hover:underline flex items-center gap-2 mx-auto"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </button>
      </div>
    );
  }

  const imageUrl =
    product?.image?.startsWith("http")
      ? product.image
      : product?.image
      ? `${API_URL}${product.image}`
      : "";

  return (
    <div className="max-w-4xl mx-auto p-6">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      {usingMock && (
        <div className="bg-yellow-50 border border-yellow-300 text-yellow-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
          <span>Showing sample product.</span>
          <button
            onClick={fetchProduct}
            className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700"
          >
            Retry
          </button>
        </div>
      )}

      {actionError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <img
          src={imageUrl}
          alt={product?.name}
          className="w-full h-56 object-cover rounded-lg"
        />

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product?.name}</h1>
          <p className="text-gray-600 leading-relaxed">{product?.description}</p>
          <p className="text-3xl font-bold text-blue-600">
            ${product?.price.toLocaleString()}
          </p>

          <p className={`text-sm font-medium ${
            product?.stock && product.stock > 0
              ? 'text-green-600'
              : 'text-red-500'
          }`}>
            {product?.stock && product.stock > 0
              ? `In Stock (${product.stock} available)`
              : 'Out of Stock'}
          </p>

          <button
            onClick={handleAddToCart}
            disabled={!product?.stock || product.stock === 0}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-colors ${
              added
                ? 'bg-green-500 text-white'
                : product?.stock && product.stock > 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {added ? (
              <>
                <CheckCircle className="h-5 w-5" />
                Added to Cart!
              </>
            ) : (
              <>
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </>
            )}
          </button>

          <div className="border-t pt-4 space-y-2">
            <p className="text-sm text-gray-500">✓ GIA Certified</p>
            <p className="text-sm text-gray-500">✓ Free insured shipping</p>
            <p className="text-sm text-gray-500">✓ 30-day returns</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;