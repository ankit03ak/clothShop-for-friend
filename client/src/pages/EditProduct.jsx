import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Navbar from '../components/Navbar';
import { toast } from "sonner";

const EditProduct = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    available: true, // use boolean
    description: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fr-api-s2ue.onrender.com/api/products/${id}`);
        const data = res.data;

        setProduct({
          name: data.name || "",
          price: data.price !== undefined && data.price !== null ? String(data.price) : "",
          available: data.available !== undefined ? data.available : true,
          description: data.description || "",
        });
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: product.name,
        price: Number(product.price) || 0,
        available: product.available,
        description: product.description,
      };

      await axios.put(`https://fr-api-s2ue.onrender.com/api/products/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      toast.success("Product updated successfully");
      navigate("/admin");
    } catch (err) {
      toast.error("Error updating product");
      console.error("Error updating product:", err);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
      
      <div className="relative z-10 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="mt-4 text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Edit Product
            </h2>
            <p className="text-purple-200/80">Update product information</p>
          </div>

          {/* Form Container */}
          <div className="bg-white/10 backdrop-blur-lg rounded p-6 border border-white/20 shadow-2xl mb-30">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                placeholder="Product Name"
                className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
              />

              <input
                type="number"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                placeholder="Price"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
              />

              <select
                value={product.available}
                onChange={(e) => setProduct({ ...product, available: e.target.value === "true" })}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
              >
                <option value="true" className="bg-slate-800 text-white ">In Stock</option>
                <option value="false" className="bg-slate-800 text-white">Out of Stock</option>
              </select>

              <textarea
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                placeholder="Enter product description"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 resize-none"
                rows="3"
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-2 rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 border border-purple-400/20"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;