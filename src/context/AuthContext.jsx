import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null); // 'user' | 'vendor' | 'admin'
  const [vendorStatus, setVendorStatus] = useState(null); // 'pending' | 'approved' | 'rejected'

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('Auth state changed:', firebaseUser);
      if (firebaseUser) {
        // User is signed in - fetch user data from Firestore to get role
        const fetchUserData = async () => {
          try {
            // Import here to avoid circular dependency
            const { doc, getDoc } = await import('firebase/firestore');
            const { db } = await import('../firebase/config');
            
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            const userData = userDoc.exists() ? userDoc.data() : {};
            
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName || userData.name || firebaseUser.email.split('@')[0],
              ...userData
            });
            setIsAuthenticated(true);
            setUserRole(userData.role || 'user');
            setVendorStatus(userData.vendorStatus || null);
          } catch (error) {
            console.error('Error fetching user data:', error);
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName || firebaseUser.email.split('@')[0]
            });
            setIsAuthenticated(true);
            setUserRole('user');
            setVendorStatus(null);
          }
          setLoading(false);
        };
        
        fetchUserData();
      } else {
        // User is signed out
        setUser(null);
        setIsAuthenticated(false);
        setUserRole(null);
        setVendorStatus(null);
        setLoading(false);
      }
    }, (error) => {
      console.error('Auth error:', error);
      setLoading(false);
    });

    // Fallback timeout in case Firebase takes too long
    const timeout = setTimeout(() => {
      if (loading) {
        console.log('Firebase auth taking too long, proceeding anyway');
        setLoading(false);
      }
    }, 3000);

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, [loading]);

  const login = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    setUserRole(userData.role || 'user');
    setVendorStatus(userData.vendorStatus || null);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setUserRole(null);
    setVendorStatus(null);
  };

  const register = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    setUserRole(userData.role || 'user');
    setVendorStatus(userData.vendorStatus || null);
  };

  const updateUserRole = (role, status = null) => {
    setUserRole(role);
    setVendorStatus(status);
    if (user) {
      setUser({ ...user, role, vendorStatus: status });
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    userRole,
    vendorStatus,
    login,
    logout,
    register,
    updateUserRole
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
