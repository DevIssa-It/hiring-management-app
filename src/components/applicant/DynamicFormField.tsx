// DynamicFormField Component
// Renders form field based on configuration

import { FormField } from '@/types';

export interface DynamicFormFieldProps {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}

export const DynamicFormField: React.FC<DynamicFormFieldProps> = ({
  field,
  value,
  onChange,
  error,
}) => {
  // Don't render if field is off
  if (field.requirement === 'off') return null;

  const isRequired = field.requirement === 'mandatory';

  // TODO: Implement rendering for different field types
  switch (field.type) {
    case 'text':
    case 'email':
    case 'tel':
      return (
        <div>
          <label>
            {field.label}
            {isRequired && <span>*</span>}
          </label>
          <input
            type={field.type}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            required={isRequired}
          />
          {error && <span className="error">{error}</span>}
        </div>
      );

    case 'select':
      return (
        <div>
          <label>
            {field.label}
            {isRequired && <span>*</span>}
          </label>
          <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            required={isRequired}
          >
            <option value="">{field.placeholder || 'Select...'}</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {error && <span className="error">{error}</span>}
        </div>
      );

    // Add more field types...
    default:
      return null;
  }
};
