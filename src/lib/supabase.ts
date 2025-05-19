
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// For development without environment variables, we'll use demo values
// In production, these should be set as environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-anon-key';

// Create a single supabase client for the entire app
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return supabaseUrl !== 'https://demo-project.supabase.co' && 
         supabaseAnonKey !== 'demo-anon-key';
};
