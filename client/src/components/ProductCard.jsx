import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // console.log(product.price)
  return (
    <Link to={`/products/${product._id}`} className="group block">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-400/50 to-purple-400/30 backdrop-blur-md border border-purple-400/20 rounded shadow-xl hover:shadow-2xl hover:shadow-purple-400/25 transition-all duration-500 p-2  hover:scale-[1] hover:border-purple-400/40">
        
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Image container with overlay effects */}
        <div className="relative overflow-hidden rounded mb-2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Floating view details badge */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
              View Details
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-1">
          {/* Product name */}
          <h2 className="font-bold text-xl text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-800 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300 line-clamp-2">
            {product.name}
          </h2>
          
          {/* Price with enhanced styling */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-blue-500 font-medium text-sm">Price:</span>
              <span className="text-2xl font-bold  text-green-600 bg-clip-text">
                ₹{product.price}
              </span>
              
              <sup className="line-through text-gray-500 text-[12px] font-bold">
  43% Off
</sup>
{/* // start from ehre */}
            </div>
          </div>

          {/* Action indicator */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-purple-400 text-sm font-medium group-hover:text-pink-400 transition-colors duration-300">
              View Details
            </div>
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-pink-500/10 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </Link>
  );
};

export default ProductCard;