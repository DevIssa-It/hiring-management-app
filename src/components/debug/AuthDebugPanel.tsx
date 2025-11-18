import React from 'react';
import { useAuth } from '@/context/AuthContext';

export const AuthDebugPanel: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Hanya tampilkan di development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs max-w-xs z-50">
      <h4 className="font-bold mb-2">🔍 Auth Debug</h4>
      <div className="space-y-1">
        <div>Loading: {isLoading ? '✅' : '❌'}</div>
        <div>Authenticated: {isAuthenticated ? '✅' : '❌'}</div>
        <div>User ID: {user?.id || 'null'}</div>
        <div>Email: {user?.email || 'null'}</div>
        <div>Role: {user?.role || 'null'}</div>
        <div>Timestamp: {new Date().toLocaleTimeString()}</div>
      </div>
    </div>
  );
};