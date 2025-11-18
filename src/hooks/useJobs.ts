import { useState, useEffect } from 'react';
import { jobsService, companiesService } from '@/services/supabaseService';
import { supabase } from '@/lib/supabase';
import type { JobListItem } from '@/types';

export const useJobs = () => {
  const [jobs, setJobs] = useState<JobListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Fetching jobs from Supabase...');
      console.log('Calling getAllJobs...');
      const jobsData = await jobsService.getAllJobs();
      console.log('Jobs data received:', jobsData);
      console.log('Jobs count:', jobsData?.length || 0);
      
      const formattedJobs: JobListItem[] = jobsData.map(job => ({
        id: job.id,
        title: job.title,
        department: job.department || 'Engineering',
        status: job.status as any,
        salaryMin: job.salaryMin || 0,
        salaryMax: job.salaryMax || 0,
        applicantsCount: 0, // TODO: Get from applications count
        createdAt: job.createdAt || new Date(),
      }));
      
      setJobs(formattedJobs);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
    } finally {
      setIsLoading(false);
    }
  };

  const createJob = async (data: {
    title: string;
    description: string;
    location?: string;
    employmentType?: string;
    salaryMin?: number;
    salaryMax?: number;
    status?: string;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Creating job:', data);
      
      // Get first company as default or create one
      let companies = await companiesService.getAllCompanies();
      let defaultCompanyId = companies[0]?.id;
      
      if (!defaultCompanyId) {
        console.log('No company found, creating default company...');
        // Create default company if none exists
        const { data: newCompany, error } = await supabase
          .from('companies')
          .insert({ name: 'Default Company', logo_url: null })
          .select()
          .single();
        
        if (error) {
          console.error('Failed to create default company:', error);
          throw new Error('Failed to create company');
        }
        
        defaultCompanyId = newCompany.id;
        console.log('Created default company:', newCompany);
      }

      console.log('Creating job with data:', {
        title: data.title,
        description: data.description,
        companyId: defaultCompanyId,
        location: data.location || 'Jakarta',
        employmentType: data.employmentType || 'full_time',
        salaryMin: data.salaryMin,
        salaryMax: data.salaryMax,
        status: data.status || 'active'
      });
      
      await jobsService.createJob({
        title: data.title,
        description: data.description,
        companyId: defaultCompanyId,
        location: data.location || 'Jakarta',
        employmentType: data.employmentType || 'full_time',
        salaryMin: data.salaryMin,
        salaryMax: data.salaryMax,
        status: data.status || 'active'
      });
      
      await fetchJobs(); // Refresh jobs list
    } catch (err) {
      console.error('Error creating job:', err);
      setError(err instanceof Error ? err.message : 'Failed to create job');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateJob = async (id: string, data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Updating job:', id, data);
      await jobsService.updateJob(id, data);
      await fetchJobs(); // Refresh jobs list
    } catch (err) {
      console.error('Error updating job:', err);
      setError(err instanceof Error ? err.message : 'Failed to update job');
      throw err;
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
  };
};