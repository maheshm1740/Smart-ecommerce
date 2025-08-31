import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart as apiClearCart } from '../api/cartApi';

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalItems: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCart({ items: [], totalItems: 0 });
      return;
    }

    try {
      setLoading(true);
      const cartData = await getCart();
      const items = Array.isArray(cartData) ? cartData : cartData.items || [];

      setCart({
        items,
        totalItems: items.reduce((total, item) => total + item.quantity, 0),
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Failed to load cart');
      setCart({ items: [], totalItems: 0 });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addItem = useCallback(async (productId, quantity = 1) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to add items to cart');
      return false;
    }

    try {
      setLoading(true);
      await addToCart(productId, quantity);
      await fetchCart();
      return true;
    } catch (err) {
      console.error('Error adding item:', err);
      setError('Failed to add item to cart');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchCart]);

  const updateItem = useCallback(async (productId, quantity) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to update cart');
      return false;
    }

    try {
      setLoading(true);
      if (quantity <= 0) {
        await removeFromCart(productId);
      } else {
        await updateCartItem(productId, quantity);
      }
      await fetchCart();
      return true;
    } catch (err) {
      console.error('Error updating item:', err);
      setError('Failed to update cart');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchCart]);

  const removeItem = useCallback(async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to remove items from cart');
      return false;
    }

    try {
      setLoading(true);
      await removeFromCart(productId);
      await fetchCart();
      return true;
    } catch (err) {
      console.error('Error removing item:', err);
      setError('Failed to remove item');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchCart]);

  const clearCart = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to clear cart');
      return false;
    }

    try {
      setLoading(true);
      await apiClearCart();
      await fetchCart();
      return true;
    } catch (err) {
      console.error('Error clearing cart:', err);
      setError('Failed to clear cart');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchCart]);

  const clearError = useCallback(() => setError(null), []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addItem,
        updateItem,
        removeItem,
        clearCart,
        clearError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
