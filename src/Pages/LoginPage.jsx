import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser, resetPassword } from '../firebase/config';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if redirected from registration
    const params = new URLSearchParams(location.search);
    if (params.get('registered') === 'true') {
      setInfo('Account created successfully! Please sign in to continue.');
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setResetLoading(true);

    try {
      const result = await resetPassword(resetEmail);
      
      if (result.success) {
        setSuccess(result.message);
        setResetEmail('');
        setTimeout(() => {
          setShowResetForm(false);
          setSuccess('');
        }, 3000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Password reset failed. Please try again.');
    } finally {
      setResetLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);

    try {
      console.log('Attempting login with:', formData.email);
      
      // Use Firebase authentication
      const result = await loginUser(formData.email, formData.password);
      
      console.log('Login result:', result);
      
      if (result.success) {
        // Login successful - AuthContext will automatically update via onAuthStateChanged
        console.log('Login successful, redirecting to home...');
        setLoading(false); // Stop loading immediately
        navigate('/');
      } else {
        // Login failed - show error from Firebase
        console.log('Login failed:', result.error);
        if (result.error.includes('No account found') || result.error.includes('Invalid credentials') || result.error.includes('create an account first')) {
          setError(result.error);
          setInfo('Create a new account to get started');
        } else {
          setError(result.error);
        }
        setLoading(false); // Stop loading on error
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
      setLoading(false); // Stop loading on catch
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
      
      <div className="max-w-md w-full relative z-10">
        {/* Logo/Icon */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-xl mb-4 group-hover:scale-110 transition-transform duration-300">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your ShopHub account</p>
        </div>
        
        {/* Login Form */}
        <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-slate-700/50 animate-slide-in-left">
          {!showResetForm ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-900/50 border border-red-800/50 text-red-400 px-4 py-3 rounded-lg text-sm animate-fade-in-up flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}
              
              {info && (
                <div className="bg-blue-900/50 border border-blue-800/50 text-blue-400 px-4 py-3 rounded-lg text-sm animate-fade-in-up flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {info}
                </div>
              )}
              
              {success && (
                <div className="bg-green-900/50 border border-green-800/50 text-green-400 px-4 py-3 rounded-lg text-sm animate-fade-in-up flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <div>
                    <p className="font-medium">{success}</p>
                    {success.includes('demo purposes') && (
                      <p className="text-xs mt-1">
                        <button 
                          onClick={() => {
                            const link = success.split('reset link would be: ')[1];
                            navigator.clipboard.writeText(link);
                            setSuccess('Link copied to clipboard! ' + success);
                          }}
                          className="underline hover:no-underline text-green-300"
                        >
                          Click to copy reset link
                        </button>
                      </p>
                    )}
                  </div>
                </div>
              )}
            
            <div className="space-y-5">
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
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="group">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className="block w-full pl-10 pr-10 py-3 bg-slate-700 border border-slate-600 rounded-lg placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-slate-500"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowResetForm(true);
                  setError('');
                  setInfo('');
                  setSuccess('');
                }}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-400">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
            </form>
          ) : (
            /* Reset Password Form */
            <form className="space-y-6" onSubmit={handleResetSubmit}>
              <div>
                <h3 className="text-lg font-medium text-gray-100 mb-4">Reset Password</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>
              
              {error && (
                <div className="bg-red-900/50 border border-red-800/50 text-red-400 px-4 py-3 rounded-lg text-sm animate-fade-in-up flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}
              
              {success && (
                <div className="bg-green-900/50 border border-green-800/50 text-green-400 px-4 py-3 rounded-lg text-sm animate-fade-in-up flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <div>
                    <p className="font-medium">{success}</p>
                    {success.includes('demo purposes') && (
                      <p className="text-xs mt-1">
                        <button 
                          onClick={() => {
                            const link = success.split('reset link would be: ')[1];
                            navigator.clipboard.writeText(link);
                            setSuccess('Link copied to clipboard! ' + success);
                          }}
                          className="underline hover:no-underline text-green-300"
                        >
                          Click to copy reset link
                        </button>
                      </p>
                    )}
                  </div>
                </div>
              )}
              
              <div className="group">
                <label htmlFor="reset-email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                  </div>
                  <input
                    id="reset-email"
                    name="reset-email"
                    type="email"
                    required
                    className="block w-full pl-10 pr-3 py-3 bg-slate-700 border border-slate-600 rounded-lg placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-slate-500"
                    placeholder="Enter your email address"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="flex-1 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {resetLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setShowResetForm(false);
                    setError('');
                    setSuccess('');
                    setResetEmail('');
                  }}
                  className="px-4 py-3 border border-slate-600 rounded-lg shadow-sm text-sm font-medium text-gray-300 bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
