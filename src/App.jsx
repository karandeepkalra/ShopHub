import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./index.css";
import Header from "./components/Header.jsx";
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
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import VendorRoute from './components/VendorRoute';
import AdminPanel from './Pages/AdminPanel';
import VendorPanel from './Pages/VendorPanel';
import { allProducts } from "./data/Product.js";
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
const HomePage = () => (
  <>
    <Slider />
    <CategorySlider />
    <ProductCatalog />
    <FeaturedProducts />
  </>
);

const AboutPage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
    <p className="text-gray-600">Learn more about ShopHub and our mission.</p>
  </div>
);

const ShopPage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Shop</h1>
    <p className="text-gray-600">Browse our extensive collection of products.</p>
  </div>
);

const VendorsPage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Vendors</h1>
    <p className="text-gray-600">Discover our trusted vendor partners.</p>
  </div>
);

const MegaMenuPage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Mega Menu</h1>
    <p className="text-gray-600">Explore all our categories and offerings.</p>
  </div>
);

const BlogPage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Blog</h1>
    <p className="text-gray-600">Read our latest articles and updates.</p>
  </div>
);

const PagesPage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Pages</h1>
    <p className="text-gray-600">Browse additional pages and resources.</p>
  </div>
);

const ContactPage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h1>
    <p className="text-gray-600">Get in touch with our support team.</p>
  </div>
);

const TestPage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Test Page</h1>
    <p className="text-gray-600">This is a test page to verify routing works.</p>
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
    <p className="text-gray-600">Submenu content page.</p>
  </div>
);

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Header />
      <div className="pt-[110px] lg:pt-[152px] min-h-screen">
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/vendors" element={<VendorsPage />} />
          <Route path="/mega-menu" element={<MegaMenuPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/pages" element={<PagesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/deals" element={<TestPage />} />

          {/* Category Routes */}
          <Route path="/category/:category" element={<CategoryPage />} />

          {/* Submenu Routes */}
          <Route path="/mega-menu/item-1" element={<SubMenuPage parent="Mega Menu" item="item-1" />} />
          <Route path="/mega-menu/item-2" element={<SubMenuPage parent="Mega Menu" item="item-2" />} />
          <Route path="/mega-menu/item-3" element={<SubMenuPage parent="Mega Menu" item="item-3" />} />
          <Route path="/pages/item-1" element={<SubMenuPage parent="Pages" item="item-1" />} />
          <Route path="/pages/item-2" element={<SubMenuPage parent="Pages" item="item-2" />} />
          <Route path="/pages/item-3" element={<SubMenuPage parent="Pages" item="item-3" />} />

          <Route path="/product/:id" element={<ProductDetailsPage allProducts={allProducts} />} />

          <Route path="/cart" element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          } />

          <Route path="/wishlist" element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          } />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route path="/admin" element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          } />
          
          <Route path="/vendor" element={
            <VendorRoute>
              <VendorPanel />
            </VendorRoute>
          } />
          
          <Route path="/admin-test" element={<TestPage />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
