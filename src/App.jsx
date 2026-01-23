import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./index.css";
import { Navbar } from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Slider } from "./components/Slider.jsx";
import { CategorySlider } from "./components/CategorySlider.jsx";
import ProductCatalog from "./components/ProductCatalog.jsx";
import { NotFound } from "./components/NotFound.jsx";
import FeaturedProducts from "./components/FeaturedProducts.jsx";
import CategoryPage from "./Pages/CategoryPage.jsx";
import ProductDetailsPage from './components/ProductDetailsPage';
import CartPage from './Pages/CartPage';
import WishlistPage from './Pages/WishlistPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import TermsAndConditions from './Pages/TermsAndConditions';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import VendorRoute from './components/VendorRoute';
import AdminPanel from './Pages/AdminPanel';
import VendorPanel from './Pages/VendorPanel';
import VendorRegistration from './Pages/VendorRegistration';
import { allProducts } from "./data/Product.js";
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
const HomePage = () => {
  const navigate = useNavigate();
  
  return (
  <div className="bg-gray-100">
    {/* Main Slider */}
    <div className="bg-white shadow-sm mb-4">
      <Slider />
    </div>
    
    {/* Become a Vendor Banner */}
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 mb-4">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Want to Sell on ShopHub?</h2>
        <p className="text-xl mb-6">Join thousands of sellers and grow your business</p>
        <button 
          onClick={() => navigate('/vendor-register')}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Become a Vendor
        </button>
      </div>
    </div>
    
    {/* Deals of the Day */}
    <div className="bg-white p-4 mb-4 shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Deals of the Day</h2>
          <button className="text-blue-600 font-medium">VIEW ALL</button>
        </div>
        <ProductCatalog category="men" limit={5} />
      </div>
    </div>
    
    {/* Top Categories */}
    <div className="bg-white p-4 mb-4 shadow-sm">
      <div className="container mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {['Men', 'Women', 'Kids', 'Footwear', 'Accessories', 'Watches'].map((category) => (
            <div key={category} className="text-center p-4 hover:shadow-md cursor-pointer">
              <div className="bg-gray-100 p-4 rounded-full w-24 h-24 mx-auto mb-2 flex items-center justify-center">
                <span className="text-3xl">
                  {category === 'Men' ? '👔' : 
                   category === 'Women' ? '👗' : 
                   category === 'Kids' ? '👶' : 
                   category === 'Footwear' ? '👟' : 
                   category === 'Accessories' ? '👜' : '⌚'}
                </span>
              </div>
              <span className="text-sm text-gray-700">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    
    {/* Trending Offers */}
    <div className="bg-white p-4 mb-4 shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Trending Offers</h2>
          <button className="text-blue-600 font-medium">VIEW ALL</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {['50% OFF', 'Buy 1 Get 1', 'Min 60% Off', 'Special Price'].map((offer, index) => (
            <div key={index} className="bg-gradient-to-r from-yellow-100 to-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{offer}</h3>
              <p className="text-sm text-gray-600 mb-3">On top brands</p>
              <button className="text-blue-600 text-sm font-medium">Shop Now →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
    
    {/* New Arrivals */}
    <div className="bg-white p-4 shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">New Arrivals</h2>
          <button className="text-blue-600 font-medium">VIEW ALL</button>
        </div>
        <ProductCatalog category="women" limit={4} />
      </div>
    </div>
  </div>
  );
};

const AboutPage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">About Our Fashion Store</h1>
    <p className="text-gray-600">Discover the latest trends in fashion and express your unique style with our curated collection of clothing and accessories.</p>
  </div>
);

const ShopPage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Shop Clothing</h1>
    <p className="text-gray-600">Browse our extensive collection of men's and women's clothing.</p>
  </div>
);

const NewArrivalsPage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">New Arrivals</h1>
    <p className="text-gray-600">Check out our latest fashion pieces.</p>
  </div>
);

const SalePage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Sale</h1>
    <p className="text-gray-600">Amazing deals on your favorite fashion items.</p>
  </div>
);

const ContactPage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h1>
    <p className="text-gray-600">Need help with your order or have questions? Our support team is here to help.</p>
  </div>
);

// const CategoryPage = ({ category }) => (
//   <div className="container mx-auto px-4 py-8">
//     <h1 className="text-3xl font-bold text-gray-800 mb-4 capitalize">
//       {category?.replace("-", " & ")}
//     </h1>
//     <p className="text-gray-600">Browse products in this category.</p>
//   </div>
// );

const SubMenuPage = ({ parent, item }) => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-4 capitalize">
      {parent} - {item?.replace("item-", "Item ")}
    </h1>
  </div>
);

function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/new-arrivals" element={<NewArrivalsPage />} />
        <Route path="/sale" element={<SalePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage allProducts={allProducts} />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/test" element={<div className="min-h-screen bg-red-500 flex items-center justify-center"><h1 className="text-white text-4xl">TEST ROUTE WORKING!</h1></div>} />
        <Route path="/vendor" element={<VendorPanel />} />
        <Route path="/vendor-register" element={<VendorRegistration />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/admin" element={<AdminPanel />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/*" element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          } />
          
          <Route path="/vendor" element={
            <VendorRoute>
              <VendorPanel />
            </VendorRoute>
          } />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}


function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <Navbar 
              isMobileMenuOpen={isMobileMenuOpen} 
              setIsMobileMenuOpen={setIsMobileMenuOpen} 
            />
            <main className="flex-grow pt-32">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
