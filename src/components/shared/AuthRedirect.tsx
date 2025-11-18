import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';

export const AuthRedirect = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      console.log('AuthRedirect - User:', user);
      console.log('AuthRedirect - User role:', user.role);
      console.log('AuthRedirect - UserRole.ADMIN:', UserRole.ADMIN);
      console.log('AuthRedirect - Role comparison:', user.role === UserRole.ADMIN);
      
      const targetPath = user.role === UserRole.ADMIN ? '/admin' : '/applicant';
      console.log('AuthRedirect - Target path:', targetPath);
      navigate(targetPath, { replace: true });
    } else if (!isLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return null;
};