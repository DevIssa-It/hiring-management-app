import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  generateId,
  sleep,
  debounce,
  throttle,
  groupBy,
  sortBy,
  downloadFile,
  copyToClipboard,
  isImageFile,
  isPDFFile,
  getFileExtension,
  formatFileSize
} from '../helpers'

describe('Helper Utils', () => {
  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()
      expect(id1).not.toBe(id2)
      expect(id1).toMatch(/^\d+-[a-z0-9]+$/)
    })
  })

  describe('sleep', () => {
    it('should resolve after specified time', async () => {
      vi.useFakeTimers()
      const promise = sleep(1000)
      vi.advanceTimersByTime(1000)
      await expect(promise).resolves.toBeUndefined()
      vi.useRealTimers()
    })
  })

  describe('debounce', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should delay function execution', () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 1000)

      debouncedFn('test')
      expect(mockFn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(1000)
      expect(mockFn).toHaveBeenCalledWith('test')
    })

    it('should cancel previous calls', () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 1000)

      debouncedFn('first')
      vi.advanceTimersByTime(500)
      debouncedFn('second')
      vi.advanceTimersByTime(1000)

      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith('second')
    })
  })

  describe('throttle', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should limit function calls', () => {
      const mockFn = vi.fn()
      const throttledFn = throttle(mockFn, 1000)

      throttledFn('first')
      throttledFn('second')
      throttledFn('third')

      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith('first')
    })

    it('should allow calls after throttle period', () => {
      const mockFn = vi.fn()
      const throttledFn = throttle(mockFn, 1000)

      throttledFn('first')
      vi.advanceTimersByTime(1000)
      throttledFn('second')

      expect(mockFn).toHaveBeenCalledTimes(2)
    })
  })

  describe('groupBy', () => {
    it('should group array by key', () => {
      const data = [
        { name: 'John', role: 'admin' },
        { name: 'Jane', role: 'user' },
        { name: 'Bob', role: 'admin' }
      ]

      const grouped = groupBy(data, 'role')
      expect(grouped.admin).toHaveLength(2)
      expect(grouped.user).toHaveLength(1)
    })

    it('should handle empty array', () => {
      const grouped = groupBy([], 'key')
      expect(grouped).toEqual({})
    })
  })

  describe('sortBy', () => {
    const data = [
      { name: 'Charlie', age: 30 },
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 35 }
    ]

    it('should sort ascending by default', () => {
      const sorted = sortBy(data, 'name')
      expect(sorted[0].name).toBe('Alice')
      expect(sorted[2].name).toBe('Charlie')
    })

    it('should sort descending when specified', () => {
      const sorted = sortBy(data, 'age', 'desc')
      expect(sorted[0].age).toBe(35)
      expect(sorted[2].age).toBe(25)
    })

    it('should not mutate original array', () => {
      const original = [...data]
      sortBy(data, 'name')
      expect(data).toEqual(original)
    })
  })

  describe('downloadFile', () => {
    beforeEach(() => {
      // Mock DOM methods
      global.URL.createObjectURL = vi.fn(() => 'mock-url')
      global.URL.revokeObjectURL = vi.fn()
      
      const mockLink = {
        href: '',
        download: '',
        click: vi.fn(),
      }
      
      vi.spyOn(document, 'createElement').mockReturnValue(mockLink as any)
      vi.spyOn(document.body, 'appendChild').mockImplementation(() => mockLink as any)
      vi.spyOn(document.body, 'removeChild').mockImplementation(() => mockLink as any)
    })

    it('should create download link', () => {
      downloadFile('test data', 'test.txt')
      
      expect(document.createElement).toHaveBeenCalledWith('a')
      expect(document.body.appendChild).toHaveBeenCalled()
      expect(document.body.removeChild).toHaveBeenCalled()
    })
  })

  describe('copyToClipboard', () => {
    it('should copy text to clipboard', async () => {
      const mockWriteText = vi.fn().mockResolvedValue(undefined)
      Object.assign(navigator, {
        clipboard: { writeText: mockWriteText }
      })

      const result = await copyToClipboard('test text')
      expect(result).toBe(true)
      expect(mockWriteText).toHaveBeenCalledWith('test text')
    })

    it('should handle clipboard errors', async () => {
      const mockWriteText = vi.fn().mockRejectedValue(new Error('Failed'))
      Object.assign(navigator, {
        clipboard: { writeText: mockWriteText }
      })

      const result = await copyToClipboard('test text')
      expect(result).toBe(false)
    })
  })

  describe('File utilities', () => {
    it('should identify image files', () => {
      const imageFile = new File([''], 'test.jpg', { type: 'image/jpeg' })
      const textFile = new File([''], 'test.txt', { type: 'text/plain' })

      expect(isImageFile(imageFile)).toBe(true)
      expect(isImageFile(textFile)).toBe(false)
    })

    it('should identify PDF files', () => {
      const pdfFile = new File([''], 'test.pdf', { type: 'application/pdf' })
      const textFile = new File([''], 'test.txt', { type: 'text/plain' })

      expect(isPDFFile(pdfFile)).toBe(true)
      expect(isPDFFile(textFile)).toBe(false)
    })

    it('should extract file extensions', () => {
      expect(getFileExtension('test.txt')).toBe('txt')
      expect(getFileExtension('document.pdf')).toBe('pdf')
      expect(getFileExtension('image.jpeg')).toBe('jpeg')
      expect(getFileExtension('noextension')).toBe('')
    })

    it('should format file sizes', () => {
      expect(formatFileSize(0)).toBe('0 Bytes')
      expect(formatFileSize(1024)).toBe('1 KB')
      expect(formatFileSize(1048576)).toBe('1 MB')
      expect(formatFileSize(1073741824)).toBe('1 GB')
    })
  })
})