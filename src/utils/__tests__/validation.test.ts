import { describe, it, expect } from 'vitest'
import {
  validateEmail,
  validatePhone,
  validateLinkedIn,
  validateURL,
  validateApplicationData,
  emailRegex,
  phoneRegex,
  linkedinRegex,
  urlRegex
} from '../validation'
import { FieldRequirement } from '@/types'

describe('Validation Utils', () => {
  describe('Email Validation', () => {
    it('should validate correct email formats', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@domain.co.id')).toBe(true)
      expect(validateEmail('test+tag@gmail.com')).toBe(true)
    })

    it('should reject invalid email formats', () => {
      expect(validateEmail('invalid-email')).toBe(false)
      expect(validateEmail('test@')).toBe(false)
      expect(validateEmail('@domain.com')).toBe(false)
      expect(validateEmail('test.domain.com')).toBe(false)
    })
  })

  describe('Phone Validation', () => {
    it('should validate Indonesian phone numbers', () => {
      expect(validatePhone('+6281234567890')).toBe(true)
      expect(validatePhone('6281234567890')).toBe(true)
      expect(validatePhone('081234567890')).toBe(true)
    })

    it('should reject invalid phone formats', () => {
      expect(validatePhone('123456')).toBe(false)
      expect(validatePhone('+1234567890')).toBe(false)
      expect(validatePhone('abc123456789')).toBe(false)
    })
  })

  describe('LinkedIn Validation', () => {
    it('should validate LinkedIn URLs', () => {
      expect(validateLinkedIn('https://linkedin.com/in/johndoe')).toBe(true)
      expect(validateLinkedIn('https://www.linkedin.com/in/jane-doe')).toBe(true)
      expect(validateLinkedIn('http://linkedin.com/in/user123')).toBe(true)
    })

    it('should reject invalid LinkedIn URLs', () => {
      expect(validateLinkedIn('https://facebook.com/johndoe')).toBe(false)
      expect(validateLinkedIn('linkedin.com/in/johndoe')).toBe(false)
      expect(validateLinkedIn('https://linkedin.com/johndoe')).toBe(false)
    })
  })

  describe('URL Validation', () => {
    it('should validate URLs', () => {
      expect(validateURL('https://example.com')).toBe(true)
      expect(validateURL('http://test.org')).toBe(true)
      expect(validateURL('https://portfolio.dev/projects')).toBe(true)
    })

    it('should reject invalid URLs', () => {
      expect(validateURL('example.com')).toBe(false)
      expect(validateURL('ftp://example.com')).toBe(false)
      expect(validateURL('not-a-url')).toBe(false)
    })
  })

  describe('Application Data Validation', () => {
    const mockFormConfig = {
      fullName: FieldRequirement.MANDATORY,
      email: FieldRequirement.MANDATORY,
      phone: FieldRequirement.OPTIONAL,
      linkedin: FieldRequirement.OPTIONAL,
      portfolio: FieldRequirement.OFF
    }

    it('should pass validation with valid mandatory fields', () => {
      const validData = {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '+6281234567890',
        linkedin: 'https://linkedin.com/in/johndoe'
      }

      const result = validateApplicationData(validData, mockFormConfig)
      expect(result.isValid).toBe(true)
      expect(Object.keys(result.errors)).toHaveLength(0)
    })

    it('should fail validation with missing mandatory fields', () => {
      const invalidData = {
        fullName: '',
        email: 'john@example.com'
      }

      const result = validateApplicationData(invalidData, mockFormConfig)
      expect(result.isValid).toBe(false)
      expect(result.errors.fullName).toBe('fullName is required')
    })

    it('should fail validation with invalid email format', () => {
      const invalidData = {
        fullName: 'John Doe',
        email: 'invalid-email'
      }

      const result = validateApplicationData(invalidData, mockFormConfig)
      expect(result.isValid).toBe(false)
      expect(result.errors.email).toBe('Invalid email format')
    })

    it('should pass validation with empty optional fields', () => {
      const validData = {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '',
        linkedin: ''
      }

      const result = validateApplicationData(validData, mockFormConfig)
      expect(result.isValid).toBe(true)
    })
  })
})