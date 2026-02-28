import { useState, useEffect } from 'react';
import { Search, ShoppingCart, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [usingMock, setUsingMock] = useState(false);

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const fetchProducts = () => {
    axiosInstance.get<Product[]>('/products')
      .then(res => {
        setProducts(res.data);
        const mockHeader = res.headers['x-mock-data'];
        setUsingMock(mockHeader === 'true');
        setError(null);
      })
      .catch(err => {
        console.error('products fetch failed', err);
        setError(err.response?.data?.message || 'Error fetching products');
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = async (product: Product) => {
    setActionError(null);

    // If user is authenticated and DB is available, add via API
    if (isAuthenticated && !usingMock) {
      try {
        await axiosInstance.post('/cart', { productId: product._id, quantity: 1 });
        // Also update local cart context for navbar badge
        addToCart({ id: product._id, name: product.name, price: product.price, quantity: 1, image: product.image });
        setAddedProductId(product._id);
        setTimeout(() => setAddedProductId(null), 2000);
      } catch (err: any) {
        const msg = err.response?.data?.message || 'Failed to add to cart.';
        setActionError(msg);
      }
    } else {
      // Fallback: add to local cart context (works without backend)
      addToCart({ id: product._id, name: product.name, price: product.price, quantity: 1, image: product.image });
      setAddedProductId(product._id);
      setTimeout(() => setAddedProductId(null), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Collection</h1>

      {usingMock && (
        <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-3 rounded mb-6 flex justify-between items-center">
          <span>Showing sample products — backend not connected.</span>
          <button
            onClick={fetchProducts}
            className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700"
          >
            Retry
          </button>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span>{error}</span>
          <button onClick={fetchProducts} className="ml-auto text-sm underline">Retry</button>
        </div>
      )}

      {actionError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      {/* Search */}
      <div className="flex items-center gap-3 mb-8 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm max-w-md">
        <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border-none outline-none text-sm"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500 text-center py-12">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105 hover:shadow-lg"
            >
              <Link to={`/products/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover"
                />
              </Link>
              <div className="p-5">
                <Link to={`/products/${product._id}`}>
                  <h3 className="text-lg font-semibold mb-1 hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
                <p className="text-sm text-gray-400 mb-3">
                  Stock: <span className={product.stock > 0 ? 'text-green-600 font-medium' : 'text-red-500'}>{product.stock > 0 ? product.stock : 'Out of stock'}</span>
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">${product.price.toLocaleString()}</span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      addedProductId === product._id
                        ? 'bg-green-500 text-white'
                        : product.stock > 0
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {addedProductId === product._id ? (
                      <><CheckCircle className="h-4 w-4" /> Added!</>
                    ) : (
                      <><ShoppingCart className="h-4 w-4" /> Add to Cart</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
