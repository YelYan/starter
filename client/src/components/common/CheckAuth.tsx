import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import GlobalLoading from "@/components/ui/global-loading";
import { ResLoginFormT } from "@/types/auth";

type CheckAuthT = {
  isAuthenticated: boolean | null;
  children: React.ReactNode;
  user: ResLoginFormT | null;
};

const CheckAuth = ({ isAuthenticated, user, children }: CheckAuthT) => {
  const location = useLocation();

  /**
   * app initial render will give isAuthenticated default value
   * so we will show loading until checkAuth dispatch successfully by using useeffect
   */
  if (isAuthenticated === null) {
    return <GlobalLoading />;
  }

  // If the user is an admin and is on the root path, redirect to dashboard
  if (location.pathname === "/" && isAuthenticated && user?.role === "admin") {
    return <Navigate to={"/admin/dashboard"} />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    return (
      <Navigate
        to={user?.role === "admin" ? "/admin/dashboard" : "/shop/home"}
      />
    );
  }

  // For admin users trying to access non-admin routes
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  // For non-admin users trying to access admin routes
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // if user is not authenticated & choose other rputes redirect to login page
  if (
    !isAuthenticated &&
    !location.pathname.includes("/login") &&
    !location.pathname.includes("/register")
  ) {
    console.log("win lr pppp");
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
};

export default CheckAuth;
