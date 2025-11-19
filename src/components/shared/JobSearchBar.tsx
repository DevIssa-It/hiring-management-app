import { EmploymentType } from '../../types';
import { JobFilters } from '../../hooks/useJobSearch';

interface JobSearchBarProps {
  filters: JobFilters;
  onFilterChange: (filters: JobFilters) => void;
}

export const JobSearchBar = ({ filters, onFilterChange }: JobSearchBarProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <input
        type="text"
        placeholder="Search jobs..."
        value={filters.search}
        onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
        className="w-full px-4 py-2 border rounded-lg"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          value={filters.employmentType}
          onChange={(e) => onFilterChange({ ...filters, employmentType: e.target.value as EmploymentType | 'all' })}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Types</option>
          <option value={EmploymentType.FULL_TIME}>Full Time</option>
          <option value={EmploymentType.PART_TIME}>Part Time</option>
          <option value={EmploymentType.CONTRACT}>Contract</option>
          <option value={EmploymentType.INTERN}>Intern</option>
        </select>

        <input
          type="text"
          placeholder="Location"
          value={filters.location}
          onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
          className="px-4 py-2 border rounded-lg"
        />

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min Salary"
            value={filters.salaryMin || ''}
            onChange={(e) => onFilterChange({ ...filters, salaryMin: Number(e.target.value) })}
            className="w-1/2 px-4 py-2 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Max Salary"
            value={filters.salaryMax === 999999999 ? '' : filters.salaryMax}
            onChange={(e) => onFilterChange({ ...filters, salaryMax: Number(e.target.value) || 999999999 })}
            className="w-1/2 px-4 py-2 border rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
