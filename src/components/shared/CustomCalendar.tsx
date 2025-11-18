import React, { useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { MdOutlineCalendarMonth } from 'react-icons/md';

interface CustomCalendarProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  required?: boolean;
  error?: string;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  label,
  value,
  onChange,
  required = false,
  error
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Close calendar if click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    }
    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  // Check dropdown position (top/bottom) when showing calendar
  useEffect(() => {
    function updateDropdownPosition() {
      if (showCalendar && inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        const calendarHeight = 340; // px, approx height of calendar
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        if (spaceBelow < calendarHeight && spaceAbove > calendarHeight) {
          setDropdownPosition('top');
        } else {
          setDropdownPosition('bottom');
        }
      }
    }
    if (showCalendar) {
      updateDropdownPosition();
      window.addEventListener('scroll', updateDropdownPosition, true);
      window.addEventListener('resize', updateDropdownPosition);
    }
    return () => {
      window.removeEventListener('scroll', updateDropdownPosition, true);
      window.removeEventListener('resize', updateDropdownPosition);
    };
  }, [showCalendar]);

  // Only single date selection
  const handleDateChange = (date: Date | Date[] | null) => {
    if (Array.isArray(date)) {
      onChange(date[0] || null);
    } else {
      onChange(date);
    }
    setShowCalendar(false);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-100 mb-2">
          {label}
          {required && <span className="text-danger-main ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-60 pointer-events-none z-10">
          <MdOutlineCalendarMonth className="w-5 h-5" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={value ? value.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : ''}
          readOnly
          onClick={() => setShowCalendar((v) => !v)}
          placeholder="Select date"
          className={`
            w-full pl-10 pr-3 py-2 border-2 rounded-lg text-neutral-100 placeholder:text-neutral-70 bg-white cursor-pointer transition-colors duration-200
            focus:outline-none
            ${error 
              ? 'border-2 border-danger-main' 
              : 'border-2 border-neutral-40 focus:border-primary-main focus:ring-2 focus:ring-primary-focus'}
          `}
        />
        {showCalendar && (
          <div
            ref={calendarRef}
            className={`absolute left-0 z-40 w-max min-w-[320px] ${dropdownPosition === 'top' ? 'mb-2 bottom-full' : 'mt-2 top-full'}`}
          >
            <div className="bg-white rounded-xl shadow-lg p-4 border">
              <style>{`
                .react-calendar__tile {
                  background: white;
                  color: #374151;
                  border: none;
                  border-radius: 6px;
                  margin: 1px;
                  transition: all 0.2s ease;
                }
                .react-calendar__tile:hover {
                  background-color: #9ca3af !important;
                  color: white !important;
                }
                .react-calendar__tile--active {
                  background-color: #01959F !important;
                  color: white !important;
                }
                .react-calendar__tile:disabled {
                  background-color: #f9fafb !important;
                  color: #d1d5db !important;
                  cursor: not-allowed !important;
                }
                .react-calendar__tile:disabled:hover {
                  background-color: #f9fafb !important;
                  color: #d1d5db !important;
                }
              `}</style>
              <Calendar
                value={value || undefined}
                onChange={handleDateChange}
                selectRange={false}
                className="react-calendar"
                calendarType="gregory"
                prevLabel="«"
                nextLabel="»"
                prev2Label="««"
                next2Label="»»"
                showNeighboringMonth={true}
                maxDate={new Date()}
              />
            </div>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-danger-main">{error}</p>
      )}
    </div>
  );
};

export default CustomCalendar;
