import type { TableColumn } from '@/types';

export interface TableProps<T> {
  columns: TableColumn[];
  data: T[];
  onSort?: (columnId: string) => void;
  onRowClick?: (row: T) => void;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  emptyMessage?: string;
  className?: string;
}

export function Table<T extends { id?: string | number }>({ 
  columns, 
  data, 
  onSort, 
  onRowClick,
  sortBy,
  sortOrder,
  emptyMessage = 'No data available',
  className = '',
}: TableProps<T>) {
  const renderCell = (row: T, column: TableColumn) => {
    if (column.render) {
      return column.render(row);
    }
    return (row as any)[column.id];
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border border-neutral-30 rounded-lg">
        <thead className="bg-neutral-20 border-b border-neutral-40">
          <tr>
            {columns.map((col) => (
              <th
                key={col.id}
                onClick={() => col.sortable && onSort?.(col.id)}
                className={`
                  px-3 py-2 text-left text-xs font-bold text-neutral-100 whitespace-nowrap
                  ${col.sortable ? 'cursor-pointer hover:bg-neutral-30' : ''}
                `}
              >
                <div className="flex items-center gap-2">
                  {col.label}
                  {col.sortable && sortBy === col.id && (
                    <span className="text-primary-main">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-neutral-30">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-3 py-12 text-center text-neutral-60"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={row.id || idx}
                onClick={() => onRowClick?.(row)}
                className={`
                  transition-colors
                  ${onRowClick ? 'hover:bg-neutral-30 cursor-pointer' : ''}
                `}
              >
                {columns.map((col) => (
                  <td
                    key={col.id}
                    className="px-3 py-2 whitespace-nowrap text-xs text-neutral-90"
                  >
                    {renderCell(row, col)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
