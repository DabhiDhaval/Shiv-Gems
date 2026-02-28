import { ArrowRight, Diamond, Shield, Truck, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const Home = () => {
  const { addToCart, cart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get('/products');
        setFeaturedProducts(res.data.slice(0, 6)); // take first 6 only
      } catch (error) {
        console.error("Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product._id,   // ✅ REAL MongoDB ID
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
  };

  const isInCart = (id: string) => cart.some(i => i.id === id);

  const getImageUrl = (image: string) => {
    if (!image) return '';
    if (image.startsWith('http')) return image;
    return `${API_URL}${image}`;  // ✅ FIX localhost issue
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1950&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-55"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-xl">
            <p className="text-sm tracking-widest uppercase text-yellow-400 mb-3 font-medium">
              Est. 2002 · Surat, India
            </p>
            <h1 className="text-5xl font-bold mb-5 leading-tight">
              Discover<br />Timeless Beauty
            </h1>
            <p className="text-lg mb-8 text-gray-200 leading-relaxed">
              Explore our exclusive collection of GIA-certified diamonds crafted by three generations of master artisans.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                to="/products"
                className="bg-blue-600 text-white px-8 py-3.5 rounded-lg inline-flex items-center space-x-2 hover:bg-blue-700 transition-all transform hover:scale-105 font-semibold"
              >
                <span>Shop Now</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="bg-white bg-opacity-15 border border-white border-opacity-50 text-white px-8 py-3.5 rounded-lg inline-flex items-center hover:bg-opacity-25 transition-all font-medium"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features (UNCHANGED) */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Diamond, title: "Premium Quality", desc: "Only the finest diamonds make it to our collection, hand-selected by expert gemologists." },
              { icon: Shield, title: "GIA Certified", desc: "Every diamond comes with a GIA authentication certificate guaranteeing authenticity." },
              { icon: Truck, title: "Insured Shipping", desc: "Fully insured worldwide shipping with real-time tracking and discreet packaging." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-7 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <Icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm text-blue-600 font-medium tracking-widest uppercase mb-2">
              Handpicked Selection
            </p>
            <h2 className="text-3xl font-bold">Featured Collections</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100"
              >
                <Link to={`/products/${product._id}`}>
                  <img
                    src={getImageUrl(product.image)}
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

                  <p className="text-gray-500 text-sm mb-4">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-blue-600">
                      ${product.price.toLocaleString()}
                    </p>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isInCart(product._id)
                          ? 'bg-green-500 text-white'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isInCart(product._id) ? '✓ In Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              View All Products <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Rest of your Testimonials + CTA remain exactly same */}
    </div>
  );
};

export default Home;