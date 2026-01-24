import React from 'react';
import { useCurrency } from '../context/CurrencyContext';

const CurrencyTest = () => {
  const { 
    selectedCountry, 
    setSelectedCountry, 
    formatPrice, 
    conversionRate, 
    currencySymbol,
    loading,
    error,
    conversionRates,
    currencyCode,
    lastUpdated
  } = useCurrency();
  
  const testPrice = 2499; // Test price in INR
  
  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg m-4">
      <h3 className="font-bold text-lg mb-4">Real-Time Currency Conversion Test</h3>
      
      {/* Loading State */}
      {loading && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
          <p className="text-blue-700 font-medium">🔄 Loading exchange rates...</p>
          <p className="text-blue-600 text-sm">Fetching real-time data from API</p>
        </div>
      )}
      
      {/* Error State */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
          <p className="text-red-700 font-medium">⚠️ API Error: {error}</p>
          <p className="text-red-600 text-sm">Using fallback rates</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="space-y-2 text-sm">
          <p><strong>Current State:</strong></p>
          <p><strong>Selected Country:</strong> {selectedCountry}</p>
          <p><strong>Currency Code:</strong> {currencyCode}</p>
          <p><strong>Conversion Rate:</strong> {conversionRate.toFixed(4)}</p>
          <p><strong>Currency Symbol:</strong> {currencySymbol}</p>
          <p><strong>Test Price (INR):</strong> ₹{testPrice}</p>
          <p><strong>Formatted Result:</strong> <span className="font-bold text-blue-600">{formatPrice(testPrice)}</span></p>
          <p><strong>Last Updated:</strong> {lastUpdated}</p>
        </div>
        
        <div className="space-y-2 text-sm">
          <p><strong>Available Exchange Rates:</strong></p>
          <div className="max-h-40 overflow-y-auto bg-gray-50 p-2 rounded">
            {Object.entries(conversionRates).map(([code, rate]) => {
              const isWorking = rate > 0;
              return (
                <div key={code} className={`flex justify-between text-xs ${isWorking ? 'text-green-700' : 'text-red-500'}`}>
                  <span><strong>{code}:</strong></span>
                  <span>{rate.toFixed(4)} {isWorking ? '✅' : '❌'}</span>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-500">
            *Green = Working | Red = Not Available
          </p>
          <p className="text-xs text-gray-500">
            *Rates are from INR to target currency
          </p>
        </div>
        
        <div className="space-y-2 text-sm">
          <p><strong>Country Status Check:</strong></p>
          {[
            { country: 'India', code: 'INR' },
            { country: 'United States', code: 'USD' },
            { country: 'United Kingdom', code: 'GBP' },
            { country: 'Canada', code: 'CAD' },
            { country: 'Australia', code: 'AUD' },
            { country: 'United Arab Emirates', code: 'AED' },
            { country: 'Singapore', code: 'SGD' },
            { country: 'Malaysia', code: 'MYR' },
            { country: 'Saudi Arabia', code: 'SAR' }
          ].map(({ country, code }) => {
            const rate = conversionRates[code];
            const isWorking = rate && rate > 0;
            const isSelected = selectedCountry === country;
            
            return (
              <div key={country} className={`flex justify-between items-center text-xs p-1 rounded ${
                isSelected ? 'bg-blue-100 border border-blue-300' : 
                isWorking ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <span>{country} ({code}):</span>
                <span className="flex items-center gap-1">
                  {rate ? rate.toFixed(4) : 'N/A'}
                  {isWorking ? '✅' : '❌'}
                  {isSelected && '👈'}
                </span>
              </div>
            );
          })}
          
          <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
            <p><strong>✅ Only Supported Countries Shown:</strong></p>
            <p>Header dropdown now only shows countries with working currency conversion</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <p className="font-semibold">Quick Test:</p>
        <select 
          value={selectedCountry} 
          onChange={(e) => {
            console.log('Test country selected:', e.target.value);
            setSelectedCountry(e.target.value);
          }}
          className="px-2 py-1 border rounded"
        >
          <option value="India">India</option>
          <option value="United States">United States</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
          <option value="United Arab Emirates">United Arab Emirates</option>
          <option value="Singapore">Singapore</option>
          <option value="Malaysia">Malaysia</option>
          <option value="Saudi Arabia">Saudi Arabia</option>
        </select>
        
        <div className="mt-2 space-y-1">
          <button 
            onClick={() => window.location.reload()}
            className="px-3 py-1 bg-orange-500 text-white rounded text-sm mr-2"
          >
            🔄 Refresh Rates
          </button>
          <button 
            onClick={() => setSelectedCountry('Canada')}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm mr-2"
          >
            Force Canada
          </button>
          <button 
            onClick={() => setSelectedCountry('United States')}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm mr-2"
          >
            Force USA
          </button>
          <button 
            onClick={() => setSelectedCountry('India')}
            className="px-3 py-1 bg-green-500 text-white rounded text-sm"
          >
            Force India
          </button>
        </div>
        
        <div className="mt-2 text-xs text-gray-600">
          <p>✅ Real-time exchange rates from API + fallbacks</p>
          <p>🔄 Auto-refresh every hour (manual refresh available)</p>
          <p>📊 All currencies should work now (green = working)</p>
          <p>🔧 If still issues, check console for errors</p>
        </div>
      </div>
    </div>
  );
};

export default CurrencyTest;
