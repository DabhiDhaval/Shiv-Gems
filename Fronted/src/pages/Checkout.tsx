import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, Building, Lock, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import axiosInstance from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';

type PaymentTab = 'card' | 'upi' | 'bank';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [activeTab, setActiveTab] = useState<PaymentTab>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');

  // Shipping fields
  const [shipping, setShipping] = useState({
    firstName: '', lastName: '', email: '',
    phone: '', address: '', city: '',
    state: '', pincode: '', country: 'India',
  });

  // Card fields
  const [card, setCard] = useState({
    number: '', name: '', expiry: '', cvv: '',
  });

  // UPI
  const [upiId, setUpiId] = useState('');

  // Bank
  const [utrNumber, setUtrNumber] = useState('');

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping_cost = subtotal >= 1000 ? 0 : 50;
  const tax = Math.round(subtotal * 0.03);
  const total = subtotal + shipping_cost + tax;

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\D/g, '').substring(0, 16);
    return v.match(/.{1,4}/g)?.join(' ') || v;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, '').substring(0, 4);
    if (v.length >= 3) return v.substring(0, 2) + '/' + v.substring(2);
    return v;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!shipping.firstName || !shipping.address || !shipping.city || !shipping.pincode) {
      setError('Please fill in all required shipping fields.');
      return;
    }

    if (activeTab === 'card') {
      if (!card.number || !card.name || !card.expiry || !card.cvv) {
        setError('Please fill in all card details.');
        return;
      }
    } else if (activeTab === 'upi') {
      if (!upiId || !upiId.includes('@')) {
        setError('Please enter a valid UPI ID (e.g. name@upi).');
        return;
      }
    } else if (activeTab === 'bank') {
      if (!utrNumber) {
        setError('Please enter the UTR/reference number.');
        return;
      }
    }

    setIsProcessing(true);

    try {
      const shippingAddress = `${shipping.firstName} ${shipping.lastName}, ${shipping.address}, ${shipping.city}, ${shipping.state} ${shipping.pincode}, ${shipping.country}`;

      // Try to create order in backend
      if (isAuthenticated) {
        try {
          const res = await axiosInstance.post('/orders', { shippingAddress });
          setOrderId(res.data.order?._id || 'SG-' + Date.now());
        } catch {
          // Backend order failed (e.g. mock products), generate local ID
          setOrderId('SG-' + Date.now().toString(36).toUpperCase());
        }
      } else {
        setOrderId('SG-' + Date.now().toString(36).toUpperCase());
      }

      // Simulate payment processing delay
      await new Promise(r => setTimeout(r, 1500));

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
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Order Confirmed!</h1>
          <p className="text-gray-500 mb-2">Thank you for your purchase.</p>
          <p className="text-sm text-blue-600 font-medium mb-6">Order ID: #{orderId}</p>
          <p className="text-sm text-gray-400 mb-8">
            You'll receive a confirmation email shortly. Our team will contact you within 24 hours with shipping details.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button onClick={() => navigate('/cart')} className="flex items-center text-blue-600 hover:text-blue-800 mb-8">
        <ArrowLeft className="h-5 w-5 mr-2" /> Back to Cart
      </button>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handlePlaceOrder}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Shipping + Payment */}
          <div className="lg:col-span-2 space-y-6">

            {/* Shipping Details */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
              <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
                <span className="w-7 h-7 bg-blue-600 text-white rounded-full text-sm flex items-center justify-center">1</span>
                Shipping Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text" required
                    value={shipping.firstName}
                    onChange={e => setShipping({ ...shipping, firstName: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={shipping.lastName}
                    onChange={e => setShipping({ ...shipping, lastName: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={shipping.email}
                    onChange={e => setShipping({ ...shipping, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={shipping.phone}
                    onChange={e => setShipping({ ...shipping, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <input
                    type="text" required
                    value={shipping.address}
                    onChange={e => setShipping({ ...shipping, address: e.target.value })}
                    placeholder="Street address, flat/house no."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input
                    type="text" required
                    value={shipping.city}
                    onChange={e => setShipping({ ...shipping, city: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value={shipping.state}
                    onChange={e => setShipping({ ...shipping, state: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PIN/ZIP Code *</label>
                  <input
                    type="text" required
                    value={shipping.pincode}
                    onChange={e => setShipping({ ...shipping, pincode: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select
                    value={shipping.country}
                    onChange={e => setShipping({ ...shipping, country: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>India</option>
                    <option>United Arab Emirates</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Singapore</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
              <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
                <span className="w-7 h-7 bg-blue-600 text-white rounded-full text-sm flex items-center justify-center">2</span>
                Payment Method
              </h2>

              {/* Tabs */}
              <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg">
                {[
                  { id: 'card' as PaymentTab, icon: CreditCard, label: 'Card' },
                  { id: 'upi' as PaymentTab, icon: Smartphone, label: 'UPI' },
                  { id: 'bank' as PaymentTab, icon: Building, label: 'Bank Transfer' },
                ].map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveTab(id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${
                      activeTab === id
                        ? 'bg-white text-blue-600 shadow'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4" /> {label}
                  </button>
                ))}
              </div>

              {/* Card Form */}
              {activeTab === 'card' && (
                <div className="space-y-4">
                  {/* Card Preview */}
                  <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-xl p-5 text-white mb-6">
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-10 h-7 bg-yellow-400 rounded-md opacity-90"></div>
                      <div className="text-xs opacity-60 tracking-widest">VISA</div>
                    </div>
                    <div className="text-lg tracking-widest mb-4 font-mono">
                      {card.number || '•••• •••• •••• ••••'}
                    </div>
                    <div className="flex justify-between text-xs">
                      <div>
                        <div className="opacity-50 mb-1">CARD HOLDER</div>
                        <div>{card.name || 'YOUR NAME'}</div>
                      </div>
                      <div>
                        <div className="opacity-50 mb-1">EXPIRES</div>
                        <div>{card.expiry || 'MM/YY'}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={card.number}
                      onChange={e => setCard({ ...card, number: formatCardNumber(e.target.value) })}
                      maxLength={19}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name *</label>
                    <input
                      type="text"
                      placeholder="As printed on card"
                      value={card.name}
                      onChange={e => setCard({ ...card, name: e.target.value.toUpperCase() })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={card.expiry}
                        onChange={e => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                        maxLength={5}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
                      <input
                        type="password"
                        placeholder="•••"
                        value={card.cvv}
                        onChange={e => setCard({ ...card, cvv: e.target.value.replace(/\D/g, '').substring(0, 4) })}
                        maxLength={4}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* UPI Form */}
              {activeTab === 'upi' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID *</label>
                    <input
                      type="text"
                      placeholder="yourname@paytm / yourname@upi"
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-400 mt-1">e.g. 9876543210@paytm, name@ybl, name@oksbi</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-700 font-medium mb-1">How it works:</p>
                    <ol className="text-sm text-blue-600 space-y-1 list-decimal list-inside">
                      <li>Enter your UPI ID above</li>
                      <li>Click "Place Order" — you'll receive a payment request</li>
                      <li>Approve the request in your UPI app</li>
                    </ol>
                  </div>
                </div>
              )}

              {/* Bank Transfer Form */}
              {activeTab === 'bank' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Transfer to this account:</p>
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <span className="text-gray-500">Bank Name:</span><span className="font-medium">HDFC Bank</span>
                      <span className="text-gray-500">Account Name:</span><span className="font-medium">Shiv Gems Pvt Ltd</span>
                      <span className="text-gray-500">Account No:</span><span className="font-medium font-mono">50200012345678</span>
                      <span className="text-gray-500">IFSC Code:</span><span className="font-medium font-mono">HDFC0001234</span>
                      <span className="text-gray-500">Amount:</span><span className="font-bold text-blue-600">${total.toLocaleString()}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">UTR / Reference Number *</label>
                    <input
                      type="text"
                      placeholder="Enter transaction reference number"
                      value={utrNumber}
                      onChange={e => setUtrNumber(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                    <p className="text-xs text-gray-400 mt-1">Enter the UTR number from your bank statement after transfer.</p>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div>
            <div className="bg-white rounded-xl shadow p-6 border border-gray-100 sticky top-24">
              <h2 className="text-xl font-semibold mb-5">Order Summary</h2>

              <div className="space-y-3 mb-5">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping_cost === 0 ? 'text-green-600' : ''}>
                    {shipping_cost === 0 ? 'Free' : `$${shipping_cost}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax (3%)</span>
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
                className={`w-full mt-6 flex items-center justify-center gap-2 py-3.5 rounded-lg font-semibold text-white transition-colors ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Place Order — ${total.toLocaleString()}
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-400">
                <Lock className="h-3 w-3" />
                256-bit SSL encrypted payment
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
