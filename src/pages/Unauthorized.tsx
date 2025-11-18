import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/shared/Button';

export const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">
            You don't have permission to access this page.
          </p>
        </div>
        
        <div className="space-y-3">
          <Button
            variant="primary"
            onClick={() => navigate('/login')}
            className="w-full"
          >
            Go to Login
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
            className="w-full"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};