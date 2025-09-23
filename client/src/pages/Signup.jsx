import Navbar from '../components/Navbar';
import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/register', { name, email, password });
      login(res.data);
      toast.success('Signup Successfully');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Signup failed');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 px-2 pt-12 pb-[8px] justify-center flex">

  {/* Signup Card */}
  <div className="bg-white/95 backdrop-blur-xl rounded shadow-2xl p-8 max-w-md w-full border border-white/20">
    {/* Header */}
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
        Create Account
      </h1>
      <p className="text-gray-500 font-medium">Join us and get started</p>
    </div>

    {/* Signup Form */}
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Name Field */}
      <div className="relative group">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-gray-50/50 focus:bg-white text-gray-800 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Email Field */}
      <div className="relative group">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          </div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-gray-50/50 focus:bg-white text-gray-800 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="relative group">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-gray-50/50 focus:bg-white text-gray-800 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Signup Button */}
      <button 
        type="submit" 
        className="group relative w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 overflow-hidden"
      >
        {/* Button background animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
        
        <span className="relative z-10 flex items-center justify-center">
          Create Account
          <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </button>
    </form>

    {/* Sign In Link */}
    <div className="text-center mt-8">
      <p className="text-gray-600">
        Already have an account? 
        <a href="/login" className="ml-1 text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors">
          Sign in here
        </a>
      </p>
    </div>
  </div>
</div>
    </div>
  );
};

export default Signup;
