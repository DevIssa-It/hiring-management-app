// Select component with Tailwind CSS styling

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
  variant?: 'input' | 'dropdown';
}

import React, { useState, useRef, useEffect } from 'react';

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
  variant = 'dropdown',
}) => {
  const [open, setOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputBoxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    function updateDropdownPosition() {
      if (open && inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        const dropdownHeight = 220;
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
          setDropdownPosition('top');
        } else {
          setDropdownPosition('bottom');
        }
      }
    }
    if (open) {
      updateDropdownPosition();
      window.addEventListener('scroll', updateDropdownPosition, true);
      window.addEventListener('resize', updateDropdownPosition);
    }
    return () => {
      window.removeEventListener('scroll', updateDropdownPosition, true);
      window.removeEventListener('resize', updateDropdownPosition);
    };
  }, [open]);

  const selectedLabel = options.find(opt => opt.value === value)?.label || '';
  // Filter options by inputValue
  const filteredOptions = inputValue
    ? options.filter(opt => opt.label.toLowerCase().includes(inputValue.toLowerCase()))
    : options;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-neutral-90 mb-2">
          {label}
          {required && <span className="text-danger-main ml-1">*</span>}
        </label>
      )}
      <div ref={inputRef} className="relative">
        {variant === 'input' ? (
          <div
            className={`w-full px-3 py-2 border-2 rounded-lg text-neutral-90 bg-white flex items-center ${error ? 'border-2 border-danger-main' : open ? 'border-2 border-primary-main ring-2 ring-primary-focus' : 'border-2 border-neutral-40'} ${disabled ? 'bg-neutral-30 text-neutral-60 cursor-not-allowed' : 'cursor-pointer'}`}
            tabIndex={0}
            aria-disabled={disabled}
            onClick={() => {
              if (!disabled) {
                setOpen(true);
                setInputValue(selectedLabel || '');
                setTimeout(() => {
                  inputBoxRef.current?.focus();
                }, 100);
              }
            }}
          >
            <input
              ref={inputBoxRef}
              type="text"
              value={open ? inputValue : selectedLabel}
              onChange={e => {
                setInputValue(e.target.value);
                onChange(e);
              }}
              placeholder={placeholder || 'Select'}
              disabled={disabled}
              className={`flex-1 bg-transparent outline-none border-none text-neutral-90 ${!selectedLabel && !inputValue ? 'text-neutral-40' : ''}`}
              onFocus={() => !disabled && setOpen(true)}
              onBlur={() => setTimeout(() => setOpen(false), 200)}
              autoComplete="off"
            />
            <svg className="ml-2 w-4 h-4 text-neutral-60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        ) : (
          <div
            className={`w-full px-3 py-2 border-2 rounded-lg text-neutral-90 bg-white cursor-pointer flex items-center ${error ? 'border-2 border-danger-main' : open ? 'border-2 border-primary-main ring-2 ring-primary-focus' : 'border-2 border-neutral-40'} ${disabled ? 'bg-neutral-30 text-neutral-60 cursor-not-allowed' : ''}`}
            tabIndex={0}
            aria-disabled={disabled}
            onClick={() => !disabled && setOpen((v) => !v)}
          >
            <span className={selectedLabel ? '' : 'text-neutral-40'}>
              {selectedLabel || placeholder || 'Select'}
            </span>
            <svg className="ml-auto w-4 h-4 text-neutral-60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        )}
        {open && (
          <div
            ref={dropdownRef}
            className={`absolute left-0 z-40 w-full min-w-[220px] max-h-[220px] overflow-y-auto bg-white rounded-lg shadow-lg border-2 ${dropdownPosition === 'top' ? 'mb-2 bottom-full' : 'mt-2 top-full'}`}
          >
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-2 text-neutral-60">No options found</div>
            ) : (
              filteredOptions.map((opt) => (
                <div
                  key={opt.value}
                  className={`px-4 py-2 text-neutral-90 hover:bg-neutral-30 cursor-pointer transition-all ${value === opt.value ? 'bg-neutral-20 font-semibold' : ''}`}
                  onMouseDown={() => {
                    if (!disabled) {
                      setOpen(false);
                      setInputValue(opt.label);
                      const event = {
                        target: { value: opt.value }
                      } as React.ChangeEvent<HTMLSelectElement>;
                      onChange(event);
                    }
                  }}
                >
                  {opt.label}
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-danger-main">{error}</p>
      )}
    </div>
  );
};
