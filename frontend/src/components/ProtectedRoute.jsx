import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isAuthenticated, role, requiredRole }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
