import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import axiosInstance from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');

  const [shipping, setShipping] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
  });

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping_cost = subtotal >= 1000 ? 0 : 50;
  const tax = Math.round(subtotal * 0.03);
  const total = subtotal + shipping_cost + tax;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!shipping.firstName || !shipping.address || !shipping.city || !shipping.pincode) {
      setError('Please fill in all required shipping fields.');
      return;
    }

    if (cart.length === 0) {
      setError("Cart is empty.");
      return;
    }

    setIsProcessing(true);

    try {
      const shippingAddress = `${shipping.firstName} ${shipping.lastName}, ${shipping.address}, ${shipping.city}, ${shipping.state} ${shipping.pincode}, ${shipping.country}`;

      const orderPayload = {
        items: cart.map(item => ({
          productId: item.id,   // must match cart structure
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: total,
        shippingAddress
      };

      let generatedOrderId = '';

      if (isAuthenticated) {
        const res = await axiosInstance.post('/orders', orderPayload);
        generatedOrderId = res.data.orderId || res.data.order?._id;
      } else {
        generatedOrderId = 'SG-' + Date.now().toString(36).toUpperCase();
      }

      await new Promise(r => setTimeout(r, 1200));

      setOrderId(generatedOrderId);
      clearCart();
      setOrderSuccess(true);

    } catch (err: any) {
      setError(err.response?.data?.message || 'Order failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-lg p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Order Confirmed!</h1>
          <p className="text-blue-600 font-medium mb-6">Order ID: #{orderId}</p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button onClick={() => navigate('/cart')} className="flex items-center text-blue-600 mb-6">
        <ArrowLeft className="h-5 w-5 mr-2" /> Back to Cart
      </button>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-3 gap-8">

        {/* Shipping */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-6">Shipping Details</h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name *"
              value={shipping.firstName}
              onChange={e => setShipping({ ...shipping, firstName: e.target.value })}
              className="border rounded-lg px-3 py-2"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={shipping.lastName}
              onChange={e => setShipping({ ...shipping, lastName: e.target.value })}
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="text"
              placeholder="Address *"
              value={shipping.address}
              onChange={e => setShipping({ ...shipping, address: e.target.value })}
              className="border rounded-lg px-3 py-2 col-span-2"
              required
            />
            <input
              type="text"
              placeholder="City *"
              value={shipping.city}
              onChange={e => setShipping({ ...shipping, city: e.target.value })}
              className="border rounded-lg px-3 py-2"
              required
            />
            <input
              type="text"
              placeholder="State"
              value={shipping.state}
              onChange={e => setShipping({ ...shipping, state: e.target.value })}
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="text"
              placeholder="Pincode *"
              value={shipping.pincode}
              onChange={e => setShipping({ ...shipping, pincode: e.target.value })}
              className="border rounded-lg px-3 py-2"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mt-6">
              {error}
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">Order Summary</h2>

          {cart.map(item => (
            <div key={item.id} className="flex justify-between mb-3">
              <span>{item.name} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}

          <div className="border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping_cost === 0 ? 'Free' : `$${shipping_cost}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span className="text-blue-600">${total.toLocaleString()}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full mt-6 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-white ${
              isProcessing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isProcessing ? 'Processing...' : <> <Lock className="h-4 w-4" /> Place Order — ${total.toLocaleString()} </>}
          </button>
        </div>

      </form>
    </div>
  );
};

export default Checkout;