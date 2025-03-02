import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, logoutUser } from "../redux/features/authSlice";

const AdminRoute = ({ element: Component, ...rest }) => {
  const {
    isAuthenticated,
    isLoading,
    token: storeToken,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // Fallback to session storage if the store doesn't have the token
  const token = storeToken || JSON.parse(sessionStorage.getItem("token"));

  useEffect(() => {
    if (token && !isAuthenticated) {
      // If the token exists but the user is not authenticated, dispatch the login action
      dispatch(checkAuth(token));
    } else if (!token && isAuthenticated) {
      // If the token doesn't exist but the user is authenticated, log out the user
      dispatch(logoutUser());
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return token ? <Component {...rest} /> : <Navigate to="/admin/login" />;
};

export default AdminRoute;
