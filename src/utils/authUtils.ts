
export const cleanupAuthState = () => {
  // Remove standard auth tokens
  localStorage.removeItem('supabase.auth.token');
  
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

export const getAuthErrorMessage = (error: any): string => {
  if (!error) return 'An unexpected error occurred';
  
  // Handle common auth errors
  switch (error.message) {
    case 'Invalid email or password':
      return 'Invalid email or password. Please check your credentials and try again.';
    case 'User already registered':
      return 'An account with this email already exists. Please sign in instead.';
    case 'Email not confirmed':
      return 'Please check your email and click the confirmation link before signing in.';
    case 'Too many requests':
      return 'Too many login attempts. Please wait a moment and try again.';
    default:
      return error.message || 'Authentication failed. Please try again.';
  }
};

export const handleAuthRedirect = (user: any, navigate: any) => {
  if (user) {
    // Redirect authenticated users to dashboard
    navigate('/dashboard');
  }
};
