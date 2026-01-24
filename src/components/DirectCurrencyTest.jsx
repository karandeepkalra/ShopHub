import React from 'react';

// Direct currency conversion test (no context)
const DirectCurrencyTest = () => {
  const testPrice = 2499; // INR
  
  // Manual conversion rates (same as fallback)
  const rates = {
    'USD': 0.012,
    'GBP': 0.0095,
    'AED': 0.044,
    'CAD': 0.016,
    'AUD': 0.018,
    'SGD': 0.016,
    'MYR': 0.055,
    'SAR': 0.045,
    'EUR': 0.011
  };
  
  const symbols = {
    'INR': '₹',
    'USD': '$',
    'GBP': '£',
    'AED': 'د.إ',
    'CAD': 'C$',
    'AUD': 'A$',
    'SGD': 'S$',
    'MYR': 'RM',
    'SAR': 'ر.س',
    'EUR': '€'
  };
  
  const formatDirectPrice = (currencyCode) => {
    const rate = rates[currencyCode] || 1;
    const symbol = symbols[currencyCode] || '₹';
    const convertedPrice = testPrice * rate;
    
    if (['USD', 'CAD', 'AUD', 'EUR'].includes(currencyCode)) {
      return `${symbol}${convertedPrice.toFixed(2)}`;
    } else {
      return `${symbol}${Math.round(convertedPrice).toLocaleString()}`;
    }
  };
  
  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg m-4">
      <h3 className="font-bold text-lg mb-4">Direct Currency Test (No Context)</h3>
      
      <div className="space-y-2 text-sm">
        <p><strong>Test Price (INR):</strong> ₹{testPrice}</p>
        <p><strong>Direct Calculations:</strong></p>
        
        {Object.entries(rates).map(([code, rate]) => (
          <div key={code} className="flex justify-between items-center p-2 bg-white rounded">
            <span><strong>{code}:</strong></span>
            <span className="flex items-center gap-2">
              <span>Rate: {rate}</span>
              <span>Result: {formatDirectPrice(code)}</span>
              <span className="text-green-600">✅</span>
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-2 bg-yellow-50 rounded text-xs">
        <p><strong>Expected Results:</strong></p>
        <p>Canada: C$39.98 (2499 × 0.016)</p>
        <p>USA: $29.99 (2499 × 0.012)</p>
        <p>UK: £23.74 (2499 × 0.0095)</p>
        <p>If these match above, calculations are correct!</p>
      </div>
    </div>
  );
};

export default DirectCurrencyTest;
