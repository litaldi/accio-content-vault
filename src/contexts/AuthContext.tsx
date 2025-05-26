import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { getDemoUserByEmail, isDemoUser } from '@/data/demoData';
import { UnifiedRateLimiter } from '@/utils/unified-security';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isLoading: boolean; // Added for compatibility
  isDemoMode: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signInWithProvider: (provider: 'google' | 'github') => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Enhanced rate limiter for authentication attempts
const authRateLimiter = new UnifiedRateLimiter(5, 15 * 60 * 1000, true);

// Auth state cleanup utility
const cleanupAuthState = () => {
  if (typeof window === 'undefined') return;
  
  try {
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
  } catch (error) {
    console.warn('Error cleaning up auth state:', error);
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        setIsDemoMode(session?.user?.email ? isDemoUser(session.user.email) : false);
        setLoading(false);
        
        // Handle sign out event
        if (event === 'SIGNED_OUT') {
          cleanupAuthState();
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsDemoMode(session?.user?.email ? isDemoUser(session.user.email) : false);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const identifier = `signin_${email.toLowerCase()}`;
    
    // Check rate limiting
    const rateLimitCheck = authRateLimiter.canAttempt(identifier);
    if (!rateLimitCheck.allowed) {
      const errorMessage = rateLimitCheck.backoffTime 
        ? `Too many failed attempts. Please wait ${Math.ceil(rateLimitCheck.backoffTime / 60000)} minutes before trying again.`
        : 'Too many attempts. Please try again later.';
      
      return { error: { message: errorMessage } };
    }

    try {
      // Check for demo users first
      const demoUser = getDemoUserByEmail(email);
      if (demoUser && demoUser.password === password) {
        // Create a complete mock user object that matches the Supabase User type
        const mockUser: User = {
          id: `demo-${demoUser.role}`,
          aud: 'authenticated',
          role: 'authenticated',
          email: demoUser.email,
          email_confirmed_at: new Date().toISOString(),
          phone: '',
          confirmed_at: new Date().toISOString(),
          last_sign_in_at: new Date().toISOString(),
          app_metadata: {
            provider: 'demo',
            providers: ['demo']
          },
          user_metadata: {
            firstName: demoUser.profile.firstName,
            lastName: demoUser.profile.lastName,
            role: demoUser.role
          },
          identities: [],
          created_at: demoUser.profile.joinDate,
          updated_at: new Date().toISOString()
        };

        const mockSession: Session = {
          access_token: 'demo-token',
          refresh_token: 'demo-refresh-token',
          expires_in: 3600,
          expires_at: Math.floor(Date.now() / 1000) + 3600,
          token_type: 'bearer',
          user: mockUser
        };

        setUser(mockUser);
        setSession(mockSession);
        setIsDemoMode(true);
        
        // Reset rate limit on successful demo login
        authRateLimiter.reset(identifier);
        
        return { error: null };
      }

      // Clean up any existing auth state before new sign in
      cleanupAuthState();
      
      // Attempt global sign out first
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
        console.warn('Error during pre-signin cleanup:', err);
      }

      // Regular Supabase authentication for non-demo users
      const { error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password,
      });
      
      if (error) {
        console.error('Sign in error:', error);
        return { error };
      }
      
      // Reset rate limit on successful login
      authRateLimiter.reset(identifier);
      
      return { error: null };
    } catch (error) {
      console.error('Unexpected sign in error:', error);
      return { error: { message: 'An unexpected error occurred during sign in' } };
    }
  };

  const signUp = async (email: string, password: string) => {
    const identifier = `signup_${email.toLowerCase()}`;
    
    // Check rate limiting
    const rateLimitCheck = authRateLimiter.canAttempt(identifier);
    if (!rateLimitCheck.allowed) {
      return { error: { message: 'Too many signup attempts. Please try again later.' } };
    }

    try {
      // Prevent signup with demo emails
      if (isDemoUser(email)) {
        return { 
          error: { 
            message: 'This email is reserved for demo purposes. Please use the demo login instead.' 
          } 
        };
      }

      // Clean up any existing auth state
      cleanupAuthState();

      const { error } = await supabase.auth.signUp({
        email: email.toLowerCase().trim(),
        password,
      });
      
      if (error) {
        console.error('Sign up error:', error);
        return { error };
      }
      
      // Reset rate limit on successful signup
      authRateLimiter.reset(identifier);
      
      return { error: null };
    } catch (error) {
      console.error('Unexpected sign up error:', error);
      return { error: { message: 'An unexpected error occurred during sign up' } };
    }
  };

  const signInWithProvider = async (provider: 'google' | 'github') => {
    try {
      // Clean up any existing auth state
      cleanupAuthState();
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin + '/dashboard'
        }
      });
      
      if (error) {
        console.error(`${provider} auth error:`, error);
      }
      
      return { error };
    } catch (error) {
      console.error(`Unexpected ${provider} auth error:`, error);
      return { error: { message: `Failed to sign in with ${provider}` } };
    }
  };

  const signOut = async () => {
    try {
      if (isDemoMode) {
        // For demo users, just clear the local state
        setUser(null);
        setSession(null);
        setIsDemoMode(false);
        cleanupAuthState();
        
        // Force page reload for clean state
        setTimeout(() => {
          window.location.href = '/';
        }, 100);
        
        return;
      }

      // Clean up auth state first
      cleanupAuthState();
      
      // Attempt global sign out
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        console.warn('Error during sign out:', err);
      }
      
      // Force page reload for a clean state
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
      
    } catch (error) {
      console.error('Sign out error:', error);
      // Force reload even on error
      window.location.href = '/';
    }
  };

  const value = {
    user,
    session,
    loading,
    isLoading: loading, // Alias for compatibility
    isDemoMode,
    signIn,
    signUp,
    signInWithProvider,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
