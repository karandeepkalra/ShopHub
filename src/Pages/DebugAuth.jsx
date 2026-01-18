import React from 'react';
import { useAuth } from '../context/AuthContext';

const DebugAuth = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const adminEmail = 'karandeepkaur0089@gmail.com';
  const isAdmin = isAuthenticated && user?.email === adminEmail;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Authentication Debug</h1>
      
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <strong>Loading:</strong> {loading ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>User Email:</strong> {user?.email || 'Not available'}
        </div>
        <div>
          <strong>User Name:</strong> {user?.name || 'Not available'}
        </div>
        <div>
          <strong>User UID:</strong> {user?.uid || 'Not available'}
        </div>
        <div>
          <strong>Is Admin:</strong> {isAdmin ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>Expected Admin Email:</strong> {adminEmail}
        </div>
        <div>
          <strong>Email Match:</strong> {user?.email === adminEmail ? 'Yes' : 'No'}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Quick Actions</h2>
        <div className="space-x-4">
          <button 
            onClick={() => window.location.href = '/admin'}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go to Admin Panel
          </button>
          <button 
            onClick={() => window.location.href = '/admin-test'}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Go to Test Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default DebugAuth;
