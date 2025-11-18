import React from 'react';
import type { JobFormConfiguration, EmploymentType } from '@/types';
import { FieldRequirement } from '@/types';

export interface JobFormConfigProps {
  configuration: JobFormConfiguration;
  onChange: (config: JobFormConfiguration) => void;
  jobType?: EmploymentType;
}

const FORM_FIELDS = [
  { key: 'fullName' as keyof JobFormConfiguration, label: 'Full name' },
  { key: 'profilePicture' as keyof JobFormConfiguration, label: 'Photo Profile', hasJobTypeLogic: true },
  { key: 'gender' as keyof JobFormConfiguration, label: 'Gender' },
  { key: 'domicile' as keyof JobFormConfiguration, label: 'Domicile' },
  { key: 'email' as keyof JobFormConfiguration, label: 'Email' },
  { key: 'phone' as keyof JobFormConfiguration, label: 'Phone number' },
  { key: 'linkedin' as keyof JobFormConfiguration, label: 'LinkedIn link' },
  { key: 'dateOfBirth' as keyof JobFormConfiguration, label: 'Date of birth' },
  { key: 'portfolio' as keyof JobFormConfiguration, label: 'Portfolio' },
  { key: 'expectedSalary' as keyof JobFormConfiguration, label: 'Expected Salary' },
  { key: 'availability' as keyof JobFormConfiguration, label: 'Availability' },
  { key: 'resume' as keyof JobFormConfiguration, label: 'Resume' },
  { key: 'coverLetter' as keyof JobFormConfiguration, label: 'Cover Letter' },
] as const;

export const JobFormConfig: React.FC<JobFormConfigProps> = ({ configuration, onChange, jobType }) => {
  const handleFieldChange = (field: keyof JobFormConfiguration, value: FieldRequirement) => {
    onChange({
      ...configuration,
      [field]: value,
    });
  };

  const getProfilePictureDefault = () => {
    if (jobType === 'full_time') return FieldRequirement.MANDATORY;
    if (jobType === 'intern') return FieldRequirement.OPTIONAL;
    return configuration.profilePicture;
  };

  const isProfilePictureDisabled = () => {
    return jobType === 'full_time' || jobType === 'intern';
  };

  return (
    <div className="space-y-3 border border-neutral-40 rounded-lg p-4 bg-neutral-10">
      <h3 className="text-base font-semibold text-neutral-90 mb-4">
        Minimum Profile Information Required
      </h3>
      {FORM_FIELDS.map((field) => {
        const isDisabled = field.hasJobTypeLogic && isProfilePictureDisabled();
        const currentValue = field.key === 'profilePicture' && field.hasJobTypeLogic 
          ? getProfilePictureDefault() 
          : configuration[field.key];
        
        return (
          <div 
            key={field.key} 
            className="flex items-center justify-between py-3 border-b border-neutral-40 last:border-0"
          >
            <div className="flex flex-col">
              <label className="text-sm font-base text-neutral-90">{field.label}</label>
              {field.hasJobTypeLogic && jobType && (
                <span className="text-xs text-neutral-60 mt-1">
                  {jobType === 'full_time' ? 'Mandatory for full-time positions' : 
                   jobType === 'intern' ? 'Optional for intern positions' : ''}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {/* Mandatory Button */}
              <button
                type="button"
                disabled={isDisabled && jobType !== 'full_time'}
                onClick={() => handleFieldChange(field.key, FieldRequirement.MANDATORY)}
                className={`
                  px-4 py-1.5 rounded-full text-sm font-medium transition-all border-2
                  ${currentValue === 'mandatory'
                    ? 'border-primary-main text-primary-main bg-white'
                    : 'border-neutral-40 text-neutral-70 hover:border-neutral-90'
                  }
                  ${isDisabled && jobType !== 'full_time' ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                Mandatory
              </button>

              {/* Optional Button */}
              <button
                type="button"
                disabled={isDisabled && jobType !== 'intern'}
                onClick={() => handleFieldChange(field.key, FieldRequirement.OPTIONAL)}
                className={`
                  px-4 py-1.5 rounded-full text-sm font-medium transition-all border-2
                  ${currentValue === 'optional'
                    ? 'border-primary-main text-primary-main bg-white'
                    : 'border-neutral-40 text-neutral-70 hover:border-neutral-90'
                  }
                  ${isDisabled && jobType !== 'intern' ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                Optional
              </button>

              <button
                type="button"
                disabled={isDisabled}
                onClick={() => handleFieldChange(field.key, FieldRequirement.OFF)}
                className={`
                  px-4 py-1.5 rounded-full text-sm font-medium transition-all border-2
                  ${currentValue === 'off'
                    ? 'border-primary-main text-primary-main bg-white'
                    : 'border-neutral-40 text-neutral-70 hover:border-neutral-90'
                  }
                  ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                Off
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
