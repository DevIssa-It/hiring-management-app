// Validation utilities

import type { JobFormConfiguration, ApplicationData } from '@/types';
import { FieldRequirement } from '@/types';

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
export const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
export const urlRegex = /^https?:\/\/.+/;

export const validateEmail = (email: string): boolean => {
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return phoneRegex.test(phone);
};

export const validateLinkedIn = (url: string): boolean => {
  return linkedinRegex.test(url);
};

export const validateURL = (url: string): boolean => {
  return urlRegex.test(url);
};

export const isValidEmailDomain = (email: string, allowedDomains: string[]): boolean => {
  if (!validateEmail(email)) return false;
  const domain = email.split('@')[1];
  return allowedDomains.includes(domain);
};

export const validatePasswordStrength = (password: string): { isStrong: boolean; message: string } => {
  if (password.length < 8) return { isStrong: false, message: 'Password must be at least 8 characters' };
  if (!/[A-Z]/.test(password)) return { isStrong: false, message: 'Password must contain uppercase letter' };
  if (!/[a-z]/.test(password)) return { isStrong: false, message: 'Password must contain lowercase letter' };
  if (!/[0-9]/.test(password)) return { isStrong: false, message: 'Password must contain number' };
  return { isStrong: true, message: 'Strong password' };
};

export const validateApplicationData = (
  data: ApplicationData,
  formConfig: JobFormConfiguration
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  // Validate each field based on configuration
  Object.entries(formConfig).forEach(([field, requirement]) => {
    if (requirement === FieldRequirement.OFF) return;

    const value = data[field as keyof ApplicationData];

    // Check mandatory fields
    if (requirement === FieldRequirement.MANDATORY && !value) {
      errors[field] = `${field} is required`;
      return;
    }

    // Skip validation if optional and empty
    if (requirement === FieldRequirement.OPTIONAL && !value) return;

    // Field-specific validation
    if (value) {
      switch (field) {
        case 'email':
          if (!validateEmail(value as string)) {
            errors[field] = 'Invalid email format';
          }
          break;
        case 'phone':
          if (!validatePhone(value as string)) {
            errors[field] = 'Invalid phone number format';
          }
          break;
        case 'linkedin':
          if (!validateLinkedIn(value as string)) {
            errors[field] = 'Invalid LinkedIn URL';
          }
          break;
        case 'portfolio':
          if (!validateURL(value as string)) {
            errors[field] = 'Invalid URL';
          }
          break;
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
