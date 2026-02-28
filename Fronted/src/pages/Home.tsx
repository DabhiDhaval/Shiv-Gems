import { ArrowRight, Diamond, Shield, Truck, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const featuredProducts = [
  {
    id: "1",
    name: "Princess Cut Diamond Ring",
    price: 3999,
    description: "1.5 Carat Princess Cut Diamond, 18K white gold",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    name: "Oval Diamond Necklace",
    price: 2499,
    description: "1 Carat Oval Diamond Pendant, 14K gold chain",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    name: "Diamond Tennis Bracelet",
    price: 5999,
    description: "3 Carat Total Weight, 14K white gold",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "5",
    name: "Emerald Cut Diamond Ring",
    price: 4999,
    description: "2 Carat Emerald Cut Diamond, platinum setting",
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "69a11ee81a9a00a4fd8c4d32",
    name: "Pear Diamond Pendant",
    price: 2999,
    description: "1 Carat Pear Diamond, 18K rose gold halo",
    image: "/uploads/pear.jpg",
  },
  {
    id: "8",
    name: "Sapphire & Diamond Ring",
    price: 4499,
    description: "2 Carat Ceylon Sapphire with diamond accents",
    image: "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?auto=format&fit=crop&w=800&q=80",
  },
];

const Home = () => {
  const { addToCart, cart } = useCart();

  const handleAddToCart = (product: typeof featuredProducts[0]) => {
    addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1, image: product.image });
  };

  const isInCart = (id: string) => cart.some(i => i.id === id);

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
            <p className="text-sm tracking-widest uppercase text-yellow-400 mb-3 font-medium">Est. 2002 · Surat, India</p>
            <h1 className="text-5xl font-bold mb-5 leading-tight">Discover<br />Timeless Beauty</h1>
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

      {/* Features */}
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
            <p className="text-sm text-blue-600 font-medium tracking-widest uppercase mb-2">Handpicked Selection</p>
            <h2 className="text-3xl font-bold">Featured Collections</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100"
              >
                <Link to={`/products/${product.id}`}>
                  <img
                    src={
                        product.image.startsWith("http")
                        ? product.image
                        : `http://localhost:8000${product.image}`
                        }
                    alt={product.name}
                    className="w-full h-56 object-cover"
                  />
                </Link>
                <div className="p-5">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="text-lg font-semibold mb-1 hover:text-blue-600 transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-gray-500 text-sm mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-blue-600">${product.price.toLocaleString()}</p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isInCart(product.id)
                          ? 'bg-green-500 text-white'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isInCart(product.id) ? '✓ In Cart' : 'Add to Cart'}
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

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm text-blue-600 font-medium tracking-widest uppercase mb-2">Happy Clients</p>
            <h2 className="text-3xl font-bold">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Priya Sharma", loc: "Mumbai", text: "The princess cut ring was beyond perfect. The diamond's brilliance is absolutely breathtaking. Unforgettable experience!" },
              { name: "Rahul Mehta", loc: "Dubai", text: "Exceptional quality. My tennis bracelet arrived beautifully packaged with the GIA certificate. Worth every penny." },
              { name: "Amit Patel", loc: "Surat", text: "I've been a loyal Shiv Gems customer for 5 years. Unmatched craftsmanship. The oval necklace left my wife speechless." },
            ].map(({ name, loc, text }) => (
              <div key={name} className="bg-white p-7 rounded-xl shadow-sm border border-gray-100">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-gray-600 mb-5 text-sm leading-relaxed">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                    {name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{name}</p>
                    <p className="text-gray-400 text-xs">{loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Find Your Perfect Diamond</h2>
          <p className="text-blue-100 mb-8 leading-relaxed">
            Our experts are here to help you find the gem that matches your vision, budget, and love story.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3.5 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Speak with an Expert <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
