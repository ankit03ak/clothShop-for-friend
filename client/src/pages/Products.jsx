import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../config/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(API_ENDPOINTS.PRODUCTS);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            All Products
          </h1>
          <p className="text-gray-600">
            Browse our complete collection of quality clothing
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container-custom py-8 md:py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl aspect-[3/4] skeleton"></div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="mb-6 text-sm text-gray-600">
              Showing {products.length} {products.length === 1 ? 'product' : 'products'}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
