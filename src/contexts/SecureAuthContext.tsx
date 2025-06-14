
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { cleanupAuthState } from '@/utils/authUtils';
import { logSecurityEvent } from '@/utils/security';

interface AuthResult {
  error?: AuthError | Error | null;
  user?: User | null;
}

interface SecureAuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  loading: boolean;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string, metadata?: any) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  signInWithProvider: (provider: string) => Promise<AuthResult>;
  resetPassword: (email: string) => Promise<void>;
}

const SecureAuthContext = createContext<SecureAuthContextType | undefined>(undefined);

export const useSecureAuth = () => {
  const context = useContext(SecureAuthContext);
  if (context === undefined) {
    throw new Error('useSecureAuth must be used within a SecureAuthProvider');
  }
  return context;
};

interface SecureAuthProviderProps {
  children: React.ReactNode;
}

export const SecureAuthProvider: React.FC<SecureAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Log security events
        logSecurityEvent(`Auth state changed: ${event}`, {
          userId: session?.user?.id,
          timestamp: new Date().toISOString()
        });

        // Defer any additional data fetching to prevent deadlocks
        if (event === 'SIGNED_IN' && session?.user) {
          setTimeout(() => {
            // Any additional user data fetching can go here
          }, 0);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string): Promise<AuthResult> => {
    try {
      // Clean up existing state
      cleanupAuthState();
      
      // Attempt global sign out first
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });

      if (error) {
        logSecurityEvent('Failed sign in attempt', {
          email: email.trim().toLowerCase(),
          error: error.message,
          timestamp: new Date().toISOString()
        });
        return { error };
      }

      logSecurityEvent('Successful sign in', {
        userId: data.user?.id,
        email: data.user?.email,
        timestamp: new Date().toISOString()
      });

      return { user: data.user };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, metadata?: any): Promise<AuthResult> => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: metadata
        }
      });

      if (error) {
        logSecurityEvent('Failed sign up attempt', {
          email: email.trim().toLowerCase(),
          error: error.message,
          timestamp: new Date().toISOString()
        });
        return { error };
      }

      logSecurityEvent('Successful sign up', {
        userId: data.user?.id,
        email: data.user?.email,
        timestamp: new Date().toISOString()
      });

      return { user: data.user };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      // Clean up auth state
      cleanupAuthState();
      
      // Attempt global sign out
      await supabase.auth.signOut({ scope: 'global' });
      
      logSecurityEvent('User signed out', {
        userId: user?.id,
        timestamp: new Date().toISOString()
      });

      // Force page reload for clean state
      window.location.href = '/';
    } catch (error) {
      console.error('Sign out error:', error);
      // Force cleanup even if sign out fails
      cleanupAuthState();
      window.location.href = '/';
    }
  };

  const login = async (email: string, password: string) => {
    const result = await signIn(email, password);
    if (result.error) {
      throw result.error;
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    const result = await signUp(email, password, { name });
    if (result.error) {
      throw result.error;
    }
  };

  const logout = async () => {
    await signOut();
  };

  const signInWithProvider = async (provider: string): Promise<AuthResult> => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider as any,
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        logSecurityEvent('Failed OAuth sign in', {
          provider,
          error: error.message,
          timestamp: new Date().toISOString()
        });
        return { error };
      }

      return {};
    } catch (error) {
      return { error: error as Error };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        logSecurityEvent('Failed password reset request', {
          email: email.trim().toLowerCase(),
          error: error.message,
          timestamp: new Date().toISOString()
        });
        throw error;
      }

      logSecurityEvent('Password reset requested', {
        email: email.trim().toLowerCase(),
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    session,
    isLoading,
    loading: isLoading,
    isAuthenticated: !!user,
    isDemoMode: false,
    signIn,
    signUp,
    signOut,
    login,
    register,
    logout,
    signInWithProvider,
    resetPassword
  };

  return <SecureAuthContext.Provider value={value}>{children}</SecureAuthContext.Provider>;
};
