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
import ResetPasswordPage from './Pages/ResetPasswordPage';
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
import { CurrencyProvider } from "./context/CurrencyContext.jsx";
import ScrollToTop from './components/ScrollToTop';
const HomePage = () => {
  const navigate = useNavigate();
  
  return (
  <div className="bg-slate-900">
    {/* Main Slider */}
    <div className="bg-slate-800 shadow-lg mb-4">
      <Slider />
    </div>
    
    {/* Become a Vendor Banner */}
    <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 text-white py-8 sm:py-12 mb-4 relative overflow-hidden animate-fade-in-up">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 animate-bounce">Want to Sell on ShopHub?</h2>
        <p className="text-base sm:text-xl mb-6 opacity-90">Join thousands of sellers and grow your business</p>
        <button 
          onClick={() => navigate('/vendor-register')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-gray-100 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
        >
          Become a Vendor
        </button>
      </div>
      <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-600/10 rounded-full animate-pulse-ring"></div>
      <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-600/10 rounded-full animate-pulse-ring" style={{animationDelay: '1s'}}></div>
    </div>
    
    {/* Deals of the Day */}
    <div className="bg-slate-800 p-3 sm:p-4 mb-4 shadow-lg animate-fade-in-up">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-100">Deals of the Day</h2>
          <button className="text-blue-400 font-medium hover:text-blue-300 transition-colors text-sm sm:text-base">VIEW ALL</button>
        </div>
        <ProductCatalog category="men" limit={5} />
      </div>
    </div>
    
    {/* Top Categories */}
    <div className="bg-slate-800 p-3 sm:p-4 mb-4 shadow-lg animate-fade-in-up" style={{animationDelay: '0.1s'}}>
      <div className="container mx-auto">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-100 mb-4">Top Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {['Men', 'Women', 'Kids', 'Footwear', 'Accessories', 'Watches'].map((category, index) => (
            <div 
              key={category} 
              className="text-center p-3 sm:p-4 hover:bg-slate-700 cursor-pointer rounded-xl transition-all duration-300 hover:-translate-y-1 group"
              onClick={() => navigate(`/category/${category.toLowerCase()}`)}
              style={{animationDelay: `${0.1 + index * 0.05}s`}}
            >
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 sm:p-4 rounded-full w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl sm:text-3xl">
                  {category === 'Men' ? '👔' : 
                   category === 'Women' ? '👗' : 
                   category === 'Kids' ? '👶' : 
                   category === 'Footwear' ? '👟' : 
                   category === 'Accessories' ? '👜' : '⌚'}
                </span>
              </div>
              <span className="text-xs sm:text-sm text-gray-300 font-medium">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    
    {/* Trending Offers */}
    <div className="bg-slate-800 p-3 sm:p-4 mb-4 shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-100">Trending Offers</h2>
          <button className="text-blue-400 font-medium hover:text-blue-300 transition-colors text-sm sm:text-base">VIEW ALL</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { title: '50% OFF', desc: 'On top brands', color: 'from-blue-600 to-purple-600' },
            { title: 'Buy 1 Get 1', desc: 'Selected items', color: 'from-indigo-600 to-blue-600' },
            { title: 'Min 60% Off', desc: 'Clearance sale', color: 'from-purple-600 to-blue-600' },
            { title: 'Special Price', desc: 'Limited time', color: 'from-blue-500 to-indigo-500' }
          ].map((offer, index) => (
            <div key={index} className={`bg-gradient-to-r ${offer.color} p-4 sm:p-6 rounded-xl text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer`} style={{animationDelay: `${0.2 + index * 0.05}s`}}>
              <h3 className="text-base sm:text-lg font-bold mb-2">{offer.title}</h3>
              <p className="text-xs sm:text-sm opacity-90 mb-3">{offer.desc}</p>
              <button className="bg-white text-gray-900 text-xs sm:text-sm font-medium px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors">
                Shop Now →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    
    {/* New Arrivals */}
    <div className="bg-slate-800 p-3 sm:p-4 shadow-lg animate-fade-in-up" style={{animationDelay: '0.3s'}}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-100">New Arrivals</h2>
          <button className="text-blue-400 font-medium hover:text-blue-300 transition-colors text-sm sm:text-base">VIEW ALL</button>
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
        <Route path="/reset-password" element={<ResetPasswordPage />} />
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
      <CurrencyProvider>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen bg-gray-100 flex flex-col">
              <Header />
              <Navbar 
                isMobileMenuOpen={isMobileMenuOpen} 
                setIsMobileMenuOpen={setIsMobileMenuOpen} 
              />
              <main className="flex-grow pt-32">
                <AppRoutes />
              </main>
              <Footer />
              <ScrollToTop />
            </div>
          </CartProvider>
        </AuthProvider>
      </CurrencyProvider>
    </BrowserRouter>
  );
}

export default App;
