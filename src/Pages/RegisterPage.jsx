import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { registerUser } from '../firebase/config';
import { Eye, EyeOff, Mail, Lock, User, UserPlus, Store, Package, MapPin } from 'lucide-react';
import VendorNotification from '../components/VendorNotification';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user', // 'user' | 'vendor'
    businessName: '',
    description: '',
    country: 'India', // Default country
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showVendorNotification, setShowVendorNotification] = useState(false);

  const { register, updateUserRole } = useAuth();
  const { setSelectedCountry } = useCurrency();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
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
      }

      // Validate terms agreement
      if (!formData.agreeToTerms) {
        setError('You must agree to the Terms and Conditions and Privacy Policy');
        setLoading(false);
        return;
      }

      // Use Firebase authentication
      const result = await registerUser(formData.email, formData.password, {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        businessName: formData.businessName,
        description: formData.description,
        country: formData.country,
        vendorStatus: formData.role === 'vendor' ? 'pending' : null
      });
      
      console.log('Registration result:', result);
      
      if (result.success) {
        // Set the user's country as default location
        setSelectedCountry(formData.country);
        
        // Registration successful
        const message = formData.role === 'vendor' 
          ? 'Vendor registration submitted! Your account is pending admin approval.'
          : 'Account created successfully!';
        
        setSuccess(message + ' Redirecting to login...');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/10 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/10 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="max-w-2xl w-full relative z-10">
        {/* Logo/Icon */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-xl mb-4 group-hover:scale-110 transition-transform duration-300">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Join ShopHub</h1>
          <p className="text-gray-400">Create your account and start shopping</p>
        </div>
        
        {/* Registration Form */}
        <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-slate-700/50 animate-slide-in-left">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-900/50 border border-red-800/50 text-red-400 px-4 py-3 rounded-lg text-sm animate-fade-in-up">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-900/50 border border-green-800/50 text-green-400 px-4 py-3 rounded-lg text-sm animate-fade-in-up">
                {success}
              </div>
            )}
            
            <div className="space-y-5">
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Choose Account Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-slate-700 group">
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      checked={formData.role === 'user'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`flex items-center w-full transition-all ${
                      formData.role === 'user' 
                        ? 'text-blue-400 border-blue-500 bg-blue-900/30' 
                        : 'text-gray-400 border-slate-600 hover:border-blue-500'
                    } p-3 rounded-lg border-2`}>
                      <User className="h-6 w-6 mr-3" />
                      <div>
                        <div className="font-semibold">Customer</div>
                        <div className="text-xs opacity-75">Buy products</div>
                      </div>
                    </div>
                  </label>
                  
                  <label className="relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-slate-700 group">
                    <input
                      type="radio"
                      name="role"
                      value="vendor"
                      checked={formData.role === 'vendor'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`flex items-center w-full transition-all ${
                      formData.role === 'vendor' 
                        ? 'text-blue-400 border-blue-500 bg-blue-900/30' 
                        : 'text-gray-400 border-slate-600 hover:border-blue-500'
                    } p-3 rounded-lg border-2`}>
                      <Store className="h-6 w-6 mr-3" />
                      <div>
                        <div className="font-semibold">Vendor</div>
                        <div className="text-xs opacity-75">Sell products</div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className="block w-full pl-10 pr-3 py-3 bg-slate-700 border border-slate-600 rounded-lg placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-slate-500"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="group">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-2">
                    Country / Region
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                    </div>
                    <select
                      id="country"
                      name="country"
                      required
                      className="block w-full pl-10 pr-3 py-3 bg-slate-700 border border-slate-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-slate-500 appearance-none"
                      value={formData.country}
                      onChange={handleChange}
                    >
                      <option value="India">🇮🇳 India</option>
                      <option value="United States">🇺🇸 United States</option>
                      <option value="United Kingdom">🇬🇧 United Kingdom</option>
                      <option value="Canada">🇨🇦 Canada</option>
                      <option value="Australia">🇦🇺 Australia</option>
                      <option value="United Arab Emirates">🇦🇪 United Arab Emirates</option>
                      <option value="Singapore">🇸🇬 Singapore</option>
                      <option value="Malaysia">🇲🇾 Malaysia</option>
                      <option value="Saudi Arabia">🇸🇦 Saudi Arabia</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">This will be used as your default location for pricing</p>
                </div>
              </div>
              
              <div className="group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full pl-10 pr-3 py-3 bg-slate-700 border border-slate-600 rounded-lg placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-slate-500"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              {/* Vendor Fields */}
              {formData.role === 'vendor' && (
                <div className="space-y-4 p-5 bg-slate-700/50 rounded-xl border border-slate-600/50 animate-fade-in-up">
                  <h3 className="text-lg font-semibold text-gray-100 flex items-center">
                    <Package className="h-5 w-5 mr-2 text-blue-400" />
                    Business Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="businessName" className="block text-sm font-medium text-gray-300 mb-2">
                        Business Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="businessName"
                        name="businessName"
                        type="text"
                        required={formData.role === 'vendor'}
                        className="block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
                        placeholder="Enter your business name"
                        value={formData.businessName}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Business Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows="1"
                        className="block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 resize-none"
                        placeholder="Describe your business"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="group">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-500 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-500 transition-colors"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <input
                id="agree-terms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
              />
              <label htmlFor="agree-terms" className="ml-3 block text-sm text-gray-700">
                I agree to{' '}
                <Link to="/terms" className="text-blue-600 hover:text-blue-500 transition-colors font-medium" target="_blank">
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-blue-600 hover:text-blue-500 transition-colors font-medium" target="_blank">
                  Privacy Policy
                </Link>
                {formData.role === 'vendor' && (
                  <span className="block text-xs text-orange-600 mt-1 font-medium">
                    Vendor accounts require admin approval before you can add products.
                  </span>
                )}
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  formData.role === 'vendor' ? 'Submit Vendor Application' : 'Create Account'
                )}
              </button>
            </div>
          </form>
          
          {/* Sign in link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
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
