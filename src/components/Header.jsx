import React, { useEffect, useState } from "react";
import { Search, Heart, ShoppingCart, MapPin, User, GitCompare, Settings, LogOut, Menu, X, Shield, Store } from "lucide-react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import CustomDropdown from "./CustomDropdown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../firebase/config";
import AuthModal from "./AuthModal";

const Header = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedState, setSelectedState] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMessage, setAuthModalMessage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { getCartCount, getWishlistCount } = useCart();
  const { isAuthenticated, user, logout, userRole, vendorStatus } = useAuth();
  
  const adminEmail = 'karandeepkaur0089@gmail.com';
  const isAdmin = isAuthenticated && user?.email === adminEmail;
  const isVendor = isAuthenticated && userRole === 'vendor';
  
  // Debug logging
  console.log('Header Debug:', { isAuthenticated, userEmail: user?.email, isAdmin });

  const categories = [
    "All Categories", "Electronics", "Fashion", "Home", "Beauty & Personal Care",
    "Sports & Outdoors", "Books", "Toys & Games", "Automotive", "Grocery",
  ];

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    try {
      const res = await axios.get("https://restcountries.com/v3.1/all?fields=name");
      const countries = res.data.map((country) => country.name.common).sort();
      setCountryList(["All", ...countries]);
    } catch (error) {
      console.error("Country API error:", error);
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
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-5">
          <div className="flex items-center justify-between gap-4 lg:gap-12">

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Column 1: Logo */}
            <Link to="/" className="flex-shrink-0 w-32 sm:w-40 lg:w-48">
              <div className="h-10 lg:h-12 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200/50">
                <span className="text-white font-extrabold text-lg lg:text-xl tracking-tight italic">ShopHub</span>
              </div>
            </Link>

            {/* Column 2: Search Bar - Desktop Only */}
            <div className="hidden lg:flex flex-1 max-w-2xl">
              <div className="flex items-center w-full bg-gray-50 rounded-xl border border-gray-200 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all overflow-hidden">
                <div className="border-r border-gray-200">
                  <CustomDropdown
                    options={categories}
                    selectedValue={selectedCategory}
                    onSelect={setSelectedCategory}
                    className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-white w-40 justify-between"
                    dropdownClassName="w-56"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-transparent text-sm outline-none"
                />
                <button className="px-6 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* Column 3: Actions */}
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
              <div className="hidden xl:block">
                <CustomDropdown
                  options={countryList}
                  selectedValue={selectedState}
                  onSelect={setSelectedState}
                  icon={<MapPin className="w-4 h-4 text-emerald-600" />}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium w-40"
                  dropdownClassName="w-52"
                  showSearch
                />
              </div>

              <div className="flex items-center gap-1 sm:gap-3">
                {/* Temporary admin link for testing */}
                {isAdmin && (
                  <button 
                    onClick={() => navigate('/admin')}
                    className="px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700"
                  >
                    Admin
                  </button>
                )}
                
                {/* Vendor panel link */}
                {isVendor && (
                  <button 
                    onClick={() => navigate('/vendor')}
                    className="px-3 py-1 bg-emerald-600 text-white text-xs rounded hover:bg-emerald-700"
                  >
                    Vendor
                  </button>
                )}
                
                <button onClick={handleWishlistClick} className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all relative group hidden sm:flex">
                  <Heart size={22} />
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {getWishlistCount()}
                  </span>
                </button>

                <button onClick={handleCartClick} className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all relative group">
                  <ShoppingCart size={22} />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                      {getCartCount()}
                    </span>
                  )}
                </button>

                <div className="relative">
                  <button
                    onClick={handleAccountClick}
                    className="flex items-center gap-2 pl-2 pr-1 sm:px-4 py-2 bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-200/50 hover:bg-emerald-700 transition-all"
                  >
                    <User size={18} />
                    <span className="hidden sm:inline font-semibold text-sm">
                      {isAuthenticated ? (user?.name?.split(' ')[0] || 'User') : 'Sign In'}
                    </span>
                  </button>

                  {showAccountMenu && isAuthenticated && (
                    <ClickAwayListener onClickAway={() => setShowAccountMenu(false)}>
                      <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                        <div className="px-4 py-3 border-b border-gray-50 mb-1">
                          <p className="text-xs text-gray-400 font-medium">Hello,</p>
                          <p className="font-bold text-gray-900 truncate">{user?.name}</p>
                          {isAdmin && (
                            <p className="text-xs text-emerald-600 font-medium mt-1">Admin User</p>
                          )}
                          {isVendor && (
                            <p className="text-xs text-emerald-600 font-medium mt-1">
                              {vendorStatus === 'approved' ? 'Approved Vendor' : vendorStatus === 'pending' ? 'Pending Vendor' : 'Rejected Vendor'}
                            </p>
                          )}
                        </div>
                        {[{ icon: <User size={18} />, label: "My Profile" }, { icon: <MapPin size={18} />, label: "Order Tracking" }, { icon: <Heart size={18} />, label: "Wishlist", onClick: handleWishlistClick }, { icon: <Settings size={18} />, label: "Settings" }, ...(isAdmin ? [{ icon: <Shield size={18} />, label: "Admin Panel", onClick: () => { navigate('/admin'); setShowAccountMenu(false); } }] : []), ...(isVendor ? [{ icon: <Store size={18} />, label: "Vendor Panel", onClick: () => { navigate('/vendor'); setShowAccountMenu(false); } }] : [])].map((item, idx) => (
                          <div
                            key={idx}
                            onClick={() => { item.onClick?.(); setShowAccountMenu(false); }}
                            className="px-4 py-2.5 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-3 cursor-pointer text-sm font-medium text-gray-700 transition-colors"
                          >
                            <span className="text-gray-400 group-hover:text-emerald-600">{item.icon}</span>
                            {item.label}
                          </div>
                        ))}
                        <div className="mt-2 pt-2 border-t border-gray-50">
                          <div onClick={handleLogout} className="px-4 py-2.5 hover:bg-red-50 hover:text-red-700 flex items-center gap-3 cursor-pointer text-sm font-medium text-red-600 transition-colors">
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
          <div className="mt-3 lg:hidden relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
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
