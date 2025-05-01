import React from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <span className="text-6xl">❌</span>
          <h1 className="text-2xl font-bold text-red-600 mt-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mt-2">
            The product you're looking for doesn't exist.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            🔙 Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Get 3 related products (exclude current product)
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          {/* Ratings and Reviews */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xl ${
                    i < Math.round(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-gray-600">
              ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <p className="text-4xl font-bold text-gray-900">
            ${product.price.toLocaleString()}
          </p>

          {/* Specifications */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-gray-900">Specifications:</h3>
            <ul className="list-disc list-inside text-gray-600">
              {product.specifications.map((spec, index) => (
                <li key={index}>
                  <strong>{spec.name}:</strong> {spec.value}
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition-colors flex-1 shadow-md hover:shadow-lg">
              🛒 Add to Cart
            </button>
            <button className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex-1 shadow-md hover:shadow-lg">
              🚀 Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Related Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

// Reusable Product Card Component
const ProductCard = ({ item }) => (
  <article className="group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
    <Link to={`/products/${item.id}`} className="block">
      <div className="aspect-square overflow-hidden">
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
        <p className="text-lg text-gray-600">${item.price.toLocaleString()}</p>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`${
                i < Math.round(item.rating) ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
          <span className="text-gray-600 ml-2">({item.reviewCount})</span>
        </div>
      </div>
    </Link>
  </article>
);

export default ProductDetail;