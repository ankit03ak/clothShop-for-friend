import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-3 text-[14px]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Left: Copyright */}
        <div>

          <p>
    &copy; {new Date().getFullYear()} Chauhan Ready Made Center. All rights reserved.
  </p>
  <p className="text-[13px]">
    Contact us:{" "}
    <a href="tel:+917705954946"
     target="_blank"
    rel="noopener noreferrer"
     className="text-blue-400 hover:underline">
      7705954946
    </a>{" "}
    | Email:{" "}
    <a href="mailto:vijaykumar227262@gmail.com"
     target="_blank"
    rel="noopener noreferrer"
     className="text-blue-400 hover:underline">
      vijaykumar227262@gmail.com
    </a>
    | Follow us on: {" "}
    <a href="https://www.instagram.com/chauhan_vastralay" 
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-400 hover:underline ">
      Instagram
    </a>
    {" "}
    <a href="https://www.facebook.com/ramanuj.milkipur" 
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-400 hover:underline ">
      Facebook
    </a>
    
  </p>
        </div>

        <div className="text-[11px] mt-2 md:mt-0 flex items-center gap-2">
          <span>Designed and Developed by</span>
          <span className="text-purple-400 font-semibold">Storms :) </span>
          <a 
            href="https://www.instagram.com/vicky03__ak" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transition-colors duration-300"
          >
            <FaInstagram className="w-4 h-4"/>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
