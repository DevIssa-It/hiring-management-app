import { useState } from 'react';

export const useBulkSelection = <T extends { id: string }>(items: T[]) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelected(prev =>
      prev.length === items.length ? [] : items.map(i => i.id)
    );
  };

  const clearSelection = () => setSelected([]);

  return {
    selected,
    toggleSelect,
    toggleAll,
    clearSelection,
    isSelected: (id: string) => selected.includes(id),
    isAllSelected: selected.length === items.length && items.length > 0,
  };
};
