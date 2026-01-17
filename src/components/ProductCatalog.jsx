import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { allProducts } from '../data/Product';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductCatalog = () => {
  const [activeTab, setActiveTab] = useState('Dals And Pulses');
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const { isAuthenticated } = useAuth();
  
  const categories = [
    { label: 'Dals And Pulses', value: 'Dals And Pulses' },
    { label: 'Ghee & Oils', value: 'Ghee & Oils' },
    { label: 'Atta & Flours', value: 'Atta & Flours' },
    { label: 'Masalas Spices', value: 'Masalas Spices' },
    { label: 'Rice & Rice Products', value: 'Rice & Rice Products' },
    { label: 'Mobiles & Tablets', value: 'Mobiles & Tablets' },
    { label: 'TV & Speaker', value: 'TV & Speaker' },
    { label: 'Men Western Wear', value: 'Men Western Wear' }
  ];

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

  const StarRating = ({ rating }) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={
            star <= Math.floor(rating)
              ? 'fill-yellow-400 text-yellow-400'
              : star === Math.ceil(rating) && rating % 1 !== 0
              ? 'fill-yellow-400 text-yellow-400 opacity-50'
              : 'fill-gray-200 text-gray-200'
          }
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Popular Products</h1>
          
          <div className="flex flex-wrap gap-6 border-b border-gray-200 pb-1">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveTab(category.value)}
                className={`pb-3 px-1 text-sm font-medium transition-colors relative whitespace-nowrap ${
                  activeTab === category.value
                    ? 'text-teal-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {category.label}
                {activeTab === category.value && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allProducts[activeTab]?.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden border border-gray-100 group cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <div className={`absolute top-3 left-3 ${product.tagColor} text-white px-3 py-1 rounded-full text-xs font-semibold z-10`}>
                  {product.tag}
                </div>
                
                {/* Hover Icons */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex gap-3">
                  <button 
                    onClick={(e) => handleWishlistClick(e, product)}
                    className="bg-white rounded-lg p-3 shadow-lg hover:bg-gray-50 transition-colors"
                  >
                    <Heart 
                      size={20} 
                      className={isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-teal-600"} 
                    />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${product.id}`);
                    }}
                    className="bg-white rounded-lg p-3 shadow-lg hover:bg-gray-50 transition-colors"
                  >
                    <Eye size={20} className="text-teal-600" />
                  </button>
                </div>
                
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Product Details */}
              <div className="p-4">
                <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
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
                    Rs: {product.price}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    Rs: {product.originalPrice}
                  </span>
                </div>

                {/* Add Button */}
                <button 
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full bg-teal-100 hover:bg-teal-200 text-teal-700 font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} />
                  ADD
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