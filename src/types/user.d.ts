
import { User as AuthUser } from '@supabase/supabase-js';

// Extend the User type from Supabase to include photoURL
declare module '@supabase/supabase-js' {
  interface User extends AuthUser {
    photoURL?: string;
  }
}
