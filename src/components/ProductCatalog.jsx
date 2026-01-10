import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';

const ProductCatalog = () => {
  const [activeTab, setActiveTab] = useState('Dals And Pulses');

  const categories = [
    'Dals And Pulses',
    'Ghee & Oils',
    'Atta & Flours',
    'Masalas Spices',
    'Rice & Rice Products',
    'Mobiles & Tablets',
    'TV & Speaker',
    'Men Western Wear'
  ];

  const products = {
    'Dals And Pulses': [
      {
        id: 1,
        tag: 'Hot',
        tagColor: 'bg-pink-500',
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop',
        brand: 'AASHIRVAAD',
        name: 'Good Life Whole Moong 500 g',
        rating: 3.5,
        price: 20,
        originalPrice: 140
      },
      {
        id: 2,
        tag: 'New',
        tagColor: 'bg-green-500',
        image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=400&fit=crop',
        brand: 'Private Label',
        name: 'Moong Dal 2 kg',
        rating: 4,
        price: 246,
        originalPrice: 320
      },
      {
        id: 3,
        tag: 'Hot',
        tagColor: 'bg-pink-500',
        image: 'https://images.unsplash.com/photo-1599909421556-23b9f97da1e1?w=400&h=400&fit=crop',
        brand: 'Good Life',
        name: 'Good Life Raw Peanuts 500 g',
        rating: 3.5,
        price: 89,
        originalPrice: 150
      },
      {
        id: 4,
        tag: 'Sale',
        tagColor: 'bg-blue-400',
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop',
        brand: 'Tata Sampann',
        name: 'Tata Sampann Moong 500 g',
        rating: 4,
        price: 74,
        originalPrice: 95
      },
      {
        id: 5,
        tag: 'Hot',
        tagColor: 'bg-pink-500',
        image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=400&fit=crop',
        brand: 'Good Life',
        name: 'Good Life Moong Dal 1 kg',
        rating: 4.5,
        price: 145,
        originalPrice: 189
      }
    ],
    'Ghee & Oils': [
      {
        id: 6,
        tag: 'Hot',
        tagColor: 'bg-pink-500',
        image: 'https://images.unsplash.com/photo-1628278342011-c3de8ce6e4e7?w=400&h=400&fit=crop',
        brand: 'Gowardhan',
        name: 'Gowardhan Pure Cow Ghee 1 L (Jar)',
        rating: 3.5,
        price: 676,
        originalPrice: 820
      },
      {
        id: 7,
        tag: 'New',
        tagColor: 'bg-green-500',
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop',
        brand: 'Nestle',
        name: 'Nestle EveryDay Ghee 1 L (Carton)',
        rating: 4,
        price: 579,
        originalPrice: 620
      },
      {
        id: 8,
        tag: 'Sale',
        tagColor: 'bg-blue-400',
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop',
        brand: 'Amul',
        name: 'Amul Cow Ghee 1 L (Pouch)',
        rating: 3.5,
        price: 250,
        originalPrice: 300
      },
      {
        id: 9,
        tag: 'Hot',
        tagColor: 'bg-pink-500',
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop',
        brand: 'Amul',
        name: 'Amul Cow Ghee 500 ml (Pouch)',
        rating: 4,
        price: 300,
        originalPrice: 380
      }
    ],
    'Atta & Flours': [
      {
        id: 10,
        tag: 'Hot',
        tagColor: 'bg-pink-500',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
        brand: 'Aashirvaad',
        name: 'Aashirvaad Superior MP Whole Wheat Atta 5 kg',
        rating: 3.5,
        price: 320,
        originalPrice: 380
      },
      {
        id: 11,
        tag: 'New',
        tagColor: 'bg-green-500',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
        brand: 'Aashirvaad',
        name: 'Aashirvaad Select Sharbati Whole Wheat Atta 5 kg',
        rating: 4,
        price: 350,
        originalPrice: 380
      },
      {
        id: 12,
        tag: 'Sale',
        tagColor: 'bg-blue-400',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
        brand: 'Aashirvaad',
        name: 'Aashirvaad Superior MP Whole Wheat Atta 10 kg',
        rating: 3.5,
        price: 250,
        originalPrice: 300
      },
      {
        id: 13,
        tag: 'Hot',
        tagColor: 'bg-pink-500',
        image: 'https://images.unsplash.com/photo-1574168370583-0c1f08916b86?w=400&h=400&fit=crop',
        brand: 'Private Label',
        name: 'Chakki Atta 10 kg',
        rating: 4,
        price: 400,
        originalPrice: 500
      }
    ],
    'Masalas Spices': [
      {
        id: 14,
        tag: 'Hot',
        tagColor: 'bg-pink-500',
        image: 'https://images.unsplash.com/photo-1596040033229-a0b3b83d5b1f?w=400&h=400&fit=crop',
        brand: 'MDH',
        name: 'MDH Garam Masala 100 g',
        rating: 4.5,
        price: 85,
        originalPrice: 110
      },
      {
        id: 15,
        tag: 'Sale',
        tagColor: 'bg-blue-400',
        image: 'https://images.unsplash.com/photo-1599909421557-c02a4f9d3c4f?w=400&h=400&fit=crop',
        brand: 'Everest',
        name: 'Everest Turmeric Powder 200 g',
        rating: 4,
        price: 95,
        originalPrice: 120
      },
      {
        id: 16,
        tag: 'New',
        tagColor: 'bg-green-500',
        image: 'https://images.unsplash.com/photo-1596040033229-a0b3b83d5b1f?w=400&h=400&fit=crop',
        brand: 'Tata Sampann',
        name: 'Tata Sampann Red Chilli Powder 200 g',
        rating: 4,
        price: 110,
        originalPrice: 140
      },
      {
        id: 17,
        tag: 'Hot',
        tagColor: 'bg-pink-500',
        image: 'https://images.unsplash.com/photo-1599909421557-c02a4f9d3c4f?w=400&h=400&fit=crop',
        brand: 'MDH',
        name: 'MDH Coriander Powder 100 g',
        rating: 4,
        price: 65,
        originalPrice: 85
      }
    ],
    'Rice & Rice Products': [
      {
        id: 18,
        tag: 'Hot',
        tagColor: 'bg-pink-500',
        image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&h=400&fit=crop',
        brand: 'India Gate',
        name: 'India Gate Basmati Rice 5 kg',
        rating: 4.5,
        price: 650,
        originalPrice: 750
      },
      {
        id: 19,
        tag: 'New',
        tagColor: 'bg-green-500',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
        brand: 'Daawat',
        name: 'Daawat Brown Rice 1 kg',
        rating: 4,
        price: 180,
        originalPrice: 220
      },
      {
        id: 20,
        tag: 'Sale',
        tagColor: 'bg-blue-400',
        image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&h=400&fit=crop',
        brand: 'Fortune',
        name: 'Fortune Biryani Special Rice 5 kg',
        rating: 4,
        price: 450,
        originalPrice: 550
      },
      {
        id: 21,
        tag: 'Hot',
        tagColor: 'bg-pink-500',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
        brand: 'Kohinoor',
        name: 'Kohinoor Super Basmati Rice 1 kg',
        rating: 4.5,
        price: 220,
        originalPrice: 260
      }
    ],
    'Mobiles & Tablets': [
      {
        id: 22,
        tag: 'Hot',
        tagColor: 'bg-pink-500',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
        brand: 'Samsung',
        name: 'Samsung Galaxy S23 128GB',
        rating: 4.5,
        price: 54999,
        originalPrice: 64999
      },
      {
        id: 23,
        tag: 'New',
        tagColor: 'bg-green-500',
        image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&h=400&fit=crop',
        brand: 'Apple',
        name: 'iPad Air 64GB WiFi',
        rating: 5,
        price: 54900,
        originalPrice: 59900
      },
      {
        id: 24,
        tag: 'Sale',
        tagColor: 'bg-blue-400',
        image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop',
        brand: 'OnePlus',
        name: 'OnePlus 11R 5G 128GB',
        rating: 4,
        price: 34999,
        originalPrice: 39999
      },
      {
        id: 25,
        tag: 'Hot',
        tagColor: 'bg-pink-500',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
        brand: 'Xiaomi',
        name: 'Xiaomi Pad 6 128GB',
        rating: 4,
        price: 26999,
        originalPrice: 29999
      }
    ],
    'TV & Speaker': [
      {
        id: 26,
        tag: 'Sale',
        tagColor: 'bg-blue-400',
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop',
        brand: 'Sony',
        name: 'Sony 55" 4K Smart TV',
        rating: 4.5,
        price: 52999,
        originalPrice: 64999
      },
      {
        id: 27,
        tag: 'Hot',
        tagColor: 'bg-pink-500',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
        brand: 'JBL',
        name: 'JBL Flip 6 Bluetooth Speaker',
        rating: 4,
        price: 9999,
        originalPrice: 12999
      },
      {
        id: 28,
        tag: 'New',
        tagColor: 'bg-green-500',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
        brand: 'Samsung',
        name: 'Samsung 43" Full HD Smart TV',
        rating: 4,
        price: 28999,
        originalPrice: 34999
      },
      {
        id: 29,
        tag: 'Sale',
        tagColor: 'bg-blue-400',
        image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=400&fit=crop',
        brand: 'boAt',
        name: 'boAt Stone 1000 Bluetooth Speaker',
        rating: 4,
        price: 2499,
        originalPrice: 3999
      }
    ],
    'Men Western Wear': [
      {
        id: 30,
        tag: 'New',
        tagColor: 'bg-green-500',
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop',
        brand: 'Levis',
        name: 'Levis Men Slim Fit Jeans',
        rating: 4.5,
        price: 2499,
        originalPrice: 3499
      },
      {
        id: 31,
        tag: 'Sale',
        tagColor: 'bg-blue-400',
        image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=400&h=400&fit=crop',
        brand: 'Allen Solly',
        name: 'Allen Solly Casual Shirt',
        rating: 4,
        price: 1299,
        originalPrice: 1999
      },
      {
        id: 32,
        tag: 'Hot',
        tagColor: 'bg-pink-500',
        image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&h=400&fit=crop',
        brand: 'US Polo',
        name: 'US Polo T-Shirt Regular Fit',
        rating: 4,
        price: 899,
        originalPrice: 1499
      },
      {
        id: 33,
        tag: 'New',
        tagColor: 'bg-green-500',
        image: 'https://images.unsplash.com/photo-1602810316693-3667c854239a?w=400&h=400&fit=crop',
        brand: 'Peter England',
        name: 'Peter England Formal Trousers',
        rating: 4,
        price: 1599,
        originalPrice: 2299
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
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Popular Products</h1>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-6 border-b border-gray-200 pb-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`pb-3 px-1 text-sm font-medium transition-colors relative whitespace-nowrap ${
                  activeTab === category
                    ? 'text-teal-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {category}
                {activeTab === category && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products[activeTab]?.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden border border-gray-100 group"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <div className={`absolute top-3 left-3 ${product.tagColor} text-white px-3 py-1 rounded-full text-xs font-semibold z-10`}>
                  {product.tag}
                </div>
                
                {/* Hover Icons */}
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
                <button className="w-full bg-teal-100 hover:bg-teal-200 text-teal-700 font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
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