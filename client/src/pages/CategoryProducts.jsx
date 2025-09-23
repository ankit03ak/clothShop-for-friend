import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/products`);
        // filter locally (frontend way)
        const filtered = res.data.filter(
          (p) => p.category.toLowerCase() === category.toLowerCase()
        );
        setProducts(filtered);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [category]);

  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6 capitalize">{category} Collection</h1>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No products found in this category.</p>
          
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
