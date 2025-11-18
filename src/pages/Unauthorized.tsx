import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/shared/Button';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';

export const Unauthorized = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleGoToDashboard = () => {
    if (user) {
      const targetPath = user.role === UserRole.ADMIN ? '/admin' : '/applicant';
      navigate(targetPath, { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Akses Ditolak</h1>
          <p className="text-gray-600 mb-4">
            Anda tidak memiliki izin untuk mengakses halaman ini.
          </p>
          {user && (
            <div className="text-sm text-gray-500 bg-gray-100 p-3 rounded">
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <Button
            variant="primary"
            onClick={handleGoToDashboard}
            className="w-full"
          >
            Ke Dashboard
          </Button>
          
          <Button
            variant="secondary"
            onClick={handleLogout}
            className="w-full"
          >
            Logout & Login Ulang
          </Button>
        </div>
      </div>
    </div>
  );
};