import React, { useState, useEffect } from 'react';
import {
  Plus, Edit2, Trash2, Save, X,
  Package, Tag, DollarSign, Image,
  FileText, Store, Check, Clock
} from 'lucide-react';
import { db } from '../firebase/config';
import {
  collection, addDoc, getDocs, doc,
  deleteDoc, updateDoc, query,
  where, orderBy, onSnapshot
} from 'firebase/firestore';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products');

  const [pendingVendors, setPendingVendors] = useState([]);
  const [approvedVendors, setApprovedVendors] = useState([]);
  const [rejectedVendors, setRejectedVendors] = useState([]);

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

  const categories = [
    'Electronics', 'Fashion', 'Home',
    'Beauty & Personal Care', 'Sports & Outdoors',
    'Books', 'Toys & Games', 'Automotive', 'Grocery'
  ];

  useEffect(() => {
    fetchProducts();
    const unsubscribe = fetchVendors();
    return () => unsubscribe && unsubscribe();
  }, []);

  /* ---------------- PRODUCTS ---------------- */

  const fetchProducts = async () => {
    try {
      const snap = await getDocs(collection(db, 'products'));
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      rating: Number(formData.rating),
      createdAt: new Date().toISOString()
    };

    try {
      if (editingProduct) {
        await updateDoc(doc(db, 'products', editingProduct.id), data);
      } else {
        await addDoc(collection(db, 'products'), data);
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (p) => {
    setEditingProduct(p);
    setFormData({ ...p });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete product?')) return;
    await deleteDoc(doc(db, 'products', id));
    fetchProducts();
  };

  const resetForm = () => {
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

  /* ---------------- VENDORS ---------------- */

  const fetchVendors = () => {
    const q = query(
      collection(db, 'users'),
      where('role', '==', 'vendor')
      // Temporarily removed orderBy until index is created
    );

    return onSnapshot(q, snap => {
      const vendors = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setPendingVendors(vendors.filter(v => v.vendorStatus === 'pending'));
      setApprovedVendors(vendors.filter(v => v.vendorStatus === 'approved'));
      setRejectedVendors(vendors.filter(v => v.vendorStatus === 'rejected'));
    });
  };

  const updateVendor = (id, status) =>
    updateDoc(doc(db, 'users', id), { vendorStatus: status });

  const VendorCard = ({ vendor, status }) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      approved: 'bg-green-100 text-green-800 border-green-200',
      rejected: 'bg-red-100 text-red-800 border-red-200'
    };

    const statusIcons = {
      pending: <Clock className="h-4 w-4" />,
      approved: <Check className="h-4 w-4" />,
      rejected: <X className="h-4 w-4" />
    };

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Store className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{vendor.businessName}</h3>
              <p className="text-sm text-gray-600">{vendor.name}</p>
              <p className="text-xs text-gray-500">{vendor.email}</p>
            </div>
          </div>
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${statusColors[status]}`}>
            {statusIcons[status]}
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Package className="h-4 w-4 text-gray-400" />
            <span className="text-gray-700">Category: <span className="font-medium">{vendor.category}</span></span>
          </div>
          
          {vendor.description && (
            <div className="text-sm text-gray-600">
              <p className="line-clamp-2">{vendor.description}</p>
            </div>
          )}
          
          <div className="text-xs text-gray-500">
            Applied: {new Date(vendor.createdAt).toLocaleDateString()}
          </div>
        </div>

        {status === 'pending' && (
          <div className="flex gap-2">
            <button
              onClick={() => updateVendor(vendor.id, 'approved')}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Check className="h-4 w-4" />
              Approve
            </button>
            <button
              onClick={() => updateVendor(vendor.id, 'rejected')}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <X className="h-4 w-4" />
              Reject
            </button>
          </div>
        )}

        {status === 'approved' && (
          <div className="text-sm text-green-600 font-medium">
            ✓ Approved vendor can add products
          </div>
        )}

        {status === 'rejected' && (
          <div className="text-sm text-red-600 font-medium">
            ✗ Rejected vendor cannot add products
          </div>
        )}
      </div>
    );
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-gray-100">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="bg-slate-800 p-6 rounded-xl mb-6 border border-slate-700/50">
          <div>
            <h1 className="text-3xl font-bold text-gray-100">Admin Panel</h1>
            <p className="text-gray-400">Manage products & vendors</p>
          </div>
        </div>

        {/* TABS */}
        <div className="bg-slate-800 p-4 rounded-xl mb-6 flex gap-8 border border-slate-700/50">
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'products' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:bg-slate-700'
            }`}
          >
            Products
          </button>
          <button 
            onClick={() => setActiveTab('vendors')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'vendors' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:bg-slate-700'
            }`}
          >
            Vendors ({pendingVendors.length})
          </button>
        </div>

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700/50 p-6">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">Products ({products.length})</h2>
            
            {products.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No products found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-300">Image</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-300">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-300">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-300">Price</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-300">Stock</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                        <td className="py-3 px-4">
                          <img
                            src={product.image || '/placeholder-image.jpg'}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-100">{product.name}</td>
                        <td className="py-3 px-4 text-gray-400">{product.category}</td>
                        <td className="py-3 px-4 text-gray-100">${product.price}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            product.stock > 10 ? 'bg-green-900/50 text-green-400' : 
                            product.stock > 0 ? 'bg-yellow-900/50 text-yellow-400' : 
                            'bg-red-900/50 text-red-400'
                          }`}>
                            {product.stock} in stock
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(product)}
                              className="p-1 text-blue-400 hover:bg-blue-900/50 rounded"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="p-1 text-red-400 hover:bg-red-900/50 rounded"
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

        {/* EDIT PRODUCT MODAL */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Edit Product</h2>
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save size={20} />
                    Update Product
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
          </div>
        )}
        {activeTab === 'vendors' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Vendor Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">{pendingVendors.length}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Approved</p>
                    <p className="text-2xl font-bold text-green-600">{approvedVendors.length}</p>
                  </div>
                  <Check className="h-8 w-8 text-green-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Rejected</p>
                    <p className="text-2xl font-bold text-red-600">{rejectedVendors.length}</p>
                  </div>
                  <X className="h-8 w-8 text-red-500" />
                </div>
              </div>
            </div>

            {/* Vendor Lists */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingVendors.map(vendor => (
                <VendorCard key={vendor.id} vendor={vendor} status="pending" />
              ))}
              {approvedVendors.map(vendor => (
                <VendorCard key={vendor.id} vendor={vendor} status="approved" />
              ))}
              {rejectedVendors.map(vendor => (
                <VendorCard key={vendor.id} vendor={vendor} status="rejected" />
              ))}
            </div>

            {pendingVendors.length === 0 && approvedVendors.length === 0 && rejectedVendors.length === 0 && (
              <div className="text-center py-12">
                <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Vendor Applications</h3>
                <p className="text-gray-600">No vendor applications have been submitted yet.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminPanel;
