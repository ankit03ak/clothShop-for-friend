import Navbar from '../components/Navbar';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'sonner';

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
      const res = await axios.get('http://localhost:8080/api/products');
      setProducts(res.data);
    } catch (err) {
      toast.error('Error fetching products');
      console.error(err);
    }
  };

    useEffect(() => {
    // fetch total users
    axios.get("http://localhost:8080/api/admin/users/count")
      .then(res => setTotalUsers(res.data.totalUsers))
      .catch(err => console.error(err));
  }, []);

  const handleClickTotalUser = () => {
    if (!showList) {
      axios.get("http://localhost:8080/api/admin/users/list")
        .then(res => setUserList(res.data))
        .catch(err => console.error(err));
    }
    setShowList(!showList);
  };


const handleDelete = async (id) => {
  toast.warning("Are you sure you want to delete this product?", {
    action: {
      label: "Yes",
      onClick: async () => {
        try {
          await axios.delete(`http://localhost:8080/api/products/${id}`, {
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
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
      
      <div className="relative z-10 p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Admin Dashboard
          </h1>
          
          <p className="text-purple-200/80 text-lg">Manage your product inventory</p>
        </div>

        {/* Products Grid */}
        <div className="bg-white/5 backdrop-blur-lg rounded p-8 border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Product Inventory
            </h2>
            <div className="flex items-center gap-4">
              




              <div className="bg-white/10 px-1 py-1 rounded border border-white/20">
              
                <span className="text-purple-200 font-medium">{products.length} Products</span>
              </div>
              <button
                onClick={() => navigate('/admin/add-product')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold px-1 py-1 rounded shadow-lg hover:shadow-xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 border border-green-400/20 flex items-center gap-2"
              >
                <FaPlus /> Add New Product
              </button>
            </div>
          </div>
          <div className="relative z-10 p-4 max-w-2xl mx-auto ">
  {/* Total Users Section */}
  <div 
    className="bg-white/10 backdrop-blur-lg rounded border border-white/10 shadow-2xl cursor-pointer"
    onClick={handleClickTotalUser}
  >
    <h2 className="text font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2 text-center m-2">
      Total Registered Users: {totalUsers}
    </h2>
    {showList && (
      <ul className=" overflow-y-auto border-t border-white/20 pt-2 space-y-3">
        {userList.map(u => (
          <li key={u._id} className="text-purple-200/80 text-sm">
            {u.name} - {u.email} ({u.role})
          </li>
        ))}
      </ul>
    )}
  </div>
</div>


          
          {products.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-purple-200/60 text-lg mb-6">No products found. Add your first product!</p>
              <button
                onClick={() => navigate('/admin/add-product')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 border border-green-400/20 flex items-center gap-2 mx-auto"
              >
                <FaPlus /> Create First Product
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {products.map(p => (
                <div key={p._id} className="bg-white/10 backdrop-blur-sm rounded p-2 border border-white/20 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 group">
                  {/* Product Image */}
                  <div className="relative overflow-hidden rounded mb-4">
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="space-y-3">
                    <h3 className="font-bold text-white text-lg line-clamp-2">{p.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        ₹{p.price}
                      </span>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded animate-pulse"></div>
                        <span className="text-green-400 text-sm font-medium"> {p.available ? "In Stock" : "Out of Stock"} </span>  
                      </div>
                    </div>
                    
                    {/* Product Details */}
                    {p.sizes && p.sizes.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {p.sizes.map((size, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded border border-blue-500/30">
                            {size}
                          </span>
                        ))}
                      </div>
                    )}
                    
{Array.isArray(p.color) && p.color.length > 0 && (
  <div className="flex flex-wrap gap-1">
    {p.color.map((c, idx) => (
      <span
        key={idx}
        className="px-2 py-1 bg-pink-500/20 text-pink-300 text-xs rounded border border-pink-500/30"
      >
        {c}
      </span>
    ))}
  </div>
)}
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button 
                        onClick={() => navigate(`/products/edit/${p._id}`)} 
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium py-2 px-2 rounded transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2"
                      >
                        <FaEdit className="text-sm" />
                        <span className='text-sm'>Edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(p._id)} 
                        className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-medium py-2 px-2 rounded transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/50 flex items-center justify-center gap-2"
                      >
                        <FaTrash className="text-sm" />
                        <span className='text-sm'>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;