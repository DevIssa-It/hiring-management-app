import { useState, useCallback, useRef } from 'react';

export interface TableColumn {
  id: string;
  label: string;
  width: number;
  order: number;
  visible: boolean;
}

export interface UseResizableTableProps {
  initialColumns: TableColumn[];
}

export const useResizableTable = ({ initialColumns }: UseResizableTableProps) => {
  const [columns, setColumns] = useState<TableColumn[]>(initialColumns);
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const resizingColumn = useRef<string | null>(null);
  const draggedColumn = useRef<string | null>(null);
  const startX = useRef<number>(0);
  const startWidth = useRef<number>(0);

  const handleResizeStart = useCallback((columnId: string, clientX: number) => {
    const column = columns.find(col => col.id === columnId);
    if (!column) return;

    setIsResizing(true);
    resizingColumn.current = columnId;
    startX.current = clientX;
    startWidth.current = column.width;

    const handleMouseMove = (e: MouseEvent) => {
      if (!resizingColumn.current) return;
      
      const diff = e.clientX - startX.current;
      const newWidth = Math.max(80, startWidth.current + diff);
      
      setColumns(prev => prev.map(col => 
        col.id === resizingColumn.current 
          ? { ...col, width: newWidth }
          : col
      ));
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      resizingColumn.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [columns]);

  const handleDragStart = useCallback((columnId: string) => {
    setIsDragging(true);
    draggedColumn.current = columnId;
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    if (!draggedColumn.current || draggedColumn.current === targetColumnId) return;

    const draggedCol = columns.find(col => col.id === draggedColumn.current);
    const targetCol = columns.find(col => col.id === targetColumnId);
    
    if (!draggedCol || !targetCol) return;

    setColumns(prev => {
      const newColumns = [...prev];
      const draggedIndex = newColumns.findIndex(col => col.id === draggedColumn.current);
      const targetIndex = newColumns.findIndex(col => col.id === targetColumnId);
      
      // Swap orders
      const draggedOrder = newColumns[draggedIndex].order;
      newColumns[draggedIndex].order = newColumns[targetIndex].order;
      newColumns[targetIndex].order = draggedOrder;
      
      // Sort by order
      return newColumns.sort((a, b) => a.order - b.order);
    });
  }, [columns]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    draggedColumn.current = null;
  }, []);

  const toggleColumnVisibility = useCallback((columnId: string) => {
    setColumns(prev => prev.map(col => 
      col.id === columnId 
        ? { ...col, visible: !col.visible }
        : col
    ));
  }, []);

  const resetColumns = useCallback(() => {
    setColumns(initialColumns);
  }, [initialColumns]);

  return {
    columns: columns.filter(col => col.visible).sort((a, b) => a.order - b.order),
    allColumns: columns,
    isResizing,
    isDragging,
    handleResizeStart,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    toggleColumnVisibility,
    resetColumns,
  };
};