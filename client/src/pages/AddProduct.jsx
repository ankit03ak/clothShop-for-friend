import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { FaUpload, FaImage, FaArrowLeft, FaSave } from 'react-icons/fa';
import { toast } from 'sonner';

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

      await axios.post('http://localhost:8080/api/products', data, {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
      <div className="relative z-10 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <button onClick={handleCancel} className="float-left bg-white/10 hover:bg-white/20 text-purple-200 p-3 rounded-full transition-all duration-300 hover:scale-110">
              <FaArrowLeft />
            </button>
            <h1 className="text-4xl font-black bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent mb-4">
              Add New Product
            </h1>
            <p className="text-purple-200/80 text-lg">Create a new product listing</p>
          </div>

          {/* Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-purple-200 font-medium text-lg">🏷️ Product Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter product name" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm transition-all duration-300" required />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-purple-200 font-medium text-lg">💰 Price (₹) *</label>
                <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Enter price" min="0" step="0.01" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm transition-all duration-300" required />
              </div>
              <div className="space-y-2">
  <label className="text-purple-200 font-medium text-lg">
    🏷️ Category *
  </label>
  <input
    type="text"
    name="category"
    value={formData.category}
    onChange={handleInputChange}
    placeholder="Enter category"
    required
    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
  />
</div>

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="text-purple-200 font-medium text-lg">📷 Product Image *</label>
                <div className="flex flex-col gap-4">
                  <div className="relative">
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload" required />
                    <label htmlFor="image-upload" className="w-full bg-white/10 border-2 border-dashed border-white/30 rounded-xl p-8 text-center cursor-pointer hover:bg-white/20 transition-all duration-300 flex flex-col items-center gap-4">
                      <FaUpload className="text-4xl text-purple-300" />
                      <div>
                        <p className="text-purple-200 font-medium">Click to upload image</p>
                        <p className="text-purple-300/60 text-sm">PNG, JPG, JPEG up to 10MB</p>
                      </div>
                    </label>
                  </div>

                  {imagePreview && (
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <p className="text-purple-200 font-medium mb-3 flex items-center gap-2"><FaImage /> Preview</p>
                      <img src={imagePreview} alt="Product preview" className="w-full h-64 object-cover rounded-lg shadow-lg" />
                    </div>
                  )}
                </div>
              </div>

              {/* Sizes and Colors */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-purple-200 font-medium text-lg">📏 Available Sizes</label>
                  <input type="text" name="sizes" value={formData.sizes} onChange={handleInputChange} placeholder="S, M, L, XL" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm transition-all duration-300" />
                  <p className="text-purple-300/60 text-sm">Separate with commas</p>
                </div>
                <div className="space-y-2">
                  <label className="text-purple-200 font-medium text-lg">🎨 Available Colors</label>
                  <input type="text" name="colors" value={formData.colors} onChange={handleInputChange} placeholder="Red, Blue, Green" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm transition-all duration-300" />
                  <p className="text-purple-300/60 text-sm">Separate with commas</p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-purple-200 font-medium text-lg">📝 Product Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Enter detailed product description" rows="5" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 resize-none" />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6">
                <button type="button" onClick={handleCancel} className="flex-1 bg-white/10 hover:bg-white/20 text-purple-200 font-bold py-4 px-6 rounded-xl border border-white/20 transition-all duration-300 hover:scale-105 backdrop-blur-sm text-lg flex items-center justify-center gap-2" disabled={loading}>
                  <FaArrowLeft /> Cancel
                </button>
                <button type="submit" className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 border border-green-400/20 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>
                  {loading ? (<><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> Adding...</>) : (<><FaSave /> Add Product</>)}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
