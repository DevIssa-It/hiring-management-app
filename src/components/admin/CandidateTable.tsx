import React from 'react';
import type { Application, JobFormConfiguration } from '@/types';
import { calculateMatchRate } from '@/utils/matchRate';
import { useResizableTable, type TableColumn } from '@/hooks/useResizableTable';

export interface CandidateTableProps {
  jobId: string;
  applications: Application[];
  formConfiguration: JobFormConfiguration;
  onApplicationClick: (id: string) => void;
}

const createInitialColumns = (config: JobFormConfiguration): TableColumn[] => {
  const baseColumns = [
    { id: 'select', label: '', width: 50, order: 0, visible: true },
    { id: 'fullName', label: 'Nama Lengkap', width: 150, order: 1, visible: config.fullName !== 'off' },
    { id: 'matchRate', label: 'Match Rate', width: 100, order: 2, visible: true },
    { id: 'email', label: 'Alamat Email', width: 200, order: 3, visible: config.email !== 'off' },
    { id: 'phone', label: 'Nomor HP', width: 130, order: 4, visible: config.phone !== 'off' },
    { id: 'dateOfBirth', label: 'Usia', width: 80, order: 5, visible: config.dateOfBirth !== 'off' },
    { id: 'domicile', label: 'Domisili', width: 120, order: 6, visible: config.domicile !== 'off' },
    { id: 'gender', label: 'Jenis Kelamin', width: 120, order: 7, visible: config.gender !== 'off' },
    { id: 'linkedin', label: 'LinkedIn', width: 150, order: 8, visible: config.linkedin !== 'off' },
    { id: 'appliedDate', label: 'Tanggal Apply', width: 120, order: 9, visible: true },
    { id: 'status', label: 'Status', width: 100, order: 10, visible: true }
  ];
  
  return baseColumns;
};

type StatusType = 'submitted' | 'accepted' | 'rejected' | 'reviewed';

const statusMap: Record<StatusType, { label: string; color: string }> = {
  submitted: { label: 'Applied', color: 'bg-primary-surface border-primary-border text-primary-main border'},
  accepted: { label: 'Accepted', color: 'bg-success-surface border-success-border text-success-main border'},
  rejected: { label: 'Rejected', color: 'bg-danger-surface border-danger-border text-danger-main border'},
  reviewed: { label: 'Reviewed', color: 'bg-neutral-20 border-neutral-40 text-neutral-70 border'},
};

function renderStatus(status: string) {
  const statusInfo =
    (statusMap as Record<string, { label: string; color: string }>)[status] ||
    { label: status, color: 'border-neutral-30 text-neutral-90' };
  return (
    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${statusInfo.color}`}>
      {statusInfo.label}
    </span>
  )
}

const ResizeHandle: React.FC<{ onMouseDown: (e: React.MouseEvent) => void }> = ({ onMouseDown }) => (
  <div
    className="absolute right-0 top-0 w-1 h-full cursor-col-resize bg-transparent hover:bg-primary-main transition-colors"
    onMouseDown={onMouseDown}
  />
);
export const CandidateTable: React.FC<CandidateTableProps> = ({
  applications,
  formConfiguration,
  onApplicationClick,
}) => {
  const initialColumns = createInitialColumns(formConfiguration);
  const {
    columns,
    handleResizeStart,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useResizableTable({ initialColumns });

  const renderCellContent = (columnId: string, app: Application) => {
    if (!app || !app.applicantData) return '-';
    
    switch (columnId) {
      case 'select':
        return <input type="checkbox" aria-label="Pilih kandidat" />;
      case 'matchRate':
        const matchRate = app.applicantData ? calculateMatchRate(app.applicantData, formConfiguration) : 0;
        return (
          <span className="flex items-center gap-1">
            <span className="text-xs font-bold text-warning-main">
              {matchRate}%
            </span>
            <span className="text-warning-main">★</span>
          </span>
        );
      case 'dateOfBirth':
        return app.applicantData?.dateOfBirth
          ? (new Date().getFullYear() - new Date(app.applicantData.dateOfBirth).getFullYear()).toString()
          : '-';
      case 'appliedDate':
        return app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : '-';
      case 'status':
        return renderStatus(app.status || 'submitted');
      default:
        try {
          const value = app.applicantData?.[columnId as keyof typeof app.applicantData];
          return value !== undefined && value !== null && value !== '' ? String(value) : '-';
        } catch (error) {
          console.error('Error accessing field:', columnId, error);
          return '-';
        }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-neutral-30 rounded-lg">
        <thead>
          <tr className="bg-neutral-20">
            {columns.map((col) => (
              <th
                key={col.id}
                className="relative px-3 py-2 border-b text-xs font-bold text-neutral-100 whitespace-nowrap select-none"
                style={{ width: col.width }}
                draggable
                onDragStart={() => handleDragStart(col.id)}
                onDragOver={(e) => handleDragOver(e, col.id)}
                onDragEnd={handleDragEnd}
              >
                <span className="cursor-move">{col.label}</span>
                <ResizeHandle
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleResizeStart(col.id, e.clientX);
                  }}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {applications?.map((app) => (
            <tr 
              key={app?.id || Math.random()}
              className="hover:bg-neutral-30 cursor-pointer"
              onClick={() => app?.id && onApplicationClick?.(app.id)}
            >
              {columns.map((col) => (
                <td 
                  key={col.id} 
                  className="px-3 py-2 border-b text-xs text-neutral-90 whitespace-nowrap"
                  style={{ width: col.width }}
                >
                  {renderCellContent(col.id, app)}
                </td>
              ))}
            </tr>
          )) || []}
        </tbody>
      </table>
    </div>
  );
};


