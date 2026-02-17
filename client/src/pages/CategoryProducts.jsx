import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { API_ENDPOINTS } from '../config/api';

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(API_ENDPOINTS.PRODUCTS);
        // filter locally (frontend way)
        const filtered = res.data.filter(
          (p) => p.category.toLowerCase() === category.toLowerCase()
        );
        setProducts(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 capitalize">
            {category} Collection
          </h1>
          <p className="text-gray-600">
            Explore our {category} collection
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container-custom py-8 md:py-12">
        {loading ? (
          <div className="text-center py-12">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No products found in this category.</p>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
