import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Diamond, ShoppingCart, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; // Assuming you have a CartContext

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cart } = useCart(); // Assuming cart is an array of items
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally, you can show an error message to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Diamond className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Shiv Gems</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600">Products</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
            
            {isAuthenticated ? (
              <>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="text-gray-700 hover:text-blue-600">
                    Admin Panel
                  </Link>
                )}
                <div className="flex items-center space-x-1 text-gray-700">
                  <User  className="h-5 w-5" />
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  disabled={loading}
                  className={`flex items-center space-x-1 text-gray-700 hover:text-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  aria-label="Logout"
                >
                  <LogOut className="h-5 w-5" />
                  <span>{loading ? 'Logging out...' : 'Logout'}</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600" aria-label="Login">
                <User  className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
            
            <Link to="/cart" className="relative flex items-center space-x-1 text-gray-700 hover:text-blue-600" aria-label="View cart">
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;