import { ArrowRight, Diamond, Shield, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Dynamic featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "Princess Cut Diamond Ring",
      price: 3999,
      description: "1.5 Carat Princess Cut Diamond",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Oval Diamond Necklace",
      price: 2499,
      description: "1 Carat Oval Diamond Pendant",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Diamond Tennis Bracelet",
      price: 5999,
      description: "3 Carat Total Weight",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxI846TVnKfmh4bI--MikC0O4vugjl_6cX0Q&s",
    },
    {
      id: 4,
      name: "Round Diamond Earrings",
      price: 1999,
      description: "0.5 Carat Round Diamonds, perfect for any occasion.",
      image: "https://lioridiamonds.com/cdn/shop/products/1-Studs_1024x1024.jpg?v=1672962751",
    },
    {
      id: 5,
      name: "Emerald Cut Diamond Ring",
      price: 4999,
      description: "2 Carat Emerald Cut Diamond",
      image: "https://cdn-media.glamira.com/media/product/newgeneration/view/1/sku/dalinda-r/diamond/diamond-Brillant_AAA/stone2/diamond-Brillant_AAA/alloycolour/red.jpg",
    },
    {
      id: 6,
      name: "Pear Diamond Pendant",
      price: 2999,
      description: "1 Carat Pear Diamond",
      image: "https://5.imimg.com/data5/SELLER/Default/2024/10/457282560/NU/FO/NP/220477912/3l-plastic-wheel-dustbin-1000x1000.jpg",
    },
    {
      id: 7,
      name: "Diamond Halo Ring",
      price: 3499,
      description: "1.2 Carat Center Diamond",
      image: "https://media.istockphoto.com/id/483048997/photo/three-stone-rings-on-black.jpg?s=612x612&w=0&k=20&c=meHNA6n_bk5eVO4cuGXnJYGxb2sF6PHnkKGUuWBMCH0=",
    },
    {
      id: 8,
      name: "Sapphire and Diamond Ring",
      price: 4499,
      description: "2 Carat Sapphire with Diamonds",
      image: "https://thumbs.dreamstime.com/b/ornate-gold-ring-blue-sapphire-diamond-accents-black-background-featuring-vibrant-its-center-surrounded-351639186.jpg",
    },
    {
      id: 9,
      name: "Gold Diamond Bracelet",
      price: 6999,
      description: "14K Gold with 2 Carat Diamonds",
      image: "https://priyaasi.com/cdn/shop/products/BA-PR-40343.CR.jpg?v=1716881116&width=1800",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">Discover Timeless Beauty</h1>
            <p className="text-xl mb-8">Explore our exclusive collection of premium diamonds</p>
            <Link 
              to="/products"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg inline-flex items-center space-x-2 hover:bg-blue-700 transition-transform transform hover:scale-105"
            >
              <span>Shop Now</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Diamond className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Only the finest diamonds make it to our collection</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Certified Authentic</h3>
              <p className="text-gray-600">Every diamond comes with authentication certificate</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Truck className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Shipping</h3>
              <p className="text-gray-600">Fully insured worldwide shipping</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
              >
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <p className="text-2xl font-bold text-blue-600 mb-4">${product.price}</p>
                  <Link
                    to={`/products/${product.id}`}
                    className="block w-full bg-blue-600 text-white py-2 text-center rounded hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
