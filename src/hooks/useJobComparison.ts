import { useState } from 'react';
import { Job } from '../types';

export const useJobComparison = () => {
  const [compareList, setCompareList] = useState<string[]>([]);

  const addToCompare = (jobId: string) => {
    if (compareList.length < 3 && !compareList.includes(jobId)) {
      setCompareList([...compareList, jobId]);
    }
  };

  const removeFromCompare = (jobId: string) => {
    setCompareList(compareList.filter(id => id !== jobId));
  };

  const clearCompare = () => setCompareList([]);

  return {
    compareList,
    addToCompare,
    removeFromCompare,
    clearCompare,
    canAdd: compareList.length < 3,
    isInCompare: (jobId: string) => compareList.includes(jobId),
  };
};
