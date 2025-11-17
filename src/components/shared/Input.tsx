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
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  prefix?: string;
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
  icon,
  iconPosition = 'left',
  prefix,
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-neutral-100 mb-2">
          {label}
          {required && <span className="text-danger-main ml-1">*</span>}
        </label>
      )}

      {prefix ? (
        // Dengan Prefix (Rp)
        <div className="flex items-center">
          <span className="flex items-center justify-center px-3 py-2 bg-neutral-20 border-2 border-r-0 border-neutral-40 rounded-l-lg text-neutral-90 font-medium">
            {prefix}
          </span>
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            required={required}
            className={`
              flex-1 px-3 py-2 border-2 rounded-r-lg text-neutral-100 placeholder:text-neutral-70 transition-colors duration-200
              focus:outline-none
              disabled:bg-neutral-30 disabled:text-neutral-60 disabled:cursor-not-allowed disabled:border-neutral-40
              ${error 
                ? 'border-2 border-danger-main' 
                : 'border-2 border-neutral-40 focus:border-primary-main focus:ring-2 focus:ring-primary-focus'}
            `}
          />
        </div>
      ) : (
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-60 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            required={required}
            className={`
              w-full px-3 py-2 border-2 rounded-lg text-neutral-100 placeholder:text-neutral-70 transition-colors duration-200
              focus:outline-none
              disabled:bg-neutral-30 disabled:text-neutral-60 disabled:cursor-not-allowed disabled:border-neutral-40
              ${icon && iconPosition === 'left' ? 'pl-10' : ''}
              ${icon && iconPosition === 'right' ? 'pr-10' : ''}
              ${error 
                ? 'border-2 border-danger-main' 
                : 'border-2 border-neutral-40 focus:border-primary-main focus:ring-2 focus:ring-primary-focus'}
            `}
          />
          {icon && iconPosition === 'right' && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-60 pointer-events-none">
              {icon}
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-danger-main">{error}</p>
      )}
    </div>
  );
};
