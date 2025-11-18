import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title = "🎉 Your application was sent!",
  message = "Congratulations! You've taken the first step towards a rewarding career at Rakamin. We look forward to learning more about you during the application process.",
  buttonText = "Back to Dashboard"
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="text-center py-6">
        <div className="text-4xl mb-4">🎉</div>
        <h2 className="text-xl font-semibold text-neutral-100 mb-4">
          {title}
        </h2>
        <p className="text-neutral-70 mb-6 leading-relaxed">
          {message}
        </p>
        <Button 
          onClick={onClose}
          variant="alternative"
          className="px-8 py-2"
        >
          {buttonText}
        </Button>
      </div>
    </Modal>
  );
};