import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '@/components/shared/Navbar';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { Notification } from '@/components/shared/Notification';
import { useNotification } from '@/context/NotificationContext';
import EmptyApplicant from '@/assets/EmptyApplicant.svg';
import { jobsService, applicationsService } from '@/services/supabaseService';
import { CandidateTable } from '@/components/admin/CandidateTable';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

export const ManageJob = () => {
	const { jobId } = useParams<{ jobId: string }>();
	const [job, setJob] = useState<any>(null);
	const [applications, setApplications] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadData = async () => {
			if (jobId) {
				try {
					setError(null);
					console.log('=== DEBUG INFO ===');
					console.log('JobId from URL params:', jobId);
					console.log('JobId type:', typeof jobId);
					console.log('JobId length:', jobId.length);
					
					console.log('Fetching job data...');
					const jobData = await jobsService.getJobById(jobId);
					console.log('Job data result:', jobData);
					
					console.log('Fetching applications data...');
					const appsData = await applicationsService.getApplicationsByJob(jobId);
					console.log('Applications data result:', appsData);
					console.log('Applications count:', appsData?.length || 0);
					// Debug first application structure
					if (appsData && appsData.length > 0) {
						console.log('First application structure:', appsData[0]);
						console.log('First applicantData:', appsData[0]?.applicantData);
					}
					
					setJob(jobData);
					// Set applications data directly
					setApplications(appsData || []);
				} catch (error) {
					console.error('=== ERROR DETAILS ===');
					console.error('Error object:', error);
					console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
					setError(error instanceof Error ? error.message : 'Failed to load data');
				} finally {
					setLoading(false);
				}
			} else {
				console.log('No jobId provided');
				setLoading(false);
			}
		};

		loadData();
	}, [jobId]);
	
	const jobTitle = job?.title || 'Job not found';
	const { notifications, removeNotification } = useNotification();

	const handleApplicationClick = (applicationId: string) => {
		console.log('Application clicked:', applicationId);
	};

	if (error) {
		return (
			<div className="min-h-screen bg-neutral-10 flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Data</h2>
					<p className="text-gray-600 mb-4">{error}</p>
					<button 
						onClick={() => window.location.reload()} 
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-neutral-10">
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

				<h2 className="text-lg font-bold mb-6">{jobTitle}</h2>

				<div className="bg-white rounded-xl border border-neutral-40 shadow-soft p-2 min-h-[400px] flex flex-col items-stretch">
					{loading ? (
						<div className="flex justify-center items-center py-20">
							<LoadingSpinner text="Loading candidates" />
						</div>
					) : (applications?.length || 0) === 0 ? (
						<div className="flex flex-col items-center justify-center py-20">
							<img src={EmptyApplicant} alt="No candidates" className="w-64 h-64 mb-6" />
							<h3 className="text-lg font-semibold text-neutral-100 mb-2">No candidates found</h3>
							<p className="text-neutral-70 mb-6 text-center max-w-md">
								Share your job vacancies so that more candidates will apply.
							</p>
						</div>
					) : (
						<CandidateTable
							jobId={jobId || ''}
							applications={applications || []}
							formConfiguration={job?.formConfiguration || {
								fullName: 'mandatory',
								email: 'mandatory',
								phone: 'optional',
								gender: 'optional',
								dateOfBirth: 'optional',
								linkedin: 'optional',
								portfolio: 'optional',
								domicile: 'optional',
								expectedSalary: 'optional',
								availability: 'optional',
								profilePicture: 'optional',
								resume: 'mandatory',
								coverLetter: 'optional'
							}}
							onApplicationClick={handleApplicationClick}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default ManageJob;