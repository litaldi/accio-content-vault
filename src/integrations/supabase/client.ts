// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://imumaonttctoziucdofs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltdW1hb250dGN0b3ppdWNkb2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzODY5MTksImV4cCI6MjA2MTk2MjkxOX0._KsnwoQRMhKbvNg-8Ve6ufLEeagfDnstzsAyyK0Vsok";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);