/**
 * Helper utilities for common operations
 * Provides type-safe utility functions used across the application
 */

/**
 * Generates a unique ID using timestamp and random string
 * @returns A unique string identifier
 * @example
 * const id = generateId(); // "1638360000000-abc123def"
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Sleeps for a specified duration
 * @param ms - Milliseconds to sleep
 * @returns Promise that resolves after the specified duration
 * @example
 * await sleep(1000); // Wait for 1 second
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @returns The debounced function
 * @example
 * const debouncedSearch = debounce((query: string) => search(query), 300);
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Creates a throttled function that only invokes func at most once per every limit milliseconds
 * @param func - The function to throttle
 * @param limit - The number of milliseconds to throttle invocations to
 * @returns The throttled function
 * @example
 * const throttledScroll = throttle((e: Event) => handleScroll(e), 100);
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Groups an array of objects by a specified key
 * @param array - The array to group
 * @param key - The key to group by
 * @returns An object with grouped items
 * @example
 * const users = [{role: 'admin', name: 'John'}, {role: 'user', name: 'Jane'}];
 * groupBy(users, 'role'); // { admin: [...], user: [...] }
 */
export const groupBy = <T extends Record<string, any>>(
  array: T[],
  key: keyof T
): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const group = String(item[key]);
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {} as Record<string, T[]>);
};

/**
 * Sorts an array by a specified key
 * @param array - The array to sort
 * @param key - The key to sort by
 * @param order - Sort order ('asc' or 'desc')
 * @returns A new sorted array
 * @example
 * sortBy([{age: 30}, {age: 20}], 'age', 'asc'); // [{age: 20}, {age: 30}]
 */
export const sortBy = <T extends Record<string, any>>(
  array: T[],
  key: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...array].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (aValue === bValue) return 0;

    const comparison = aValue > bValue ? 1 : -1;
    return order === 'asc' ? comparison : -comparison;
  });
};

/**
 * Downloads a file with the specified content
 * @param data - The file content
 * @param filename - The name of the file to download
 * @param type - MIME type of the file
 * @example
 * downloadFile('Hello World', 'test.txt', 'text/plain');
 */
export const downloadFile = (
  data: string,
  filename: string,
  type: string = 'text/plain'
): void => {
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Copies text to clipboard
 * @param text - The text to copy
 * @returns Promise resolving to true if successful, false otherwise
 * @example
 * const success = await copyToClipboard('Hello World');
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

/**
 * Checks if a file is an image
 * @param file - The file to check
 * @returns True if the file is an image
 * @example
 * isImageFile(file); // true for image/png, image/jpeg, etc.
 */
export const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};

/**
 * Checks if a file is a PDF
 * @param file - The file to check
 * @returns True if the file is a PDF
 */
export const isPDFFile = (file: File): boolean => {
  return file.type === 'application/pdf';
};

/**
 * Extracts file extension from filename
 * @param filename - The filename
 * @returns The file extension without the dot
 * @example
 * getFileExtension('document.pdf'); // 'pdf'
 */
export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

/**
 * Formats bytes to human-readable size
 * @param bytes - Number of bytes
 * @returns Formatted string with size unit
 * @example
 * formatFileSize(1024); // '1 KB'
 * formatFileSize(1048576); // '1 MB'
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'] as const;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${Math.round(bytes / Math.pow(k, i) * 100) / 100} ${sizes[i]}`;
};

/**
 * Gets initials from a name
 * @param name - Full name
 * @returns Initials (up to 2 characters)
 * @example
 * getInitials('John Doe'); // 'JD'
 * getInitials('Alice'); // 'A'
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
};

/**
 * Returns unique items from an array based on a key
 * @param array - The array to filter
 * @param key - The key to check for uniqueness
 * @returns Array with unique items
 * @example
 * uniqueBy([{id: 1}, {id: 1}, {id: 2}], 'id'); // [{id: 1}, {id: 2}]
 */
export const uniqueBy = <T extends Record<string, any>>(
  array: T[],
  key: keyof T
): T[] => {
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
};

/**
 * Clamps a number between min and max values
 * @param value - The number to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns The clamped value
 * @example
 * clamp(15, 0, 10); // 10
 * clamp(-5, 0, 10); // 0
 * clamp(5, 0, 10); // 5
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Generates a random color from a predefined palette
 * @returns A random hex color code
 * @example
 * generateRandomColor(); // '#3B82F6'
 */
export const generateRandomColor = (): string => {
  const colors = [
    '#3B82F6',
    '#10B981',
    '#F59E0B',
    '#EF4444',
    '#8B5CF6',
    '#EC4899'
  ] as const;
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Safely parses JSON with fallback
 * @param json - JSON string to parse
 * @param fallback - Fallback value if parsing fails
 * @returns Parsed object or fallback value
 * @example
 * safeJsonParse('{"name": "John"}', {}); // {name: "John"}
 * safeJsonParse('invalid', {}); // {}
 */
export const safeJsonParse = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
};

/**
 * Checks if a value is empty (null, undefined, empty string, empty array, empty object)
 * @param value - The value to check
 * @returns True if the value is empty
 * @example
 * isEmpty(null); // true
 * isEmpty(''); // true
 * isEmpty([]); // true
 * isEmpty({}); // true
 * isEmpty('hello'); // false
 */
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};
