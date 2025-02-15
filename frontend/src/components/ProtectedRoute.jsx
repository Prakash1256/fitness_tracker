import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken"); // ✅ Check if token exists
  return token ? children : <Navigate to="/dashboard" />; // ✅ Redirect to login if no token
};

export default ProtectedRoute;
