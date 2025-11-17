import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '@/components/shared/Navbar';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { Notification } from '@/components/shared/Notification';
import { useNotification } from '@/context/NotificationContext';
import EmptyApplicant from '@/assets/EmptyApplicant.svg';
import { getJobById } from '@/data/dummyData';
import { getApplicationsByJob } from '@/data/dummyData';
import { CandidateTable } from '@/components/admin/CandidateTable';

export const ManageJob = () => {
	const { jobId } = useParams<{ jobId: string }>();
    const job = getJobById(jobId || '');
	const rawApplications = getApplicationsByJob(jobId || '');
	const applications = rawApplications.map(app => ({
		...app,
		status: app.status as "submitted" | "accepted" | "rejected" | "reviewed" | "shortlisted"
	}));
	const [loading] = useState(false);
	const jobTitle = job ? job.title : 'Job not found';
	const { notifications, removeNotification } = useNotification();

	const handleApplicationClick = (applicationId: string) => {
		// Handle application click, e.g., navigate to application details
		console.log('Application clicked:', applicationId);
	};

	return (
		<div className="min-h-screen bg-neutral-10">
			{/* Notifikasi */}
			<div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2 bg-white">
				{notifications.map((notification) => (
					<Notification
						key={notification.id}
						notification={notification}
						onClose={removeNotification}
					/>
				))}
			</div>

			<div className="max-w-full mx-auto px-6 pt-4">
				<Navbar title="Manage Candidate" avatarText="A" />

								{/* Breadcrumb dinamis */}
								<Breadcrumb
									items={[
										{
											label: 'Job list',
											onClick: () => window.history.back(),
										},
										{
											label: 'Manage Candidate',
											active: true,
										},
									]}
								/>

				{/* Job Title */}
				<h2 className="text-lg font-bold mb-6">{jobTitle}</h2>

				{/* Card Container */}
				<div className="bg-white rounded-xl border border-neutral-40 shadow-soft p-2 min-h-[400px] flex flex-col items-stretch">
					{loading ? (
						<div className="flex justify-center items-center py-20">
							<span className="text-neutral-60">Loading candidates...</span>
						</div>
					) : applications.length === 0 ? (
						<>
							<img src={EmptyApplicant} alt="No candidates" className="w-64 h-64 mb-6" />
							<h3 className="text-lg font-semibold text-neutral-100 mb-2">No candidates found</h3>
							<p className="text-neutral-70 mb-6 text-center max-w-md">
								Share your job vacancies so that more candidates will apply.
							</p>
						</>
					) : (
						job?.formConfiguration ? (
							<CandidateTable
								jobId={jobId || ''}
								applications={applications}
								formConfiguration={job.formConfiguration}
								onApplicationClick={handleApplicationClick}
							/>
						) : (
							<div className="flex flex-col items-center py-20">
								<span className="text-neutral-60">Job form configuration not found.</span>
							</div>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default ManageJob;
