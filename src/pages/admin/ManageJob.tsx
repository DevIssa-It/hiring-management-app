
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '@/components/shared/Navbar';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { Notification } from '@/components/shared/Notification';
import { useNotification } from '@/context/NotificationContext';
import EmptyApplicant from '@/assets/EmptyApplicant.svg';
import { getJobById } from '@/data/dummyData';
// import { Table } from '@/components/shared/Table'; // Uncomment jika sudah ada
// import { useApplications } from '@/hooks/useApplications'; // Uncomment jika sudah ada

export const ManageJob = () => {
	const { jobId } = useParams<{ jobId: string }>();
    const job = getJobById(jobId || '');
	// const { applications, isLoading } = useApplications(jobId);
	// Simulasi data kandidat dan loading
	const [loading] = useState(false);
	const candidates: any[] = [];
	const jobTitle = job ? job.title : 'Job not found';
	const { notifications, removeNotification } = useNotification();

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
				<div className="bg-white rounded-xl border border-neutral-40 shadow-soft p-8 min-h-[400px] flex flex-col items-center justify-center">
					{loading ? (
						<div className="flex justify-center items-center py-20">
							<span className="text-neutral-60">Loading candidates...</span>
						</div>
					) : candidates.length === 0 ? (
						<>
							<img src={EmptyApplicant} alt="No candidates" className="w-64 h-64 mb-6" />
							<h3 className="text-lg font-semibold text-neutral-100 mb-2">No candidates found</h3>
							<p className="text-neutral-70 mb-6 text-center max-w-md">
								Share your job vacancies so that more candidates will apply.
							</p>
						</>
					) : (
						// <Table data={candidates} columns={[...]} />
						<div>/* Table kandidat di sini */</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ManageJob;
