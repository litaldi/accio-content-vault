
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Use the actual Supabase configuration
const supabaseUrl = 'https://imumaonttctoziucdofs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltdW1hb250dGN0b3ppdWNkb2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzODY5MTksImV4cCI6MjA2MTk2MjkxOX0._KsnwoQRMhKbvNg-8Ve6ufLEeagfDnstzsAyyK0Vsok';

// Create a single supabase client for the entire app with enhanced security
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      'X-Client-Info': 'accio-web-app',
      'X-Client-Version': '1.0.0',
    },
  },
});

// Security helper to validate Supabase responses
export const validateSupabaseResponse = <T>(response: { data: T | null; error: any }) => {
  if (response.error) {
    // Log security events for authentication errors
    if (response.error.message?.includes('JWT') || response.error.message?.includes('token')) {
      console.warn('Security: Authentication token issue detected');
    }
    throw new Error(response.error.message);
  }
  return response.data;
};
