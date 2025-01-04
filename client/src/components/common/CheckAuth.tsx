import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { ResLoginFormT } from "@/types/auth";

type CheckAuthT = {
  isAuthenticated: boolean;
  children: React.ReactNode;
  user: ResLoginFormT;
};

const CheckAuth = ({ isAuthenticated, user, children }: CheckAuthT) => {
  const location = useLocation();

  console.log(location.pathname);
  console.log(user);

  // If the user is an admin and is on the root path, redirect to dashboard
  if (location.pathname === "/" && isAuthenticated && user?.role === "admin") {
    return <Navigate to={"/admin/dashboard"} />;
  }

  // Handle other authentication checks and redirects for the user
  if (
    !isAuthenticated &&
    !location.pathname.includes("/login") &&
    !location.pathname.includes("/register")
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    console.log("checking");
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

  return <>{children}</>;
};

export default CheckAuth;
