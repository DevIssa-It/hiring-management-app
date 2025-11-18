import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';

export const AuthRedirect = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Tunggu sampai loading selesai
    if (isLoading) return;

    if (isAuthenticated && user) {
      console.log('AuthRedirect - User authenticated:', user);
      console.log('AuthRedirect - User role:', user.role);
      
      const targetPath = user.role === UserRole.ADMIN ? '/admin' : '/applicant';
      console.log('AuthRedirect - Redirecting to:', targetPath);
      
      // Gunakan timeout kecil untuk memastikan state sudah stabil
      setTimeout(() => {
        navigate(targetPath, { replace: true });
      }, 100);
    } else {
      console.log('AuthRedirect - Not authenticated, redirecting to login');
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, user, isLoading, navigate]);

  // Tampilkan loading saat masih memuat
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg">
        {isLoading ? 'Loading...' : 'Redirecting...'}
      </div>
    </div>
  );
};