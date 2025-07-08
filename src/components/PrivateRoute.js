// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const PrivateRoute = ({ children }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  return user ? children : <Navigate to="/student" />;
};

export default PrivateRoute;
