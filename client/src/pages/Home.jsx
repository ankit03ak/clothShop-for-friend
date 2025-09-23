import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://fr-api-s2ue.onrender.com/api/products'); 
        setProducts(res.data.slice(0, 3)); // show only 3 featured
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const categories = ["T-shirt", "Shirt", "Saree", "Jeans", "Trouser"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      
      {/* Category Section */}
      <div className="max-w-4xl mx-auto px-8 py-2">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-full shadow-xl backdrop-blur-sm p-0 md:p-4">
          <div className="text-center mb-4">
<h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
  Shop by Category
</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto rounded"></div>
          </div>
          
          <div className="flex gap-3 md:gap-3 flex-wrap justify-center">
            {categories.map((cat, index) => (
              <button
  key={cat}
  onClick={() => navigate(`/category/${cat.toLowerCase()}`)}
  className="group relative overflow-hidden px-1 py-0 sm:px-3 sm:py-2 bg-gradient-to-r from-emerald-400 to-green-500 text-white rounded shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm sm:text-base sm:mt-[-2px]"
>
  {/* Hover animation overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  
  {/* Shimmer effect */}
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
  
  {/* Category icon */}
  <div className="absolute top-1 right-1 w-4 h-4 sm:w-4 sm:h-4 bg-white bg-opacity-20 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
  
  <span className="relative z-10">{cat}</span>
</button>

            ))}
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="max-w-7xl mx-auto px-3 py-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-4 md:p-4">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Featured Products
            </h1>
            <div className="w-32 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-2"></div>
            <p className="text-gray-600 text-lg font-medium">
              Discover our handpicked favorites
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {products.map((product) => (
              <div 
                key={product._id} 
                className="transform hover:scale-105 hover:-translate-y-2 transition-all duration-300"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/products"
              className="group relative inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden min-w-[200px]"
            >
              {/* Background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
              
              <span className="relative z-10 mr-2">Explore All Products</span>
              
              {/* Animated arrow */}
              <svg 
                className="relative z-10 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;