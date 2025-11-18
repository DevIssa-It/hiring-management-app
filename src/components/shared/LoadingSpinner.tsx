import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text,
  fullScreen = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-4', 
    lg: 'h-12 w-12 border-4'
  };

  const spinner = (
    <div className={`animate-spin rounded-full border-primary-main border-t-transparent ${sizeClasses[size]}`}></div>
  );

  const content = (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      {spinner}
      {text && (
        <div className={`text-neutral-70 ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'}`}>
          {text}
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

// Inline spinner untuk buttons
export const InlineSpinner: React.FC<{ size?: 'sm' | 'md'; color?: 'white' | 'primary' }> = ({ 
  size = 'sm', 
  color = 'white' 
}) => {
  const sizeClass = size === 'sm' ? 'h-4 w-4 border-2' : 'h-5 w-5 border-2';
  const colorClass = color === 'white' ? 'border-white border-t-transparent' : 'border-primary-main border-t-transparent';
  
  return (
    <div className={`animate-spin rounded-full ${sizeClass} ${colorClass}`}></div>
  );
};