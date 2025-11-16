import { useState, useEffect } from 'react';
import type { Job, JobListItem } from '@/types';
import { JobStatus } from '@/types';
import { dummyJobs } from '@/data/dummyData';

export const useJobs = () => {
  const [jobs, setJobs] = useState<JobListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convertToJobListItem = (job: Job): JobListItem => ({
    id: job.id,
    title: job.title,
    department: job.department,
    status: job.status,
    salaryMin: job.salaryMin,
    salaryMax: job.salaryMax,
    applicantsCount: 0,
    createdAt: job.createdAt,
  })

  const fetchJobs = async (filters?: Record<string, string>) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      let filteredJobs = [...dummyJobs];

      if (filters?.status) {
        filteredJobs = filteredJobs.filter(
          job => job.status === filters.status
        );
      }

      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        filteredJobs = filteredJobs.filter(
          job =>
            job.title.toLowerCase().includes(searchLower) ||
            job.department.toLowerCase().includes(searchLower) ||
            job.location.toLowerCase().includes(searchLower)
        )
      }

      const jobListItems = filteredJobs.map(convertToJobListItem);

      setJobs(jobListItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
    } finally {
      setIsLoading(false);
    }
  };

  const createJob = async (data: Partial<Job>) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const newJob: Job = {
        id: `job-${Date.now()}`,
        title: data.title || '',
        description: data.description || '',
        department: data.department || '',
        location: data.location || '',
        employmentType: data.employmentType || '',
        salaryMin: data.salaryMin,
        salaryMax: data.salaryMax,
        status: data.status || JobStatus.DRAFT,
        formConfiguration: data.formConfiguration!,
        createdBy: 'admin-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      dummyJobs.push(newJob);

      await fetchJobs();

      return newJob;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to Created job');
      throw err;
    } finally {
      setIsLoading(false)
    }
  };

  const updateJob = async (id: string, data: Partial<Job>) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const jobIndex = dummyJobs.findIndex(job => job.id === id);

      if (jobIndex === -1) {
        throw new Error('Job not found');
      }

      dummyJobs[jobIndex] = {
        ...dummyJobs[jobIndex],
        ...data,
        updatedAt: new Date(),
      };
        await fetchJobs();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update job');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteJob = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const jobIndex = dummyJobs.findIndex(job => job.id === id);
      if (jobIndex === -1) {
        throw new Error('Job not found');
      }
      
      dummyJobs.splice(jobIndex, 1);

      await fetchJobs();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete job');
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
    createJob,
    updateJob,
    deleteJob,
  };
};
