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

// Cache untuk user profiles
const userProfileCache = new Map<string, any>();

// Optimized user profile fetching dengan cache dan timeout
const getUserProfile = async (email: string) => {
  // Check cache first
  if (userProfileCache.has(email)) {
    return userProfileCache.get(email);
  }

  try {
    // Add timeout untuk database calls
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Database timeout')), 5000)
    );
    
    const userProfilePromise = usersService.getUserByEmail(email);
    let userProfile = await Promise.race([userProfilePromise, timeoutPromise]);
    
    // Auto-create admin user jika belum ada
    if (!userProfile && email === 'admin@talenthunt') {
      const createUserPromise = usersService.createUser({
        email: email,
        role: 'admin',
        fullName: 'Admin User'
      });
      userProfile = await Promise.race([createUserPromise, timeoutPromise]);
    }
    
    // Cache the result
    if (userProfile) {
      userProfileCache.set(email, userProfile);
    }
    
    return userProfile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    // Return default untuk menghindari hang
    return { role: 'applicant' };
  }
};

export const authService = {
  async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
    try {
      console.log('Login attempt for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Supabase auth error:', error);
        throw error;
      }

      if (!data.user) {
        throw new Error('No user data returned from authentication');
      }

      // Get user profile dengan cache
      const userProfile = await getUserProfile(email);
      
      console.log('Login - User profile from DB:', userProfile);
      
      // Pastikan role valid
      const userRole = userProfile?.role === 'admin' ? UserRole.ADMIN : UserRole.APPLICANT;
      
      const user: User = {
        id: data.user.id,
        email: data.user.email!,
        role: userRole,
        createdAt: new Date(data.user.created_at),
        updatedAt: new Date(data.user.updated_at || data.user.created_at)
      };
      
      console.log('Login - Final user object:', user);
      console.log('Login - User role set to:', user.role);

      return { success: true, data: { user } };
    } catch (error: any) {
      console.error('Login error:', error);
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
      
      // Clear cache saat logout
      userProfileCache.clear();
      
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

      // Get user profile dengan cache
      const userProfile = await getUserProfile(user.email!);
      
      console.log('getCurrentUser - User profile from DB:', userProfile);
      
      // Pastikan role valid
      const userRole = userProfile?.role === 'admin' ? UserRole.ADMIN : UserRole.APPLICANT;
      
      const userData: User = {
        id: user.id,
        email: user.email!,
        role: userRole,
        createdAt: new Date(user.created_at),
        updatedAt: new Date(user.updated_at || user.created_at)
      };
      
      console.log('getCurrentUser - Final user object:', userData);
      console.log('getCurrentUser - User role set to:', userData.role);

      return { success: true, data: userData };
    } catch (error: any) {
      console.error('getCurrentUser error:', error);
      return { success: false, error: error.message };
    }
  },

  initializeAuth() {
    // Supabase handles session automatically
  },
};