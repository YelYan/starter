import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./store/hook";
import { checkAuthenticated } from "./store/authslice/authSlice";
import GlobalLoading from "@/components/ui/global-loading";

import CheckAuth from "./components/common/CheckAuth";

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

// UnAuth
import UnAuth from "./pages/unauth/UnAuth";

//Shopping
import ShoppingLayout from "./components/shopping-view/ShoppingLayout";
import Home from "./pages/shopping-view/Home";
import Search from "./pages/shopping-view/Search";
import ShoppinListing from "./pages/shopping-view/ShoppinListing";
import ShoppingCheckout from "./pages/shopping-view/ShoppingCheckout";
import ShoppingAccount from "./pages/shopping-view/ShoppingAccount";
import ShoppingProductDetails from "./pages/shopping-view/ShoppingProductDetails";

// Not found
import NotFound from "./pages/NoFound/NotFound";

const App = () => {
  const dispatch = useAppDispatch();

  const { isAuthenticated, user, isLoading } = useAppSelector(
    (state) => state.auth
  );

  // every time the app loads, check if the user is authenticated
  useEffect(() => {
    dispatch(checkAuthenticated());
  }, [dispatch]);

  if (isLoading) return <GlobalLoading />;

  return (
    <div className="bg-white flex flex-col overflow-hidden">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && user?.role === "admin" ? (
              <Navigate to={"/admin/dashboard"} />
            ) : (
              <ShoppingLayout />
            )
          }
        >
          <Route index element={<Home />} />
        </Route>

        {/* public auth routes */}
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* protected admin routes */}
        <Route
          path="admin/*"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>

        {/* protected shopping routes */}
        <Route
          path="shop/*"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="listing" element={<ShoppinListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="search" element={<Search />} />
          <Route path="products/:id" element={<ShoppingProductDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="unauth-page" element={<UnAuth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
