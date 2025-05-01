// useCart.tsx
import { useContext } from 'react';
import { CartContext } from './CartContext'; // Adjust the path as necessary

export const useCart = () => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};

export default useCart;