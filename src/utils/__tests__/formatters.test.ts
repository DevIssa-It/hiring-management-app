import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  formatCurrency,
  formatDate,
  formatDateTime,
  formatRelativeTime,
  formatPhoneNumber,
  truncateText,
  capitalizeFirst,
  formatFieldName
} from '../formatters'

describe('Formatter Utils', () => {
  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(1000000)).toContain('1.000.000')
      expect(formatCurrency(500000)).toContain('500.000')
      expect(formatCurrency(0)).toContain('0')
    })

    it('should handle negative amounts', () => {
      expect(formatCurrency(-1000000)).toContain('-Rp')
      expect(formatCurrency(-1000000)).toContain('1.000.000')
    })
  })

  describe('formatDate', () => {
    it('should format date from Date object', () => {
      const date = new Date('2024-01-15')
      const formatted = formatDate(date)
      expect(formatted).toContain('2024')
      expect(formatted).toContain('Januari')
    })

    it('should format date from string', () => {
      const formatted = formatDate('2024-01-15')
      expect(formatted).toContain('2024')
    })
  })

  describe('formatDateTime', () => {
    it('should format date and time', () => {
      const date = new Date('2024-01-15T10:30:00')
      const formatted = formatDateTime(date)
      expect(formatted).toContain('2024')
      expect(formatted).toContain('10.30')
    })
  })

  describe('formatRelativeTime', () => {
    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2024-01-15T12:00:00'))
    })

    it('should return "just now" for recent times', () => {
      const recent = new Date('2024-01-15T11:59:30')
      expect(formatRelativeTime(recent)).toBe('just now')
    })

    it('should return minutes ago', () => {
      const fiveMinutesAgo = new Date('2024-01-15T11:55:00')
      expect(formatRelativeTime(fiveMinutesAgo)).toBe('5 minutes ago')
    })

    it('should return hours ago', () => {
      const twoHoursAgo = new Date('2024-01-15T10:00:00')
      expect(formatRelativeTime(twoHoursAgo)).toBe('2 hours ago')
    })

    it('should return days ago', () => {
      const threeDaysAgo = new Date('2024-01-12T12:00:00')
      expect(formatRelativeTime(threeDaysAgo)).toBe('3 days ago')
    })
  })

  describe('formatPhoneNumber', () => {
    it('should format Indonesian phone numbers starting with 62', () => {
      expect(formatPhoneNumber('6281234567890')).toBe('+62 812-345-67890')
    })

    it('should format phone numbers starting with 0', () => {
      expect(formatPhoneNumber('081234567890')).toBe('0812-3456-7890')
    })

    it('should return original if format not recognized', () => {
      expect(formatPhoneNumber('+1234567890')).toBe('+1234567890')
    })

    it('should handle phone numbers with existing formatting', () => {
      expect(formatPhoneNumber('+62-812-345-678')).toBe('+62 812-345-678')
    })
  })

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const longText = 'This is a very long text that should be truncated'
      expect(truncateText(longText, 20)).toBe('This is a very long ...')
    })

    it('should return original text if shorter than max length', () => {
      const shortText = 'Short text'
      expect(truncateText(shortText, 20)).toBe('Short text')
    })

    it('should handle exact length', () => {
      const text = 'Exactly twenty chars'
      expect(truncateText(text, 20)).toBe('Exactly twenty chars')
    })
  })

  describe('capitalizeFirst', () => {
    it('should capitalize first letter', () => {
      expect(capitalizeFirst('hello')).toBe('Hello')
      expect(capitalizeFirst('world')).toBe('World')
    })

    it('should handle single character', () => {
      expect(capitalizeFirst('a')).toBe('A')
    })

    it('should handle empty string', () => {
      expect(capitalizeFirst('')).toBe('')
    })

    it('should not change already capitalized text', () => {
      expect(capitalizeFirst('Hello')).toBe('Hello')
    })
  })

  describe('formatFieldName', () => {
    it('should convert camelCase to Title Case', () => {
      expect(formatFieldName('fullName')).toBe('Full Name')
      expect(formatFieldName('phoneNumber')).toBe('Phone Number')
      expect(formatFieldName('linkedinProfile')).toBe('Linkedin Profile')
    })

    it('should handle single word', () => {
      expect(formatFieldName('email')).toBe('Email')
    })

    it('should handle multiple capital letters', () => {
      expect(formatFieldName('HTMLContent')).toBe('H T M L Content')
    })

    it('should handle already formatted text', () => {
      expect(formatFieldName('Full Name')).toBe('Full  Name')
    })
  })
})