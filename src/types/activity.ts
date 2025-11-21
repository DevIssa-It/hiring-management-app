export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entityType: 'job' | 'application' | 'user';
  entityId: string;
  details?: string;
  timestamp: Date;
}
