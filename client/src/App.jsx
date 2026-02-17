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
import EditProduct from './pages/EditProduct';
import AddProduct from './pages/AddProduct';
import Layout from './components/Layout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Routes with Layout (Navbar + Footer) */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/category/:category" element={<CategoryProducts />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Route>

          {/* Routes without Layout (Auth & Admin) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
        </Routes>
        <Toaster duration={1000} position="top-center" richColors />
      </Router>
    </AuthProvider>
  );
}

export default App;
