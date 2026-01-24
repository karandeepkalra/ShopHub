import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { allProducts } from '../data/Product';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const ProductCatalog = ({ category = null, limit = 8 }) => {
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const { isAuthenticated } = useAuth();
  const { formatPrice } = useCurrency();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from both static data and Firebase
  useEffect(() => {
    const loadProducts = async () => {
      try {
        let allProductList = [];

        // Get static products from local data
        if (category) {
          allProductList = allProducts[category.toLowerCase()] || [];
        } else {
          allProductList = Object.values(allProducts).flat();
        }

        // Fetch vendor products from Firebase
        try {
          const productsRef = collection(db, 'products');
          const snapshot = await getDocs(productsRef);
          const vendorProducts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          // Filter vendor products by category if specified
          const filteredVendorProducts = category
            ? vendorProducts.filter(product => product.category === category.toLowerCase())
            : vendorProducts;

          // Combine static and vendor products
          allProductList = [...allProductList, ...filteredVendorProducts];
        } catch (firebaseError) {
          console.error('Error fetching vendor products:', firebaseError);
          // Continue with static products if Firebase fails
        }

        // Apply limit if specified
        if (limit) {
          allProductList = allProductList.slice(0, limit);
        }

        setProducts(allProductList);
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category, limit]);

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

  if (loading) {
    return (
      <div className="w-full mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="text-center py-8">
          <p className="text-gray-500">Loading products...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="text-center py-8">
          <p className="text-gray-500">No products found in this category.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-3 sm:px-4 py-4 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Popular Products</h1>
        <p className="text-gray-600 text-sm sm:text-base">Discover our curated collection of trending items</p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 group transform hover:-translate-y-1"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="relative pt-[100%] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {product.badge && (
                <span className={`absolute top-2 left-2 text-[10px] sm:text-xs font-medium text-white px-2 py-1 rounded-full animate-pulse ${product.badgeColor || 'bg-blue-500'}`}>
                  {product.badge}
                </span>
              )}
              
              {/* Quick action buttons */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                <button
                  onClick={(e) => handleWishlistClick(e, product)}
                  className={`p-2 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-110 ${
                    isInWishlist(product.id) ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                  }`}
                  title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart
                    size={18}
                    className={isInWishlist(product.id) ? 'fill-current' : ''}
                  />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${product.id}`);
                  }}
                  className="p-2 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-110 text-gray-600 hover:text-blue-500"
                  title="Quick view"
                >
                  <Eye size={18} />
                </button>
              </div>
              
              {/* Quick add overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3">
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors transform translate-y-2 group-hover:translate-y-0"
                >
                  Quick Add
                </button>
              </div>
            </div>
            
            <div className="p-3 sm:p-4">
              <h3 className="text-xs sm:text-sm text-gray-800 mb-1 font-medium line-clamp-2 h-6 sm:h-8 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-500 mb-2">{product.brand}</p>
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={10}
                      className={
                        star <= (product.rating || 4)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-gray-200 text-gray-200'
                      }
                    />
                  ))}
                </div>
                <span className="text-[10px] text-gray-500">({product.rating || 4}.0)</span>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm sm:text-base font-bold text-gray-900">{formatPrice(product.price)}</p>
                  {product.originalPrice && Number(product.originalPrice) > Number(product.price) && (
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] sm:text-xs text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                      <span className="text-[10px] sm:text-xs font-medium text-blue-600">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {product.sizes && (
                <div className="text-[10px] text-gray-500 mb-2">
                  <span className="hidden sm:inline">Sizes: </span>{product.sizes.slice(0, 3).join(', ')}
                  {product.sizes.length > 3 && '...'}
                </div>
              )}
              
              <button
                onClick={(e) => handleAddToCart(e, product)}
                className="w-full py-1.5 sm:py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-medium rounded-lg transition-all duration-200 hover:shadow-md"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;