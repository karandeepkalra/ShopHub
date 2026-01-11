import React from 'react';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, addToCart } = useCart();
  const navigate = useNavigate();

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Start adding products you love to your wishlist!</p>
            <button
              onClick={() => navigate('/')}
              className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Wishlist</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden border border-gray-100">
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <div className={`absolute top-3 left-3 ${product.tagColor} text-white px-3 py-1 rounded-full text-xs font-semibold z-10`}>
                  {product.tag}
                </div>
                
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Product Details */}
              <div className="p-4">
                <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
                <h3 className="text-sm font-medium text-gray-800 mb-2 h-10 line-clamp-2">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-teal-600">
                    Rs: {product.price}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    Rs: {product.originalPrice}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-teal-100 hover:bg-teal-200 text-teal-700 font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={16} />
                    Add
                  </button>
                  <button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
