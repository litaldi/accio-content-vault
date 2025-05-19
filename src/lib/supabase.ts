
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Environment variables would be set via the Supabase integration in a real project
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a single supabase client for the entire app
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
