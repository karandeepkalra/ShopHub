import React from 'react';
import { Star } from 'lucide-react';

export const RatingFilter = ({ selectedRatings, onRatingChange }) => {
  const ratings = [5, 4, 3, 2, 1];
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border mb-6">
      <h3 className="font-bold text-gray-800 mb-4">Filter By Ratings</h3>
      <div className="space-y-3">
        {ratings.map((rating) => (
          <label key={rating} className="flex items-center gap-2 cursor-pointer hover:text-teal-600">
            <input
              type="checkbox"
              checked={selectedRatings.includes(rating)}
              onChange={() => onRatingChange(rating)}
              className="w-4 h-4 text-teal-600 accent-teal-600"
            />
            <div className="flex gap-0.5">
              {[...Array(rating)].map((_, i) => (
                <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
              ))}
              {[...Array(5 - rating)].map((_, i) => (
                <Star key={i + rating} size={16} className="fill-gray-200 text-gray-200" />
              ))}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RatingFilter;