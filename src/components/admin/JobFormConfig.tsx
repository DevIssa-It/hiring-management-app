import React from 'react';
import type { JobFormConfiguration } from '@/types';
import { FieldRequirement } from '@/types';

export interface JobFormConfigProps {
  configuration: JobFormConfiguration;
  onChange: (config: JobFormConfiguration) => void;
}

const FORM_FIELDS = [
  { key: 'fullName', label: 'Full name' },
  { key: 'profilePicture', label: 'Photo Profile' },
  { key: 'gender', label: 'Gender' },
  { key: 'domicile', label: 'Domicile' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone number' },
  { key: 'linkedin', label: 'LinkedIn link' },
  { key: 'dateOfBirth', label: 'Date of birth' },
] as const;

export const JobFormConfig: React.FC<JobFormConfigProps> = ({ configuration, onChange }) => {
  const handleFieldChange = (field: keyof JobFormConfiguration, value: FieldRequirement) => {
    onChange({
      ...configuration,
      [field]: value,
    });
  };

  return (
    <div className="space-y-3">
      {FORM_FIELDS.map((field) => (
        <div 
          key={field.key} 
          className="flex items-center justify-between py-3 border-b border-neutral-40 last:border-0"
        >
          <label className="text-sm font-medium text-neutral-90">{field.label}</label>
          
          <div className="flex items-center gap-3">
            {/* Mandatory Button */}
            <button
              type="button"
              onClick={() => handleFieldChange(field.key, FieldRequirement.MANDATORY)}
              className={`
                px-4 py-1.5 rounded-full text-sm font-medium transition-all border-2
                ${configuration[field.key] === 'mandatory'
                  ? 'border-primary-main text-primary-main bg-white'
                  : 'border-neutral-40 text-neutral-70 hover:border-neutral-90'
                }
              `}
            >
              Mandatory
            </button>

            {/* Optional Button */}
            <button
              type="button"
              onClick={() => handleFieldChange(field.key, FieldRequirement.OPTIONAL)}
              className={`
                px-4 py-1.5 rounded-full text-sm font-medium transition-all border-2
                ${configuration[field.key] === 'optional'
                  ? 'border-primary-main text-primary-main bg-white'
                  : 'border-neutral-40 text-neutral-70 hover:border-neutral-90'
                }
              `}
            >
              Optional
            </button>

            {/* Off Button */}
            <button
              type="button"
              onClick={() => handleFieldChange(field.key, FieldRequirement.OFF)}
              className={`
                px-4 py-1.5 rounded-full text-sm font-medium transition-all border-2
                ${configuration[field.key] === 'off'
                  ? 'border-primary-main text-primary-main bg-white'
                  : 'border-neutral-40 text-neutral-70 hover:border-neutral-90'
                }
              `}
            >
              Off
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
