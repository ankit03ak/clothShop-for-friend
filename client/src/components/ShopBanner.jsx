import React from 'react';

// Importing the icons
import { FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { IoShirt, IoWoman, IoMan } from "react-icons/io5";

const ShopBanner = () => {
  return (
    <div className="font-poppins my-10">
      <div className="max-w-6xl mx-auto overflow-hidden rounded-2xl shadow-2xl">
        <div className="bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 text-white p-8 md:p-12 text-center">
          
          {/* Shop Name */}
          <h1 className="font-pacifico text-5xl md:text-7xl mb-3">
            Chauhan Vastralay
          </h1>

          {/* Contact Details */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-10">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full text-base font-semibold transition hover:bg-white/20 hover:scale-105">
              <FaPhoneAlt />
              <span>7405954946</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full text-base font-semibold transition hover:bg-white/20 hover:scale-105">
              <FaMapMarkerAlt />
              <span>Milkipur Bazar, Ayodhya, Uttar Pradesh</span>
            </div>
          </div>

          {/* Categories Section */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            
            {/* Men's Category */}
            <div className="flex flex-col items-center gap-3 group transition duration-300 ease-in-out hover:-translate-y-2 cursor-pointer">
              <div className="flex items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-full bg-sky-500 border-4 border-white/30 text-5xl md:text-6xl transition duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg">
                <IoMan />
              </div>
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider transition group-hover:text-sky-300">
                Men
              </h3>
            </div>
            
            {/* Kids' Category */}
            <div className="flex flex-col items-center gap-3 group transition duration-300 ease-in-out hover:-translate-y-2 cursor-pointer">
              <div className="flex items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-full bg-amber-500 border-4 border-white/30 text-5xl md:text-6xl transition duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg">
                <IoShirt />
              </div>
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider transition group-hover:text-amber-300">
                Kids
              </h3>
            </div>
            
            {/* Ladies' Category */}
            <div className="flex flex-col items-center gap-3 group transition duration-300 ease-in-out hover:-translate-y-2 cursor-pointer">
              <div className="flex items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-full bg-pink-600 border-4 border-white/30 text-5xl md:text-6xl transition duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg">
                <IoWoman />
              </div>
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider transition group-hover:text-pink-300">
                Ladies
              </h3>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopBanner;