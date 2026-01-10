import React from 'react';
import { Star, Heart, Eye, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
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

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden border border-gray-100 group">
      <div className="relative overflow-hidden">
        <div className={`absolute top-3 left-3 ${product.badgeColor || 'bg-pink-500'} text-white px-3 py-1 rounded-full text-xs font-semibold z-10`}>
          {product.badge}
        </div>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex gap-3">
          <button className="bg-white rounded-lg p-3 shadow-lg hover:bg-gray-50 transition-colors">
            <Heart size={20} className="text-teal-600" />
          </button>
          <button className="bg-white rounded-lg p-3 shadow-lg hover:bg-gray-50 transition-colors">
            <Eye size={20} className="text-teal-600" />
          </button>
        </div>
        
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{product.category}</p>
        <h3 className="text-sm font-medium text-gray-800 mb-2 h-10 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="mb-3">
          <StarRating rating={product.rating} />
        </div>

        <div className="text-xs text-gray-500 mb-3">
          By {product.brand}
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-teal-600">
            Rs {product.price}
          </span>
          <span className="text-sm text-gray-400 line-through">
            Rs {product.originalPrice}
          </span>
        </div>

        <button className="w-full bg-teal-100 hover:bg-teal-200 text-teal-700 font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
          <ShoppingCart size={18} />
          ADD
        </button>
      </div>
    </div>
  );
};

export default ProductCard;