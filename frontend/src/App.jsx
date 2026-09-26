import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { ProductProvider } from "./context/ProductContext";
import AdminLogin from "./pages/admin/AdminLogin";
import ResetPassword from "./pages/ResetPassword";
import About from "./pages/About";
import Contact from "./pages/Contact";

import AdminProtectedRoute
  from "./components/admin/AdminProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import OrderRequest from "./pages/OrderRequest";
import { OrderProvider } from "./context/OrderContext";
import MyOrders from "./pages/MyOrders";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";
import { AdminAuthProvider } from "./context/AdminAuthContext";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

function AppContent() {

  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>

        {/* Customer Routes */}

        <Route path="/" element={<Home />} />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/order-request"
          element={<OrderRequest />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        

        <Route
          path="/orders"
          element={<MyOrders />}
        />

        <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>
        <Route
  path="/reset-password"
  element={<ResetPassword />}
/>
         

        {/* Admin */}

        <Route
  path="/admin/login"
  element={<AdminLogin />}
/>

<Route
  path="/admin"
  element={
    <AdminProtectedRoute>
      <AdminDashboard />
    </AdminProtectedRoute>
  }
/>

<Route
  path="/admin/orders"
  element={
    <AdminProtectedRoute>
      <AdminOrders />
    </AdminProtectedRoute>
  }
/>

<Route
  path="/admin/products"
  element={
    <AdminProtectedRoute>
      <AdminProducts />
    </AdminProtectedRoute>
  }
/>

      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}
function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
      <CartProvider>

        <OrderProvider>
          <ProductProvider>
          <BrowserRouter>

          
            <AppContent />

          
          </BrowserRouter>

          </ProductProvider>
        </OrderProvider>

      </CartProvider>
    </AdminAuthProvider>
    </AuthProvider>
  );
}

export default App;