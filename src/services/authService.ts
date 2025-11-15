// Authentication Service

import { api } from './api';
import { User, UserRole, ApiResponse } from '@/types';

interface LoginResponse {
  user: User;
  token: string;
}

interface RegisterData {
  email: string;
  password: string;
  role: UserRole;
  name: string;
}

export const authService = {
  async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', {
      email,
      password,
    });

    if (response.data?.token) {
      api.setAuthToken(response.data.token);
      localStorage.setItem('auth_token', response.data.token);
    }

    return response;
  },

  async register(data: RegisterData): Promise<ApiResponse<LoginResponse>> {
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/register', data);

    if (response.data?.token) {
      api.setAuthToken(response.data.token);
      localStorage.setItem('auth_token', response.data.token);
    }

    return response;
  },

  async logout(): Promise<ApiResponse<void>> {
    const response = await api.post<ApiResponse<void>>('/auth/logout', {});
    api.removeAuthToken();
    localStorage.removeItem('auth_token');
    return response;
  },

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return api.get<ApiResponse<User>>('/auth/me');
  },

  initializeAuth() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      api.setAuthToken(token);
    }
  },
};
