import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return currentUser ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
