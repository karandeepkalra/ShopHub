import React from 'react';
import { useAuth } from '../context/AuthContext';

const DebugLogin = () => {
  const { isAuthenticated, user } = useAuth();
  const adminEmail = 'karandeepkaur0089@gmail.com';
  const isAdmin = isAuthenticated && user?.email === adminEmail;

  return (
    <div className="fixed bottom-4 left-4 bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 shadow-lg z-50 max-w-sm">
      <h3 className="font-bold text-yellow-800 mb-2">Login Debug</h3>
      
      <div className="text-xs space-y-1">
        <p><strong>Authenticated:</strong> {isAuthenticated ? '✅ Yes' : '❌ No'}</p>
        <p><strong>Email:</strong> {user?.email || 'Not logged in'}</p>
        <p><strong>Name:</strong> {user?.name || 'N/A'}</p>
        <p><strong>Is Admin:</strong> {isAdmin ? '✅ Yes' : '❌ No'}</p>
      </div>

      {!isAuthenticated && (
        <div className="mt-3 text-xs text-red-600">
          Please login first with {adminEmail}
        </div>
      )}

      {isAuthenticated && user?.email !== adminEmail && (
        <div className="mt-3 text-xs text-orange-600">
          Logged in with wrong email. Use {adminEmail}
        </div>
      )}

      {isAuthenticated && user?.email === adminEmail && (
        <div className="mt-3 text-xs text-green-600">
          ✅ Admin access should be visible!
        </div>
      )}
    </div>
  );
};

export default DebugLogin;
