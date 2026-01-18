import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const VendorRoute = ({ children }) => {
  const { user, userRole } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== 'vendor') {
    return <Navigate to="/" replace />;
  }

  // Allow all vendors (pending and approved) to access the vendor panel
  // The VendorPanel component will handle the UI differences
  return children;
};

export default VendorRoute;
