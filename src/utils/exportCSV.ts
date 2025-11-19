import { Application } from '../types';

export const exportApplicationsToCSV = (applications: Application[], jobTitle: string) => {
  const headers = [
    'Name',
    'Email',
    'Phone',
    'Gender',
    'Location',
    'Status',
    'Applied Date',
    'Expected Salary',
  ];

  const rows = applications.map(app => [
    app.applicantData.fullName || '',
    app.applicantData.email || '',
    app.applicantData.phone || '',
    app.applicantData.gender || '',
    app.applicantData.domicile || '',
    app.status,
    new Date(app.appliedAt).toLocaleDateString(),
    app.applicantData.expectedSalary || '',
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${jobTitle}_applications_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
