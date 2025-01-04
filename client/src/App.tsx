import { Route, Routes } from "react-router-dom";

// Admin
import AdminLayout from "./components/admin-view/AdminLayout";
import AdminOrders from "./pages/admin-view/AdminOrders";
import AdminFeatures from "./pages/admin-view/AdminFeatures";
import AdminProducts from "./pages/admin-view/AdminProducts";
import AdminDashboard from "./pages/admin-view/AdminDashboard";

// Auth
import AuthLayout from "./components/auth/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

//Shopping
import ShoppingLayout from "./components/shopping-view/ShoppingLayout";
import Home from "./pages/shopping-view/Home";
import Search from "./pages/shopping-view/Search";
import ShoppinListing from "./pages/shopping-view/ShoppinListing";
import ShoppingCheckout from "./pages/shopping-view/ShoppingCheckout";
import ShoppingAccount from "./pages/shopping-view/ShoppingAccount";

// Not found
import NotFound from "./pages/NoFound/NotFound";

const App = () => {
  return (
    <div className="bg-white flex flex-col overflow-hidden">
      <Routes>
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>

        <Route path="shop" element={<ShoppingLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="listing" element={<ShoppinListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="search" element={<Search />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
