import Navbar from '../components/Navbar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fr-api-s2ue.onrender.com/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, [id]);

// console.log(product);



  if (!product) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-xl text-purple-300 font-medium">Loading amazing product.....</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-green-100 to-green-100">
      <Navbar />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/5 rounded blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-4 max-w-5xl mx-auto">
        {/* Product container */}
        <div className="bg-gradient-to-br from-slate-500/50 to-purple-500/50 backdrop-blur-xl border border-purple-500/20 rounded shadow-2xl p-4 lg:p-6">
          
          {/* Product layout */}
          <div className="grid lg:grid-cols-2 gap-4 items-start">
            
            {/* Image section */}
            <div className="space-y-4">
              <div className="relative group overflow-hidden rounded ">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[540px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                
                {/* Stock indicator overlay */}
                <div className="absolute top-4 right-4">
                  <div className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md ${
                    product.available 
                      ? 'bg-green-500/20 text-green-600 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}>
                    {product.available ? '✓ In Stock' : '✗ Out of Stock'}
                  </div>
                </div>
              </div>
            </div>

            {/* Product info section */}
            <div className="space-y-2">
              
              {/* Header */}
              <div className="space-y-2">
                <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-purple-700 via-pink-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                  {product.name}
                </h1>
                
                {/* Price */}
                <div className="flex items-center space-x-3">
                  <span className="text-purple-500 text-xl font-medium">Price:</span>
                  <span className="text-3xl font-black bg-gradient-to-r text-green-800 bg-clip-text text-transparent">
                    ₹{product.price}
                  </span>
                </div>
              </div>

              {/* Product details grid */}
              <div className="grid gap-4">
                
                {/* Sizes */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-purple-700">Available Sizes</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.size?.length ? (
                      product.size.map((size, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/40 rounded-full text-purple-200 font-medium backdrop-blur-sm hover:from-purple-500/40 hover:to-pink-500/40 transition-all duration-300"
                        >
                          {size}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-700 italic">No sizes specified </span>
                    )}
                  </div>
                </div>

                {/* Colors */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-purple-600">Available Colors</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.color?.length ? (
                      product.color.map((color, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 border border-blue-500/40 rounded-full text-blue-200 font-medium backdrop-blur-sm hover:from-blue-500/40 hover:to-cyan-500/40 transition-all duration-300"
                        >
                          {color}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 italic">No colors specified</span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-purple-700">Description</h3>
                  <div className="bg-slate-800/50 border border-purple-500/20 rounded p-3 backdrop-blur-sm">
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {product.description || 'No description available for this product.'}
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="pt-6 space-y-4">
                  <button 
                    className={`w-full py-4 px-8 rounded font-bold text-lg transition-all duration-300 ${
                      product.available
                        ? 'bg-gradient-to-r from-green-300 to-green-500 hover:from-purple-500 hover:to-pink-500 text-white shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-[1.02]'
                        : 'bg-gray-600/10 text-gray-500 cursor-not-allowed border border-gray-600/30'
                    }`}
                    disabled={!product.available}
                  >
                      <a
    href="https://wa.me/917705954946?text=Hello%20I%20want%20to%20chat"
    target="_blank"
    rel="noopener noreferrer"
  >


                    {product.available ? 'Contact to BUY :)' : 'Currently Unavailable'}
  </a>
                  </button>
                  
                  {/* <button className="w-full py-4 px-8 bg-slate-800/50 hover:bg-slate-700/50 text-purple-300 hover:text-white border border-purple-500/30 hover:border-purple-400/50 rounded-2xl font-bold text-lg transition-all duration-300 backdrop-blur-sm">
                    Add to Wishlist
                  </button> */}
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-tr from-pink-500/10 to-transparent rounded-full blur-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;