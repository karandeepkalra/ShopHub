import React, { createContext, useContext, useState, useEffect } from 'react';

// Real-time currency API integration
const API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest/INR';

// Alternative API endpoints for different bases
const ALTERNATIVE_APIS = {
  USD: 'https://api.exchangerate-api.com/v4/latest/USD',
  EUR: 'https://api.exchangerate-api.com/v4/latest/EUR'
};

// Fallback conversion rates (if API fails)
const fallbackRates = {
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

// Country to currency code mapping
const countryToCurrency = {
  'India': 'INR',
  'United States': 'USD',
  'United Kingdom': 'GBP',
  'United Arab Emirates': 'AED',
  'Canada': 'CAD',
  'Australia': 'AUD',
  'Singapore': 'SGD',
  'Malaysia': 'MYR',
  'Saudi Arabia': 'SAR',
  'All': 'INR'
};

// Currency symbols
const currencySymbols = {
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

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [conversionRates, setConversionRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const currencyCode = countryToCurrency[selectedCountry] || 'INR';
  const conversionRate = conversionRates[currencyCode] || 1;
  const currencySymbol = currencySymbols[currencyCode] || '₹';

  // Fetch real-time exchange rates
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(API_BASE_URL);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.rates) {
          // ALWAYS merge with fallback rates to ensure all currencies work
          const mergedRates = { ...fallbackRates, ...data.rates };
          setConversionRates(mergedRates);
        } else {
          throw new Error('Invalid API response format');
        }
      } catch (err) {
        setError(err.message);
        // Use fallback rates only
        setConversionRates(fallbackRates);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();
    
    // Refresh rates every hour
    const interval = setInterval(fetchExchangeRates, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const rate = conversionRates[currencyCode] || 1;
    const symbol = currencySymbols[currencyCode] || '₹';
  }, [selectedCountry, currencyCode, conversionRates]);

  const convertPrice = (priceInINR) => {
    const rate = conversionRates[currencyCode] || 1;
    const convertedPrice = priceInINR * rate;
    return convertedPrice;
  };

  const formatPrice = (priceInINR) => {
    const convertedPrice = convertPrice(priceInINR);
    const symbol = currencySymbols[currencyCode] || '₹';
    
    // Format based on currency
    if (['USD', 'CAD', 'AUD', 'EUR'].includes(currencyCode)) {
      return `${symbol}${convertedPrice.toFixed(2)}`;
    } else if (currencyCode === 'GBP') {
      return `${symbol}${convertedPrice.toFixed(2)}`;
    } else {
      // For INR and others, show as integer
      return `${symbol}${Math.round(convertedPrice).toLocaleString()}`;
    }
  };

  const formatVendorPrice = (price, productCurrency = 'INR') => {
    // If product is already in user's currency, just format it
    if (productCurrency === currencyCode) {
      const symbol = currencySymbols[currencyCode] || '₹';
      if (['USD', 'CAD', 'AUD', 'EUR', 'GBP'].includes(currencyCode)) {
        return `${symbol}${price.toFixed(2)}`;
      } else {
        return `${symbol}${Math.round(price).toLocaleString()}`;
      }
    }
    
    // Convert product price to INR first, then to user currency
    let priceInINR = price;
    if (productCurrency !== 'INR') {
      const conversionRates = {
        'USD': 83,
        'GBP': 105,
        'EUR': 90,
        'CAD': 61,
        'AUD': 55,
        'AED': 23,
        'SGD': 62,
        'MYR': 18,
        'SAR': 22
      };
      priceInINR = price * (conversionRates[productCurrency] || 1);
    }
    
    return formatPrice(priceInINR);
  };

  const value = {
    selectedCountry,
    setSelectedCountry,
    conversionRates,
    conversionRate,
    currencySymbol,
    loading,
    error,
    convertPrice,
    formatPrice,
    formatVendorPrice,
    currencyCode,
    currencySymbols
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyContext;
