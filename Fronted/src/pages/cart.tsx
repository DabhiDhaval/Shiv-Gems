import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [checkoutError, setCheckoutError] = useState('');

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Shopping
        </button>
        <div className="text-center py-20">
          <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-600 mb-2">Your cart is empty</p>
          <p className="text-gray-400 mb-6">Add some beautiful gems to get started.</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Browse Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-8"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Shopping
      </button>

      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {checkoutError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {checkoutError}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow border border-gray-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <p className="text-blue-600 font-medium mt-1">${item.price.toLocaleString()}</p>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1.5 rounded-full border border-gray-200 hover:bg-gray-100 transition"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1.5 rounded-full border border-gray-200 hover:bg-gray-100 transition"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <p className="text-lg font-bold text-gray-900 w-24 text-right">
                ${(item.price * item.quantity).toLocaleString()}
              </p>

              <button
                onClick={() => removeFromCart(item.id)}
                className="p-2 text-red-400 hover:text-red-600 transition"
                title="Remove item"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-sm text-gray-400 hover:text-red-500 transition mt-2"
          >
            Clear cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100 h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
              <span>${calculateTotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="text-green-600">
                {calculateTotal() >= 1000 ? 'Free' : '$50'}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Insurance</span>
              <span className="text-green-600">Included</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-blue-600">
                  ${(calculateTotal() + (calculateTotal() >= 1000 ? 0 : 50)).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Proceed to Checkout
          </button>
          <p className="text-xs text-gray-400 text-center mt-3">
            Secured by SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
