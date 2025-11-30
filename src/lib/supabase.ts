import { createClient } from '@supabase/supabase-js';
import { getEnv } from '../utils/envValidation';

const supabaseUrl = getEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY');

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false // Faster initial load
  },
  realtime: {
    params: {
      eventsPerSecond: 2 // Reduce realtime overhead
    }
  }
});