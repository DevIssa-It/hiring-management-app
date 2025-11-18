import { supabase } from '@/lib/supabase';
import { usersService } from './supabaseService';
import type { User, ApiResponse } from '@/types';
import { UserRole } from '@/types';

interface LoginResponse {
  user: User;
}

interface RegisterData {
  email: string;
  password: string;
  role: UserRole;
  name: string;
}

// Ensure admin user exists in database
const ensureAdminUser = async (email: string) => {
  try {
    let userProfile = await usersService.getUserByEmail(email);
    
    if (!userProfile && email === 'admin@talenthunt') {
      console.log('Creating admin user in database...');
      userProfile = await usersService.createUser({
        email: email,
        role: 'admin',
        fullName: 'Admin User'
      });
      console.log('Admin user created:', userProfile);
    }
    
    return userProfile;
  } catch (error) {
    console.error('Error ensuring admin user:', error);
    return null;
  }
};

export const authService = {
  async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      let userProfile = await ensureAdminUser(email);
      if (!userProfile) {
        userProfile = await usersService.getUserByEmail(email);
      }
      console.log('Login - User profile from DB:', userProfile);
      
      const user: User = {
        id: data.user.id,
        email: data.user.email!,
        role: (userProfile?.role as UserRole) || UserRole.APPLICANT,
        createdAt: new Date(data.user.created_at),
        updatedAt: new Date(data.user.updated_at || data.user.created_at)
      };
      
      console.log('Login - Final user object:', user);

      return { success: true, data: { user } };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  async register(data: RegisterData): Promise<ApiResponse<LoginResponse>> {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;
      if (!authData.user) throw new Error('Registration failed');

      await usersService.createUser({
        email: data.email,
        role: data.role,
        fullName: data.name
      });

      const user: User = {
        id: authData.user.id,
        email: authData.user.email!,
        role: data.role,
        createdAt: new Date(authData.user.created_at),
        updatedAt: new Date(authData.user.updated_at || authData.user.created_at)
      };

      return { success: true, data: { user } };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  async logout(): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) throw error;
      if (!user) return { success: false, error: 'No user found' };

      let userProfile = await ensureAdminUser(user.email!);
      if (!userProfile) {
        userProfile = await usersService.getUserByEmail(user.email!);
      }
      console.log('getCurrentUser - User profile from DB:', userProfile);
      
      const userData: User = {
        id: user.id,
        email: user.email!,
        role: (userProfile?.role as UserRole) || UserRole.APPLICANT,
        createdAt: new Date(user.created_at),
        updatedAt: new Date(user.updated_at || user.created_at)
      };
      
      console.log('getCurrentUser - Final user object:', userData);

      return { success: true, data: userData };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  initializeAuth() {
    // Supabase handles session automatically
  },
};