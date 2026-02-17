import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(API_ENDPOINTS.PRODUCTS); 
        setProducts(res.data.slice(0, 8)); // show 8 featured products
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { name: "T-Shirts", slug: "t-shirt" },
    { name: "Shirts", slug: "shirt" },
    { name: "Sarees", slug: "saree" },
    { name: "Jeans", slug: "jeans" },
    { name: "Trousers", slug: "trouser" }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&h=800&fit=crop')",
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>

        {/* Content */}
        <div className="relative container-custom py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to Chauhan Vastralaya
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Discover quality clothing for the entire family. From traditional sarees to modern fashion, we have it all.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="px-8 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </Link>
              <a
                href="https://wa.me/917705954946"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Shop by Category
            </h2>
            <p className="text-gray-600">Find exactly what you're looking for</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => navigate(`/category/${cat.slug}`)}
                className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 group-hover:text-black transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Featured Products
            </h2>
            <p className="text-gray-600">Handpicked favorites just for you</p>
          </div>
          
          {/* Featured Products Grid */}
          {loading ? (
            <div className="text-center py-12">Loading products...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              
              <div className="text-center">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  View All Products
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Why Choose Us
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Products</h3>
              <p className="text-gray-600">Carefully curated collection of premium clothing</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Affordable Prices</h3>
              <p className="text-gray-600">Best value for your money guaranteed</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Support</h3>
              <p className="text-gray-600">Always here to help via WhatsApp or phone</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;