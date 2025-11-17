import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import '../../index.css';

interface CustomDatePickerProps {
  label?: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

const CustomInput = React.forwardRef<HTMLInputElement, any>(({ value, onClick, placeholder, error }, ref) => (
  <div className="relative">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-60 pointer-events-none z-10">
      <MdOutlineCalendarMonth className="w-5 h-5" />
    </div>
    <input
      ref={ref}
      value={value}
      onClick={onClick}
      placeholder={placeholder}
      readOnly
      className={`w-full pl-10 pr-3 py-2 border rounded-lg text-neutral-90 bg-white focus:outline-none focus:ring-2 focus:ring-primary-focus focus:border-primary-main cursor-pointer ${
        error ? 'border-danger-main' : 'border-neutral-40'
      }`}
    />
  </div>
));

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  selected,
  onChange,
  placeholder = "Select date",
  required = false,
  error
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-90 mb-2">
          {label}
          {required && <span className="text-danger-main ml-1">*</span>}
        </label>
      )}
      <div
        className="w-full [&_.react-datepicker-wrapper]:w-full [&_.react-datepicker__input-container]:w-full [&_.react-datepicker]:!w-96 [&_.react-datepicker]:!bg-white [&_.react-datepicker__header]:!bg-white [&_.react-datepicker__header]:!border-b-0 [&_.react-datepicker__day-names]:!bg-white [&_.react-datepicker__month]:!bg-white [&_.react-datepicker__week]:!bg-white [&_.react-datepicker__day]:!text-neutral-90 [&_.react-datepicker__day]:!rounded [&_.react-datepicker__day--selected]:!bg-primary-main [&_.react-datepicker__day--selected]:!text-white [&_.react-datepicker__day--today]:!border [&_.react-datepicker__day--today]:!border-primary-main [&_.react-datepicker__day--keyboard-selected]:!bg-primary-main [&_.react-datepicker__day--keyboard-selected]:!text-white [&_.react-datepicker__day--outside-month]:!text-neutral-40 [&_.react-datepicker__month-container]:!h-64"
      >
        <DatePicker
          selected={selected}
          onChange={onChange}
          dateFormat="dd/MM/yyyy"
          customInput={<CustomInput placeholder={placeholder} error={error} />}
          placeholderText={placeholder}
          popperPlacement="bottom-start"
          portalId="root"
          showPopperArrow={false}
          popperContainer={({ children }) => <div className="relative z-50">{children}</div>}
          renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => {
            const currentYear = date.getFullYear();
            return (
              <div className="bg-white px-4 py-2 border-b-0 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <button onClick={() => changeYear(currentYear - 1)} className="px-1 py-1 hover:bg-neutral-30 rounded text-xs">&lt;&lt;</button>
                  <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className="px-1 py-1 hover:bg-neutral-30 rounded text-xs">&lt;</button>
                  <span className="font-medium text-sm">
                    {date.toLocaleString('default', { month: 'short' })} {currentYear}
                  </span>
                  <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} className="px-1 py-1 hover:bg-neutral-30 rounded text-xs">&gt;</button>
                  <button onClick={() => changeYear(currentYear + 1)} className="px-1 py-1 hover:bg-neutral-30 rounded text-xs">&gt;&gt;</button>
                </div>
              </div>
            );
          }}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-danger-main">{error}</p>
      )}
    </div>
  );
};

export default CustomDatePicker;