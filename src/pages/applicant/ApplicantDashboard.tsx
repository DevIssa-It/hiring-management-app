import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActiveJobs } from '@/data/dummyData';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/shared/Navbar';
import { JobCard } from '@/components/applicant/JobCard';
import { JobDetailCard } from '@/components/applicant/JobDetailCard';
import type { Job } from '@/types';

const jobs = getActiveJobs();

export const ApplicantDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<Job | null>(jobs[0] || null);

  return (
    <div className="min-h-screen bg-neutral-20 font-sans">
      <div className="px-6 pt-4">
        <Navbar title={undefined} showAvatar={true} avatarText={user?.email?.[0]?.toUpperCase() || 'A'} />
      </div>
      <div className="flex container mx-auto py-8 gap-8 px-6">
        {/* Left: Job List */}
        <div className="w-1/3 flex flex-col gap-4">
          {jobs.map(job => (
            <JobCard 
              key={job.id}
              job={job} 
              onClick={() => setSelectedJob(job)}
              isSelected={selectedJob?.id === job.id}
            />
          ))}
        </div>
        {/* Right: Job Detail */}
        <div className="w-2/3">
          {selectedJob && (
            <JobDetailCard 
              job={selectedJob}
              showApplyButton={true}
              onApply={() => navigate(`/applicant/job/${selectedJob.id}`)}
            />
          )}
        </div>
      </div>
    </div>
  );
};