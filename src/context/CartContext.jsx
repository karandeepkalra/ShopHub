import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
  getUserCart,
  getUserWishlist,
  addToUserCart,
  removeFromUserCart,
  updateUserCart,
  addToUserWishlist,
  removeFromUserWishlist
} from '../firebase/config';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    console.warn('useCart must be used within a CartProvider. Returning fallback values.');
    // Return fallback functions to prevent crashes
    return {
      cart: [],
      wishlist: [],
      loading: true,
      addToCart: async () => { },
      removeFromCart: async () => { },
      updateQuantity: async () => { },
      addToWishlist: async () => { },
      removeFromWishlist: async () => { },
      isInWishlist: () => false,
      getCartTotal: () => 0,
      getCartCount: () => 0
    };
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  // Load user's cart and wishlist from Firebase when user changes
  useEffect(() => {
    const loadUserData = async () => {
      if (isAuthenticated && user) {
        setLoading(true);
        try {
          console.log('Loading user data for:', user.uid);
          const [userCart, userWishlist] = await Promise.all([
            getUserCart(user.uid),
            getUserWishlist(user.uid)
          ]);
          setCart(userCart);
          setWishlist(userWishlist);
          console.log('User data loaded successfully');
        } catch (error) {
          console.error('Error loading user data:', error);
          setCart([]);
          setWishlist([]);
        } finally {
          setLoading(false);
        }
      } else {
        // Clear cart and wishlist when user is not authenticated
        console.log('User not authenticated, clearing cart and wishlist');
        setCart([]);
        setWishlist([]);
        setLoading(false);
      }
    };

    loadUserData();
  }, [user, isAuthenticated]);

  const addToCart = async (product) => {
    if (!isAuthenticated || !user) {
      console.warn('User not authenticated, cannot add to cart');
      console.log('Is authenticated:', isAuthenticated);
      console.log('User:', user);
      return;
    }

    console.log('CartContext: Adding to cart:', product.name, 'User:', user.uid);
    console.log('CartContext: Current cart before adding:', cart);

    try {
      const result = await addToUserCart(user.uid, product);
      console.log('CartContext: Firebase result:', result);

      if (result.success) {
        console.log('CartContext: Firebase operation successful, updating local state...');
        // Update local state
        setCart(prevCart => {
          console.log('CartContext: Previous cart:', prevCart);
          const existingItem = prevCart.find(item => item.id === product.id);
          if (existingItem) {
            console.log('CartContext: Updating existing item quantity');
            const newCart = prevCart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            console.log('CartContext: New cart (updated quantity):', newCart);
            return newCart;
          }
          console.log('CartContext: Adding new item to cart');
          const newCart = [...prevCart, { ...product, quantity: 1 }];
          console.log('CartContext: New cart (new item):', newCart);
          return newCart;
        });
      } else {
        console.error('CartContext: Firebase operation failed:', result.error);
      }
    } catch (error) {
      console.error('CartContext: Error adding to cart:', error);
    }

    console.log('CartContext: Final cart state:', cart);
  };

  const removeFromCart = async (productId) => {
    if (!isAuthenticated || !user) {
      console.warn('User not authenticated, cannot remove from cart');
      return;
    }

    try {
      const result = await removeFromUserCart(user.uid, productId);
      if (result.success) {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!isAuthenticated || !user) {
      console.warn('User not authenticated, cannot update quantity');
      return;
    }

    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    try {
      const updatedCart = cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      const result = await updateUserCart(user.uid, updatedCart);
      if (result.success) {
        setCart(updatedCart);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const addToWishlist = async (product) => {
    if (!isAuthenticated || !user) {
      console.warn('User not authenticated, cannot add to wishlist');
      return;
    }

    console.log('CartContext: Adding to wishlist:', product.name, 'User:', user.uid);

    try {
      const result = await addToUserWishlist(user.uid, product);
      console.log('CartContext: Firebase wishlist result:', result);

      if (result.success) {
        setWishlist(prevWishlist => {
          const exists = prevWishlist.some(item => item.id === product.id);
          if (!exists) {
            console.log('CartContext: Adding new item to wishlist');
            return [...prevWishlist, product];
          }
          console.log('CartContext: Item already in wishlist');
          return prevWishlist;
        });
      } else {
        console.error('CartContext: Firebase wishlist operation failed:', result.error);
      }
    } catch (error) {
      console.error('CartContext: Error adding to wishlist:', error);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!isAuthenticated || !user) {
      console.warn('User not authenticated, cannot remove from wishlist');
      return;
    }

    try {
      const result = await removeFromUserWishlist(user.uid, productId);
      if (result.success) {
        setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    wishlist,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getCartTotal,
    getCartCount,
    getWishlistCount: () => wishlist.length
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
