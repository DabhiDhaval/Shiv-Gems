import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { BarChart, Users, Package, Settings, Plus, Trash2, Edit, X, ShoppingCart } from 'lucide-react';

interface DashboardData {
  totalSales: number;
  salesChange: string;
  totalOrders: number;
  ordersChange: string;
  totalCustomers: number;
  customersChange: string;
  totalProducts: number;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Order {
  _id: string;
  userId: { name: string; email: string } | string;
  items: Array<{ productId: { name: string }; quantity: number; price: number }>;
  totalAmount: number;
  status: string;
  shippingAddress: string;
  createdAt: string;
}

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', image: '', stock: '' });
  const [editProduct, setEditProduct] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (activeTab === 'dashboard') {
        const res = await axiosInstance.get<DashboardData>('/admin/dashboard');
        setDashboardData(res.data);
      } else if (activeTab === 'products') {
        const res = await axiosInstance.get<Product[]>('/products');
        setProducts(res.data);
      } else if (activeTab === 'users') {
        const res = await axiosInstance.get<User[]>('/admin/users');
        setUsers(res.data);
      } else if (activeTab === 'orders') {
        const res = await axiosInstance.get<Order[]>('/admin/orders');
        setOrders(res.data);
      }
    } catch (err: any) {
      console.error('AdminPanel fetchData error:', err);
      const message = err.response?.data?.message || err.message || 'Failed to fetch data. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [activeTab]);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axiosInstance.post('/products', {
        name: newProduct.name,
        price: Number(newProduct.price),
        description: newProduct.description,
        image: newProduct.image,
        stock: Number(newProduct.stock),
      });
      setShowAddProduct(false);
      setNewProduct({ name: '', price: '', description: '', image: '', stock: '' });
      fetchData();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add product');
    } finally {
      setSaving(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditProduct(product);
    setShowEditProduct(true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProduct) return;
    setSaving(true);
    try {
      await axiosInstance.put(`/products/${editProduct._id}`, {
        ...editProduct,
        price: Number(editProduct.price),
        stock: Number(editProduct.stock),
      });
      setShowEditProduct(false);
      setEditProduct(null);
      fetchData();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Delete this user?')) return;
    try {
      await axiosInstance.delete(`/admin/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
    } catch {
      setError('Failed to delete user');
    }
  };

  const handleOrderStatusChange = async (orderId: string, status: string) => {
    try {
      const res = await axiosInstance.put(`/admin/orders/${orderId}`, { status });
      setOrders(orders.map(o => (o._id === orderId ? res.data : o)));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update order');
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm('Delete this order?')) return;
    try {
      await axiosInstance.delete(`/admin/orders/${orderId}`);
      setOrders(orders.filter(o => o._id !== orderId));
    } catch {
      setError('Failed to delete order');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    try {
      await axiosInstance.delete(`/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
    } catch {
      setError('Failed to delete product');
    }
  };

  const renderContent = () => {
    if (loading) return <div className="text-gray-500 py-8 text-center">Loading...</div>;
    if (error) return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
        <button onClick={fetchData} className="ml-3 underline text-sm">Retry</button>
      </div>
    );

    if (activeTab === 'dashboard' && dashboardData) {
      return (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Sales', value: `$${dashboardData.totalSales.toLocaleString()}`, change: dashboardData.salesChange, color: 'blue' },
              { label: 'Total Orders', value: dashboardData.totalOrders, change: dashboardData.ordersChange, color: 'green' },
              { label: 'Customers', value: dashboardData.totalCustomers, change: dashboardData.customersChange, color: 'purple' },
              { label: 'Products', value: dashboardData.totalProducts, change: 'Active listings', color: 'orange' },
            ].map(stat => (
              <div key={stat.label} className="bg-white p-6 rounded-lg shadow border border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 mb-2">{stat.label}</h3>
                <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
                <p className="text-xs text-gray-400 mt-2">{stat.change}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === 'products') {
      return (
        <div className="bg-white rounded-lg shadow border border-gray-100">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-semibold">Products ({products.length})</h2>
            <button
              onClick={() => setShowAddProduct(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
            >
              <Plus className="h-4 w-4" /> Add Product
            </button>
          </div>
          {products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Stock</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map(product => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
                          <span className="font-medium text-sm">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">${product.price.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`text-sm px-2 py-1 rounded-full ${product.stock > 5 ? 'bg-green-100 text-green-700' : product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="py-3 px-4 space-x-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="p-6 text-gray-500">No products in database. Add some or check your MongoDB connection.</p>
          )}
        </div>
      );
    }

    if (activeTab === 'users') {
      return (
        <div className="bg-white rounded-lg shadow border border-gray-100">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Users ({users.length})</h2>
          </div>
          {users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map(user => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">{user.name || '—'}</td>
                      <td className="py-3 px-4 text-sm">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full capitalize ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button onClick={() => handleDeleteUser(user._id)} className="text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="p-6 text-gray-500">No users found.</p>
          )}
        </div>
      );
    }

    if (activeTab === 'orders') {
      return (
        <div className="bg-white rounded-lg shadow border border-gray-100">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Orders ({orders.length})</h2>
          </div>
          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Order ID</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Items</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Total</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map(order => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">{order._id.slice(-8)}</td>
                      <td className="py-3 px-4 text-sm">
                        {typeof order.userId === 'string' ? order.userId : `${order.userId.name} (${order.userId.email})`}
                      </td>
                      <td className="py-3 px-4 text-sm">{order.items.length} item(s)</td>
                      <td className="py-3 px-4 text-sm font-semibold">${order.totalAmount.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleOrderStatusChange(order._id, e.target.value)}
                          className="text-xs px-2 py-1 rounded"
                        >
                          <option value="pending">pending</option>
                          <option value="completed">completed</option>
                          <option value="shipped">shipped</option>
                          <option value="delivered">delivered</option>
                          <option value="cancelled">cancelled</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        <button onClick={() => handleDeleteOrder(order._id)} className="text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="p-6 text-gray-500">No orders found.</p>
          )}
        </div>
      );
    }

    if (activeTab === 'settings') {
      return (
        <div className="bg-white rounded-lg shadow border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-6">Store Settings</h2>
          <div className="max-w-lg space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
              <input type="text" defaultValue="Shiv Gems" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
              <input type="email" defaultValue="info@shivgems.com" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>USD ($)</option><option>EUR (€)</option><option>GBP (£)</option><option>INR (₹)</option>
              </select>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
              Save Changes
            </button>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-semibold">Add New Product</h3>
              <button onClick={() => setShowAddProduct(false)} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input type="text" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
                  <input type="number" required min="0" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
                  <input type="number" required min="0" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea required rows={3} value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
                <input type="url" required value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                  placeholder="https://..." className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium">
                  {saving ? 'Saving...' : 'Add Product'}
                </button>
                <button type="button" onClick={() => setShowAddProduct(false)}
                  className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 text-sm">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditProduct && editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-semibold">Edit Product</h3>
              <button onClick={() => { setShowEditProduct(false); setEditProduct(null); }} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input type="text" required value={editProduct.name} onChange={e => setEditProduct({...editProduct, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
                  <input type="number" required min="0" value={editProduct.price} onChange={e => setEditProduct({...editProduct, price: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
                  <input type="number" required min="0" value={editProduct.stock} onChange={e => setEditProduct({...editProduct, stock: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea required rows={3} value={editProduct.description} onChange={e => setEditProduct({...editProduct, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
                <input type="url" required value={editProduct.image} onChange={e => setEditProduct({...editProduct, image: e.target.value})}
                  placeholder="https://..." className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium">
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button type="button" onClick={() => { setShowEditProduct(false); setEditProduct(null); }}
                  className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 text-sm">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-56 bg-white rounded-lg shadow border border-gray-100 h-fit">
            <nav className="p-4">
              <ul className="space-y-1">
                {[
                  { key: 'dashboard', icon: BarChart, label: 'Dashboard' },
                  { key: 'products', icon: Package, label: 'Products' },
                  { key: 'orders', icon: ShoppingCart, label: 'Orders' },
                  { key: 'users', icon: Users, label: 'Users' },
                  { key: 'settings', icon: Settings, label: 'Settings' },
                ].map(({ key, icon: Icon, label }) => (
                  <li key={key}>
                    <button
                      className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                        activeTab === key ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveTab(key)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          {/* Main Content */}
          <div className="flex-1">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
