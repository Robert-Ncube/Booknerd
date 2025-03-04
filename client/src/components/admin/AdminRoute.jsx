import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, logoutUser } from "../../redux/features/authSlice";

const AdminRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [checkedAuth, setCheckedAuth] = useState(false);
  const token = JSON.parse(sessionStorage.getItem("token"));

  useEffect(() => {
    const verifyAuth = async () => {
      if (token) {
        try {
          await dispatch(checkAuth(token)).unwrap();
        } catch (error) {
          sessionStorage.removeItem("token");
        }
      }
      setCheckedAuth(true);
    };

    verifyAuth();
  }, [dispatch, token]);

  if (!checkedAuth || isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/admin/login" replace />
  );
};

export default AdminRoute;
