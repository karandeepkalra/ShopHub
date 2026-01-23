import React, { useState } from "react";
import { ChevronDown, Phone, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ClickAwayListener from "@mui/material/ClickAwayListener";

export const Navbar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "New Arrivals", path: "/new-arrivals" },
    { name: "Men", path: "/category/men" },
    { name: "Women", path: "/category/women" },
    { name: "Kids", path: "/category/kids" },
    { name: "Sale", path: "/sale" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const categories = [
    { name: "Men's Clothing", icon: "👔", path: "/category/men" },
    { name: "Women's Clothing", icon: "👗", path: "/category/women" },
    { name: "Kids & Baby", icon: "👶", path: "/category/kids" },
    { name: "Shoes & Bags", icon: "👟", path: "/category/shoes-bags" },
    { name: "Accessories", icon: "🧢", path: "/category/accessories" },
    { name: "Activewear", icon: "🏃", path: "/category/activewear" },
    { name: "Formal Wear", icon: "👔", path: "/category/formal" },
    { name: "Summer Collection", icon: "☀️", path: "/category/summer" },
    { name: "Winter Collection", icon: "❄️", path: "/category/winter" },
    { name: "Sale Items", icon: "🛍️", path: "/sale" },
  ];

  const megaMenuCategories = [
    {
      title: "Men's Fashion",
      items: ["T-Shirts & Polos", "Shirts", "Jeans & Pants", "Jackets & Coats", "Suits & Blazers", "Activewear"],
    },
    {
      title: "Women's Fashion",
      items: ["Dresses", "Tops & Blouses", "Jeans & Pants", "Skirts & Shorts", "Jackets & Coats", "Activewear"],
    },
    {
      title: "Accessories",
      items: ["Bags & Wallets", "Watches", "Sunglasses", "Hats & Caps", "Belts", "Jewelry"],
    },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <div className="fixed top-[64px] lg:top-[88px] left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-sm hidden lg:block">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">
            <div className="flex items-center gap-8">
              {/* Browse Categories */}
              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === "categories" ? null : "categories")}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all font-semibold text-sm shadow-lg shadow-emerald-100"
                >
                  <Menu className="w-4 h-4" />
                  Browse All Categories
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === 'categories' ? 'rotate-180' : ''}`} />
                </button>

                {activeMenu === "categories" && (
                  <ClickAwayListener onClickAway={() => setActiveMenu(null)}>
                    <div className="absolute top-full left-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-50 z-50 py-2 animate-in fade-in slide-in-from-top-2">
                      <ul className="py-1">
                        {categories.map((c, i) => (
                          <li key={i}>
                            <Link
                              to={c.path}
                              onClick={() => setActiveMenu(null)}
                              className="px-5 py-2.5 flex items-center gap-4 hover:bg-emerald-50 hover:text-emerald-700 text-sm font-medium text-gray-700 transition-colors"
                            >
                              <span className="text-lg">{c.icon}</span>
                              {c.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ClickAwayListener>
                )}
              </div>

              {/* Navigation Links */}
              <nav className="flex items-center gap-6">
                {navigationLinks.map((link, i) => (
                  <div key={i} className="relative group">
                    <Link
                      to={link.hasDropdown ? "#" : link.path}
                      onMouseEnter={() => link.hasDropdown && setActiveMenu(link.name)}
                      onClick={(e) => link.hasDropdown && e.preventDefault()}
                      className={`flex items-center gap-1.5 py-2 text-sm font-bold transition-all ${isActive(link.path) ? "text-emerald-600" : "text-gray-700 hover:text-emerald-600"
                        }`}
                    >
                      {link.name}
                      {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 opacity-50" />}
                    </Link>

                    {/* Mega Menu */}
                    {link.isMegaMenu && activeMenu === link.name && (
                      <div className="absolute top-full left-0 mt-0 pt-3 z-50">
                        <ClickAwayListener onClickAway={() => setActiveMenu(null)}>
                          <div className="w-[800px] bg-white rounded-2xl shadow-2xl border border-gray-50 p-8 grid grid-cols-3 gap-10 animate-in fade-in slide-in-from-top-2">
                            {megaMenuCategories.map((cat, idx) => (
                              <div key={idx}>
                                <h3 className="font-extrabold text-gray-900 mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                  {cat.title}
                                </h3>
                                <ul className="space-y-3">
                                  {cat.items.map((item, i) => (
                                    <li key={i}>
                                      <Link
                                        to={`/category/${item.toLowerCase().replace(/\s+/g, "-")}`}
                                        className="text-[13px] font-medium text-gray-500 hover:text-emerald-600 transition-colors"
                                        onClick={() => setActiveMenu(null)}
                                      >
                                        {item}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </ClickAwayListener>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Support */}
            <div className="flex items-center gap-4 py-2 px-4 bg-emerald-50 rounded-full border border-emerald-100">
              <Phone className="w-4 h-4 text-emerald-600" />
              <div>
                <div className="text-sm font-bold text-emerald-700 leading-none">1900 - 888</div>
                <div className="text-[10px] text-emerald-600 uppercase font-semibold mt-0.5">Support 24/7</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer Content */}
        <div className={`absolute top-0 left-0 bottom-0 w-[280px] bg-white shadow-2xl transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div className="h-8 w-32 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold italic">ShopHub</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              <nav className="px-2 space-y-1">
                {navigationLinks.map((link, i) => (
                  <Link
                    key={i}
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${isActive(link.path) ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-8 px-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Categories</h3>
                <div className="grid grid-cols-1 gap-2">
                  {categories.map((c, i) => (
                    <Link
                      key={i}
                      to={c.path}
                      className="flex items-center gap-3 py-2 text-sm font-medium text-gray-600 hover:text-emerald-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{c.icon}</span>
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Phone size={18} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">1900 - 888</p>
                  <p className="text-xs text-gray-500">24/7 Support Center</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

