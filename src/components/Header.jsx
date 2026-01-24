import React, { useEffect, useState } from "react";
import { Search, Heart, ShoppingCart, MapPin, User, GitCompare, Settings, LogOut, Menu, X, Shield, Store } from "lucide-react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import CustomDropdown from "./CustomDropdown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useCurrency } from "../context/CurrencyContext";
import { logoutUser } from "../firebase/config";
import AuthModal from "./AuthModal";

const Header = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMessage, setAuthModalMessage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { getCartCount, getWishlistCount } = useCart();
  const { isAuthenticated, user, logout, userRole, vendorStatus } = useAuth();
  const { selectedCountry, setSelectedCountry } = useCurrency();
  
  const adminEmail = 'karandeepkaur0089@gmail.com';
  const isAdmin = isAuthenticated && user?.email === adminEmail;
  const isVendor = isAuthenticated && userRole === 'vendor';

  const categories = [
    "All Categories", "Electronics", "Fashion", "Home", "Beauty & Personal Care",
    "Sports & Outdoors", "Books", "Toys & Games", "Automotive", "Grocery",
  ];

  useEffect(() => {
    getSupportedCountries();
  }, []);

  const getSupportedCountries = async () => {
    try {
      // Only include countries that have working currency conversion
      const supportedCountries = [
        "All",
        "India",
        "United States", 
        "United Kingdom",
        "Canada",
        "Australia",
        "United Arab Emirates",
        "Singapore",
        "Malaysia",
        "Saudi Arabia"
      ];
      
      setCountryList(supportedCountries);
    } catch (error) {
      // Fallback to basic list
      setCountryList(["All", "India", "United States", "United Kingdom", "Canada"]);
    }
  };

  const handleCartClick = () => {
    if (!isAuthenticated) {
      setAuthModalMessage('Please sign in to view your cart');
      setShowAuthModal(true);
    } else {
      navigate('/cart');
    }
  };

  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      setAuthModalMessage('Please sign in to view your wishlist');
      setShowAuthModal(true);
    } else {
      navigate('/wishlist');
    }
  };

  const handleAccountClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setShowAccountMenu(prev => !prev);
    }
  };

  const handleLogout = async () => {
    // Show confirmation popup
    const confirmLogout = window.confirm("Are you sure you want to sign out?");
    
    if (!confirmLogout) {
      return; // User cancelled the logout
    }
    
    try {
      await logoutUser();
      setShowAccountMenu(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-lg transition-all duration-300">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-8 py-2 sm:py-3 lg:py-5">
          <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-12">

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-105"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Column 1: Logo */}
            <Link to="/" className="flex-shrink-0 w-24 sm:w-32 lg:w-48 group">
              <div className="h-8 sm:h-10 lg:h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200/50 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                <span className="text-white font-extrabold text-sm sm:text-lg lg:text-xl tracking-tight italic">ShopHub</span>
              </div>
            </Link>

            {/* Column 2: Search Bar - Desktop Only */}
            <div className="hidden lg:flex flex-1 max-w-2xl">
              <div className="flex items-center w-full bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/50 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20 transition-all overflow-hidden hover:bg-gray-100/80">
                <div className="border-r border-gray-200/50">
                  <CustomDropdown
                    options={categories}
                    selectedValue={selectedCategory}
                    onSelect={setSelectedCategory}
                    className="px-3 sm:px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-white/80 w-36 sm:w-40 justify-between transition-colors"
                    dropdownClassName="w-48 sm:w-56"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 sm:px-4 py-2.5 bg-transparent text-sm outline-none placeholder-gray-500"
                />
                <button className="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all duration-200 hover:shadow-lg">
                  <Search size={18} />
                </button>
              </div>
            </div>

            {/* Column 3: Actions */}
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-6">
              {/* Desktop Country Selector */}
              <div className="hidden lg:block">
                <CustomDropdown
                  options={countryList}
                  selectedValue={selectedCountry}
                  onSelect={setSelectedCountry}
                  icon={<MapPin className="w-4 h-4 text-blue-600" />}
                  className="px-2 sm:px-3 py-2 bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 rounded-xl text-sm font-medium w-32 sm:w-40 hover:bg-gray-100/80 transition-colors"
                  dropdownClassName="w-48 sm:w-52"
                  showSearch
                />
              </div>

              {/* Mobile Country Selector */}
              <div className="lg:hidden">
                <select
                  value={selectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(e.target.value);
                  }}
                  className="px-2 py-1 bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 rounded-lg text-xs font-medium w-24 hover:bg-gray-100/80 transition-colors"
                >
                  <option value="India">🇮🇳 IN</option>
                  <option value="United States">🇺🇸 US</option>
                  <option value="United Kingdom">🇬🇧 UK</option>
                  <option value="Canada">🇨🇦 CA</option>
                  <option value="Australia">🇦🇺 AU</option>
                  <option value="United Arab Emirates">🇦🇪 UAE</option>
                  <option value="Singapore">🇸🇬 SG</option>
                  <option value="Malaysia">🇲🇾 MY</option>
                  <option value="Saudi Arabia">🇸🇦 SA</option>
                </select>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                {/* Temporary admin link for testing */}
                {isAdmin && (
                  <button 
                    onClick={() => navigate('/admin')}
                    className="hidden sm:block px-2 py-1 bg-gradient-to-r from-purple-600 to-violet-600 text-white text-xs rounded-lg hover:from-purple-700 hover:to-violet-700 transition-all duration-200 hover:shadow-lg"
                  >
                    Admin
                  </button>
                )}
                
                {/* Vendor panel link */}
                {isVendor && (
                  <button 
                    onClick={() => navigate('/vendor')}
                    className="hidden sm:block px-2 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 hover:shadow-lg"
                  >
                    Vendor
                  </button>
                )}
                
                <button onClick={handleWishlistClick} className="hidden sm:flex p-1.5 sm:p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200 relative group hover:scale-110">
                  <Heart size={18} />
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold animate-pulse">
                    {getWishlistCount()}
                  </span>
                </button>

                <button onClick={handleCartClick} className="p-1.5 sm:p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200 relative group hover:scale-110">
                  <ShoppingCart size={18} />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold animate-pulse">
                      {getCartCount()}
                    </span>
                  )}
                </button>

                <div className="relative">
                  <button
                    onClick={handleAccountClick}
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 lg:px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg shadow-blue-200/50 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl transition-all duration-200 hover:scale-105"
                  >
                    <User size={16} />
                    <span className="hidden sm:inline font-semibold text-xs sm:text-sm">
                      {isAuthenticated ? (user?.name?.split(' ')[0] || 'User') : 'Sign In'}
                    </span>
                  </button>

                  {showAccountMenu && isAuthenticated && (
                    <ClickAwayListener onClickAway={() => setShowAccountMenu(false)}>
                      <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-100/50 z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                        <div className="px-4 py-3 border-b border-gray-100/50 mb-1">
                          <p className="text-xs text-gray-400 font-medium">Hello,</p>
                          <p className="font-bold text-gray-900 truncate">{user?.name}</p>
                          {isAdmin && (
                            <p className="text-xs text-purple-600 font-medium mt-1">Admin User</p>
                          )}
                          {isVendor && (
                            <p className="text-xs text-blue-600 font-medium mt-1">
                              {vendorStatus === 'approved' ? 'Approved Vendor' : vendorStatus === 'pending' ? 'Pending Vendor' : 'Rejected Vendor'}
                            </p>
                          )}
                        </div>
                        {[{ icon: <User size={18} />, label: "My Profile" }, { icon: <MapPin size={18} />, label: "Order Tracking" }, { icon: <Heart size={18} />, label: "Wishlist", onClick: handleWishlistClick }, { icon: <Settings size={18} />, label: "Settings" }, ...(isAdmin ? [{ icon: <Shield size={18} />, label: "Admin Panel", onClick: () => { navigate('/admin'); setShowAccountMenu(false); } }] : []), ...(isVendor ? [{ icon: <Store size={18} />, label: "Vendor Panel", onClick: () => { navigate('/vendor'); setShowAccountMenu(false); } }] : [])].map((item, idx) => (
                          <div
                            key={idx}
                            onClick={() => { item.onClick?.(); setShowAccountMenu(false); }}
                            className="px-4 py-2.5 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-3 cursor-pointer text-sm font-medium text-gray-700 transition-all duration-200"
                          >
                            <span className="text-gray-400 group-hover:text-blue-600">{item.icon}</span>
                            {item.label}
                          </div>
                        ))}
                        <div className="mt-2 pt-2 border-t border-gray-100/50">
                          <div onClick={handleLogout} className="px-4 py-2.5 hover:bg-red-50 hover:text-red-700 flex items-center gap-3 cursor-pointer text-sm font-medium text-red-600 transition-all duration-200">
                            <LogOut size={18} />
                            Sign Out
                          </div>
                        </div>
                      </div>
                    </ClickAwayListener>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="mt-2 lg:hidden relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-9 pr-3 py-2 bg-gray-100/80 backdrop-blur-sm rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:bg-gray-200/80 transition-colors"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
          </div>
        </div>
      </div>

      <Navbar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        message={authModalMessage}
      />
    </>
  );
};

export default Header;
