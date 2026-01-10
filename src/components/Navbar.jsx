import React, { useState } from "react";
import { ChevronDown, Phone, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import {Slider} from './Slider'
export const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Shop", path: "/shop" },
    { name: "Vendors", path: "/vendors" },
    {
      name: "Mega menu",
      path: "/mega-menu",
      hasDropdown: true,
      isMegaMenu: true,
    },
    { name: "Blog", path: "/blog" },
    { name: "Pages", path: "/pages", hasDropdown: true },
    { name: "Contact", path: "/contact" },
  ];

  const categories = [
    { name: "Electronics", icon: "📱", path: "/category/electronics" },
    { name: "Fashion", icon: "👗", path: "/category/fashion" },
    { name: "Home & Living", icon: "🏠", path: "/category/home-living" },
    { name: "Beauty & Care", icon: "💄", path: "/category/beauty-care" },
    { name: "Sports", icon: "⚽", path: "/category/sports" },
    { name: "Books", icon: "📚", path: "/category/books" },
    { name: "Toys & Games", icon: "🎮", path: "/category/toys-games" },
    { name: "Automotive", icon: "🚗", path: "/category/automotive" },
    { name: "Grocery", icon: "🛒", path: "/category/grocery" },
    { name: "Health", icon: "⚕️", path: "/category/health" },
  ];

  const megaMenuCategories = [
    {
      title: "Fruit & Vegetables",
      items: [
        "Meat & Poultry",
        "Fresh Vegetables",
        "Herbs & Seasonings",
        "Cuts & Sprouts",
        "Exotic Fruits & Veggies",
        "Packaged Produce",
      ],
    },
    {
      title: "Breakfast & Dairy",
      items: [
        "Milk & Flavoured Milk",
        "Butter and Margarine",
        "Eggs Substitutes",
        "Marmalades",
        "Sour Cream",
        "Cheese",
      ],
    },
    {
      title: "Meat & Seafood",
      items: [
        "Breakfast Sausage",
        "Dinner Sausage",
        "Chicken",
        "Sliced Deli Meat",
        "Wild Caught Fillets",
        "Crab and Shellfish",
      ],
    },
  ];

  return (
    <>
    <div className="fixed top-[88px] left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Browse Categories */}
          <div className="relative">
            <button
              onClick={() =>
                setActiveMenu(activeMenu === "categories" ? null : "categories")
              }
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 shadow-sm"
            >
              <Menu className="w-4 h-4" />
              Browse All Categories
              <ChevronDown className="w-4 h-4" />
            </button>

            {activeMenu === "categories" && (
              <ClickAwayListener onClickAway={() => setActiveMenu(null)}>
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border z-50">
                  <ul className="py-2">
                    {categories.map((c, i) => (
                      <li key={i}>
                        <Link
                          to={c.path}
                          onClick={() => setActiveMenu(null)}
                          className="px-4 py-3 flex gap-3 hover:bg-green-50 hover:text-green-600 text-sm text-gray-700"
                        >
                          <span>{c.icon}</span>
                          <span className="font-medium">{c.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </ClickAwayListener>
            )}
          </div>

          {/* Deals */}
          <Link
            to="/deals"
            className={`flex items-center gap-2 font-medium ${
              isActive("/deals")
                ? "text-green-600"
                : "text-gray-700 hover:text-green-600"
            }`}
          >
            <span>🔥</span>
            Deals
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigationLinks.map((link, i) => (
              <div key={i} className="relative">
                <Link
                  to={link.hasDropdown ? "#" : link.path}
                  onMouseEnter={() =>
                    link.hasDropdown && setActiveMenu(link.name)
                  }
                  onClick={(e) => {
                    if (link.hasDropdown) e.preventDefault();
                  }}
                  className={`flex items-center gap-1 font-medium ${
                    isActive(link.path)
                      ? "text-green-600"
                      : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* ✅ FIXED MEGA MENU */}
                {link.isMegaMenu && activeMenu === link.name && (
                  <ClickAwayListener onClickAway={() => setActiveMenu(null)}>
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2
                                 w-[850px] max-w-[95vw]
                                 bg-white rounded-lg shadow-2xl border z-50 p-6"
                    >
                      <div className="grid grid-cols-3 gap-8">
                        {megaMenuCategories.map((cat, idx) => (
                          <div key={idx}>
                            <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b-2 border-green-500">
                              {cat.title}
                            </h3>
                            <ul className="space-y-2">
                              {cat.items.map((item, i) => (
                                <li key={i}>
                                  <Link
                                    to={`/category/${item
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")
                                      .replace(/&/g, "and")}`}
                                    className="text-sm text-gray-600 hover:text-green-600"
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

                      {/* Hot Deals */}
                      <div className="mt-6 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl p-5 flex justify-between items-center">
                        <div>
                          <div className="text-xs uppercase text-gray-500 font-semibold">
                            Hot Deals
                          </div>
                          <h3 className="text-lg font-bold">Don't miss</h3>
                          <h3 className="text-lg font-bold">Trending</h3>
                          <div className="text-green-600 text-xl font-bold mt-2">
                            Save to 50%
                          </div>
                          <button className="mt-3 bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600">
                            Shop now
                          </button>
                        </div>
                        <div className="flex gap-4 items-center">
                          <span className="bg-yellow-400 px-4 py-2 rounded-full font-bold">
                            25% off
                          </span>
                          <span className="text-5xl">🥕🍆🥬</span>
                        </div>
                      </div>
                    </div>
                  </ClickAwayListener>
                )}

                {/* Pages dropdown */}
                {link.hasDropdown &&
                  !link.isMegaMenu &&
                  activeMenu === link.name && (
                    <ClickAwayListener onClickAway={() => setActiveMenu(null)}>
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-50">
                        <ul className="py-2">
                          {["Item 1", "Item 2", "Item 3"].map((item, idx) => (
                            <li key={idx}>
                              <Link
                                to={`${link.path}/item-${idx + 1}`}
                                className="block px-4 py-2 text-sm hover:bg-green-50 hover:text-green-600"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </ClickAwayListener>
                  )}
              </div>
            ))}
          </nav>

          {/* Support */}
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-green-600" />
            <div className="hidden xl:block">
              <div className="text-lg font-bold text-green-600">
                1900 - 888
              </div>
              <div className="text-xs text-gray-500">
                24/7 Support Center
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
