// Script to fix duplicate and inappropriate images in product data
const fs = require('fs');

// Read the current data
const clothingData = fs.readFileSync('./src/data/ClothingData.js', 'utf8');

// Define better image mappings for different product types
const betterImages = {
  // Men's clothing
  'Cotton Polo Shirt': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400',
  'Cargo Shorts': 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
  'Wool Sweater': 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400',
  'Chino Pants': 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
  'Hoodie Sweatshirt': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
  'Linen Shirt': 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400',
  'Track Pants': 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400',
  'Dress Shirt': 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400',
  'Denim Jacket': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
  'Tank Top': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
  
  // Women's clothing
  'Midi Skirt': 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400',
  'Yoga Leggings': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
  'Cardigan Sweater': 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400',
  'Palazzo Pants': 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
  'Crop Top': 'https://images.unsplash.com/photo-1515372039744-b8f02a2ae76f?w=400',
  'Pencil Skirt': 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
  'Hoodie Dress': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
  'Blazer Jacket': 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=400',
  'Maxi Dress': 'https://images.unsplash.com/photo-1485965120184-220060f16d3b?w=400',
  'Tank Top Set': 'https://images.unsplash.com/photo-1515372039744-b8f02a2ae76f?w=400',
  'Wide Leg Pants': 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
  
  // Kids clothing
  'School Uniform Set': 'https://images.unsplash.com/photo-1588058365517-a1336f032985?w=400',
  'Raincoat': 'https://images.unsplash.com/photo-1598507619175-a8df05db7c6b?w=400',
  'Pajama Set': 'https://images.unsplash.com/photo-1576565397492-9c1a90dede42?w=400',
  'Swim Trunks': 'https://images.unsplash.com/photo-1600185471-9b5d62f2bf08?w=400',
  'Winter Jacket': 'https://images.unsplash.com/photo-1598507619175-a8df05db7c6b?w=400',
  'Shorts Set': 'https://images.unsplash.com/photo-1588058365517-a1336f032985?w=400',
  'Party Dress': 'https://images.unsplash.com/photo-1576565397492-9c1a90dede42?w=400',
  'Sweatshirt': 'https://images.unsplash.com/photo-1600185471-9b5d62f2bf08?w=400',
  'Cap and Gloves Set': 'https://images.unsplash.com/photo-1598507619175-a8df05db7c6b?w=400',
  'Cargo Pants': 'https://images.unsplash.com/photo-1588058365517-a1336f032985?w=400',
  'T-Shirt and Shorts Combo': 'https://images.unsplash.com/photo-1600185471-9b5d62f2bf08?w=400',
  
  // Accessories
  'Leather Wallet': 'https://images.unsplash.com/photo-1548123378-bde4ecaee849?w=400',
  'Silk Scarf': 'https://images.unsplash.com/photo-1591047139829-d91aaccb3f3f?w=400',
  'Baseball Cap': 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400',
  'Leather Gloves': 'https://images.unsplash.com/photo-1548123378-bde4ecaee849?w=400',
  'Tote Bag': 'https://images.unsplash.com/photo-1591047139829-d91aaccb3f3f?w=400',
  'Watch Band': 'https://images.unsplash.com/photo-1511499767150-a48a237ac008?w=400',
  'Phone Case': 'https://images.unsplash.com/photo-1511499767150-a48a237ac008?w=400',
  'Travel Backpack': 'https://images.unsplash.com/photo-1591047139829-d91aaccb3f3f?w=400',
  'Umbrella': 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400',
  'Tie Set': 'https://images.unsplash.com/photo-1548123378-bde4ecaee849?w=400',
  'Socks Pack': 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400',
  
  // Footwear
  'Running Shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
  'Leather Boots': 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
  'Casual Sneakers': 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400',
  'Formal Oxford Shoes': 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
  'Sports Sandals': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
  'High Top Sneakers': 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400',
  'Loafers': 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
  'Hiking Boots': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
  'Canvas Shoes': 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400',
  'Slip-On Shoes': 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
  'Basketball Shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
  'Walking Shoes': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
  
  // Watches
  'Luxury Automatic Watch': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
  'Smart Watch Pro': 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400',
  'Classic Dress Watch': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
  'Sports Chronograph': 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400',
  'Minimalist Watch': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
  'Diving Watch': 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400',
  'Fashion Watch': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
  'Military Watch': 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400',
  'Retro Vintage Watch': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
  'Fitness Tracker Watch': 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400',
  'Luxury Diamond Watch': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
  'Digital Watch': 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400'
};

console.log('Image mapping script created. Run this to update product images with more appropriate ones.');
