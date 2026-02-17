import Navbar from '../components/Navbar';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'sonner';
import { API_ENDPOINTS } from '../config/api';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const [totalUsers, setTotalUsers] = useState(0);
  const [userList, setUserList] = useState([]);
  const [showList, setShowList] = useState(false);

useEffect(() => {
  if (!user) {
    toast.error('Please login first');
    navigate('/');
    return;
  }

  if (user.user.role !== "admin") {
    // logged in but not admin
    toast.error('You have to be admin to access this page',{
      duration: 2000
    });
    navigate('/');
    return;
  }

  fetchProducts();
}, [user, navigate]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.PRODUCTS);
      setProducts(res.data);
    } catch (err) {
      toast.error('Error fetching products');
      console.error(err);
    }
  };

  useEffect(() => {
    // fetch total users
    axios.get(API_ENDPOINTS.ADMIN_USERS_COUNT)
      .then(res => setTotalUsers(res.data.totalUsers))
      .catch(err => {
        console.error('Error fetching user count:', err);
        toast.error('Failed to fetch user count');
      });
  }, []);

  const handleClickTotalUser = () => {
    if (!showList) {
      axios.get(API_ENDPOINTS.ADMIN_USERS_LIST)
        .then(res => setUserList(res.data))
        .catch(err => {
          console.error('Error fetching user list:', err);
          toast.error('Failed to fetch user list');
        });
    }
    setShowList(!showList);
  };


const handleDelete = async (id) => {
  toast.warning("Are you sure you want to delete this product?", {
    action: {
      label: "Yes",
      onClick: async () => {
        try {
          await axios.delete(API_ENDPOINTS.PRODUCT_BY_ID(id), {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          toast.success("Product deleted successfully");
          fetchProducts();
        } catch (err) {
          toast.error("Error deleting product");
          console.error(err);
        }
      },
    },
    cancel: {
      label: "No",
    },
    duration: 5000
  });
};


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage your product inventory and users</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Products */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Products</p>
                <p className="text-3xl font-bold text-gray-900">{products.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Users */}
          <div 
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
            onClick={handleClickTotalUser}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            {showList && (
              <div className="mt-4 pt-4 border-t border-gray-200 max-h-48 overflow-y-auto">
                <p className="text-xs text-gray-500 mb-2 font-medium">Registered Users:</p>
                {userList.map(u => (
                  <div key={u._id} className="text-sm text-gray-700 py-1 flex items-center justify-between">
                    <span>{u.name}</span>
                    <span className="text-xs text-gray-500">{u.role}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Product Button */}
          <button
            onClick={() => navigate('/admin/add-product')}
            className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all hover:scale-[1.02] border border-gray-900"
          >
            <div className="flex items-center justify-center gap-3">
              <FaPlus className="text-2xl" />
              <div className="text-left">
                <p className="text-sm opacity-90 mb-1">Quick Action</p>
                <p className="text-lg font-bold">Add New Product</p>
              </div>
            </div>
          </button>
        </div>

        {/* Products Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Product Inventory
              </h2>
              <span className="text-sm text-gray-600">
                {products.length} {products.length === 1 ? 'Product' : 'Products'}
              </span>
            </div>
          </div>
          
          {products.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg mb-6">No products found. Add your first product!</p>
              <button
                onClick={() => navigate('/admin/add-product')}
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                <FaPlus /> Create First Product
              </button>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(p => (
                  <div key={p._id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
                    {/* Product Image */}
                    <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                      />
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {p.available ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">{p.name}</h3>
                      <p className="text-2xl font-bold text-gray-900 mb-3">₹{p.price}</p>
                      
                      {/* Product Details */}
                      <div className="space-y-2 mb-4">
                        {p.sizes && p.sizes.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {p.sizes.slice(0, 4).map((size, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                                {size}
                              </span>
                            ))}
                            {p.sizes.length > 4 && (
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                                +{p.sizes.length - 4}
                              </span>
                            )}
                          </div>
                        )}
                        
                        {Array.isArray(p.color) && p.color.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {p.color.slice(0, 3).map((c, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                                {c}
                              </span>
                            ))}
                            {p.color.length > 3 && (
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                                +{p.color.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button 
                          onClick={() => navigate(`/products/edit/${p._id}`)} 
                          className="flex-1 bg-gray-900 text-white py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(p._id)} 
                          className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;