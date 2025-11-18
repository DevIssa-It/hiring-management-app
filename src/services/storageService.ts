// Storage Service
// Abstraction for LocalStorage or Supabase

const USE_LOCAL_STORAGE = import.meta.env.VITE_USE_LOCAL_STORAGE === 'true';

export const STORAGE_KEYS = {
  JOBS: 'hiring_app_jobs',
  APPLICATIONS: 'hiring_app_applications',
  USERS: 'hiring_app_users',
  CURRENT_USER: 'hiring_app_current_user',
  AUTH_TOKEN: 'auth_token',
} as const;

class LocalStorageService {
  get<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  query<T>(key: string, filters?: Record<string, any>): T[] {
    const items = this.get<T[]>(key) || [];
    if (!filters) return items;

    return items.filter((item: any) => {
      return Object.entries(filters).every(([key, value]) => {
        return item[key] === value;
      });
    });
  }
}

class SupabaseStorageService {
  async get<T>(table: string, id?: string): Promise<T | null> {
    const { supabase } = await import('@/lib/supabase');
    
    if (id) {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as T;
    }
    
    const { data, error } = await supabase
      .from(table)
      .select('*');
    
    if (error) throw error;
    return data as T;
  }

  async set<T>(table: string, data: T): Promise<void> {
    const { supabase } = await import('@/lib/supabase');
    
    const { error } = await supabase
      .from(table)
      .insert(data as any);
    
    if (error) throw error;
  }

  async remove(table: string, id: string): Promise<void> {
    const { supabase } = await import('@/lib/supabase');
    
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  async query<T>(table: string, filters?: Record<string, any>): Promise<T[]> {
    const { supabase } = await import('@/lib/supabase');
    
    let query = supabase.from(table).select('*');
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return (data || []) as T[];
  }
}

export const storageService = USE_LOCAL_STORAGE
  ? new LocalStorageService()
  : new SupabaseStorageService();
