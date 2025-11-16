import { useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { JobList } from "@/components/admin/JobList";
import { CreateJobModal } from "@/components/admin/CreateJobModal";
import { useJobs } from "@/hooks/useJobs";
import { Button } from "@/components/shared/Button";
import type { Job } from "@/types";

export const AdminDashboard = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const {jobs, isLoading: loading, createJob} = useJobs();

    const handleJobClick = (jobId: string) => {
        console.log('Navigate to job: ', jobId);
    };

    const handleCreateJob = () => {
        setIsCreateModalOpen(true);
    }

    const handleSubmitJob = async (jobData: Partial<Job>) => {
        await createJob(jobData);
        setIsCreateModalOpen(false);
    }

    return (
        <div id="admin-dashobard" className="min-h-screen bg-neutral-10">
            <div id="container" className="max-w-7xl mx-auto p-6">
                <Navbar
                    title="Job List"
                    avatarText="A"
                    onAvatarClick={() => console.log('Profile clicked')}
                />

                <div id="action-button" className="fixed top-6 right-6 z-50">
                    <div className="bg-neutral-100 text-white px-4 py-3 rounded-lg shadow-lg mb-2 max-w-xs">
                        <p className="text-sm font-medium mb-1">
                            Recruit the best candidates
                        </p>
                        <p className="text-xs text-neutral-30 mb-3">
                            Create job, invite, and hire with ease.
                        </p>
                        <Button
                            variant="primary"
                            onClick={handleCreateJob}
                            className="w-full">
                            Create New Job
                        </Button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="text-neutral-60">Loading Jobs...</div>
                    </div>
                ) : (
                    <JobList
                        jobs={jobs}
                        onJobClick={handleJobClick}
                        onCreateJob={handleCreateJob}
                    />
                )}

                <CreateJobModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSave={handleSubmitJob}
                />
            </div>
        </div>
    )
}