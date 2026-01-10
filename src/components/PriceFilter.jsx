import React from 'react';

export const PriceFilter = ({ minPrice, maxPrice, onPriceChange }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border mb-6">
      <h3 className="font-bold text-gray-800 mb-4">Filter by price</h3>
      <div className="border-b-2 border-teal-500 w-12 mb-6"></div>
      
      <div className="mb-4">
        <input
          type="range"
          min="100"
          max="60000"
          value={maxPrice}
          onChange={(e) => onPriceChange(minPrice, parseInt(e.target.value))}
          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
        />
      </div>
      
      <div className="flex justify-between text-sm">
        <span className="text-teal-600 font-semibold">From: Rs {minPrice}</span>
        <span className="text-teal-600 font-semibold">To: Rs {maxPrice}</span>
      </div>
    </div>
  );
};

export default PriceFilter;