// Select component with Tailwind CSS styling

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  disabled = false,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-neutral-90 mb-2">
          {label}
          {required && <span className="text-danger-main ml-1">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        aria-label={label || placeholder}
        className={`
          w-full px-3 py-2 border rounded-lg text-neutral-90 bg-white
          focus:outline-none focus:ring-2 focus:ring-primary-focus focus:border-primary-main
          disabled:bg-neutral-30 disabled:text-neutral-60 disabled:cursor-not-allowed
          ${error ? 'border-danger-main' : 'border-neutral-40'}
        `}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-danger-main">{error}</p>
      )}
    </div>
  );
};
