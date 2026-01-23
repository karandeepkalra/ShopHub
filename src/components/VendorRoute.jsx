import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const VendorRoute = ({ children }) => {
  const { user, userRole } = useAuth();
  
  console.log('VendorRoute Debug:', { user, userRole });

  if (!user) {
    console.log('VendorRoute: No user, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (userRole !== 'vendor') {
    console.log('VendorRoute: User is not a vendor, role:', userRole, 'redirecting to home');
    return <Navigate to="/" replace />;
  }

  console.log('VendorRoute: User is a vendor, allowing access');
  // Allow all vendors (pending and approved) to access the vendor panel
  // The VendorPanel component will handle the UI differences
  return children;
};

export default VendorRoute;
