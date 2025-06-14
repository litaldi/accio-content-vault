
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { logSecurityEvent } from '@/utils/security';

interface SecureAuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  signUp: (email: string, password: string, options?: { name?: string }) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  signInWithProvider: (provider: 'google') => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<void>;
  securityLog: (event: string, details?: any) => void;
}

const SecureAuthContext = createContext<SecureAuthContextType | undefined>(undefined);

export const useSecureAuth = () => {
  const context = useContext(SecureAuthContext);
  if (context === undefined) {
    throw new Error('useSecureAuth must be used within a SecureAuthProvider');
  }
  return context;
};

export const SecureAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Enhanced auth state listener with security logging
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Log auth events for security monitoring
        if (event === 'SIGNED_IN' && session?.user) {
          logSecurityEvent('user_signed_in', {
            userId: session.user.id,
            email: session.user.email,
            provider: session.user.app_metadata?.provider || 'email'
          });
        } else if (event === 'SIGNED_OUT') {
          logSecurityEvent('user_signed_out', {
            timestamp: new Date().toISOString()
          });
        } else if (event === 'TOKEN_REFRESHED') {
          logSecurityEvent('token_refreshed', {
            userId: session?.user?.id
          });
        }
      }
    );

    // Get initial session with security logging
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (session?.user) {
        logSecurityEvent('session_restored', {
          userId: session.user.id
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const securityLog = (event: string, details: any = {}) => {
    logSecurityEvent(event, {
      ...details,
      userId: user?.id,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    });
  };

  const signUp = async (email: string, password: string, options?: { name?: string }) => {
    const redirectUrl = `${window.location.origin}/`;
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: options ? { full_name: options.name } : undefined
        }
      });

      if (error) {
        securityLog('signup_failed', {
          email,
          error: error.message,
          attempt_timestamp: new Date().toISOString()
        });
      } else {
        securityLog('signup_attempted', {
          email,
          has_name: !!options?.name
        });
      }

      return { error };
    } catch (error) {
      securityLog('signup_error', {
        email,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        securityLog('signin_failed', {
          email,
          error: error.message,
          attempt_timestamp: new Date().toISOString()
        });
      }

      return { error };
    } catch (error) {
      securityLog('signin_error', {
        email,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return { error };
    }
  };

  const signOut = async () => {
    try {
      securityLog('signout_initiated', {
        userId: user?.id
      });
      await supabase.auth.signOut();
    } catch (error) {
      securityLog('signout_error', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  const signInWithProvider = async (provider: 'google') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        securityLog('oauth_signin_failed', {
          provider,
          error: error.message
        });
      } else {
        securityLog('oauth_signin_attempted', {
          provider
        });
      }

      return { error };
    } catch (error) {
      securityLog('oauth_signin_error', {
        provider,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return { error };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      securityLog('password_reset_requested', {
        email,
        success: !error
      });

      if (error) throw error;
    } catch (error) {
      securityLog('password_reset_error', {
        email,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  };

  const value = {
    user,
    session,
    loading,
    isLoading: loading,
    isAuthenticated: !!user,
    isDemoMode: false,
    signUp,
    signIn,
    signOut,
    signInWithProvider,
    resetPassword,
    securityLog
  };

  return (
    <SecureAuthContext.Provider value={value}>
      {children}
    </SecureAuthContext.Provider>
  );
};
