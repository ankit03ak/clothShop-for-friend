import Navbar from '../components/Navbar';
import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { API_ENDPOINTS } from '../config/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(API_ENDPOINTS.LOGIN, { email, password });
      login(res.data);
      toast.success('LoggedIn Successfully');
      navigate('/');
    } catch (err) {
      setLoading(false);
      console.error(err);
      toast.error('Login failed');
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container-custom py-12">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>

              {/* Login Button */}
              <button 
                type="submit" 
                className="w-full bg-gray-900 text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <a href="/signup" className="text-gray-900 font-medium hover:underline">
                  Sign up here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
