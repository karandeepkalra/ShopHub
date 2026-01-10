import React, { useState } from 'react';
import { Star } from 'lucide-react';

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState('Top Selling');

  const tabs = ['Top Selling', 'Trending Products', 'Recently Added', 'Top Rated'];

  const products = {
    'Top Selling': [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=150&h=150&fit=crop',
        name: 'Nestle Orignal Coffee-Mate Coffee Center',
        rating: 4,
        price: 28.33,
        originalPrice: 33.33
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=150&h=150&fit=crop',
        name: 'Nestle Orignal Coffee-Mate Coffee Center',
        rating: 4,
        price: 28.33,
        originalPrice: 33.33
      },
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=150&h=150&fit=crop',
        name: 'Nestle Orignal Coffee-Mate Coffee Center',
        rating: 4,
        price: 28.33,
        originalPrice: 33.33
      }
    ],
    'Trending Products': [
      {
        id: 4,
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784386?w=150&h=150&fit=crop',
        name: 'Nestle Orignal Coffee-Mate Coffee Center',
        rating: 4,
        price: 28.33,
        originalPrice: 33.33
      },
      {
        id: 5,
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784386?w=150&h=150&fit=crop',
        name: 'Nestle Orignal Coffee-Mate Coffee Center',
        rating: 4,
        price: 28.33,
        originalPrice: 33.33
      },
      {
        id: 6,
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784386?w=150&h=150&fit=crop',
        name: 'Nestle Orignal Coffee-Mate Coffee Center',
        rating: 4,
        price: 28.33,
        originalPrice: 33.33
      }
    ],
    'Recently Added': [
      {
        id: 7,
        image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=150&h=150&fit=crop',
        name: 'Nestle Orignal Coffee-Mate Coffee Center',
        rating: 3,
        price: 28.33,
        originalPrice: 33.33
      },
      {
        id: 8,
        image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=150&h=150&fit=crop',
        name: 'Nestle Orignal Coffee-Mate Coffee Center',
        rating: 3,
        price: 28.33,
        originalPrice: 33.33
      },
      {
        id: 9,
        image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=150&h=150&fit=crop',
        name: 'Nestle Orignal Coffee-Mate Coffee Center',
        rating: 3,
        price: 28.33,
        originalPrice: 33.33
      }
    ],
    'Top Rated': [
      {
        id: 10,
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784386?w=150&h=150&fit=crop',
        name: 'Nestle Orignal Coffee-Mate Coffee Center',
        rating: 4,
        price: 28.33,
        originalPrice: 33.33
      },
      {
        id: 11,
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784386?w=150&h=150&fit=crop',
        name: 'Nestle Orignal Coffee-Mate Coffee Center',
        rating: 4,
        price: 28.33,
        originalPrice: 33.33
      },
      {
        id: 12,
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784386?w=150&h=150&fit=crop',
        name: 'Nestle Orignal Coffee-Mate Coffee Center',
        rating: 4,
        price: 28.33,
        originalPrice: 33.33
      }
    ]
  };

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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="w-full mx-auto px-4">
        {/* Tabs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tabs.map((tab) => (
            <div key={tab} className="bg-white rounded-lg shadow-sm">
              {/* Tab Header */}
              <div className="border-b-2 border-green-500 p-4">
                <h2 className="text-xl font-semibold text-gray-800">{tab}</h2>
              </div>

              {/* Products List */}
              <div className="p-4 space-y-4">
                {products[tab].map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 items-start hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      
                      <div className="mb-2">
                        <StarRating rating={product.rating} />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-green-600">
                          ${product.price}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          ${product.originalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;