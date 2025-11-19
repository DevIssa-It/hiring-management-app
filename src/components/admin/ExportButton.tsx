import { Application } from '../../types';
import { exportApplicationsToCSV } from '../../utils/exportCSV';

interface ExportButtonProps {
  applications: Application[];
  jobTitle: string;
}

export const ExportButton = ({ applications, jobTitle }: ExportButtonProps) => {
  const handleExport = () => {
    if (applications.length === 0) {
      alert('No applications to export');
      return;
    }
    exportApplicationsToCSV(applications, jobTitle);
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Export CSV
    </button>
  );
};
