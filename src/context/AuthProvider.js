import React, { useContext, useState } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AuthProvider({ children }) {
  let navigate = useNavigate();
  const [auth, setAuth] = useState(() => {
    const jsonValue = JSON.parse(localStorage.getItem("token"));
    if (jsonValue) return jsonValue;
    return null;
  });

  const handleAuth = (data, originPath) => {
    const {
      token,
      data: { user },
    } = data;
    localStorage.setItem("token", JSON.stringify({ token, user }));
    setAuth({ token, user });
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    navigate(originPath);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["authorization"] = "Bearer ";
    setAuth(null);
    navigate("/login");
  };

  const value = { auth, setAuth, handleAuth, handleLogout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth can only be used within <AuthContextProvider/>");
  }

  return context;
}

export { useAuth };
export default AuthProvider;
