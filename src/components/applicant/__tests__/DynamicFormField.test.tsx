import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DynamicFormField } from '../DynamicFormField';
import type { FormField } from '@/types';

const mockField: FormField = {
  name: 'fullName',
  label: 'Full Name',
  type: 'text',
  requirement: 'mandatory',
  placeholder: 'Enter your name'
};

describe('DynamicFormField', () => {
  it('does not render when requirement is off', () => {
    const onChange = vi.fn();
    const offField = { ...mockField, requirement: 'off' as const };
    
    const { container } = render(
      <DynamicFormField
        field={offField}
        value=""
        onChange={onChange}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('calls onChange when input value changes', () => {
    const onChange = vi.fn();
    render(
      <DynamicFormField
        field={mockField}
        value=""
        onChange={onChange}
      />
    );

    const input = screen.getByPlaceholderText('Enter your name');
    fireEvent.change(input, { target: { value: 'John Doe' } });

    expect(onChange).toHaveBeenCalledWith('John Doe');
  });
});