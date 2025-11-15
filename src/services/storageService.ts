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
  // TODO: Implement Supabase methods
  async get<T>(table: string, id?: string): Promise<T | null> {
    console.log('Supabase get:', table, id);
    return null;
  }

  async set<T>(table: string, data: T): Promise<void> {
    console.log('Supabase set:', table, data);
  }

  async remove(table: string, id: string): Promise<void> {
    console.log('Supabase remove:', table, id);
  }

  async query<T>(table: string, filters?: Record<string, any>): Promise<T[]> {
    console.log('Supabase query:', table, filters);
    return [];
  }
}

export const storageService = USE_LOCAL_STORAGE
  ? new LocalStorageService()
  : new SupabaseStorageService();
