import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const CategorySlider = () => {
  const categories = [
    {
      name: "Cake & Milk",
      items: "26 Items",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&h=200&fit=crop",
      bg: "bg-green-50",
    },
    {
      name: "Organic Kiwi",
      items: "28 Items",
      image: "https://images.unsplash.com/photo-1585059895524-72359e06133a?w=200&h=200&fit=crop",
      bg: "bg-yellow-50",
    },
    {
      name: "Peach",
      items: "14 Items",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX7jGUtc72V49IYW8UzqlmznopxALIg61bLA&s",
      bg: "bg-green-50",
    },
    {
      name: "Red Apple",
      items: "54 Items",
      image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=200&h=200&fit=crop",
      bg: "bg-red-50",
    },
    {
      name: "Snack",
      items: "56 Items",
      image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=200&h=200&fit=crop",
      bg: "bg-orange-50",
    },
    {
      name: "Vegetables",
      items: "72 Items",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&h=200&fit=crop",
      bg: "bg-green-100",
    },
    {
      name: "Strawberry",
      items: "36 Items",
      image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200&h=200&fit=crop",
      bg: "bg-pink-50",
    },
    {
      name: "Black plum",
      items: "123 Items",
      image: "https://images.unsplash.com/photo-1574856344991-aaa31b6f4ce3?w=200&h=200&fit=crop",
      bg: "bg-purple-50",
    },
    {
      name: "Custard apple",
      items: "34 Items",
      image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=200&h=200&fit=crop",
      bg: "bg-green-50",
    },
    {
      name: "Coffee & Tea",
      items: "89 Items",
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=200&h=200&fit=crop",
      bg: "bg-orange-50",
    },
  ];

  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeTab, setActiveTab] = useState("Pet Foods");

  const tabs = ["Cake & Milk", "Coffee & Teas", "Pet Foods", "Vegetables"];

  const handleScroll = (direction) => {
    const container = document.getElementById("category-container");
    const scrollAmount = 300;
    
    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
      setScrollPosition(container.scrollLeft - scrollAmount);
    } else {
      container.scrollLeft += scrollAmount;
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  return (
    <div className="w-full mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-8">
          <h2 className="text-2xl font-bold text-gray-800">Featured Categories</h2>
          
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => handleScroll("left")}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Categories Slider */}
      <div
        id="category-container"
        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-44 ${category.bg} rounded-lg p-6 text-center cursor-pointer hover:shadow-lg transition-shadow duration-300`}
          >
            <div className="w-28 h-28 mx-auto mb-4 overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
            <p className="text-sm text-gray-500">{category.items}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};