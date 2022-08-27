import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";

function Secret() {
  return (
    <ProtectedRoute>
      <h1>I am Gay 😋</h1>
    </ProtectedRoute>
  );
}

export default Secret;
