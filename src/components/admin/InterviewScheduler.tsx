import { useState } from 'react';
import { Interview } from '../../types/interview';

interface InterviewSchedulerProps {
  applicationId: string;
  onSchedule: (interview: Partial<Interview>) => void;
}

export const InterviewScheduler = ({ applicationId, onSchedule }: InterviewSchedulerProps) => {
  const [formData, setFormData] = useState({
    scheduledDate: '',
    duration: 60,
    interviewType: 'video' as const,
    meetingLink: '',
    location: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSchedule({
      applicationId,
      ...formData,
      scheduledDate: new Date(formData.scheduledDate),
      status: 'scheduled',
      interviewers: [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
      <h3 className="text-lg font-semibold">Schedule Interview</h3>

      <div>
        <label className="block text-sm font-medium mb-1">Date & Time</label>
        <input
          type="datetime-local"
          value={formData.scheduledDate}
          onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
        <input
          type="number"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
          className="w-full px-4 py-2 border rounded-lg"
          min="15"
          step="15"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Interview Type</label>
        <select
          value={formData.interviewType}
          onChange={(e) => setFormData({ ...formData, interviewType: e.target.value as any })}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="phone">Phone</option>
          <option value="video">Video</option>
          <option value="onsite">On-site</option>
        </select>
      </div>

      {formData.interviewType === 'video' && (
        <div>
          <label className="block text-sm font-medium mb-1">Meeting Link</label>
          <input
            type="url"
            value={formData.meetingLink}
            onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="https://meet.google.com/..."
          />
        </div>
      )}

      {formData.interviewType === 'onsite' && (
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Schedule Interview
      </button>
    </form>
  );
};
