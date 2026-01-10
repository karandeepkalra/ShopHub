import { useEffect, useState } from "react";

export const Slider = () => {
  const slides = [
    {
      image: "/images/Slider1.png",
      title: "Fresh Vegetables Big Discounts",
      subtitle: "Save upto 50% off on your first Order.",
      bg: "bg-green-100",
    },
    {
      image: "/images/Slider2.png",
      title: "Don't Miss amazing grocery deals",
      subtitle: "Sign up for the Daily newsletter",
      bg: "bg-yellow-100",
    },
    {
      image: "/images/Slider3.png",
      title: "Organic Fruits Daily Fresh",
      subtitle: "Healthy food for your family",
      bg: "bg-orange-100",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[550px] overflow-hidden relative">
      <div
        className="flex h-full transition-transform duration-700"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`w-full h-full flex-shrink-0 relative ${slide.bg}`}
          >
            {/* Background Image */}
            <img
              src={slide.image}
              alt={`slide-${index}`}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="w-full px-12">
                <h1 className="text-4xl font-bold text-gray-800 whitespace-pre-line">
                  {slide.title}
                </h1>

                <p className="mt-4 text-gray-600">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Email Input - Outside sliding container */}
      <div className="absolute bottom-20 left-12 z-20 max-w-md">
        <div className="flex bg-white rounded-full overflow-hidden shadow">
          <input
            type="email"
            placeholder="Your Email Address..."
            className="flex-1 px-4 py-3 outline-none"
          />
          <button className="bg-green-500 text-white px-6 font-semibold">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};