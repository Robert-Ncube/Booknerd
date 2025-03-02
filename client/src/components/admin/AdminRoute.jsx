import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, logoutUser } from "../../redux/features/authSlice";

const AdminRoute = ({ element: Component, ...rest }) => {
  const {
    isAuthenticated,
    isLoading,
    token: storeToken,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const token = storeToken || JSON.parse(sessionStorage.getItem("token"));

  useEffect(() => {
    if (token && !isAuthenticated) {
      dispatch(checkAuth(token));
    } else if (!token && isAuthenticated) {
      dispatch(logoutUser());
    }
  }, [dispatch, token, isAuthenticated]);

  useEffect(() => {
    if (!token && isAuthenticated) {
      dispatch(logoutUser());
    }
  }, [token, isAuthenticated, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated || token ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/admin/login" />
  );
};

export default AdminRoute;
