import { useEffect, useState } from "react";
import { Send } from "lucide-react";

export const Slider = () => {
  const slides = [
    {
      image: "/images/Slider1.png",
      title: "Fresh Vegetables\nBig Discounts",
      subtitle: "Save up to 50% off on your first order.",
      bg: "bg-emerald-50",
      accent: "text-emerald-600",
    },
    {
      image: "/images/Slider2.png",
      title: "Don't Miss amazing\ngrocery deals",
      subtitle: "Sign up for the daily newsletter",
      bg: "bg-amber-50",
      accent: "text-amber-600",
    },
    {
      image: "/images/Slider3.png",
      title: "Organic Fruits\nDaily Fresh",
      subtitle: "Healthy food for your family",
      bg: "bg-orange-50",
      accent: "text-orange-600",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="w-full h-[350px] sm:h-[450px] lg:h-[550px] xl:h-[600px] overflow-hidden relative group">
      <div
        className="flex h-full transition-transform duration-1000 cubic-bezier(0.4, 0, 0.2, 1)"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className={`w-full h-full flex-shrink-0 relative ${slide.bg}`}>
            <img
              src={slide.image}
              alt={`slide-${index}`}
              className="absolute inset-0 w-full h-full object-cover object-center lg:object-right scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent lg:from-white/80" />

            <div className="relative z-10 h-full flex items-center">
              <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
                <div className="max-w-xl animate-in fade-in slide-in-from-left-8 duration-1000">
                  <span className={`inline-block px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm text-xs lg:text-sm font-bold mb-4 lg:mb-6 ${slide.accent}`}>
                    HOT DEALS
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-4 lg:mb-6 whitespace-pre-line tracking-tight">
                    {slide.title}
                  </h1>
                  <p className="text-base lg:text-xl text-gray-600 font-medium mb-8 lg:mb-12 max-w-md leading-relaxed">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter - Positioned responsively */}
      <div className="absolute bottom-10 lg:bottom-16 left-6 sm:left-12 lg:left-20 z-20 w-[calc(100%-48px)] max-w-md">
        <form onSubmit={(e) => e.preventDefault()} className="flex p-1 bg-white rounded-2xl shadow-2xl shadow-black/10 items-center ring-1 ring-black/5">
          <div className="p-3 text-gray-400">
            <Send size={18} />
          </div>
          <input
            type="email"
            placeholder="Your Email Address..."
            className="flex-1 bg-transparent px-2 py-3 text-sm font-medium outline-none text-gray-800 placeholder:text-gray-400"
          />
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 lg:px-8 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-emerald-200">
            Subscribe
          </button>
        </form>
      </div>

      {/* Indicators */}
      <div className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-1.5 lg:w-2 transition-all duration-300 rounded-full ${currentIndex === i ? 'h-8 lg:h-12 bg-emerald-600' : 'h-1.5 lg:h-2 bg-gray-300 hover:bg-gray-400'
              }`}
          />
        ))}
      </div>
    </div>
  );
};
