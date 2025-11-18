import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/shared/Button';
import Verification from '@/assets/verified.svg';

const ApplicationSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <img
        src={VerifiedIcon}
        alt="Application Success Illustration"
        className="w-64 h-64 mb-8"
        onError={e => (e.currentTarget.style.display = 'none')}
      />
      <h2 className="text-2xl font-semibold text-neutral-90 mb-2 text-center">
        ✅ Success!
      </h2>
      <p className="text-neutral-70 text-center max-w-xl mb-8">
        Your application has been submitted successfully.
      </p>
      <Button 
        onClick={() => navigate('/applicant')}
        className="px-8 py-3"
        variant='alternative'
      >
        Back to Dashboard
      </Button>
    </div>
  );
};

export default ApplicationSuccess;
