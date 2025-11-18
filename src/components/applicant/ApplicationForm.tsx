import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useApplications } from '@/hooks/useApplications';
import { Button } from '@/components/shared/Button';
import { DynamicFormField } from './DynamicFormField';
import type { Job, ApplicationData, FormField, FieldRequirement } from '@/types';

export interface ApplicationFormProps {
  job: Job;
  onSubmit: (data: ApplicationData) => Promise<void>;
}

const createFormFields = (config: Job['formConfiguration']): FormField[] => [
  {
    name: 'fullName',
    label: 'Full Name',
    type: 'text',
    requirement: config.fullName,
    placeholder: 'Enter your full name'
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    requirement: config.email,
    placeholder: 'Enter your email'
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    requirement: config.phone,
    placeholder: 'Enter your phone number'
  },
  {
    name: 'gender',
    label: 'Gender',
    type: 'select',
    requirement: config.gender,
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'other', label: 'Other' }
    ],
    placeholder: 'Select gender'
  },
  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    type: 'date',
    requirement: config.dateOfBirth,
  },
  {
    name: 'domicile',
    label: 'Domicile',
    type: 'text',
    requirement: config.domicile,
    placeholder: 'Enter your city/location'
  },
  {
    name: 'linkedin',
    label: 'LinkedIn URL',
    type: 'text',
    requirement: config.linkedin,
    placeholder: 'https://linkedin.com/in/yourprofile'
  },
  {
    name: 'portfolio',
    label: 'Portfolio URL',
    type: 'text',
    requirement: config.portfolio,
    placeholder: 'https://yourportfolio.com'
  },
  {
    name: 'expectedSalary',
    label: 'Expected Salary (IDR)',
    type: 'number',
    requirement: config.expectedSalary,
    placeholder: 'Enter expected salary'
  },
  {
    name: 'availability',
    label: 'Availability Date',
    type: 'date',
    requirement: config.availability,
  },
  {
    name: 'profilePicture',
    label: 'Profile Picture',
    type: 'webcam',
    requirement: config.profilePicture,
  },
  {
    name: 'resume',
    label: 'Resume',
    type: 'file',
    requirement: config.resume,
  },
  {
    name: 'coverLetter',
    label: 'Cover Letter',
    type: 'textarea',
    requirement: config.coverLetter,
    placeholder: 'Tell us why you\'re interested in this position...'
  }
];

export const ApplicationForm: React.FC<ApplicationFormProps> = ({ job, onSubmit }) => {
  const { user } = useAuth();
  const { submitApplication, isLoading } = useApplications();
  const [formData, setFormData] = useState<ApplicationData>({
    email: user?.email || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const formFields = createFormFields(job.formConfiguration);
  const visibleFields = formFields.filter(field => field.requirement !== 'off');

  const handleFieldChange = (fieldName: keyof ApplicationData, value: any) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    // Validate field immediately after touch
    const field = visibleFields.find(f => f.name === fieldName);
    if (field?.requirement === 'mandatory') {
      if (!value || (typeof value === 'string' && !value.trim())) {
        setErrors(prev => ({ ...prev, [fieldName]: `${field.label} is required` }));
      } else {
        setErrors(prev => ({ ...prev, [fieldName]: '' }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    visibleFields.forEach(field => {
      if (field.requirement === 'mandatory') {
        const value = formData[field.name];
        if (!value || (typeof value === 'string' && !value.trim())) {
          newErrors[field.name] = `❌ ${field.label} is required`;
        }
      }
    });

    setErrors(newErrors);
    
    // Scroll to first error field
    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      const errorElement = document.querySelector(`[data-field="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      await submitApplication(job.id, user.id, formData);
      await onSubmit(formData);
    } catch (error) {
      console.error('Failed to submit application:', error);
      throw error;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Apply for {job.title}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleFields.map((field) => (
            <div key={field.name} data-field={field.name}>
              <DynamicFormField
                field={field}
                value={formData[field.name]}
                onChange={(value) => handleFieldChange(field.name, value)}
                onBlur={() => setTouched(prev => ({ ...prev, [field.name]: true }))}
                error={touched[field.name] ? errors[field.name] : ''}
                jobType={job.employmentType}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Application'}
          </Button>
        </div>
      </form>
    </div>
  );
};