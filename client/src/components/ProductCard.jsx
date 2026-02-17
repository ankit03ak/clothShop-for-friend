import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`} className="group block">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Discount Badge */}
          {product.discount && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {product.discount}% OFF
            </div>
          )}
          
          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
            <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
              View Details
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          {/* Product Name */}
          <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-black transition-colors">
            {product.name}
          </h3>
          
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Add to Cart Button Preview */}
          <button className="w-full mt-2 py-2 bg-black text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:bg-gray-800">
            Quick View
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;