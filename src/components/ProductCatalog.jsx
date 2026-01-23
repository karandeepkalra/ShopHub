import React from 'react';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { allProducts } from '../data/Product';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductCatalog = ({ category = null, limit = 8 }) => {
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const { isAuthenticated } = useAuth();
  
  // Filter products by category if specified
  let products = [];
  if (category) {
    // If category is specified, get products from that category
    products = allProducts[category.toLowerCase()] || [];
  } else {
    // Otherwise, combine all categories
    products = Object.values(allProducts).flat();
  }
  
  // Apply limit if specified
  if (limit) {
    products = products.slice(0, limit);
  }

  const handleWishlistClick = (e, product) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    addToCart(product);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Popular Products</h1>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer border border-gray-100 group"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="relative pt-[100%]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                {product.badge && (
                  <span className={`absolute top-2 left-2 text-[10px] font-medium text-white px-1.5 py-0.5 rounded ${product.badgeColor || 'bg-blue-500'}`}>
                    {product.badge}
                  </span>
                )}
                <button
                  onClick={(e) => handleWishlistClick(e, product)}
                  className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full shadow-sm hover:bg-gray-100 transition-colors"
                >
                  <Heart
                    size={16}
                    className={isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'}
                  />
                </button>
              </div>
              <div className="p-3">
                <h3 className="text-xs text-gray-800 mb-1 font-medium line-clamp-2 h-8">{product.name}</h3>
                <p className="text-[11px] text-gray-500 mb-2">{product.brand}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-900">₹{product.price.toLocaleString()}</p>
                    {product.originalPrice > product.price && (
                      <div className="flex items-center">
                        <span className="text-[10px] text-gray-500 line-through mr-1">₹{product.originalPrice.toLocaleString()}</span>
                        <span className="text-[10px] font-medium text-green-600">
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                        </span>
                      </div>
                    )}
                  </div>
                  {product.sizes && (
                    <div className="text-[10px] text-gray-500">
                      Sizes: {product.sizes.join(', ')}
                    </div>
                  )}
                </div>
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full mt-2 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;