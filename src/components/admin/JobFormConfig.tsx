// Admin JobFormConfig Component
// Configure form fields as mandatory/optional/off

import type { JobFormConfiguration } from '@/types';
import { FieldRequirement } from '@/types';

export interface JobFormConfigProps {
  configuration: JobFormConfiguration;
  onChange: (config: JobFormConfiguration) => void;
}

const FORM_FIELDS = [
  { key: 'fullName', label: 'Full Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'gender', label: 'Gender' },
  { key: 'dateOfBirth', label: 'Date of Birth' },
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'portfolio', label: 'Portfolio' },
  { key: 'domicile', label: 'Domicile' },
  { key: 'expectedSalary', label: 'Expected Salary' },
  { key: 'availability', label: 'Availability' },
  { key: 'profilePicture', label: 'Profile Picture' },
  { key: 'resume', label: 'Resume' },
  { key: 'coverLetter', label: 'Cover Letter' },
] as const;

export const JobFormConfig: React.FC<JobFormConfigProps> = ({ configuration, onChange }) => {
  // TODO: Implement form configuration UI
  const handleFieldChange = (field: keyof JobFormConfiguration, value: FieldRequirement) => {
    onChange({
      ...configuration,
      [field]: value,
    });
  };

  return (
    <div>
      <h3>Application Form Configuration</h3>
      {FORM_FIELDS.map((field) => (
        <div key={field.key}>
          <label>{field.label}</label>
          <div>
            <input
              type="radio"
              name={field.key}
              value="mandatory"
              checked={configuration[field.key] === 'mandatory'}
              onChange={() => handleFieldChange(field.key, FieldRequirement.MANDATORY)}
            />
            Mandatory
            <input
              type="radio"
              name={field.key}
              value="optional"
              checked={configuration[field.key] === 'optional'}
              onChange={() => handleFieldChange(field.key, FieldRequirement.OPTIONAL)}
            />
            Optional
            <input
              type="radio"
              name={field.key}
              value="off"
              checked={configuration[field.key] === 'off'}
              onChange={() => handleFieldChange(field.key, FieldRequirement.OFF)}
            />
            Off
          </div>
        </div>
      ))}
    </div>
  );
};
