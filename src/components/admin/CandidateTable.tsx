// Admin CandidateTable Component
// Table with resizable and reorderable columns

import type { Application } from '@/types';

export interface CandidateTableProps {
  jobId: string;
  applications: Application[];
  onApplicationClick: (id: string) => void;
}

export const CandidateTable: React.FC<CandidateTableProps> = ({
  applications,
  onApplicationClick,
}) => {
  // TODO: Implement candidate table with:
  // - Resizable columns
  // - Reorderable columns
  // - Sorting
  // - Filtering
  // - Pagination
  
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>LinkedIn</th>
            <th>Domicile</th>
            <th>Applied Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id} onClick={() => onApplicationClick(app.id)}>
              <td>{app.applicantData.fullName}</td>
              <td>{app.applicantData.email}</td>
              <td>{app.applicantData.phone}</td>
              <td>{app.applicantData.gender}</td>
              <td>{app.applicantData.linkedin}</td>
              <td>{app.applicantData.domicile}</td>
              <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
              <td>{app.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
