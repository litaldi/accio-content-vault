
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User, AuthError } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isConfigured: boolean;
  signUp: (email: string, password: string, externalContentConsent: boolean) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfigured] = useState(isSupabaseConfigured());
  const { toast } = useToast();

  // Function to refresh the session
  const refreshSession = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      setSession(data.session);
      setUser(data.session?.user ?? null);
    } catch (error) {
      console.error('Error refreshing session:', error);
    }
  };

  useEffect(() => {
    if (!isConfigured) {
      setIsLoading(false);
      return;
    }

    // Set up the auth state change listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event);
      
      // Update state synchronously
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      // If user signs in or token refreshes, we might want to fetch additional data
      // But don't call other Supabase functions directly inside this callback!
      if (session?.user && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
        // Use setTimeout to avoid potential deadlocks with Supabase client
        setTimeout(() => {
          console.log('Fetching user profile data...');
          // You could call a function here to fetch user profile data
          // But do it in a setTimeout to avoid potential deadlocks
        }, 0);
      }
    });

    // Then get the initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [isConfigured]);

  // Sign up new users
  const signUp = async (email: string, password: string, externalContentConsent: boolean) => {
    if (!isConfigured) {
      toast({
        title: "Supabase not configured",
        description: "Please set up your Supabase credentials to enable authentication.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            external_content_consent: externalContentConsent,
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: 'Registration successful!',
          description: 'Welcome to Accio! Your account has been created.',
        });
      } else {
        toast({
          title: 'Check your email',
          description: 'A confirmation link has been sent to your email address.',
        });
      }
    } catch (error) {
      const authError = error as AuthError;
      console.error('Error signing up:', authError);
      toast({
        title: 'Registration failed',
        description: authError.message || 'An error occurred during registration. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in existing users
  const signIn = async (email: string, password: string) => {
    if (!isConfigured) {
      toast({
        title: "Supabase not configured",
        description: "Please set up your Supabase credentials to enable authentication.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
    } catch (error) {
      const authError = error as AuthError;
      console.error('Error signing in:', authError);
      toast({
        title: 'Login failed',
        description: authError.message || 'Invalid email or password. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    if (!isConfigured) {
      toast({
        title: "Supabase not configured",
        description: "Please set up your Supabase credentials to enable authentication.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({
        title: 'Signed out',
        description: 'You have been successfully signed out.',
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: 'Sign out failed',
        description: 'An error occurred while signing out. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    session,
    isLoading,
    isConfigured,
    signUp,
    signIn,
    signOut,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
