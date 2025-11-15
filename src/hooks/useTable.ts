// useTable Hook
// Table state management (sort, filter, pagination)

import { useState, useMemo } from 'react';
import { TableState } from '@/types';

export const useTable = <T extends Record<string, any>>(
  data: T[],
  initialPageSize: number = 10
) => {
  const [tableState, setTableState] = useState<TableState>({
    columns: [],
    sortBy: undefined,
    sortOrder: 'asc',
    currentPage: 1,
    pageSize: initialPageSize,
    filters: {},
  });

  // Sort data
  const sortedData = useMemo(() => {
    if (!tableState.sortBy) return data;

    return [...data].sort((a, b) => {
      const aValue = a[tableState.sortBy!];
      const bValue = b[tableState.sortBy!];

      if (aValue === bValue) return 0;
      
      const comparison = aValue > bValue ? 1 : -1;
      return tableState.sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [data, tableState.sortBy, tableState.sortOrder]);

  // Filter data
  const filteredData = useMemo(() => {
    if (Object.keys(tableState.filters).length === 0) return sortedData;

    return sortedData.filter((row) => {
      return Object.entries(tableState.filters).every(([key, value]) => {
        if (!value) return true;
        const rowValue = String(row[key]).toLowerCase();
        return rowValue.includes(value.toLowerCase());
      });
    });
  }, [sortedData, tableState.filters]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (tableState.currentPage - 1) * tableState.pageSize;
    const endIndex = startIndex + tableState.pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, tableState.currentPage, tableState.pageSize]);

  const totalPages = Math.ceil(filteredData.length / tableState.pageSize);

  const sort = (columnId: string) => {
    setTableState((prev) => ({
      ...prev,
      sortBy: columnId,
      sortOrder:
        prev.sortBy === columnId && prev.sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  };

  const filter = (filters: Record<string, string>) => {
    setTableState((prev) => ({
      ...prev,
      filters,
      currentPage: 1, // Reset to first page when filtering
    }));
  };

  const paginate = (page: number) => {
    setTableState((prev) => ({ ...prev, currentPage: page }));
  };

  const setPageSize = (size: number) => {
    setTableState((prev) => ({
      ...prev,
      pageSize: size,
      currentPage: 1, // Reset to first page when changing size
    }));
  };

  return {
    tableState,
    paginatedData,
    totalPages,
    totalItems: filteredData.length,
    sort,
    filter,
    paginate,
    setPageSize,
  };
};
