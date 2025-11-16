// Job Service
// API calls for job operations

import { api } from './api';
import type { Job, JobListItem, ApiResponse, PaginatedResponse } from '@/types';

export const jobService = {
  async getJobs(params?: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<JobListItem>> {
    const queryParams = new URLSearchParams(params as any).toString();
    return api.get<PaginatedResponse<JobListItem>>(`/jobs?${queryParams}`);
  },

  async getJobById(id: string): Promise<ApiResponse<Job>> {
    return api.get<ApiResponse<Job>>(`/jobs/${id}`);
  },

  async createJob(data: Partial<Job>): Promise<ApiResponse<Job>> {
    return api.post<ApiResponse<Job>>('/jobs', data);
  },

  async updateJob(id: string, data: Partial<Job>): Promise<ApiResponse<Job>> {
    return api.put<ApiResponse<Job>>(`/jobs/${id}`, data);
  },

  async deleteJob(id: string): Promise<ApiResponse<void>> {
    return api.delete<ApiResponse<void>>(`/jobs/${id}`);
  },
};
