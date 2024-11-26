import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/authLayout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/dashboard";
import Orders from "./pages/admin/orders";
import Products from "./pages/admin/products";
import Features from "./pages/admin/features";
import PageNotFound from "./pages/404/page-not-found";
import ShoppingLayout from "./components/shopping/ShoppingLayout";
import Home from "./pages/shop/Home";
import ProductListing from "./pages/shop/ProductListing";
import Checkout from "./pages/shop/Checkout";
import Account from "./pages/shop/Account";
import CheckAuth from "./components/common/CheckAuth";
import Unauthorized from "./pages/404/unauthorized";
import { useSelector } from "react-redux";

const App = () => {
  // const isAuthenticated = false;
  // const user = null;
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route
            path="/auth"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="features" element={<Features />} />
          </Route>
          {/* Shop Routes */}
          <Route
            path="/shop"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingLayout />
              </CheckAuth>
            }
          >
            <Route path="home" element={<Home />} />
            <Route path="product-listing" element={<ProductListing />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="account" element={<Account />} />
          </Route>
          {/* 404 Route */}
          <Route path="*" element={<PageNotFound />} />
          {/* Unauthorized Route */}
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
