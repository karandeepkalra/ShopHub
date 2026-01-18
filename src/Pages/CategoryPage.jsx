import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "../components/ProductCard";
import {PriceFilter} from "../components/PriceFilter"
import { ChevronDown } from "lucide-react";
import {RatingFilter} from "../components/RatingFilter"
import SalesBanner from "../components/SalesBanner"

const CategoryPage = () => {
  const { category } = useParams();
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(60000);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [showCount, setShowCount] = useState(50);
  const [sortBy, setSortBy] = useState("featured");
  const [showDropdownOpen, setShowDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const showDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);

  // Fetch products from Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdownRef.current && !showDropdownRef.current.contains(event.target)) {
        setShowDropdownOpen(false);
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setSortDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePriceChange = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleRatingChange = (rating) => {
    setSelectedRatings(prev =>
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const categoryMatch = !category || product.category?.toLowerCase() === category.toLowerCase();
    const priceMatch = product.price >= minPrice && product.price <= maxPrice;
    const ratingMatch = selectedRatings.length === 0 || selectedRatings.includes(product.rating);
    return categoryMatch && priceMatch && ratingMatch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "release-date":
        return new Date(b.releaseDate) - new Date(a.releaseDate);
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // Limit products by show count
  const displayProducts = sortedProducts.slice(0, showCount);

  const showOptions = [50, 100, 150, 200, "All"];
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Less To High" },
    { value: "price-high", label: "Price: High To Less" },
    { value: "release-date", label: "Release Date" },
    { value: "rating", label: "Avg. Rating" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="w-full mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <PriceFilter 
              minPrice={minPrice}
              maxPrice={maxPrice}
              onPriceChange={handlePriceChange}
            />
            <RatingFilter 
              selectedRatings={selectedRatings}
              onRatingChange={handleRatingChange}
            />
            <SalesBanner />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 capitalize">
                {category ? category.replace('-', ' & ') : 'All Products'}
              </h1>
              <p className="text-gray-600 mt-2">
                Showing {displayProducts.length} of {filteredProducts.length} products
              </p>
            </div>

            {/* Filter Controls */}
            <div className="flex gap-4 mb-6">
              {/* Show Dropdown */}
              <div className="relative" ref={showDropdownRef}>
                <button
                  onClick={() => setShowDropdownOpen(!showDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <span className="text-gray-700">Show : {showCount === Infinity ? "All" : showCount}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                
                {showDropdownOpen && (
                  <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    {showOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setShowCount(option === "All" ? Infinity : option);
                          setShowDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 transition first:rounded-t-lg last:rounded-b-lg"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="relative" ref={sortDropdownRef}>
                <button
                  onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <span className="text-gray-700">
                    Sort By: {sortOptions.find(opt => opt.value === sortBy)?.label}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                
                {sortDropdownOpen && (
                  <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setSortDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition first:rounded-t-lg last:rounded-b-lg ${
                          sortBy === option.value ? "bg-green-50 text-green-700" : ""
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-lg text-gray-600">Loading products...</div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;