import React from "react";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = false; // Replace with real auth logic
  return isAuthenticated ? children : <Navigate to="/Dashboard" />;
};
export default ProtectedRoute;