import { useParams } from "react-router-dom";
import { useState } from "react";
import { allProducts } from "../data/Product";
import ProductCard from "../components/ProductCard";
import {PriceFilter} from "../components/PriceFilter"
import {RatingFilter} from "../components/RatingFilter"
import SalesBanner from "../components/SalesBanner"
const CategoryPage = () => {
  const { category } = useParams();
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(60000);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const products = allProducts[category] || [];

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

  const filteredProducts = products.filter(product => {
    const priceMatch = product.price >= minPrice && product.price <= maxPrice;
    const ratingMatch = selectedRatings.length === 0 || selectedRatings.includes(product.rating);
    return priceMatch && ratingMatch;
  });

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
                Showing {filteredProducts.length} products
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;