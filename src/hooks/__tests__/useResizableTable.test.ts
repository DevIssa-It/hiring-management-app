import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useResizableTable } from '../useResizableTable';

const mockColumns = [
  { id: 'name', label: 'Name', width: 150, order: 0, visible: true },
  { id: 'email', label: 'Email', width: 200, order: 1, visible: true },
  { id: 'phone', label: 'Phone', width: 130, order: 2, visible: false }
];

describe('useResizableTable', () => {
  it('initializes with provided columns', () => {
    const { result } = renderHook(() => 
      useResizableTable({ initialColumns: mockColumns })
    );

    expect(result.current.columns).toHaveLength(2);
    expect(result.current.allColumns).toHaveLength(3);
  });

  it('toggles column visibility', () => {
    const { result } = renderHook(() => 
      useResizableTable({ initialColumns: mockColumns })
    );

    act(() => {
      result.current.toggleColumnVisibility('phone');
    });

    expect(result.current.columns).toHaveLength(3);
  });

  it('handles drag operations', () => {
    const { result } = renderHook(() => 
      useResizableTable({ initialColumns: mockColumns })
    );

    act(() => {
      result.current.handleDragStart('name');
    });

    expect(result.current.isDragging).toBe(true);

    act(() => {
      result.current.handleDragEnd();
    });

    expect(result.current.isDragging).toBe(false);
  });
});