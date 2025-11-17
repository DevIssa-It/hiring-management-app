import type { Application, JobFormConfiguration } from '@/types';
import { calculateMatchRate } from '@/utils/matchRate';

export interface CandidateTableProps {
  jobId: string;
  applications: Application[];
  formConfiguration: JobFormConfiguration;
  onApplicationClick: (id: string) => void;
}

const COLUMN_CONFIG = [
  {key: 'fullName', label: 'Nama Lengkap'},
  {key: 'matchRate', label: 'Match Rate'},
  {key: 'gender', label: 'Jenis Kelamin'},
  {key: 'domicile', label: 'Domisili'},
  {key: 'email', label: 'Alamat Email'},
  {key: 'phone', label: 'Nomor HP'},
  {key: 'linkedin', label: 'LinkedIn'},
  {key: 'dateOfBirth', label: 'Usia'},
  {key: 'portfolio', label: 'Portofolio'},
  {key: 'expectedSalary', label: 'Salary'},
  {key: 'availability', label: 'Availability'},
  {key: 'resume', label: 'Resume'},
  {key: 'coverLetter', label: 'Cover Letter'},
];

type StatusType = 'submitted' | 'accepted' | 'rejected' | 'reviewed';

const statusMap: Record<StatusType, { label: string; color: string }> = {
  submitted: { label: 'Applied', color: 'border-primary-border text-primary-main'},
  accepted: { label: 'Accepted', color: 'border-success-surface text-success-main'},
  rejected: { label: 'Rejected', color: 'border-danger-surface text-danger-main'},
  reviewed: { label: 'Reviewed', color: 'border-neutral-20 text-neutral-70'},
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
function getActiveColumns(formConfig: JobFormConfiguration) {
  
  return COLUMN_CONFIG.filter(
    col =>
      col.key === 'matchRate' ||
      (formConfig[col.key as keyof JobFormConfiguration] &&
        formConfig[col.key as keyof JobFormConfiguration] !== 'off')
  );
}
export const CandidateTable: React.FC<CandidateTableProps> = ({
  applications,
  formConfiguration,
  onApplicationClick,
}) => {

  const columns = getActiveColumns(formConfiguration);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-neutral-30 rounded-lg">
        <thead>
          <tr className="bg-neutral-20">
            {columns.map(col => (
              <th
                key={col.key}
                className="pex-3 py-2 border-b text-xs font-bold text-neutral-100 whitespace-nowrap">
                  {col.label}
                </th>
            ))}
            <th className="px-3 py-2 border-b text-xs font-bold text-neutral-100 whitespace-nowrap">
              Tanggal Apply
            </th>
            <th className="px-3 py-2 border-b text-xs font-bold text-neutral-100 whitespace-nowrap">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr 
              key={app.id}
              className="hover:bg-neutral-30 cursor-pointer"
              onClick={() => onApplicationClick?.(app.id)}>
              {columns.map(col => (
                <td key={col.key} className="px-3 py-2 border-b text-xs text-neutral-90 whitespace-nowrap">
                  {col.key === 'matchRate'
                    ? (
                      <span className="flex items-center gap-1">
                        <span className="text-xs font-bold text-warning-main">
                          {calculateMatchRate(app.applicantData, formConfiguration)}%
                        </span>
                        <span className="text-warning-main">★</span>
                      </span>
                    )
                    : col.key === 'dateOfBirth' && app.applicantData.dateOfBirth
                      ? new Date().getFullYear() - new Date(app.applicantData.dateOfBirth).getFullYear()
                      : (app.applicantData as any)[col.key] ?? '-'}
                </td>
              ))}
              <td className="px-3 py-2 border-b text-xs text-neutral-90 whitespace-nowrap">
                {new Date(app.appliedAt).toLocaleDateString()}
              </td>
              <td className="px-3 py-2 border-b text-xs text-neutral-90 whitespace-nowrap">
                {renderStatus(app.status)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
