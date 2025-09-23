import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import { Toaster } from "sonner";
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import CategoryProducts from "./pages/CategoryProducts";
import { AuthProvider } from './context/AuthContext';
import Footer from './components/Footer';
import EditProduct from './pages/EditProduct';
import AddProduct from './pages/AddProduct';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/category/:category" element={<CategoryProducts />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/products/edit/:id" element={<EditProduct />} />
              <Route path="/admin/add-product" element={<AddProduct />} />
            </Routes>
          </main>
          <Footer />
          <Toaster duration={1000} position="top-center" richColors />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
