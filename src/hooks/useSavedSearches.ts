import { useState, useEffect } from 'react';

export interface SavedSearch {
  id: string;
  name: string;
  filters: Record<string, any>;
  createdAt: Date;
}

export const useSavedSearches = (userId: string) => {
  const [searches, setSearches] = useState<SavedSearch[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(`saved_searches_${userId}`);
    if (stored) {
      setSearches(JSON.parse(stored));
    }
  }, [userId]);

  const saveSearch = (name: string, filters: Record<string, any>) => {
    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      name,
      filters,
      createdAt: new Date(),
    };
    const updated = [...searches, newSearch];
    setSearches(updated);
    localStorage.setItem(`saved_searches_${userId}`, JSON.stringify(updated));
  };

  const deleteSearch = (id: string) => {
    const updated = searches.filter(s => s.id !== id);
    setSearches(updated);
    localStorage.setItem(`saved_searches_${userId}`, JSON.stringify(updated));
  };

  return { searches, saveSearch, deleteSearch };
};
