
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { DEMO_CREDENTIALS, isDemoEmail, getDemoUserRole } from '@/data/demoCredentials';
import { cleanupAuthState } from '@/utils/authUtils';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isDemoMode: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: Error }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error?: Error }>;
  signInWithProvider: (provider: 'google' | 'github') => Promise<{ error?: Error }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
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
  children: React.ReactNode;
}

const createDemoUser = (email: string): User => {
  const role = getDemoUserRole(email);
  const isAdmin = role === 'admin';
  
  return {
    id: `demo-user-${role}`,
    email,
    email_confirmed_at: new Date().toISOString(),
    phone: '',
    confirmed_at: new Date().toISOString(),
    last_sign_in_at: new Date().toISOString(),
    app_metadata: {
      provider: 'email',
      providers: ['email'],
      role: role || 'user'
    },
    user_metadata: {
      full_name: isAdmin ? 'Admin Demo User' : 'Demo User',
      name: isAdmin ? 'Admin Demo User' : 'Demo User',
      role: role || 'user',
      is_demo: true
    },
    aud: 'authenticated',
    created_at: '2024-01-01T00:00:00.000Z',
    updated_at: new Date().toISOString(),
    role: 'authenticated'
  };
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);

        // Check if user is in demo mode
        if (session?.user) {
          const isDemo = isDemoEmail(session.user.email || '') || 
                         session.user.user_metadata?.is_demo === true;
          setIsDemoMode(isDemo);
        } else {
          setIsDemoMode(false);
        }

        // Handle auth events
        if (event === 'SIGNED_IN' && session?.user) {
          const isDemo = isDemoEmail(session.user.email || '');
          toast({
            title: isDemo ? "Demo Mode Active" : "Welcome back!",
            description: isDemo 
              ? "You're using a demo account with sample data." 
              : "You have been successfully signed in.",
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You have been successfully signed out.",
          });
        }
      }
    );

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const isDemo = isDemoEmail(session.user.email || '') || 
                         session.user.user_metadata?.is_demo === true;
          setIsDemoMode(isDemo);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    return () => subscription.unsubscribe();
  }, [toast]);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Handle demo user login
      const demoCredential = Object.values(DEMO_CREDENTIALS).find(
        cred => cred.email === email && cred.password === password
      );
      
      if (demoCredential) {
        const demoUser = createDemoUser(email);
        const mockSession: Session = {
          access_token: 'demo-token',
          refresh_token: 'demo-refresh',
          expires_in: 3600,
          token_type: 'bearer',
          user: demoUser,
          expires_at: Math.floor(Date.now() / 1000) + 3600
        };
        
        setUser(demoUser);
        setSession(mockSession);
        setIsDemoMode(true);
        
        return {};
      }

      // Clean up any existing auth state before signing in
      cleanupAuthState();
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return { error };
      return {};
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) return { error };

      toast({
        title: "Account Created",
        description: "Please check your email to confirm your account.",
      });
      return {};
    } catch (error: any) {
      console.error('Sign up error:', error);
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithProvider = async (provider: 'google' | 'github') => {
    try {
      setIsLoading(true);
      
      // Clean up any existing auth state
      cleanupAuthState();
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) return { error };
      return {};
    } catch (error: any) {
      console.error('Provider sign in error:', error);
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      
      // Handle demo user logout
      if (isDemoMode) {
        setUser(null);
        setSession(null);
        setIsDemoMode(false);
        return;
      }
      
      // Clean up auth state first
      cleanupAuthState();
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast({
        title: "Password Reset",
        description: "Check your email for password reset instructions.",
      });
    } catch (error: any) {
      console.error('Password reset error:', error);
      throw error;
    }
  };

  const value = {
    user,
    session,
    isLoading,
    isDemoMode,
    signIn,
    signUp,
    signInWithProvider,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
