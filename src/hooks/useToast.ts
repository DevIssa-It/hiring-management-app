import { useState, useCallback, useEffect, useRef } from 'react';
import { TOAST_DURATION } from '@/utils/constants';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

/**
 * Custom hook for managing toast notifications
 * Provides automatic cleanup and prevents memory leaks
 * @returns Toast management functions and state
 * @example
 * const { toasts, showToast, removeToast } = useToast();
 * showToast('Success!', 'success');
 */
export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Cleanup all timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current.clear();
    };
  }, []);

  const removeToast = useCallback((id: string) => {
    // Clear timeout if exists
    const timeout = timeoutsRef.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timeoutsRef.current.delete(id);
    }
    
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const toast: Toast = { id, message, type };
    
    setToasts(prev => [...prev, toast]);
    
    // Store timeout reference for cleanup
    const timeout = setTimeout(() => {
      removeToast(id);
    }, TOAST_DURATION);
    
    timeoutsRef.current.set(id, timeout);
  }, [removeToast]);

  return { 
    toasts, 
    showToast, 
    removeToast 
  };
};
