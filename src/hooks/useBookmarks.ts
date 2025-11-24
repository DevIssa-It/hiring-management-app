import { useState, useEffect } from 'react';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('bookmarkedJobs');
    if (stored) {
      setBookmarks(JSON.parse(stored));
    }
  }, []);

  const toggleBookmark = (jobId: string) => {
    setBookmarks(prev => {
      const newBookmarks = prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId];
      localStorage.setItem('bookmarkedJobs', JSON.stringify(newBookmarks));
      return newBookmarks;
    });
  };

  const isBookmarked = (jobId: string) => bookmarks.includes(jobId);

  return { bookmarks, toggleBookmark, isBookmarked };
};
