import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const NotFound = () => {
  const [insects, setInsects] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Create multiple insects with random positions and animations
    const insectArray = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      duration: 8 + Math.random() * 8,
      delay: Math.random() * 3,
    }));
    setInsects(insectArray);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
      {/* Animated Insects */}
      {insects.map((insect) => (
        <div
          key={insect.id}
          className="absolute text-2xl animate-float"
          style={{
            left: `${insect.startX}%`,
            top: `${insect.startY}%`,
            animation: `float ${insect.duration}s ease-in-out infinite`,
            animationDelay: `${insect.delay}s`,
          }}
        >
          🐜
        </div>
      ))}

      {/* Main Content */}
      <div className="text-center z-10 px-4">
        {/* 404 with Cookie */}
        <div className="relative inline-block mb-8">
          <h1 className="text-9xl font-bold text-amber-800 tracking-wider flex items-center justify-center">
            4
            <span className="relative mx-4">
              {/* Cookie */}
              <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full relative shadow-xl">
                {/* Cookie chips */}
                <div className="absolute w-4 h-4 bg-amber-900 rounded-full top-6 left-8"></div>
                <div className="absolute w-3 h-3 bg-amber-900 rounded-full top-12 right-8"></div>
                <div className="absolute w-4 h-4 bg-amber-900 rounded-full bottom-8 left-10"></div>
                <div className="absolute w-3 h-3 bg-amber-900 rounded-full top-16 left-16"></div>
                <div className="absolute w-3 h-3 bg-amber-900 rounded-full bottom-10 right-10"></div>
                {/* Cookie crumbs */}
                <div className="absolute w-2 h-2 bg-yellow-300 rounded-full top-10 right-6 animate-pulse"></div>
                <div className="absolute w-2 h-2 bg-yellow-300 rounded-full bottom-12 left-6 animate-pulse"></div>
                <div className="absolute w-1 h-1 bg-yellow-300 rounded-full top-20 left-20 animate-pulse"></div>
                {/* Crumbs floating away */}
                <div className="absolute w-2 h-2 bg-yellow-400 rounded-full -top-4 right-8 animate-bounce"></div>
                <div className="absolute w-1 h-1 bg-yellow-400 rounded-full -top-2 right-12 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </span>
            4
          </h1>
          
          {/* Flying insects near the numbers */}
          <div className="absolute -top-8 left-12 text-3xl animate-buzz">🐝</div>
          <div className="absolute -top-4 right-20 text-2xl animate-buzz" style={{ animationDelay: '1s' }}>🦟</div>
        </div>

        {/* Page not Found text */}
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Page not Found
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          Oops! The page you're looking for seems to have been eaten by our cookie-loving insects.
        </p>

        {/* Back to Home Button */}
        <button onClick={() => navigate("/")} className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
          Go Back Home
        </button>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(30px, -40px) rotate(90deg);
          }
          50% {
            transform: translate(-20px, -80px) rotate(180deg);
          }
          75% {
            transform: translate(-40px, -40px) rotate(270deg);
          }
        }

        @keyframes buzz {
          0%, 100% {
            transform: translate(0, 0) rotate(-5deg);
          }
          25% {
            transform: translate(10px, -5px) rotate(5deg);
          }
          50% {
            transform: translate(-5px, 5px) rotate(-3deg);
          }
          75% {
            transform: translate(8px, 2px) rotate(3deg);
          }
        }

        .animate-float {
          animation: float 10s ease-in-out infinite;
        }

        .animate-buzz {
          animation: buzz 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
