import React, { useEffect, useState } from "react";
import { Search, Heart, ShoppingCart, MapPin, User, GitCompare, Settings, LogOut } from "lucide-react";
import axios from "axios";
import { Navbar } from "./Navbar";
import CustomDropdown from "./CustomDropdown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
const Header = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedState, setSelectedState] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const categories = [
    "All Categories",
    "Electronics",
    "Fashion",
    "Home",
    "Beauty & Personal Care",
    "Sports & Outdoors",
    "Books",
    "Toys & Games",
    "Automotive",
    "Grocery",
  ];

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    try {
      const res = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name"
      );

      const countries = res.data
        .map((country) => country.name.common)
        .sort();

      setCountryList(["All", ...countries]);
    } catch (error) {
      console.error("Country API error:", error);
    }
  };

  return (
    <>
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-200 shadow-sm">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-5 ">
        <div className="flex items-center w-full gap-12">

          {/* Column 1: Logo - LEFT */}
          <div className="flex-shrink-0 w-48">
            <div className="h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">ShopHub</span>
            </div>
          </div>

          {/* Column 2: Search Bar - CENTER */}
          <div className="flex-1">
            <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="border-r border-gray-200">
                <CustomDropdown
                  options={categories}
                  selectedValue={selectedCategory}
                  onSelect={setSelectedCategory}
                  className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 w-44 justify-between"
                  dropdownClassName="w-56"
                />
              </div>

              <input
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 text-sm outline-none"
              />

              <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-r-lg hover:from-green-700 hover:to-green-800 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Column 3: Actions - RIGHT */}
          <div className="flex-shrink-0 flex items-center gap-6">
            <CustomDropdown
              options={countryList}
              selectedValue={selectedState}
              onSelect={setSelectedState}
              icon={<MapPin className="w-4 h-4 text-green-600" />}
              className="hidden lg:flex px-3 py-2 bg-white rounded-lg text-sm text-gray-700 border border-gray-200 shadow-sm hover:shadow-md transition-shadow w-44 justify-between"
              dropdownClassName="w-52"
              showSearch
            />

            <div className="flex items-center gap-5">
              <button className="hidden md:block hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-gray-700 hover:text-green-600 transition-colors" />
              </button>

              <button className="hover:scale-110 transition-transform">
                <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-green-600 transition-colors" />
              </button>

              <button className="hover:scale-110 transition-transform">
                <GitCompare className="w-6 h-6 text-gray-700 hover:text-green-600 transition-colors" />
              </button>

              <div className="relative">
  <button
    onClick={() => setShowAccountMenu(prev => !prev)}
    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg"
  >
    <User className="w-4 h-4" />
    <span className="font-medium">Account</span>
  </button>

  {showAccountMenu && (
    <ClickAwayListener onClickAway={() => setShowAccountMenu(false)}>
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <ul className="py-2 text-sm text-gray-700">
                      <li className="px-4 py-2 hover:text-green-600 flex items-center gap-3 cursor-pointer">
                        <User className="w-4 h-4 text-gray-600" />
                        My Account
                      </li>

                      <li className="px-4 py-2 hover:text-green-600 flex items-center gap-3 cursor-pointer">
                        <MapPin className="w-4 h-4 text-gray-600" />
                        Order Tracking
                      </li>

                      <li className="px-4 py-2 hover:text-green-600 flex items-center gap-3 cursor-pointer">
                        <ShoppingCart className="w-4 h-4 text-gray-600" />
                        My Voucher
                      </li>

                      <li className="px-4 py-2 hover:text-green-600 flex items-center gap-3 cursor-pointer">
                        <Heart className="w-4 h-4 text-gray-600" />
                        My Wishlist
                      </li>

                      <li className="px-4 py-2 hover:text-green-600 flex items-center gap-3 cursor-pointer">
                        <Settings className="w-4 h-4 text-gray-600" />
                        Settings
                      </li>


                      <li className="px-4 py-2 hover:text-green-600 flex items-center gap-3 cursor-pointer">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </li>
                    </ul>

                  </div>
                   </ClickAwayListener>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
    <Navbar/>
    </> 
  );
};

export default Header;