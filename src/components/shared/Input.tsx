export interface InputProps {
  type?: 'text' | 'email' | 'tel' | 'number' | 'date' | 'password';
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  label,
  placeholder,
  required = false,
  error,
  value,
  onChange,
  disabled = false,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-neutral-100 mb-1">
          {label}
          {required && <span className="text-danger-main ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        className={`
          w-full px-3 py-2 border rounded-lg text-neutral-100 placeholder:text-neutral-70 transition-colors duration-200
          focus:outline-none
          disabled:bg-neutral-30 disabled:text-neutral-60 disabled:cursor-not-allowed disabled:border-neutral-40
          ${error 
            ? 'border-danger-main' 
            : 'border-neutral-40 focus:border-primary-main focus:ring-2 focus:ring-primary-focus'}
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-danger-600">{error}</p>
      )}
    </div>
  );
};
