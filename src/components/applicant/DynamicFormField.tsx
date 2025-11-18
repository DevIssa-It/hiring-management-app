import React from 'react';
import { Input } from '@/components/shared/Input';
import { Select } from '@/components/shared/Select';
import { WebcamCapture } from './WebcamCapture';
import type { FormField, EmploymentType } from '@/types';

export interface DynamicFormFieldProps {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
  onBlur?: () => void;
  error?: string;
  jobType?: EmploymentType;
}

export const DynamicFormField: React.FC<DynamicFormFieldProps> = ({
  field,
  value,
  onChange,
  onBlur,
  error,
  jobType,
}) => {
  // Don't render if field is off
  if (field.requirement === 'off') return null;

  const isRequired = field.requirement === 'mandatory';
  
  // Special logic for profile picture based on job type
  const isProfilePictureRequired = field.name === 'profilePicture' && 
    (jobType === 'full_time' || field.requirement === 'mandatory');

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'number':
        return (
          <Input
            label={field.label}
            type={field.type}
            value={value || ''}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={field.placeholder}
            required={isRequired}
            error={error}
          />
        );

      case 'date':
        return (
          <Input
            label={field.label}
            type="date"
            value={value || ''}
            onChange={onChange}
            onBlur={onBlur}
            required={isRequired}
            error={error}
          />
        );

      case 'select':
        return (
          <Select
            label={field.label}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            options={field.options || []}
            placeholder={field.placeholder || 'Select...'}
            required={isRequired}
            error={error}
            variant="dropdown"
          />
        );

      case 'textarea':
        return (
          <div>
            <label className="block text-sm font-medium text-neutral-90 mb-2">
              {field.label}
              {isRequired && <span className="text-danger-main ml-1">*</span>}
            </label>
            <textarea
              className={`w-full px-3 py-2 border rounded-lg text-neutral-100 focus:ring-2 focus:ring-primary-focus outline-none transition-all ${
                error
                  ? 'border-danger-main focus:border-danger-main'
                  : 'border-neutral-40 focus:border-primary-focus'
              }`}
              rows={4}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={field.placeholder}
              required={isRequired}
            />
            {error && <p className="mt-1 text-sm text-danger-main">{error}</p>}
          </div>
        );

      case 'file':
        return (
          <div>
            <label className="block text-sm font-medium text-neutral-90 mb-2">
              {field.label}
              {isRequired && <span className="text-danger-main ml-1">*</span>}
            </label>
            <input
              type="file"
              onChange={(e) => onChange(e.target.files?.[0])}
              className="w-full px-3 py-2 border border-neutral-40 rounded-lg focus:ring-2 focus:ring-primary-focus outline-none"
              required={isRequired}
            />
            {error && <p className="mt-1 text-sm text-danger-main">{error}</p>}
          </div>
        );

      case 'webcam':
        return (
          <WebcamCapture
            onCapture={onChange}
            required={isProfilePictureRequired}
          />
        );

      default:
        return null;
    }
  };

  return <div className="mb-4">{renderField()}</div>;
};
