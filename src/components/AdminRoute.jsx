import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const adminEmail = 'karandeepkaur0089@gmail.com';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.email !== adminEmail) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
