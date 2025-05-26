
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://imumaonttctoziucdofs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltdW1hb250dGN0b3ppdWNkb2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzODY5MTksImV4cCI6MjA2MTk2MjkxOX0._KsnwoQRMhKbvNg-8Ve6ufLEeagfDnstzsAyyK0Vsok'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
})
