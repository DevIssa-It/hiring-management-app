import { supabase } from '@/lib/supabase';
import type { Job, ApplicationData } from '@/types';

// Jobs Service
export const jobsService = {
  async getAllJobs() {
    console.log('getAllJobs method called');
    const { data, error } = await supabase
      .from('jobs')
      .select(`
        *,
        companies (
          name,
          logo_url
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('getAllJobs error:', error);
      throw error;
    }
    
    console.log('getAllJobs raw data:', data);
    
    return data?.map(job => ({
      id: job.id,
      title: job.title,
      description: job.description,
      companyName: job.companies?.name || 'Unknown Company',
      logoUrl: job.companies?.logo_url,
      location: job.location,
      employmentType: job.employment_type,
      salaryMin: job.salary_min,
      salaryMax: job.salary_max,
      status: job.status,
      createdAt: new Date(job.created_at),
      updatedAt: new Date(job.updated_at)
    })) || [];
  },
  async getActiveJobs() {
    const { data, error } = await supabase
      .from('jobs')
      .select(`
        *,
        companies (
          name,
          logo_url
        )
      `)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return data?.map(job => ({
      id: job.id,
      title: job.title,
      description: job.description,
      companyName: job.companies?.name || 'Unknown Company',
      logoUrl: job.companies?.logo_url,
      location: job.location,
      employmentType: job.employment_type,
      salaryMin: job.salary_min,
      salaryMax: job.salary_max,
      status: job.status,
      createdAt: new Date(job.created_at),
      updatedAt: new Date(job.updated_at)
    })) || [];
  },

  async getJobById(jobId: string) {
    console.log('getJobById called with:', jobId);
    
    const { data, error } = await supabase
      .from('jobs')
      .select(`
        *,
        companies (
          name,
          logo_url
        )
      `)
      .eq('id', jobId)
      .single();

    console.log('Supabase query result:', { data, error });

    if (error) {
      console.error('Supabase error in getJobById:', error);
      throw error;
    }
    
    if (!data) {
      console.log('No job data found for ID:', jobId);
      return null;
    }

    const result = {
      id: data.id,
      title: data.title,
      description: data.description,
      companyName: data.companies?.name || 'Unknown Company',
      logoUrl: data.companies?.logo_url,
      location: data.location,
      employmentType: data.employment_type,
      salaryMin: data.salary_min,
      salaryMax: data.salary_max,
      status: data.status,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    };
    
    console.log('Formatted job result:', result);
    return result;
  },

  async createJob(jobData: {
    title: string;
    description: string;
    companyId: string;
    location: string;
    employmentType: string;
    salaryMin?: number;
    salaryMax?: number;
    status?: string;
  }) {
    console.log('createJob called with:', jobData);
    
    const insertData = {
      title: jobData.title,
      description: jobData.description,
      company_id: jobData.companyId,
      location: jobData.location,
      employment_type: jobData.employmentType,
      salary_min: jobData.salaryMin || null,
      salary_max: jobData.salaryMax || null,
      status: jobData.status || 'active'
    };
    
    console.log('Insert data:', insertData);
    
    const { data, error } = await supabase
      .from('jobs')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('createJob error:', error);
      throw error;
    }
    
    console.log('Job created successfully:', data);
    return data;
  },

  async updateJob(jobId: string, updates: {
    title?: string;
    description?: string;
    location?: string;
    employmentType?: string;
    salaryMin?: number;
    salaryMax?: number;
    status?: string;
  }) {
    const { data, error } = await supabase
      .from('jobs')
      .update({
        ...(updates.title && { title: updates.title }),
        ...(updates.description && { description: updates.description }),
        ...(updates.location && { location: updates.location }),
        ...(updates.employmentType && { employment_type: updates.employmentType }),
        ...(updates.salaryMin && { salary_min: updates.salaryMin }),
        ...(updates.salaryMax && { salary_max: updates.salaryMax }),
        ...(updates.status && { status: updates.status }),
        updated_at: new Date().toISOString()
      })
      .eq('id', jobId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteJob(jobId: string) {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', jobId);

    if (error) throw error;
  }
};

// Applications Service
export const applicationsService = {
  async createApplication(applicationData: {
    jobId: string;
    userId: string;
    fullName: string;
    email: string;
    phone?: string;
    dateOfBirth?: Date;
    gender?: string;
    domicile?: string;
    linkedinUrl?: string;
    profilePictureUrl?: string;
  }) {
    const { data, error } = await supabase
      .from('applications')
      .insert({
        job_id: applicationData.jobId,
        user_id: applicationData.userId,
        full_name: applicationData.fullName,
        email: applicationData.email,
        phone: applicationData.phone,
        date_of_birth: applicationData.dateOfBirth?.toISOString().split('T')[0],
        gender: applicationData.gender,
        domicile: applicationData.domicile,
        linkedin_url: applicationData.linkedinUrl,
        profile_picture_url: applicationData.profilePictureUrl
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getApplicationsByJob(jobId: string) {
    console.log('getApplicationsByJob called with:', jobId);
    
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('job_id', jobId)
      .order('applied_at', { ascending: false });

    console.log('Applications query result:', { data, error, count: data?.length });

    if (error) {
      console.error('Supabase error in getApplicationsByJob:', error);
      throw error;
    }
    
    return data || [];
  },

  async getApplicationById(applicationId: string) {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('id', applicationId)
      .single();

    if (error) throw error;
    return data;
  },

  async updateApplicationStatus(applicationId: string, status: string, notes?: string) {
    const { data, error } = await supabase
      .from('applications')
      .update({
        status,
        ...(notes && { notes }),
        updated_at: new Date().toISOString()
      })
      .eq('id', applicationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getApplicationsByUser(userId: string) {
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        jobs (
          title,
          companies (
            name
          )
        )
      `)
      .eq('user_id', userId)
      .order('applied_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }
};

// Users Service
export const usersService = {
  async getUserByEmail(email: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async createUser(userData: {
    email: string;
    role?: string;
    fullName?: string;
    phone?: string;
  }) {
    const { data, error } = await supabase
      .from('users')
      .insert({
        email: userData.email,
        role: userData.role || 'applicant',
        full_name: userData.fullName,
        phone: userData.phone
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateUser(userId: string, updates: {
    fullName?: string;
    phone?: string;
  }) {
    const { data, error } = await supabase
      .from('users')
      .update({
        ...(updates.fullName && { full_name: updates.fullName }),
        ...(updates.phone && { phone: updates.phone }),
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// Companies Service
export const companiesService = {
  async getAllCompanies() {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || [];
  },

  async getCompanyById(companyId: string) {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', companyId)
      .single();

    if (error) throw error;
    return data;
  }
};