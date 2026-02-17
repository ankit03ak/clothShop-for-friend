import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { FaUpload, FaImage, FaArrowLeft, FaSave } from 'react-icons/fa';
import { toast } from 'sonner';
import { API_ENDPOINTS } from '../config/api';

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    sizes: '',
    colors: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('image', imageFile); // must match upload.single('image')
      data.append('name', formData.name);
      data.append('category', formData.category);
      data.append('price', formData.price);
      data.append('size', formData.sizes);
      data.append('color', formData.colors);
      data.append('description', formData.description);
      data.append('available', true);

      await axios.post(API_ENDPOINTS.PRODUCTS, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      });
      toast.success('Product added successfully.');
      navigate('/admin');
    } catch (err) {
      console.error('Error adding product:', err);
      toast.error('Error adding product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => navigate('/admin');


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleCancel}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Add New Product
          </h1>
          <p className="text-gray-600">Create a new product listing</p>
        </div>

        {/* Form */}
        <div className="max-w-3xl bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Price and Category */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="e.g., Saree, Shirt, Kurta"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image *
              </label>
              <div className="space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                  required
                />
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-10 h-10 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-600 font-medium">Click to upload image</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG up to 10MB</p>
                  </div>
                </label>

                {imagePreview && (
                  <div className="relative rounded-lg overflow-hidden border border-gray-200">
                    <img src={imagePreview} alt="Product preview" className="w-full h-64 object-cover" />
                    <div className="absolute top-2 right-2">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                        Image uploaded
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sizes and Colors */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Sizes
                </label>
                <input
                  type="text"
                  name="sizes"
                  value={formData.sizes}
                  onChange={handleInputChange}
                  placeholder="S, M, L, XL"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Colors
                </label>
                <input
                  type="text"
                  name="colors"
                  value={formData.colors}
                  onChange={handleInputChange}
                  placeholder="Red, Blue, Green"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter detailed product description"
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <FaSave /> Add Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
