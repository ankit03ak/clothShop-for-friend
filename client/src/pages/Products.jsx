import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading , setLoading] = useState(false);

  useEffect(() => {

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://fr-api-s2ue.onrender.com/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
       finally {
      setLoading(false); // stop loading
    }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">All Products</h1>

              {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-5xl font-semibold animate-bounce">Loading Products...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
            
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default Products;
