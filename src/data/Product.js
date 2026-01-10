import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import PriceFilter from '../components/PriceFilter';
import RatingFilter from '../components/RatingFilter';
import SalesBanner from '../components/SalesBanner';

// Product data - Later move this to a separate file
export const allProducts = {
  electronics: [
    { 
      id: 1, 
      name: 'Samsung Galaxy S23', 
      category: 'Electronics', 
      brand: 'Samsung', 
      rating: 5, 
      price: 54999, 
      originalPrice: 64999, 
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', 
      badge: 'Hot',
      badgeColor: 'bg-pink-500'
    },
    { 
      id: 2, 
      name: 'iPhone 14 Pro', 
      category: 'Electronics', 
      brand: 'Apple', 
      rating: 5, 
      price: 89999, 
      originalPrice: 99999, 
      image: 'https://images.unsplash.com/photo-1592286927505-4a097c6ed0cd?w=400', 
      badge: 'New',
      badgeColor: 'bg-green-500'
    },
    { 
      id: 3, 
      name: 'OnePlus 11R 5G', 
      category: 'Electronics', 
      brand: 'OnePlus', 
      rating: 4, 
      price: 34999, 
      originalPrice: 39999, 
      image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400', 
      badge: 'Sale',
      badgeColor: 'bg-blue-400'
    },
    { 
      id: 4, 
      name: 'Xiaomi Pad 6', 
      category: 'Electronics', 
      brand: 'Xiaomi', 
      rating: 4, 
      price: 26999, 
      originalPrice: 29999, 
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400', 
      badge: 'Hot',
      badgeColor: 'bg-pink-500'
    },
  ],
  fashion: [
    { 
      id: 5, 
      name: 'Glowworld Women Blue Printed', 
      category: 'Fashion', 
      brand: 'Glowworld', 
      rating: 4, 
      price: 100, 
      originalPrice: 480, 
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400', 
      badge: 'Hot',
      badgeColor: 'bg-pink-500'
    },
    { 
      id: 6, 
      name: 'Siril Georgette Brown Collar', 
      category: 'Fashion', 
      brand: 'SIRIL', 
      rating: 5, 
      price: 450, 
      originalPrice: 490, 
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400', 
      badge: 'New',
      badgeColor: 'bg-green-500'
    },
    { 
      id: 7, 
      name: 'Buy New Trend Women Black', 
      category: 'Fashion', 
      brand: 'Trilok Fab', 
      rating: 5, 
      price: 1500, 
      originalPrice: 2200, 
      image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=400', 
      badge: 'Sale',
      badgeColor: 'bg-blue-400'
    },
    { 
      id: 8, 
      name: "Men's shirt", 
      category: 'Fashion', 
      brand: 'BUSHIRT', 
      rating: 5, 
      price: 800, 
      originalPrice: 1200, 
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400', 
      badge: 'Hot',
      badgeColor: 'bg-pink-500'
    },
    { 
      id: 9, 
      name: 'Deel Band Women Rayon', 
      category: 'Fashion', 
      brand: 'Deel band', 
      rating: 5, 
      price: 350, 
      originalPrice: 500, 
      image: 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=400', 
      badge: 'New',
      badgeColor: 'bg-green-500'
    },
    { 
      id: 10, 
      name: 'GESPO Peach Solid Mandarin', 
      category: 'Fashion', 
      brand: 'GESPO', 
      rating: 5, 
      price: 680, 
      originalPrice: 800, 
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400', 
      badge: 'Hot',
      badgeColor: 'bg-pink-500'
    },
    { 
      id: 11, 
      name: 'EYEBOGLER Teal Tshirts', 
      category: 'Fashion', 
      brand: 'EYEBOGLER', 
      rating: 5, 
      price: 420, 
      originalPrice: 550, 
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400', 
      badge: 'Sale',
      badgeColor: 'bg-blue-400'
    },
    { 
      id: 12, 
      name: 'EYEBOGLER Polo Tshirts', 
      category: 'Fashion', 
      brand: 'EYEBOGLER', 
      rating: 4, 
      price: 520, 
      originalPrice: 650, 
      image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=400', 
      badge: 'New',
      badgeColor: 'bg-green-500'
    },
  ],
  'home-living': [
    { 
      id: 13, 
      name: 'Modern Table Lamp', 
      category: 'Home & Living', 
      brand: 'HomeDecor', 
      rating: 5, 
      price: 1299, 
      originalPrice: 1999, 
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400', 
      badge: 'Hot',
      badgeColor: 'bg-pink-500'
    },
    { 
      id: 14, 
      name: 'Cotton Bed Sheets', 
      category: 'Home & Living', 
      brand: 'SleepWell', 
      rating: 4, 
      price: 899, 
      originalPrice: 1299, 
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400', 
      badge: 'New',
      badgeColor: 'bg-green-500'
    },
    { 
      id: 15, 
      name: 'Wall Clock', 
      category: 'Home & Living', 
      brand: 'TimeKeeper', 
      rating: 4, 
      price: 599, 
      originalPrice: 899, 
      image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400', 
      badge: 'Sale',
      badgeColor: 'bg-blue-400'
    },
    { 
      id: 16, 
      name: 'Decorative Cushions', 
      category: 'Home & Living', 
      brand: 'ComfortZone', 
      rating: 5, 
      price: 399, 
      originalPrice: 599, 
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400', 
      badge: 'Hot',
      badgeColor: 'bg-pink-500'
    },
  ],
  'beauty-care': [
    { 
      id: 17, 
      name: 'Face Moisturizer', 
      category: 'Beauty & Care', 
      brand: 'BeautyPro', 
      rating: 5, 
      price: 499, 
      originalPrice: 699, 
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400', 
      badge: 'Hot',
      badgeColor: 'bg-pink-500'
    },
    { 
      id: 18, 
      name: 'Hair Serum', 
      category: 'Beauty & Care', 
      brand: 'HairCare', 
      rating: 4, 
      price: 349, 
      originalPrice: 499, 
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400', 
      badge: 'New',
      badgeColor: 'bg-green-500'
    },
  ],
  sports: [
    { 
      id: 19, 
      name: 'Yoga Mat', 
      category: 'Sports', 
      brand: 'FitnessPro', 
      rating: 5, 
      price: 799, 
      originalPrice: 1199, 
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400', 
      badge: 'Hot',
      badgeColor: 'bg-pink-500'
    },
    { 
      id: 20, 
      name: 'Dumbbells Set', 
      category: 'Sports', 
      brand: 'GymGear', 
      rating: 4, 
      price: 1499, 
      originalPrice: 1999, 
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400', 
      badge: 'Sale',
      badgeColor: 'bg-blue-400'
    },
  ],
  books: [
    { 
      id: 21, 
      name: 'Fiction Novel Collection', 
      category: 'Books', 
      brand: 'ReadMore', 
      rating: 5, 
      price: 299, 
      originalPrice: 499, 
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400', 
      badge: 'Hot',
      badgeColor: 'bg-pink-500'
    },
  ],
  'toys-games': [
    { 
      id: 22, 
      name: 'Building Blocks Set', 
      category: 'Toys & Games', 
      brand: 'KidsFun', 
      rating: 5, 
      price: 899, 
      originalPrice: 1299, 
      image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400', 
      badge: 'New',
      badgeColor: 'bg-green-500'
    },
  ],
  automotive: [
    { 
      id: 23, 
      name: 'Car Phone Holder', 
      category: 'Automotive', 
      brand: 'AutoTech', 
      rating: 4, 
      price: 299, 
      originalPrice: 499, 
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400', 
      badge: 'Sale',
      badgeColor: 'bg-blue-400'
    },
  ],
  grocery: [
    { 
      id: 24, 
      name: 'Good Life Whole Moong 500g', 
      category: 'Grocery', 
      brand: 'AASHIRVAAD', 
      rating: 4, 
      price: 20, 
      originalPrice: 140, 
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400', 
      badge: 'Hot',
      badgeColor: 'bg-pink-500'
    },
    { 
      id: 25, 
      name: 'Moong Dal 2 kg', 
      category: 'Grocery', 
      brand: 'Private Label', 
      rating: 4, 
      price: 246, 
      originalPrice: 320, 
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400', 
      badge: 'New',
      badgeColor: 'bg-green-500'
    },
  ],
  health: [
    { 
      id: 26, 
      name: 'Multivitamin Tablets', 
      category: 'Health', 
      brand: 'HealthPlus', 
      rating: 5, 
      price: 399, 
      originalPrice: 599, 
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400', 
      badge: 'Hot',
      badgeColor: 'bg-pink-500'
    },
  ],
};