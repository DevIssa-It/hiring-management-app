import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useBookmarks = (userId: string) => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookmarks();
  }, [userId]);

  const loadBookmarks = async () => {
    try {
      const stored = localStorage.getItem(`bookmarks_${userId}`);
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = async (jobId: string) => {
    const newBookmarks = bookmarks.includes(jobId)
      ? bookmarks.filter(id => id !== jobId)
      : [...bookmarks, jobId];

    setBookmarks(newBookmarks);
    localStorage.setItem(`bookmarks_${userId}`, JSON.stringify(newBookmarks));
  };

  const isBookmarked = (jobId: string) => bookmarks.includes(jobId);

  return { bookmarks, loading, toggleBookmark, isBookmarked };
};
