import { Application } from '../types';

export interface ApplicationStats {
  total: number;
  submitted: number;
  reviewed: number;
  shortlisted: number;
  accepted: number;
  rejected: number;
  conversionRate: number;
}

export const calculateApplicationStats = (applications: Application[]): ApplicationStats => {
  const stats = {
    total: applications.length,
    submitted: 0,
    reviewed: 0,
    shortlisted: 0,
    accepted: 0,
    rejected: 0,
    conversionRate: 0,
  };

  applications.forEach(app => {
    stats[app.status]++;
  });

  stats.conversionRate = stats.total > 0 
    ? (stats.accepted / stats.total) * 100 
    : 0;

  return stats;
};

export const getApplicationTrends = (applications: Application[]) => {
  const last30Days = new Date();
  last30Days.setDate(last30Days.getDate() - 30);

  const recentApps = applications.filter(
    app => new Date(app.appliedAt) >= last30Days
  );

  return {
    total: recentApps.length,
    avgPerDay: recentApps.length / 30,
    byStatus: calculateApplicationStats(recentApps),
  };
};
