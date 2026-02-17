import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Navbar from '../components/Navbar';
import { toast } from "sonner";
import { API_ENDPOINTS } from '../config/api';

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
        const res = await axios.get(API_ENDPOINTS.PRODUCT_BY_ID(id));
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

      await axios.put(API_ENDPOINTS.PRODUCT_BY_ID(id), payload, {
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Edit Product
          </h1>
          <p className="text-gray-600">Update product information</p>
        </div>

        {/* Form Container */}
        <div className="max-w-2xl bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                placeholder="Enter product name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                placeholder="Enter price"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability Status
              </label>
              <select
                value={product.available}
                onChange={(e) => setProduct({ ...product, available: e.target.value === "true" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              >
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Description
              </label>
              <textarea
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                placeholder="Enter product description"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                rows="4"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;