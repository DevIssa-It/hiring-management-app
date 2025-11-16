// Applicant ApplicationForm Component
// Dynamic form based on job configuration

import type { Job, ApplicationData } from '@/types';
import { useState } from 'react';

export interface ApplicationFormProps {
  job: Job;
  onSubmit: (data: ApplicationData) => Promise<void>;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({ job, onSubmit }) => {
  const [formData, setFormData] = useState<ApplicationData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TODO: Implement dynamic form rendering based on job.formConfiguration
  // - Render only fields that are not 'off'
  // - Apply validation for 'mandatory' fields
  // - Include WebcamCapture for profilePicture if required
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Apply for {job.title}</h2>
      {/* Dynamically render form fields */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
};
