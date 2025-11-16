// Application Service
// API calls for application operations

import { api } from './api';
import type { Application, ApplicationData, ApiResponse, PaginatedResponse } from '@/types';

export const applicationService = {
  async getApplications(
    jobId: string,
    params?: {
      status?: string;
      search?: string;
      page?: number;
      limit?: number;
    }
  ): Promise<PaginatedResponse<Application>> {
    const queryParams = new URLSearchParams(params as any).toString();
    return api.get<PaginatedResponse<Application>>(
      `/jobs/${jobId}/applications?${queryParams}`
    );
  },

  async getApplicationById(id: string): Promise<ApiResponse<Application>> {
    return api.get<ApiResponse<Application>>(`/applications/${id}`);
  },

  async submitApplication(
    jobId: string,
    data: ApplicationData
  ): Promise<ApiResponse<Application>> {
    return api.post<ApiResponse<Application>>(`/jobs/${jobId}/apply`, data);
  },

  async updateApplicationStatus(
    id: string,
    status: string,
    notes?: string
  ): Promise<ApiResponse<Application>> {
    return api.patch<ApiResponse<Application>>(`/applications/${id}/status`, {
      status,
      notes,
    });
  },
};
