import React from 'react';
import { Star, Heart, Eye, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  const { isAuthenticated } = useAuth();
  const { formatPrice, formatVendorPrice } = useCurrency();

  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }
          />
        ))}
      </div>
    );
  };

  const handleViewProduct = (e) => {
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    await addToCart(product);
  };

  const handleAddToWishlist = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    await addToWishlist(product);
  };

  return (
    <div 
      onClick={handleViewProduct}
      className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer transform hover:-translate-y-1"
    >
      <div className="relative overflow-hidden">
        <div className={`absolute top-2 sm:top-3 left-2 sm:left-3 ${product.badgeColor || product.tagColor || 'bg-pink-500'} text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold z-10 animate-pulse`}>
          {product.badge || product.tag}
        </div>
        
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <button 
            onClick={handleAddToWishlist}
            className={`p-2 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-110 ${
              isInWishlist(product.id) ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
            }`}
            title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={18} className={isInWishlist(product.id) ? 'fill-current' : ''} />
          </button>
          <button 
            onClick={handleViewProduct}
            className="p-2 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-110 text-gray-600 hover:text-blue-500"
            title="Quick view"
          >
            <Eye size={18} />
          </button>
        </div>
        
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Quick add to cart overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2 transform translate-y-2 group-hover:translate-y-0"
          >
            <ShoppingCart size={16} />
            <span className="text-sm">Quick Add</span>
          </button>
        </div>
      </div>
      
      <div className="p-3 sm:p-4">
        <p className="text-xs text-gray-500 mb-1 truncate">{product.category || product.brand}</p>
        <h3 className="text-sm font-medium text-gray-800 mb-2 h-8 sm:h-10 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="mb-2 sm:mb-3">
          <StarRating rating={product.rating} />
        </div>
        <div className="text-xs text-gray-500 mb-2 sm:mb-3">
          By {product.brand}
        </div>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <span className="text-base sm:text-lg font-bold text-blue-600">
            {product.currency ? formatVendorPrice(product.price, product.currency) : formatPrice(product.price)}
          </span>
          {product.originalPrice && Number(product.originalPrice) > Number(product.price) && (
            <>
              <span className="text-xs sm:text-sm text-gray-400 line-through">
                {product.currency ? formatVendorPrice(product.originalPrice, product.currency) : formatPrice(product.originalPrice)}
              </span>
              <span className="text-xs text-red-500 font-semibold">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            </>
          )}
        </div>
        <button 
          onClick={handleAddToCart}
          className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 sm:py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-md"
        >
          <ShoppingCart size={16} />
          <span className="text-sm">ADD TO CART</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;