import { Job } from '../../types';

interface JobComparisonTableProps {
  jobs: Job[];
  onRemove: (jobId: string) => void;
}

export const JobComparisonTable = ({ jobs, onRemove }: JobComparisonTableProps) => {
  if (jobs.length === 0) return null;

  const rows = [
    { label: 'Title', getValue: (job: Job) => job.title },
    { label: 'Company', getValue: (job: Job) => job.companyName },
    { label: 'Location', getValue: (job: Job) => job.location },
    { label: 'Type', getValue: (job: Job) => job.employmentType },
    { label: 'Salary', getValue: (job: Job) => 
      job.salaryMin && job.salaryMax ? `$${job.salaryMin} - $${job.salaryMax}` : 'N/A' 
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4">Compare Jobs</h3>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left p-2"></th>
            {jobs.map(job => (
              <th key={job.id} className="text-left p-2">
                <button onClick={() => onRemove(job.id)} className="text-red-500 float-right">✕</button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.label} className="border-t">
              <td className="p-2 font-medium">{row.label}</td>
              {jobs.map(job => (
                <td key={job.id} className="p-2">{row.getValue(job)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
