import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActiveJobs } from '@/hooks/useActiveJobs';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/shared/Navbar';
import { JobCard } from '@/components/applicant/JobCard';
import { JobDetailCard } from '@/components/applicant/JobDetailCard';
import { Pagination } from '@/components/shared/Pagination';
import type { Job } from '@/types';

export const ApplicantDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { jobs, isLoading } = useActiveJobs();
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  useEffect(() => {
    const stored = localStorage.getItem('appliedJobs');
    if (stored) {
      setAppliedJobs(JSON.parse(stored));
    }
  }, []);
  
  useEffect(() => {
    if (jobs.length > 0 && !selectedJob) {
      setSelectedJob(jobs[0]);
    }
  }, [jobs, selectedJob]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-main mx-auto mb-4"></div>
          <p className="text-neutral-70">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-20 font-sans">
      <div className="px-6 pt-4">
        <Navbar title={undefined} showAvatar={true} avatarText={user?.email?.[0]?.toUpperCase() || 'A'} />
      </div>
      <div className="flex container mx-auto py-8 gap-8 px-6 h-[calc(100vh-120px)]">
        {/* Left: Job List - Scrollable */}
        <div className="w-1/3 flex flex-col gap-4">
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {jobs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-neutral-70">No active jobs available</p>
              </div>
            ) : (
              currentJobs.map(job => (
                <JobCard 
                  key={job.id}
                  job={job} 
                  onClick={() => setSelectedJob(job)}
                  isSelected={selectedJob?.id === job.id}
                />
              ))
            )}
          </div>
          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
        {/* Right: Job Detail - Fixed */}
        <div className="w-2/3 flex-shrink-0">
          {selectedJob && (
            <JobDetailCard 
              job={selectedJob}
              showApplyButton={true}
              onApply={() => navigate(`/applicant/job/${selectedJob.id}`)}
              isApplied={appliedJobs.includes(selectedJob.id)}
            />
          )}
        </div>
      </div>
    </div>
  );
};