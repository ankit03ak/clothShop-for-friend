import { FaInstagram, FaFacebook, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Chauhan Vastralaya</h3>
            <p className="text-sm text-gray-400 mb-4">
              Your trusted destination for quality clothing. Men's, Women's, and Kids' fashion at affordable prices.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://www.instagram.com/chauhan_vastralay" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a 
                href="https://www.facebook.com/ramanuj.milkipur" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <FaFacebook className="text-lg" />
              </a>
              <a 
                href="https://wa.me/917705954946" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <FaWhatsapp className="text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">All Products</Link>
              </li>
              <li>
                <Link to="/category/t-shirt" className="hover:text-white transition-colors">T-Shirts</Link>
              </li>
              <li>
                <Link to="/category/shirt" className="hover:text-white transition-colors">Shirts</Link>
              </li>
              <li>
                <Link to="/category/saree" className="hover:text-white transition-colors">Sarees</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Shop By</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/category/jeans" className="hover:text-white transition-colors">Jeans</Link>
              </li>
              <li>
                <Link to="/category/trouser" className="hover:text-white transition-colors">Trousers</Link>
              </li>
              <li className="text-gray-500">Men's Collection</li>
              <li className="text-gray-500">Women's Collection</li>
              <li className="text-gray-500">Kids' Collection</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-gray-400 mt-1 flex-shrink-0" />
                <span>Milkipur Bazar, Ayodhya, Uttar Pradesh</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-gray-400 flex-shrink-0" />
                <a href="tel:+917705954946" className="hover:text-white transition-colors">
                  +91 7705954946
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-gray-400 flex-shrink-0" />
                <a href="mailto:vijaykumar227262@gmail.com" className="hover:text-white transition-colors break-all">
                  vijaykumar227262@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Chauhan Vastralaya. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Designed and Developed by</span>
              <span className="text-purple-400 font-semibold">Storms</span>
              <a 
                href="https://www.instagram.com/vicky03__ak" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-400 transition-colors"
              >
                <FaInstagram className="w-4 h-4"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
