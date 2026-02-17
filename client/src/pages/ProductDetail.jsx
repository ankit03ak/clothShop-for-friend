import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaWhatsapp, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { API_ENDPOINTS } from '../config/api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(API_ENDPOINTS.PRODUCT_BY_ID(id));
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

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Product Detail Container */}
      <div className="container-custom py-8 md:py-12">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Left Column - Image */}
            <div className="space-y-4">
              <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Stock Badge */}
                <div className="absolute top-4 right-4">
                  {product.available ? (
                    <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm font-medium">
                      <FaCheckCircle />
                      <span>In Stock</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 bg-red-100 text-red-800 px-3 py-1.5 rounded-full text-sm font-medium">
                      <FaTimesCircle />
                      <span>Out of Stock</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6">
              {/* Product Name */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                {product.category && (
                  <p className="text-gray-600 capitalize">Category: {product.category}</p>
                )}
              </div>

              {/* Price */}
              <div className="border-t border-b border-gray-200 py-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-gray-900">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Sizes */}
              {product.size && product.size.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Available Sizes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.size.map((size, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-900 font-medium hover:border-black transition-colors"
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {product.color && product.color.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Available Colors
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.color.map((color, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-900 font-medium hover:border-black transition-colors"
                      >
                        {color}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {product.description && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="space-y-3 pt-4">
                {product.available ? (
                  <a
                    href="https://wa.me/917705954946?text=Hello%20I%20want%20to%20chat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <FaWhatsapp className="text-2xl" />
                    <span>Contact on WhatsApp to Buy</span>
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full px-6 py-4 bg-gray-300 text-gray-600 font-semibold rounded-lg cursor-not-allowed"
                  >
                    Currently Unavailable
                  </button>
                )}

                <a
                  href="tel:+917705954946"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
                >
                  Call Us: +91 7705954946
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;