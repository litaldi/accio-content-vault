
import { User } from '@supabase/supabase-js';

// Demo user data for testing and showcasing
export const DEMO_CREDENTIALS = {
  email: 'demo@yourapp.com',
  password: 'Demo1234!'
};

// Create a mock user object for demo purposes
export const createDemoUser = (): User => ({
  id: 'demo-user-123',
  email: DEMO_CREDENTIALS.email,
  email_confirmed_at: new Date().toISOString(),
  phone: '',
  confirmed_at: new Date().toISOString(),
  last_sign_in_at: new Date().toISOString(),
  app_metadata: {
    provider: 'email',
    providers: ['email']
  },
  user_metadata: {
    full_name: 'Demo User',
    name: 'Demo User',
    role: 'demo'
  },
  aud: 'authenticated',
  created_at: '2024-01-01T00:00:00.000Z',
  updated_at: new Date().toISOString(),
  role: 'authenticated'
});

// Check if user is the demo user
export const isDemoUser = (email?: string): boolean => {
  return email === DEMO_CREDENTIALS.email;
};
