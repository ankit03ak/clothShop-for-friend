import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'sonner';
import axios from 'axios';
import { socket } from '../lib/socket';
import { FaUser, FaWhatsapp } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
    const [activeUsers, setActiveUsers] = useState(0);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const navigate = useNavigate();

    const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const handleLogoutClick = () => {
    toast.warning("Are you sure you want to logout?", {
      action: {
        label: "Yes",
          onClick: () => {
          logout();      // clear session
          navigate("/"); // redirect to home
        },
      },
      cancel: {
      label: "No",
    },
      duration: 5000
    });
  };

  
  
  

  useEffect(() => {
    socket.on("active-users", (count) => setActiveUsers(count));
    
    socket.on("total-visitors", (count) => setTotalVisitors(count));
    
    return () => {
      socket.off("active-users");
      socket.off("total-visitors");
    };
  }, []);
  
  // console.log(user);
  

  return (
    <nav className=" sticky top-0 z-50 flex justify-between items-center px-8 py-2 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-md border-b border-purple-500/20 shadow-2xl">
      {/* Animated background gradient */}
     <div className="flex flex-row justify-center items-center gap-8 md:gap-20 flex-wrap">
  {/* Logo Link */}
 <Link to="/" className="relative inline-block group">
  <img
    src="/favicon.png"
    alt="Logo"
    className="h-8 sm:h-12 md:h-16 rounded-full"
  />
</Link>

  {/* WhatsApp Link */}
  <a
    href="https://wa.me/917705954946"
    target="_blank"
    rel="noopener noreferrer"
  >
<FaWhatsapp className="cursor-pointer text-green-400 hover:text-green-600 transition-colors duration-300 text-2xl md:text-4xl animate-pulse" />

  </a>
</div>


    


      {/* Business Banner */}
      <div className="relative z-10 flex flex-col items-center space-y-2">
  {/* Shop Name */}
<h2 className="ml-6 text-3xl sm:text-4xl md:text-5xl font-extrabold 
               bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 
               bg-clip-text text-transparent tracking-wide drop-shadow-lg">
  Chauhan Vastralaya
</h2>

  <div className="flex flex-wrap items-center justify-center space-x-4 mt-2 text-center">
    {/* Contact */}

    {/* Address */}
    <span className="text-md font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
      📍 Milkipur Bazar, Ayodhya, UP
    </span>
    

    <div className="hidden md:flex items-center gap-2">
    <span className="text-white/60 text-lg">•</span>
  <span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
    👔 Men's
  </span>
  <span className="text-white/40 text-sm">|</span>
  <span className="text-sm font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
    👗 Women's
  </span>
  <span className="text-white/40 text-sm">|</span>
  <span className="text-sm font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
    🧸 Kids
  </span>
</div>
  </div>
</div>


      


      {/* Navigation Links */}
        
        {/* SHOW LIVE USER COUNT */}
        

      <div className="relative z-10 flex flex-wrap items-center gap-2 md:gap-3">

  {/* Status / Users Box */}
  <div className="flex items-center bg-white/10 backdrop-blur-md rounded px-3 py-1 md:px-4 md:py-2 border border-white/20 shadow-lg ml-10">
    <div className="relative flex items-center">
      {!isAdminRoute && (
        <>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <div className="absolute w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
        </>
      )}
      <span className="ml-2 text-xs md:text-sm font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        {isAdminRoute ? (
  `Total Visits : ${totalVisitors}`
) : (
  <span className="flex items-center gap-1">
    <FaUser className="text-white/80 " /> {activeUsers}
  </span>
)}
      </span>
    </div>
  </div>

  {/* Auth / Admin Buttons */}
 {!user ? (
  <div className="flex flex-wrap gap-2 justify-end md:justify-start">
    <Link 
      to="/login" 
      className="px-3 py-1 md:px-4 md:py-2 text-purple-200 hover:text-white font-medium rounded-full border border-purple-500/30 hover:border-purple-400/60 hover:bg-purple-500/10 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:scale-105"
    >
      Login
    </Link>
    <Link 
      to="/signup" 
      className="px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 border border-purple-400/20"
    >
      Signup
    </Link>
  </div>
) : (
  <div className="flex flex-wrap gap-2 justify-end md:justify-start items-center">
    {user?.user?.role === "admin" && (
      <Link 
        to="/admin" 
        className="px-2 py-1 md:px-2 md:py-2 text-amber-300 hover:text-amber-200 font-medium rounded border border-amber-500/40 hover:border-amber-400/60 hover:bg-amber-500/10 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:scale-105 text-sm"
      >
        Dashboard
      </Link>
    )}
    <button
      onClick={handleLogoutClick}
      className="px-2 py-1 md:px-2 md:py-2 bg-gradient-to-r from-red-600/80 to-pink-600/80 hover:from-red-500 hover:to-pink-500 text-white font-medium rounded shadow-lg hover:shadow-xl hover:scale-105 border border-red-400/20 backdrop-blur-sm text-sm"
    >
      Logout
    </button>
  </div>
)}

</div>

{/* Decorative lines */}
<div className="absolute top-0 md:left-[20%]  w-px h-full bg-gradient-to-b from-transparent via-purple-500/50 to-transparent hidden sm:block"></div>
<div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-pink-500/50 to-transparent hidden sm:block"></div>

    </nav>
  );
};

export default Navbar;