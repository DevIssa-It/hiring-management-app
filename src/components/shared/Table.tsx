// Table component with Tailwind CSS styling

import { TableColumn } from '@/types';

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
      <table className="w-full border-collapse">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map((col) => (
              <th
                key={col.id}
                onClick={() => col.sortable && onSort?.(col.id)}
                className={`
                  px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                  ${col.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}
                `}
              >
                <div className="flex items-center gap-2">
                  {col.label}
                  {col.sortable && sortBy === col.id && (
                    <span className="text-primary-600">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-12 text-center text-gray-500"
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
                  ${onRowClick ? 'hover:bg-gray-50 cursor-pointer' : ''}
                `}
              >
                {columns.map((col) => (
                  <td
                    key={col.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
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
