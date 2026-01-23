import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  console.log('ProtectedRoute Debug:', { isAuthenticated });
  
  if (isAuthenticated) {
    console.log('ProtectedRoute: User is authenticated, allowing access');
    return children;
  } else {
    console.log('ProtectedRoute: User not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
