import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Package, Tag, DollarSign, Image, FileText, Store, Clock, Check, AlertCircle } from 'lucide-react';
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, where, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const VendorPanel = () => {
  const { user, vendorStatus } = useAuth();
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [vendorInfo, setVendorInfo] = useState(null);
  const [showPendingPopup, setShowPendingPopup] = useState(false);

  const isApproved = vendorStatus === 'approved';
  const isPending = vendorStatus === 'pending';
  const isRejected = vendorStatus === 'rejected';

  // Show popup for pending vendors on first visit
  useEffect(() => {
    console.log('VendorPanel Debug:', { vendorStatus, isPending, user });
    if (isPending) {
      setShowPendingPopup(true);
    }
  }, [isPending]);

  const categories = [
    'Electronics', 'Fashion', 'Home', 'Beauty & Personal Care',
    'Sports & Outdoors', 'Books', 'Toys & Games', 'Automotive', 'Grocery'
  ];

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: '',
    stock: '',
    brand: '',
    rating: '',
    featured: false
  });

  useEffect(() => {
    if (user) {
      fetchVendorInfo();
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchVendorInfo = async () => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', user.email));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        setVendorInfo(snapshot.docs[0].data());
      }
    } catch (error) {
      console.error('Error fetching vendor info:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = () => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    // For non-approved vendors, just set loading to false
    if (!isApproved) {
      setLoading(false);
      return;
    }
    
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('vendorEmail', '==', user.email));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productList);
      setLoading(false);
    });

    return unsubscribe;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      rating: Number(formData.rating),
      vendorEmail: user.email,
      vendorName: vendorInfo?.businessName || user.displayName,
      createdAt: new Date().toISOString()
    };

    try {
      if (editingProduct) {
        await updateDoc(doc(db, 'products', editingProduct.id), data);
      } else {
        await addDoc(collection(db, 'products'), data);
      }
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await deleteDoc(doc(db, 'products', id));
  };

  const resetForm = () => {
    setShowAddForm(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      category: '',
      description: '',
      image: '',
      stock: '',
      brand: '',
      rating: '',
      featured: false
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading vendor dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* VENDOR HEADER */}
        <div className="bg-white p-6 rounded-xl mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Manage your products - {vendorInfo?.businessName || 'Vendor'}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm text-gray-500">Email: {user?.email}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isApproved 
                    ? 'bg-green-100 text-green-800' 
                    : isPending
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {isApproved ? 'Approved' : isPending ? 'Pending' : 'Rejected'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              disabled={!isApproved}
              className={`px-4 py-2 rounded-lg flex gap-2 transition-colors ${
                isApproved 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Plus /> Add Product
            </button>
          </div>
        </div>

        {/* STATUS MESSAGE FOR PENDING/REJECTED VENDORS */}
        {!isApproved && (
          <div className="bg-white p-6 rounded-xl mb-6">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isPending ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                {isPending ? (
                  <Clock className="w-6 h-6 text-yellow-600" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-red-600" />
                )}
              </div>
              <div className="flex-1">
                <h2 className={`text-xl font-semibold mb-2 ${
                  isPending ? 'text-yellow-800' : 'text-red-800'
                }`}>
                  {isPending ? 'Application Under Review' : 'Application Rejected'}
                </h2>
                <p className="text-gray-600 mb-4">
                  {isPending 
                    ? 'Your vendor application is currently being reviewed by the admin. You will be able to add products once your application is approved.'
                    : 'Your vendor application has been rejected. Please contact the admin for more information.'
                  }
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-500">Business: {vendorInfo?.businessName || 'N/A'}</span>
                  <span className="text-gray-500">Category: {vendorInfo?.category || 'N/A'}</span>
                  <span className="text-gray-500">Applied: {vendorInfo?.createdAt ? new Date(vendorInfo.createdAt).toLocaleDateString() : 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VENDOR STATS - ONLY SHOW FOR APPROVED VENDORS */}
        {isApproved && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-emerald-600">{products.length}</p>
              </div>
              <Package className="h-8 w-8 text-emerald-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Stock</p>
                <p className="text-2xl font-bold text-blue-600">
                  {products.filter(p => p.stock > 0).length}
                </p>
              </div>
              <Store className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">
                  {products.filter(p => p.stock === 0).length}
                </p>
              </div>
              <X className="h-8 w-8 text-red-500" />
            </div>
          </div>
        </div>
        )}

        {/* ADD/EDIT PRODUCT FORM - ONLY SHOW FOR APPROVED VENDORS */}
        {showAddForm && isApproved && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Package className="inline w-4 h-4 mr-1" />
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <DollarSign className="inline w-4 h-4 mr-1" />
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Tag className="inline w-4 h-4 mr-1" />
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    step="0.1"
                    min="0"
                    max="5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Image className="inline w-4 h-4 mr-1" />
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FileText className="inline w-4 h-4 mr-1" />
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">Featured Product</label>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Save size={20} />
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* PRODUCTS LIST - ONLY SHOW FOR APPROVED VENDORS */}
        {isApproved && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Products ({products.length})</h2>
          
          {products.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Yet</h3>
              <p className="text-gray-600">Start by adding your first product to your store.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Image</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Price</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Stock</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <img
                          src={product.image || '/placeholder-image.jpg'}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.brand}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{product.category}</td>
                      <td className="py-3 px-4 text-gray-900">${product.price}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.stock > 10 ? 'bg-green-100 text-green-800' : 
                          product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.stock} in stock
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.featured ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {product.featured ? 'Featured' : 'Regular'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            title="Edit Product"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            title="Delete Product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        )}
      </div>

      {/* Pending Approval Popup */}
      {showPendingPopup && isPending && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4 shadow-2xl transform scale-100 animate-in fade-in slide-in-from-top-2">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Vendor Application Pending</h2>
              <p className="text-gray-600 mb-6">
                Your vendor application is currently under review by the admin. You'll be able to add products once your application is approved.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-2">Application Details:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Business Name:</span>
                    <span className="font-medium">{vendorInfo?.businessName || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category:</span>
                    <span className="font-medium">{vendorInfo?.category || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email:</span>
                    <span className="font-medium">{user?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Applied:</span>
                    <span className="font-medium">
                      {vendorInfo?.createdAt ? new Date(vendorInfo.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowPendingPopup(false)}
                  className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  I Understand
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorPanel;
