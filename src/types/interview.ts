export interface Interview {
  id: string;
  applicationId: string;
  scheduledDate: Date;
  duration: number;
  interviewType: 'phone' | 'video' | 'onsite';
  meetingLink?: string;
  location?: string;
  interviewers: string[];
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  createdAt: Date;
  updatedAt: Date;
}

export interface InterviewSlot {
  date: Date;
  startTime: string;
  endTime: string;
  available: boolean;
}
