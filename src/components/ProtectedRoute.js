import React, { Fragment } from "react";
import { useAuth } from "../context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const location = useLocation();
  console.log(location, "Protected Route");
  const { auth } = useAuth();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Fragment>{children}</Fragment>;
}

export default ProtectedRoute;
