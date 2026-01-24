import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Share2, Minus, Plus } from 'lucide-react';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const { isAuthenticated } = useAuth();

  // Review form state
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    rating: 0,
    comment: ''
  });
  const [hoverRating, setHoverRating] = useState(0);

  // Fetch product from Firebase
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, 'products', id);
        const productDoc = await getDoc(productRef);
        
        if (productDoc.exists()) {
          const productData = {
            id: productDoc.id,
            ...productDoc.data()
          };
          setProduct(productData);
          // Set default selected size if available
          if (productData.sizes && productData.sizes.length > 0) {
            setSelectedSize(productData.sizes[0]);
          }
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Mock additional images - use product images if available, otherwise fallback
  const images = product?.images && product.images.length > 0 
    ? product.images 
    : product?.image 
      ? [product.image] 
      : ['https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400'];

  // Dynamic sizes from product data or fallback
  const sizes = product?.sizes && product.sizes.length > 0
    ? product.sizes
    : [];

  const StarRating = ({ rating }) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={20}
          className={
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-gray-600 text-gray-600'
          }
        />
      ))}
    </div>
  );

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log('Review submitted:', reviewForm);
    // Add your review submission logic here
    
    // Reset form after submission
    setReviewForm({
      name: '',
      email: '',
      rating: 0,
      comment: ''
    });
    alert('Thank you for your review!');
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Add product with selected quantity and size
    const productWithQuantity = {
      ...product,
      quantity: quantity,
      selectedSize: selectedSize
    };
    
    for (let i = 0; i < quantity; i++) {
      await addToCart(productWithQuantity);
    }
  };

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (isInWishlist(product.id)) {
      await removeFromWishlist(product.id);
    } else {
      await addToWishlist(product);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <p className="text-gray-400 text-xl mb-4">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <p className="text-gray-400 text-xl mb-4">Product not found</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-slate-800 rounded-lg shadow-lg p-6 mb-8 border border-slate-700/50">
          {/* Left - Product Images */}
          <div>
            {/* Main Image */}
            <div className="mb-4 rounded-lg overflow-hidden border border-slate-700/50">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-blue-500'
                      : 'border-slate-700/50 hover:border-slate-600'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-100 mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={product.rating || 0} />
              <span className="text-gray-400">(32) Reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl font-bold text-blue-400">
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="bg-pink-600/20 text-pink-400 px-3 py-1 rounded-full text-sm font-semibold">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-400 mb-6 leading-relaxed">
              {product.description || 'No description available.'}
            </p>

            {/* Size / Weight Selector */}
            {sizes && sizes.length > 0 && (
              <div className="mb-6">
                <label className="text-gray-300 font-medium mb-3 block">
                  Size / Weight:
                </label>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        selectedSize === size
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-700 text-gray-300 border-slate-600 hover:border-blue-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="flex gap-4 mb-6">
              {/* Quantity Selector */}
              <div className="flex items-center border border-slate-600 rounded-lg">
                <button
                  onClick={() => handleQuantityChange('decrement')}
                  className="px-4 py-3 hover:bg-slate-700 transition-colors text-gray-400"
                >
                  <Minus size={18} />
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-16 text-center border-x border-slate-600 py-3 bg-slate-800 text-gray-100 focus:outline-none"
                />
                <button
                  onClick={() => handleQuantityChange('increment')}
                  className="px-4 py-3 hover:bg-slate-700 transition-colors text-gray-400"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to cart
              </button>

              {/* Wishlist Button */}
              <button 
                onClick={handleWishlistToggle}
                className={`px-4 py-3 border rounded-lg transition-all ${
                  isInWishlist(product.id) 
                    ? 'border-pink-500 bg-pink-500/20 text-pink-400' 
                    : 'border-slate-600 hover:bg-slate-700 text-gray-400'
                }`}
              >
                <Heart 
                  size={20} 
                  className={isInWishlist(product.id) ? 'fill-current' : ''} 
                />
              </button>

              {/* Share Button */}
              <button className="px-4 py-3 border border-slate-600 rounded-lg hover:bg-slate-700 transition-all text-gray-400">
                <Share2 size={20} />
              </button>
            </div>

            {/* Product Info */}
            <div className="border-t border-slate-700 pt-6 space-y-3">
              {product.category && (
                <div className="flex">
                  <span className="text-gray-500 w-24">Category:</span>
                  <span className="text-blue-400 font-medium">{product.category}</span>
                </div>
              )}
              {product.brand && (
                <div className="flex">
                  <span className="text-gray-500 w-24">Brand:</span>
                  <span className="text-gray-300">{product.brand}</span>
                </div>
              )}
              {product.sku && (
                <div className="flex">
                  <span className="text-gray-500 w-24">SKU:</span>
                  <span className="text-gray-300">{product.sku}</span>
                </div>
              )}
              {product.createdAt && (
                <div className="flex">
                  <span className="text-gray-500 w-24">Added:</span>
                  <span className="text-blue-400 font-medium">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </span>
                </div>
              )}
              {product.tags && product.tags.length > 0 && (
                <div className="flex">
                  <span className="text-gray-500 w-24">Tags:</span>
                  <span className="text-gray-300">{product.tags.join(', ')}</span>
                </div>
              )}
              {typeof product.stock !== 'undefined' && (
                <div className="flex">
                  <span className="text-gray-500 w-24">Stock:</span>
                  <span className={`font-medium ${
                    product.stock > 10 ? 'text-green-400' : 
                    product.stock > 0 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {product.stock} Items In Stock
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Review Form Section */}
        <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700/50">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">Write a Review</h2>
          
          <form onSubmit={handleReviewSubmit} className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-gray-300 font-medium mb-2">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={reviewForm.name}
                  onChange={handleReviewChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-400"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={reviewForm.email}
                  onChange={handleReviewChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-400"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Rating Input */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Your Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      size={32}
                      className={
                        star <= (hoverRating || reviewForm.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-gray-600 text-gray-600'
                      }
                    />
                  </button>
                ))}
                {reviewForm.rating > 0 && (
                  <span className="ml-3 text-gray-400 self-center">
                    {reviewForm.rating} out of 5
                  </span>
                )}
              </div>
            </div>

            {/* Comment Textarea */}
            <div>
              <label htmlFor="comment" className="block text-gray-300 font-medium mb-2">
                Your Review <span className="text-red-500">*</span>
              </label>
              <textarea
                id="comment"
                name="comment"
                value={reviewForm.comment}
                onChange={handleReviewChange}
                required
                rows="5"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-400 resize-none"
                placeholder="Write your review here..."
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;