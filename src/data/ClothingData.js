// Clothing product data
export const clothingProducts = {
  men: [
    { 
      id: 1, 
      name: 'Classic Fit Oxford Shirt', 
      category: 'Men', 
      brand: 'PremiumWear', 
      rating: 5, 
      price: 2499, 
      originalPrice: 3499, 
      image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400',
      badge: 'Bestseller',
      badgeColor: 'bg-pink-500',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['White', 'Blue', 'Gray']
    },
    { 
      id: 2, 
      name: 'Slim Fit Jeans', 
      category: 'Men', 
      brand: 'DenimCo', 
      rating: 4, 
      price: 1999, 
      originalPrice: 2599, 
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
      badge: 'Sale',
      badgeColor: 'bg-blue-400',
      sizes: ['28', '30', '32', '34'],
      colors: ['Dark Blue', 'Black', 'Light Blue']
    },
    { 
      id: 3, 
      name: 'Casual Blazer', 
      category: 'Men', 
      brand: 'Elegance', 
      rating: 5, 
      price: 5999, 
      originalPrice: 7999, 
      image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=400',
      badge: 'New',
      badgeColor: 'bg-green-500',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['Navy', 'Charcoal', 'Black']
    },
    { 
      id: 4, 
      name: 'Athletic Fit T-Shirt', 
      category: 'Men', 
      brand: 'ActiveLife', 
      rating: 4, 
      price: 899, 
      originalPrice: 1299, 
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      badge: 'Hot',
      badgeColor: 'bg-red-500',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'White', 'Gray', 'Navy']
    }
  ],
  women: [
    { 
      id: 5, 
      name: 'Floral Summer Dress', 
      category: 'Women', 
      brand: 'ChicStyle', 
      rating: 5, 
      price: 3299, 
      originalPrice: 4299, 
      image: 'https://images.unsplash.com/photo-1485965120184-220060f16d3b?w=400',
      badge: 'Bestseller',
      badgeColor: 'bg-pink-500',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Floral', 'Blue', 'Pink']
    },
    { 
      id: 6, 
      name: 'High-Waist Skinny Jeans', 
      category: 'Women', 
      brand: 'DenimQueen', 
      rating: 4, 
      price: 2499, 
      originalPrice: 3499, 
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400',
      badge: 'Sale',
      badgeColor: 'bg-blue-400',
      sizes: ['26', '28', '30', '32'],
      colors: ['Black', 'Blue', 'Light Blue']
    },
    { 
      id: 7, 
      name: 'Elegant Blouse', 
      category: 'Women', 
      brand: 'Grace', 
      rating: 5, 
      price: 1799, 
      originalPrice: 2499, 
      image: 'https://images.unsplash.com/photo-1539109136884-043d88c24064?w=400',
      badge: 'New',
      badgeColor: 'bg-green-500',
      sizes: ['XS', 'S', 'M'],
      colors: ['White', 'Black', 'Red']
    },
    { 
      id: 8, 
      name: 'Casual Summer Top', 
      category: 'Women', 
      brand: 'Breezy', 
      rating: 4, 
      price: 1299, 
      originalPrice: 1799, 
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a2ae76f?w=400',
      badge: 'Hot',
      badgeColor: 'bg-red-500',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['White', 'Yellow', 'Pink']
    }
  ],
  kids: [
    { 
      id: 9, 
      name: 'Cartoon Print T-Shirt', 
      category: 'Kids', 
      brand: 'TinyTots', 
      rating: 5, 
      price: 699, 
      originalPrice: 999, 
      image: 'https://images.unsplash.com/photo-1588058365517-a1336f032985?w=400',
      badge: 'Bestseller',
      badgeColor: 'bg-pink-500',
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
      colors: ['Blue', 'Red', 'Green']
    },
    { 
      id: 10, 
      name: 'Denim Overalls', 
      category: 'Kids', 
      brand: 'LittleOnes', 
      rating: 4, 
      price: 1599, 
      originalPrice: 1999, 
      image: 'https://images.unsplash.com/photo-1598507619175-a8df05db7c6b?w=400',
      badge: 'Sale',
      badgeColor: 'bg-blue-400',
      sizes: ['2-3Y', '4-5Y', '6-7Y'],
      colors: ['Blue', 'Black']
    },
    { 
      id: 11, 
      name: 'Princess Dress', 
      category: 'Kids', 
      brand: 'FairyTale', 
      rating: 5, 
      price: 2299, 
      originalPrice: 2999, 
      image: 'https://images.unsplash.com/photo-1576565397492-9c1a90dede42?w=400',
      badge: 'New',
      badgeColor: 'bg-green-500',
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
      colors: ['Pink', 'Lavender', 'Mint']
    },
    { 
      id: 12, 
      name: 'Active Sports Set', 
      category: 'Kids', 
      brand: 'JuniorAthlete', 
      rating: 4, 
      price: 1799, 
      originalPrice: 2299, 
      image: 'https://images.unsplash.com/photo-1600185471-9b5d62f2bf08?w=400',
      badge: 'Hot',
      badgeColor: 'bg-red-500',
      sizes: ['4-5Y', '6-7Y', '8-9Y'],
      colors: ['Blue/White', 'Black/Red', 'Gray/Blue']
    }
  ],
  accessories: [
    { 
      id: 13, 
      name: 'Leather Belt', 
      category: 'Accessories', 
      brand: 'ClassicLeather', 
      rating: 5, 
      price: 1299, 
      originalPrice: 1799, 
      image: 'https://images.unsplash.com/photo-1548123378-bde4ecaee849?w=400',
      badge: 'Bestseller',
      badgeColor: 'bg-pink-500',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Brown', 'Black']
    },
    { 
      id: 14, 
      name: 'Designer Handbag', 
      category: 'Accessories', 
      brand: 'ChicStyle', 
      rating: 4, 
      price: 4599, 
      originalPrice: 5999, 
      image: 'https://images.unsplash.com/photo-1591047139829-d91aaccb3f3f?w=400',
      badge: 'Sale',
      badgeColor: 'bg-blue-400',
      colors: ['Black', 'Beige', 'Red']
    },
    { 
      id: 15, 
      name: 'Aviator Sunglasses', 
      category: 'Accessories', 
      brand: 'SunShield', 
      rating: 5, 
      price: 1799, 
      originalPrice: 2499, 
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237ac008?w=400',
      badge: 'New',
      badgeColor: 'bg-green-500',
      colors: ['Gold/Black', 'Silver/Black', 'Rose Gold']
    },
    { 
      id: 16, 
      name: 'Wool Beanie', 
      category: 'Accessories', 
      brand: 'WinterWarmth', 
      rating: 4, 
      price: 799, 
      originalPrice: 999, 
      image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400',
      badge: 'Hot',
      badgeColor: 'bg-red-500',
      colors: ['Black', 'Gray', 'Navy', 'Burgundy']
    }
  ]
};

export default clothingProducts;
