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
import { exportToCSV } from '@/utils/exportCSV';
import { MdFileDownload } from 'react-icons/md';

export const ManageJob = () => {
	const { jobId } = useParams<{ jobId: string }>();
	const [job, setJob] = useState<any>(null);
	const [applications, setApplications] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [statusFilter, setStatusFilter] = useState<string>('all');
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

	const filteredApplications = applications.filter(app => {
		const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
		const matchesSearch = !searchQuery || 
			app.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			app.email?.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesStatus && matchesSearch;
	});

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

				<h2 className="text-lg font-bold mb-4">{jobTitle}</h2>

				<div className="flex justify-between items-center mb-4">
					<input
						type="text"
						placeholder="Search by name or email..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="flex-1 max-w-md px-4 py-2 border-2 border-neutral-40 rounded-lg focus:border-primary-main focus:outline-none"
					/>
					<div className="flex gap-3">
						<select
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
							className="px-4 py-2 border-2 border-neutral-40 rounded-lg focus:border-primary-main focus:outline-none"
						>
							<option value="all">All Status</option>
							<option value="pending">Pending</option>
							<option value="reviewed">Reviewed</option>
							<option value="accepted">Accepted</option>
							<option value="rejected">Rejected</option>
						</select>
						{applications.length > 0 && (
						<button
							onClick={() => {
								const csvData = applications.map(app => ({
									name: app.full_name,
									email: app.email,
									phone: app.phone,
									status: app.status,
									applied_date: new Date(app.applied_at).toLocaleDateString()
								}));
								exportToCSV(csvData, `candidates-${jobTitle}`);
							}}
							className="flex items-center gap-2 px-4 py-2 bg-primary-main text-white rounded-lg hover:bg-primary-hover transition-colors"
						>
							<MdFileDownload className="w-5 h-5" />
							Export CSV
						</button>
						)}
					</div>
				</div>

				<div className="mb-4 flex justify-between items-center">
					<span className="text-sm text-neutral-70">
						Showing {filteredApplications.length} of {applications.length} candidates
						{selectedCandidates.length > 0 && ` • ${selectedCandidates.length} selected`}
					</span>
					{selectedCandidates.length > 0 && (
						<div className="flex gap-2">
							<button
								onClick={() => setSelectedCandidates([])}
								className="px-3 py-1 text-sm border border-neutral-40 rounded-lg hover:bg-neutral-20"
							>
								Clear Selection
							</button>
							<button
								onClick={() => console.log('Bulk action:', selectedCandidates)}
								className="px-3 py-1 text-sm bg-primary-main text-white rounded-lg hover:bg-primary-hover"
							>
								Bulk Action
							</button>
						</div>
					)}
				</div>

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
							applications={filteredApplications || []}
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