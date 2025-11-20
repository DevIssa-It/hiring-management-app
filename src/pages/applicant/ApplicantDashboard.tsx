import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActiveJobs } from '@/hooks/useActiveJobs';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/shared/Navbar';
import { JobCard } from '@/components/applicant/JobCard';
import { JobDetailCard } from '@/components/applicant/JobDetailCard';
import { Pagination } from '@/components/shared/Pagination';
import { JobCardSkeleton, JobDetailSkeleton } from '@/components/shared/LoadingSkeleton';
import type { Job } from '@/types';

export const ApplicantDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { jobs, isLoading } = useActiveJobs();
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const jobsPerPage = 5;

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || job.employmentType === filterType;
    return matchesSearch && matchesType;
  });

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

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
      <div className="min-h-screen bg-neutral-20 font-sans">
        <div className="px-6 pt-4">
          <Navbar title={undefined} showAvatar={true} avatarText={user?.email?.[0]?.toUpperCase() || 'A'} />
        </div>
        <div className="container mx-auto py-8 px-6">
          <div className="flex gap-8">
            <div className="w-1/3 space-y-4">
              {[1, 2, 3, 4, 5].map(i => <JobCardSkeleton key={i} />)}
            </div>
            <div className="w-2/3">
              <JobDetailSkeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-20 font-sans">
      <div className="px-6 pt-4">
        <Navbar title={undefined} showAvatar={true} avatarText={user?.email?.[0]?.toUpperCase() || 'A'} />
      </div>
      <div className="container mx-auto py-8 px-6">
        {/* Search and Filter Bar */}
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search jobs by title, company, or location..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 max-w-md px-4 py-2 border-2 border-neutral-40 rounded-lg focus:border-primary-main focus:outline-none"
          />
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border-2 border-neutral-40 rounded-lg focus:border-primary-main focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="full_time">Full Time</option>
            <option value="part_time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>
        
        <div className="flex gap-8 h-[calc(100vh-200px)]">
          {/* Left: Job List - Scrollable */}
          <div className="w-1/3 flex flex-col gap-4">
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-neutral-70">{searchQuery ? 'No jobs found' : 'No active jobs available'}</p>
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
    </div>
  );
};