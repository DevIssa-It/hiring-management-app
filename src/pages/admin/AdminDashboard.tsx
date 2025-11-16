import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Navbar } from "@/components/shared/Navbar";
import { Input } from "@/components/shared/Input";
import { JobList } from "@/components/admin/JobList";
import { CreateJobModal } from "@/components/admin/CreateJobModal";
import { useJobs } from "@/hooks/useJobs";
import { Button } from "@/components/shared/Button";
import { useNotification } from "@/context/NotificationContext";
import { Notification } from "@/components/shared/Notification";
import type { Job } from "@/types";
import EmptyState from '@/assets/EmptyState.svg';

export const AdminDashboard = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const {jobs, isLoading: loading, createJob} = useJobs();
    const { notifications, showNotification, removeNotification } = useNotification();

    const handleJobClick = (jobId: string) => {
        console.log('Navigate to job: ', jobId);
    };

    const handleCreateJob = () => {
        setIsCreateModalOpen(true);
    }

    const handleSubmitJob = async (jobData: Partial<Job>) => {
        try {
            await createJob(jobData);
            setIsCreateModalOpen(false);
            
            // Tampilkan notification success
            showNotification(
                'success',
                'Success!',
                'Job vacancy successfully created',
                5000
            );
        } catch (error) {
            // Tampilkan notification error
            showNotification(
                'error',
                'Error!',
                'Failed to create job vacancy',
                5000
            );
        }
    }

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div id="admin-dashobard" className="min-h-screen bg-neutral-10">
            <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
                {notifications.map((notification) => (
                    <Notification
                        key={notification.id}
                        notification={notification}
                        onClose={removeNotification}
                    />
                ))}
            </div>

            <div id="container" className="max-w-full mx-auto px-6 pt-4">
                <Navbar
                    title="Job List"
                    avatarText="A"
                    onAvatarClick={() => console.log('Profile clicked')}
                />

                <div id="header" className="flex gap-6 mb-6">
                    <div id="search-bar" className="flex-1 flex flex-col gap-6 mb-6">
                        <Input
                            type="text"
                            placeholder="Search by job details"
                            value={searchQuery}
                            onChange={setSearchQuery}
                            icon={<FiSearch size={20} className="text-primary-main" />}
                            iconPosition="right"
                        />
                                
                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="text-neutral-60">Loading Jobs...</div>
                            </div>
                        ) : filteredJobs.length === 0 ?(
                            <div className="flex flex-col justify-center items-center py-16">
                                <div className="w-64 h-64 mb-6 flex items-center justify-center">
                                    <div className="text-neutral-40">
                                        <img
                                            src={EmptyState}
                                            alt="No Jobs"
                                        />
                                    </div>
                                </div>

                                <h3 className="text-xl font-semibold text-neutral-100 mb-2">
                                    No job openings available.
                                </h3>

                                <p className="text-neutral-70 mb-6 text-center max-w-md">
                                    Create a jon opening now and start the candidate process.
                                </p>

                                <Button 
                                onClick={handleCreateJob} 
                                variant="alternative"
                                className="w-40 h-10">
                                    Create a new job
                                </Button>
                            </div>
                        ) : (
                            <JobList
                                jobs={filteredJobs}
                                onJobClick={handleJobClick}
                            />
                        )}
                    </div>
                    
                    <div id="action-button" className="bg-neutral-100 text-white p-6 rounded-xl shadow-xl mb-2 w-80 h-40">
                        <div>
                            <p className="text-md font-medium mb-2">
                                Recruit the best candidates
                            </p>
                            <p className="text-sm text-neutral-30 mb-6">
                                Create job, invite, and hire with ease.
                            </p>
                            <Button
                                variant="primary"
                                onClick={handleCreateJob}
                                className="w-full h-10">
                                Create New Job
                            </Button>
                        </div>
                    </div>
                </div>

                <CreateJobModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSave={handleSubmitJob}
                />
            </div>
        </div>
    )
}