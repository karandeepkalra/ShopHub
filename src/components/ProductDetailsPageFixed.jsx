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

  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    rating: 0,
    comment: ''
  });
  const [hoverRating, setHoverRating] = useState(0);

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

  const images = product?.images && product.images.length > 0 
    ? product.images 
    : product?.image 
      ? [product.image] 
      : ['https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400'];

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-xl mb-4">Loading product...</p>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg shadow-sm p-6 mb-8">
          <div>
            <div className="mb-4 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>

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

          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={product.rating || 0} />
              <span className="text-gray-600">(32) Reviews</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl font-bold text-teal-600">
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description || 'No description available.'}
            </p>

            {sizes && sizes.length > 0 && (
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
            )}

            <div className="flex gap-4 mb-6">
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

              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to cart
              </button>

              <button 
                onClick={handleWishlistToggle}
                className={`px-4 py-3 border rounded-lg transition-colors ${
                  isInWishlist(product.id) 
                    ? 'border-red-500 bg-red-50 text-red-500' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Heart 
                  size={20} 
                  className={isInWishlist(product.id) ? 'fill-current' : ''} 
                />
              </button>

              <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Share2 size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-3">
              {product.category && (
                <div className="flex">
                  <span className="text-gray-500 w-24">Category:</span>
                  <span className="text-teal-600 font-medium">{product.category}</span>
                </div>
              )}
              {product.brand && (
                <div className="flex">
                  <span className="text-gray-500 w-24">Brand:</span>
                  <span className="text-gray-700">{product.brand}</span>
                </div>
              )}
              {product.sku && (
                <div className="flex">
                  <span className="text-gray-500 w-24">SKU:</span>
                  <span className="text-gray-700">{product.sku}</span>
                </div>
              )}
              {product.createdAt && (
                <div className="flex">
                  <span className="text-gray-500 w-24">Added:</span>
                  <span className="text-teal-600 font-medium">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </span>
                </div>
              )}
              {product.tags && product.tags.length > 0 && (
                <div className="flex">
                  <span className="text-gray-500 w-24">Tags:</span>
                  <span className="text-gray-700">{product.tags.join(', ')}</span>
                </div>
              )}
              {typeof product.stock !== 'undefined' && (
                <div className="flex">
                  <span className="text-gray-500 w-24">Stock:</span>
                  <span className={`font-medium ${
                    product.stock > 10 ? 'text-teal-600' : 
                    product.stock > 0 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {product.stock} Items In Stock
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Write a Review</h2>
          
          <form onSubmit={handleReviewSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
