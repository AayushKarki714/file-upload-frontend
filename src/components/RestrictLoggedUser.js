import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function RestrictLoggedUser({ children }) {
  const { auth } = useAuth();

  if (auth) {
    return <Navigate to="/welcome" />;
  }

  return <div>{children}</div>;
}

export default RestrictLoggedUser;
