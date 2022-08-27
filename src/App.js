import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import axios from "axios";
import Welcome from "./pages/Welcome";
import Secret from "./pages/Secret";

const getToken = () => {
  const jsonValue = JSON.parse(localStorage.getItem("token")) || "";
  if (!jsonValue) {
    return jsonValue;
  }
  return jsonValue.token;
};
axios.defaults.baseURL = "http://localhost:5000/api/v1/users";
axios.defaults.headers.common["authorization"] = `Bearer ${getToken()}`;

function App() {
  return (
    <div className="text-white font-poppins">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/secret" element={<Secret />} />
        <Route
          path="/*"
          element={
            <div>
              <h1>404 Page Not Found</h1>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
