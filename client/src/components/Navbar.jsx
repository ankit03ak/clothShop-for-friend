import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'sonner';
import { socket } from '../lib/socket';
import { FaUser, FaWhatsapp, FaBars, FaTimes, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeUsers, setActiveUsers] = useState(0);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const handleLogoutClick = () => {
    toast.warning("Are you sure you want to logout?", {
      action: {
        label: "Yes",
        onClick: () => {
          logout();
          navigate("/");
        },
      },
      cancel: {
        label: "No",
      },
      duration: 5000
    });
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Socket listeners
  useEffect(() => {
    socket.on("active-users", (count) => setActiveUsers(count));
    socket.on("total-visitors", (count) => setTotalVisitors(count));
    
    return () => {
      socket.off("active-users");
      socket.off("total-visitors");
    };
  }, []);

  return (
    <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
      scrolled ? 'shadow-md' : 'shadow-sm'
    }`}>
      {/* Top Bar - Business Info */}
      <div className="bg-gray-900 text-white py-2">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-between text-xs md:text-sm gap-2">
            {/* Left: Location & Contact */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-gray-400" />
                <span>Milkipur Bazar, Ayodhya, UP</span>
              </div>
              <a 
                href="tel:+917705954946"
                className="flex items-center gap-1 hover:text-gray-300 transition-colors"
              >
                <FaPhone className="text-gray-400" />
                <span>7705954946</span>
              </a>
            </div>

            {/* Right: Live Stats */}
            <div className="flex items-center gap-3">
              {!isAdminRoute && (
                <div className="flex items-center gap-1.5">
                  <div className="relative">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                  </div>
                  <FaUser className="text-gray-400 text-xs" />
                  <span className="font-medium">{activeUsers} online</span>
                </div>
              )}
              {isAdminRoute && (
                <span className="font-medium">Total Visits: {totalVisitors}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/favicon.png"
              alt="Chauhan Vastralaya"
              className="h-10 md:h-12 rounded-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                Chauhan Vastralaya
              </h1>
              <p className="text-xs text-gray-600">Men's • Women's • Kids</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-black ${
                location.pathname === '/' ? 'text-black' : 'text-gray-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`text-sm font-medium transition-colors hover:text-black ${
                location.pathname === '/products' ? 'text-black' : 'text-gray-600'
              }`}
            >
              All Products
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* WhatsApp */}
            <a
              href="https://wa.me/917705954946"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
              title="Chat on WhatsApp"
            >
              <FaWhatsapp className="text-xl" />
            </a>

            {/* Auth Buttons */}
            {!user ? (
              <div className="hidden md:flex items-center gap-2">
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-4 py-2 text-sm font-medium bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                {user?.user?.role === "admin" && (
                  <Link 
                    to="/admin" 
                    className="px-4 py-2 text-sm font-medium text-amber-600 border border-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogoutClick}
                  className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-black transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200 animate-slide-down">
            <div className="flex flex-col gap-3">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/products" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                All Products
              </Link>
              
              {!user ? (
                <>
                  <Link 
                    to="/login" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 text-sm font-medium bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  {user?.user?.role === "admin" && (
                    <Link 
                      to="/admin" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-2 text-sm font-medium text-amber-600 border border-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogoutClick();
                    }}
                    className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors text-left"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;