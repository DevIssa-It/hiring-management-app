import { useState } from 'react';
import { JobAlert } from '../../types/alert';

interface JobAlertFormProps {
  onSave: (alert: Omit<JobAlert, 'id' | 'userId' | 'createdAt'>) => void;
}

export const JobAlertForm = ({ onSave }: JobAlertFormProps) => {
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [salaryMin, setSalaryMin] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      keywords: keywords.split(',').map(k => k.trim()).filter(Boolean),
      location: location || undefined,
      employmentType: employmentType || undefined,
      salaryMin: salaryMin ? Number(salaryMin) : undefined,
      active: true,
    });
    setKeywords('');
    setLocation('');
    setEmploymentType('');
    setSalaryMin('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-sm space-y-3">
      <h3 className="font-semibold">Create Job Alert</h3>
      
      <input
        type="text"
        placeholder="Keywords (comma separated)"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        className="w-full px-3 py-2 border rounded"
        required
      />
      
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
      
      <select
        value={employmentType}
        onChange={(e) => setEmploymentType(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      >
        <option value="">Any Type</option>
        <option value="full_time">Full Time</option>
        <option value="part_time">Part Time</option>
        <option value="contract">Contract</option>
        <option value="intern">Intern</option>
      </select>
      
      <input
        type="number"
        placeholder="Min Salary"
        value={salaryMin}
        onChange={(e) => setSalaryMin(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
      
      <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Create Alert
      </button>
    </form>
  );
};
