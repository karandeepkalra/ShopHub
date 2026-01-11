import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Share2, Minus, Plus } from 'lucide-react';
import { allProducts } from '../data/Product';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('50g');
  
  // Review form state
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    rating: 0,
    comment: ''
  });
  const [hoverRating, setHoverRating] = useState(0);

  // Find product from all categories
  const findProduct = () => {
    for (const category in allProducts) {
      const product = allProducts[category].find(p => p.id === parseInt(id));
      if (product) return product;
    }
    return null;
  };

  const product = findProduct();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-xl mb-4">Product not found</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  // Mock additional images
  const images = [
    product.image,
    'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'
  ];

  const sizes = ['50g', '60g', '80g', '100g', '150g'];

  const StarRating = ({ rating }) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={20}
          className={
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-gray-200 text-gray-200'
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg shadow-sm p-6 mb-8">
          {/* Left - Product Images */}
          <div>
            {/* Main Image */}
            <div className="mb-4 rounded-lg overflow-hidden border border-gray-200">
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
                      ? 'border-teal-500'
                      : 'border-gray-200 hover:border-gray-300'
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
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={product.rating} />
              <span className="text-gray-600">(32) Reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl font-bold text-teal-600">
                ${product.price}
              </span>
              <span className="text-xl text-gray-400 line-through">
                ${product.originalPrice}
              </span>
              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam rem officia, 
              corrupti reiciendis minima nisi modi, quasi, odio minus dolore impedit fuga eum eligendi.
            </p>

            {/* Size / Weight Selector */}
            <div className="mb-6">
              <label className="text-gray-700 font-medium mb-3 block">
                Size / Weight:
              </label>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      selectedSize === size
                        ? 'bg-teal-500 text-white border-teal-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-teal-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="flex gap-4 mb-6">
              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange('decrement')}
                  className="px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <Minus size={18} />
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-16 text-center border-x border-gray-300 py-3 focus:outline-none"
                />
                <button
                  onClick={() => handleQuantityChange('increment')}
                  className="px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                <ShoppingCart size={20} />
                Add to cart
              </button>

              {/* Wishlist Button */}
              <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Heart size={20} className="text-gray-600" />
              </button>

              {/* Share Button */}
              <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Share2 size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Product Info */}
            <div className="border-t border-gray-200 pt-6 space-y-3">
              <div className="flex">
                <span className="text-gray-500 w-24">Type:</span>
                <span className="text-teal-600 font-medium">Organic</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-24">SKU:</span>
                <span className="text-gray-700">FWM15VKT</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-24">MFG:</span>
                <span className="text-teal-600 font-medium">Jun 4, 2022</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-24">Tags:</span>
                <span className="text-gray-700">Snack, Organic, Brown</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-24">LIFE:</span>
                <span className="text-teal-600 font-medium">70 days</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-24">Stock:</span>
                <span className="text-teal-600 font-medium">8 Items In Stock</span>
              </div>
            </div>
          </div>
        </div>

        {/* Review Form Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Write a Review</h2>
          
          <form onSubmit={handleReviewSubmit} className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={reviewForm.name}
                  onChange={handleReviewChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={reviewForm.email}
                  onChange={handleReviewChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Rating Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
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
                          : 'fill-gray-200 text-gray-200'
                      }
                    />
                  </button>
                ))}
                {reviewForm.rating > 0 && (
                  <span className="ml-3 text-gray-600 self-center">
                    {reviewForm.rating} out of 5
                  </span>
                )}
              </div>
            </div>

            {/* Comment Textarea */}
            <div>
              <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">
                Your Review <span className="text-red-500">*</span>
              </label>
              <textarea
                id="comment"
                name="comment"
                value={reviewForm.comment}
                onChange={handleReviewChange}
                required
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                placeholder="Write your review here..."
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg transition-colors"
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