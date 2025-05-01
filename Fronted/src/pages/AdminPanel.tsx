import { useState, useEffect } from 'react';
import axios from 'axios'; // Optional: Use fetch if you prefer
import { BarChart, Users, Package, Settings } from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  interface DashboardData {
    totalSales: number;
    salesChange: string;
    totalOrders: number;
    ordersChange: string;
    totalCustomers: number;
    customersChange: string;
  }

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
  }

  const [products, setProducts] = useState<Product[]>([]);
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  interface Order {
    id: string;
    customer: string;
    total: number;
    status: string;
  }

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let response;
        if (activeTab === 'dashboard') {
          response = await axios.get<DashboardData>(`${process.env.REACT_APP_API_URL}/dashboard`);
          setDashboardData(response.data);
        } else if (activeTab === 'products') {
          response = await axios.get<Product[]>(`${process.env.REACT_APP_API_URL}/products`);
          setProducts(response.data);
        } else if (activeTab === 'users') {
          response = await axios.get<User[]>(`${process.env.REACT_APP_API_URL}/users`);
          setUsers(response.data);
        } else if (activeTab === 'orders') {
          response = await axios.get<Order[]>(`${process.env.REACT_APP_API_URL}/orders`);
          setOrders(response.data);
        }
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    // const fetchData = async () => {
    //   setLoading(true);
    //   setError(null);
    //   try {
    //     let response;
    //     if (activeTab === 'dashboard') {
        //   response = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard`);
        //   setDashboardData(response.data);
        // } else if (activeTab === 'products') {
        //   response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
        //   setProducts(response.data);
        // } else if (activeTab === 'users') {
    //       response = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
    //       setUsers(response.data);
    //     } else if (activeTab === 'orders') {
    //       response = await axios.get(`${process.env.REACT_APP_API_URL}/orders`);
    //       setOrders(response.data);
    //     }
    //   } catch (err) {
    //     setError('Failed to fetch data. Please try again later.');
    //     console.error('Error fetching data:', err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
  
    fetchData();
  }, [activeTab]);
  // Fetch data based on the active tab
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       let response;
  //       if (activeTab === 'dashboard') {
  //         response = await axios.get<DashboardData>('/api/dashboard'); // Replace with your API endpoint
  //         setDashboardData(response.data);
  //       } else if (activeTab === 'products') {
  //         response = await axios.get<Product[]>('/api/products'); // Replace with your API endpoint
  //         setProducts(response.data);
  //       } else if (activeTab === 'users') {
  //         response = await axios.get<User[]>('/api/users'); // Replace with your API endpoint
  //         setUsers(response.data);
        // } else if (activeTab === 'orders') {
  //         response = await axios.get<Order[]>('/api/orders'); // Replace with your API endpoint
  //         setOrders(response.data);
  //       }
  //     } catch (err) {
  //       setError('Failed to fetch data. Please try again later.');
  //       console.error('Error fetching data:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [activeTab]);

  const renderContent = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p className="text-red-500">{error}</p>;
    }

    if (activeTab === 'dashboard' && dashboardData) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Total Sales</h3>
            <p className="text-3xl font-bold text-blue-600">${dashboardData.totalSales}</p>
            <p className="text-sm text-gray-500 mt-2">{dashboardData.salesChange}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
            <p className="text-3xl font-bold text-blue-600">{dashboardData.totalOrders}</p>
            <p className="text-sm text-gray-500 mt-2">{dashboardData.ordersChange}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Total Customers</h3>
            <p className="text-3xl font-bold text-blue-600">{dashboardData.totalCustomers}</p>
            <p className="text-sm text-gray-500 mt-2">{dashboardData.customersChange}</p>
          </div>
        </div>
      );
    }

    if (activeTab === 'products') {
      return (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Products</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Add New Product
            </button>
          </div>
          {products.length > 0 ? (
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 border-b">Product Name</th>
                  <th className="text-left py-3 px-4 border-b">Price</th>
                  <th className="text-left py-3 px-4 border-b">Stock</th>
                  <th className="text-left py-3 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="py-3 px-4">{product.name}</td>
                    <td className="py-3 px-4">${product.price}</td>
                    <td className="py-3 px-4">{product.stock}</td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800">Edit</button>
                      <button className="text-red-600 hover:text-red-800 ml-4">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No products available.</p>
          )}
        </div>
      );
    }

    if (activeTab === 'users') {
      return (
        <div className="bg-white rounded-lg shadow p-6">
          {users.length > 0 ? (
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 border-b">Name</th>
                  <th className="text-left py-3 px-4 border-b">Email</th>
                  <th className="text-left py-3 px-4 border-b">Role</th>
                  <th className="text-left py-3 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.role}</td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800">Edit</button>
                      <button className="text-red-600 hover:text-red-800 ml-4">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No users available.</p>
          )}
        </div>
      );
    }

    if (activeTab === 'orders') {
      return (
        <div className="bg-white rounded-lg shadow p-6">
          {orders.length > 0 ? (
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 border-b">Order ID</th>
                  <th className="text-left py-3 px-4 border-b">Customer</th>
                  <th className="text-left py-3 px-4 border-b">Total</th>
                  <th className="text-left py-3 px-4 border-b">Status</th>
                  <th className="text-left py-3 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="py-3 px-4">{order.id}</td>
                    <td className="py-3 px-4">{order.customer}</td>
                    <td className="py-3 px-4">${order.total}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No orders available.</p>
          )}
        </div>
      );
    }

    if (activeTab === 'settings') {
      return (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="max-w-2xl">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue="DiamondLux"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue="info@diamondlux.com"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
      );
    }

    return <p>Select a tab to view content.</p>;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow">
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                      activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('dashboard')}
                  >
                    <BarChart className="h-5 w-5" />
                    <span>Dashboard</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                      activeTab === 'products' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('products')}
                  >
                    <Package className="h-5 w-5" />
                    <span>Products</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                      activeTab === 'users' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('users')}
                  >
                    <Users className="h-5 w-5" />
                    <span>Users</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                      activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('orders')}
                  >
                    <BarChart className="h-5 w-5" />
                    <span>Orders</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                      activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </button>
                </li>
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