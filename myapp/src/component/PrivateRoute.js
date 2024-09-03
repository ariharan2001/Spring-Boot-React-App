import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  // If the token is not found, redirect to login
  if (!token) {
    return <Navigate to="/" />;
  }

  // If token exists, render the children (protected component)
  return children;
}

export default PrivateRoute;
