// Button component with Tailwind CSS styling

export interface ButtonProps {
  variant?: 'primary' | 'alternative' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  ariaLabel?: string;
  id?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  disabled = false,
  loading = false,
  onClick,
  children,
  type = 'button',
  className = '',
  ariaLabel,
  id,
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-30 disabled:text-neutral-60';
  
  const variantStyles = {
    primary: 'bg-primary-main text-white hover:bg-primary-hover active:bg-primary-pressed focus:ring-2 focus:ring-primary-focus',
    alternative: 'bg-secondary-main text-neutral-100 hover:bg-secondary-hover active:bg-secondary-pressed focus:ring-2 focus:ring-secondary-focus',
    outline: 'bg-white text-primary-main border-2 border-primary-main hover:bg-primary-surface active:bg-primary-border/10 focus:ring-2 focus:ring-primary-focus',
  };

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      aria-label={ariaLabel}
      aria-busy={loading}
      aria-disabled={disabled || loading}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};
