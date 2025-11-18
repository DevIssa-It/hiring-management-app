import { useState, useEffect } from 'react';
import { jobsService } from '@/services/supabaseService';
import type { JobListItem } from '@/types';

export const useActiveJobs = () => {
  const [jobs, setJobs] = useState<JobListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Fetching active jobs for applicant...');
      const jobsData = await jobsService.getActiveJobs();
      console.log('Active jobs received:', jobsData);
      
      const formattedJobs: any[] = jobsData.map(job => ({
        id: job.id,
        title: job.title || 'Untitled Job',
        description: job.description || 'No description available',
        companyName: job.companyName || 'Unknown Company',
        logoUrl: job.logoUrl,
        location: job.location || 'Jakarta',
        employmentType: job.employmentType || 'full_time',
        department: job.department || 'Engineering',
        status: job.status as any,
        salaryMin: job.salaryMin || 0,
        salaryMax: job.salaryMax || 0,
        applicantsCount: 0,
        createdAt: job.createdAt || new Date(),
      }));
      
      setJobs(formattedJobs);
    } catch (err) {
      console.error('Error fetching active jobs:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return {
    jobs,
    isLoading,
    error,
    fetchJobs,
  };
};