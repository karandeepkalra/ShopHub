import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../firebase/config';
import { Eye, EyeOff, Mail, Lock, User, UserPlus, Store, Package } from 'lucide-react';
import VendorNotification from '../components/VendorNotification';

const CATEGORIES = [
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Sports & Outdoors',
  'Books & Media',
  'Toys & Games',
  'Health & Beauty',
  'Automotive',
  'Food & Beverages',
  'Other'
];

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user', // 'user' | 'vendor'
    businessName: '',
    category: '',
    description: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showVendorNotification, setShowVendorNotification] = useState(false);

  const { register, updateUserRole } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      console.log('Attempting registration with:', formData.email);
      
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      // Validate vendor fields if role is vendor
      if (formData.role === 'vendor') {
        if (!formData.businessName.trim()) {
          setError('Business name is required for vendors');
          setLoading(false);
          return;
        }
        if (!formData.category) {
          setError('Please select a business category');
          setLoading(false);
          return;
        }
      }

      // Use Firebase authentication
      const result = await registerUser(formData.email, formData.password, {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        businessName: formData.businessName,
        category: formData.category,
        description: formData.description,
        vendorStatus: formData.role === 'vendor' ? 'pending' : null
      });
      
      console.log('Registration result:', result);
      
      if (result.success) {
        // Registration successful
        const message = formData.role === 'vendor' 
          ? 'Vendor registration submitted! Your account is pending admin approval.'
          : 'Account created successfully!';
        
        setSuccess(message + ' Redirecting to login...');
        console.log('Registration successful, redirecting to login...');
        setLoading(false);
        
        // Show vendor notification if role is vendor
        if (formData.role === 'vendor') {
          setShowVendorNotification(true);
        }
        
        setTimeout(() => {
          console.log('Redirecting now...');
          navigate('/login?registered=true');
        }, 3000);
      } else {
        // Registration failed - show error from Firebase
        console.log('Registration failed:', result.error);
        setError(result.error);
        setLoading(false);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Registration failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-teal-600">
            <UserPlus className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500">
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}
          
          <div className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50">
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={formData.role === 'user'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`flex items-center w-full ${
                    formData.role === 'user' ? 'text-teal-600 border-teal-500' : 'text-gray-600'
                  }`}>
                    <User className="h-5 w-5 mr-2" />
                    <div>
                      <div className="font-medium">Customer</div>
                      <div className="text-xs">Buy products</div>
                    </div>
                  </div>
                </label>
                
                <label className="relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50">
                  <input
                    type="radio"
                    name="role"
                    value="vendor"
                    checked={formData.role === 'vendor'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`flex items-center w-full ${
                    formData.role === 'vendor' ? 'text-teal-600 border-teal-500' : 'text-gray-600'
                  }`}>
                    <Store className="h-5 w-5 mr-2" />
                    <div>
                      <div className="font-medium">Vendor</div>
                      <div className="text-xs">Sell products</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Basic Info */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            {/* Vendor Fields */}
            {formData.role === 'vendor' && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Business Information
                </h3>
                
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                    Business Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    required={formData.role === 'vendor'}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your business name"
                    value={formData.businessName}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Product Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    required={formData.role === 'vendor'}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Business Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm resize-none"
                    placeholder="Describe your business and products"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  className="appearance-none relative block w-full pl-10 pr-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  className="appearance-none relative block w-full pl-10 pr-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              required
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
              I agree to{' '}
              <a href="#" className="text-teal-600 hover:text-teal-500">
                Terms and Conditions
              </a>{' '}
              and{' '}
              <a href="#" className="text-teal-600 hover:text-teal-500">
                Privacy Policy
              </a>
              {formData.role === 'vendor' && (
                <span className="block text-xs text-orange-600 mt-1">
                  Vendor accounts require admin approval before you can add products.
                </span>
              )}
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 
               formData.role === 'vendor' ? 'Submit Vendor Application' : 'Create account'}
            </button>
          </div>
        </form>
      </div>
      
      {/* Vendor Notification */}
      {showVendorNotification && (
        <VendorNotification 
          vendorStatus="pending" 
          onClose={() => setShowVendorNotification(false)}
        />
      )}
    </div>
  );
};

export default RegisterPage;
