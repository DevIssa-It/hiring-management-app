import { useState } from 'react';
import { applicationsService } from '@/services/supabaseService';
import type { Application, ApplicationData } from '@/types';

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = async (jobId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Fetching applications for job:', jobId);
      const data = await applicationsService.getApplicationsByJob(jobId);
      console.log('Applications data received:', data);
      
      const formattedApplications: Application[] = data.map(app => ({
        id: app.id,
        jobId: app.job_id,
        applicantData: {
          fullName: app.full_name,
          email: app.email,
          phone: app.phone,
          dateOfBirth: app.date_of_birth ? new Date(app.date_of_birth) : undefined,
          gender: app.gender as any,
          domicile: app.domicile,
          linkedin: app.linkedin_url,
          profilePicture: app.profile_picture_url,
        },
        status: app.status as any,
        appliedAt: new Date(app.applied_at),
        reviewedAt: app.updated_at ? new Date(app.updated_at) : undefined,
        notes: app.notes,
      }));
      
      setApplications(formattedApplications);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch applications');
    } finally {
      setIsLoading(false);
    }
  };

  const submitApplication = async (jobId: string, userId: string, data: ApplicationData) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Submitting application:', { jobId, userId, data });
      
      const result = await applicationsService.createApplication({
        jobId,
        userId,
        fullName: data.fullName || '',
        email: data.email || '',
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        domicile: data.domicile,
        linkedinUrl: data.linkedin,
        profilePictureUrl: data.profilePicture,
      });
      
      console.log('Application submitted successfully:', result);
    } catch (err) {
      console.error('Error submitting application:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit application');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateApplicationStatus = async (id: string, status: string, notes?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Updating application status:', { id, status, notes });
      
      await applicationsService.updateApplicationStatus(id, status, notes);
      
      // Update local state
      setApplications(prev => prev.map(app => 
        app.id === id 
          ? { ...app, status: status as any, notes, reviewedAt: new Date() }
          : app
      ));
    } catch (err) {
      console.error('Error updating application status:', err);
      setError(err instanceof Error ? err.message : 'Failed to update application status');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserApplications = async (userId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Fetching user applications:', userId);
      const data = await applicationsService.getApplicationsByUser(userId);
      console.log('User applications data received:', data);
      
      const formattedApplications: Application[] = data.map(app => ({
        id: app.id,
        jobId: app.job_id,
        applicantData: {
          fullName: app.full_name,
          email: app.email,
          phone: app.phone,
          dateOfBirth: app.date_of_birth ? new Date(app.date_of_birth) : undefined,
          gender: app.gender as any,
          domicile: app.domicile,
          linkedin: app.linkedin_url,
          profilePicture: app.profile_picture_url,
        },
        status: app.status as any,
        appliedAt: new Date(app.applied_at),
        reviewedAt: app.updated_at ? new Date(app.updated_at) : undefined,
        notes: app.notes,
      }));
      
      setApplications(formattedApplications);
    } catch (err) {
      console.error('Error fetching user applications:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch user applications');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    applications,
    isLoading,
    error,
    fetchApplications,
    submitApplication,
    updateApplicationStatus,
    fetchUserApplications,
  };
};