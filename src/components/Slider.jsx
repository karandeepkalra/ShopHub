import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Slider = () => {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1600",
      title: "Summer Collection 2024",
      subtitle: "Upto 70% Off on All Products",
      buttonText: "Shop Now",
      bg: "bg-gradient-to-r from-blue-50 to-indigo-50",
      textColor: "text-blue-800"
    },
    {
      image: "https://images.unsplash.com/photo-1445205170230-053b83016042?w=1600",
      title: "New Arrivals",
      subtitle: "Trending Styles for Men & Women",
      buttonText: "Explore",
      bg: "bg-gradient-to-r from-pink-50 to-rose-50",
      textColor: "text-rose-800"
    },
    {
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600",
      title: "Flash Sale",
      subtitle: "Limited Time Offers - Hurry Up!",
      buttonText: "Grab the Deal",
      bg: "bg-gradient-to-r from-amber-50 to-orange-50",
      textColor: "text-amber-800"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full h-[200px] sm:h-[280px] md:h-[320px] lg:h-[400px] xl:h-[450px] overflow-hidden relative group">
      {/* Navigation Arrows */}
      <button 
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className={`w-full h-full flex-shrink-0 relative ${slide.bg}`}>
            <div className="absolute inset-0 w-full h-full bg-black/20 z-[1]"></div>
            <img
              src={slide.image}
              alt={`slide-${index}`}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent lg:from-white/80" />

            <div className="absolute inset-0 w-full h-full flex items-center z-10">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-md bg-white/90 p-6 rounded-lg shadow-lg">
                  <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-3 ${slide.textColor}`}>
                    {slide.title}
                  </h2>
                  <p className="text-base sm:text-lg text-gray-700 mb-6">
                    {slide.subtitle}
                  </p>
                  <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-1.5 rounded-full transition-all ${
              currentIndex === index ? 'bg-white w-8' : 'bg-white/50 w-4'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
