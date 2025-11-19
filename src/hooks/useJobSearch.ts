import { useState, useMemo } from 'react';
import { Job, EmploymentType } from '../types';

export interface JobFilters {
  search: string;
  employmentType: EmploymentType | 'all';
  location: string;
  salaryMin: number;
  salaryMax: number;
}

export const useJobSearch = (jobs: Job[]) => {
  const [filters, setFilters] = useState<JobFilters>({
    search: '',
    employmentType: 'all',
    location: '',
    salaryMin: 0,
    salaryMax: 999999999,
  });

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = 
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.companyName.toLowerCase().includes(filters.search.toLowerCase());

      const matchesType = 
        filters.employmentType === 'all' || 
        job.employmentType === filters.employmentType;

      const matchesLocation = 
        !filters.location || 
        job.location.toLowerCase().includes(filters.location.toLowerCase());

      const matchesSalary = 
        (!job.salaryMin || job.salaryMin >= filters.salaryMin) &&
        (!job.salaryMax || job.salaryMax <= filters.salaryMax);

      return matchesSearch && matchesType && matchesLocation && matchesSalary;
    });
  }, [jobs, filters]);

  return { filters, setFilters, filteredJobs };
};
