import React from "react";
const SalesBanner = () => {
  return (
    <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg p-8 text-white text-center">
      <div className="text-sm font-semibold mb-2">SALE UP TO</div>
      <div className="text-6xl font-bold mb-4" style={{ color: '#FFD700' }}>50%</div>
      <div className="text-sm">off on selected items*</div>
    </div>
  );
};

export default SalesBanner;