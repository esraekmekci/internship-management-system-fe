import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RoleBasedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("tokenKey");
  const userRole = token ? localStorage.getItem("role") : null;

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default RoleBasedRoute;