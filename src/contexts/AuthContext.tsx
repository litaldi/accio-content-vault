
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface Session {
  access_token: string;
  user: User;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<{ error?: any } | void>;
  signUp: (email: string, password: string, options?: { name?: string }) => Promise<{ error?: any } | void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Util to robustly clean up Supabase auth state (see lovable best practices)
const cleanupAuthState = () => {
  try {
    // Remove standard auth tokens
    localStorage.removeItem('supabase.auth.token');
    // Remove all Supabase auth keys from localStorage and sessionStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  } catch {}
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to translate the Supabase user/session to our app's type
  const translateSession = (supabaseSession: any): Session | null => {
    if (!supabaseSession) return null;
    return {
      access_token: supabaseSession.access_token,
      user: {
        id: supabaseSession.user?.id,
        email: supabaseSession.user?.email,
        // Name shouldn't be null, get from user_metadata if present
        name: supabaseSession.user?.user_metadata?.name || supabaseSession.user?.email?.split('@')[0] || undefined
      }
    };
  };

  // Auth state listener, and initial session load
  useEffect(() => {
    // Listen for session changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, supaSession) => {
      setSession(translateSession(supaSession));
      setUser(supaSession?.user
        ? {
            id: supaSession.user.id,
            email: supaSession.user.email,
            name: supaSession.user?.user_metadata?.name || supaSession.user.email?.split('@')[0] || undefined,
          }
        : null
      );
    });

    // Initial load
    supabase.auth.getSession().then(({ data: { session: supaSession } }) => {
      setSession(translateSession(supaSession));
      setUser(supaSession?.user
        ? {
            id: supaSession.user.id,
            email: supaSession.user.email,
            name: supaSession.user?.user_metadata?.name || supaSession.user.email?.split('@')[0] || undefined,
          }
        : null
      );
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Real Supabase sign-in with cleanup before login, and global scope sign-out
  const signIn = useCallback(async (email: string, password: string) => {
    // Clean up possible previous state
    cleanupAuthState();
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch {}
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { error };
    }
    if (data?.session) {
      setSession(translateSession(data.session));
      setUser(data.session.user
        ? {
            id: data.session.user.id,
            email: data.session.user.email,
            name: data.session.user.user_metadata?.name || data.session.user.email?.split('@')[0] || undefined,
          }
        : null
      );
    }
    return {};
  }, []);

  // Real Supabase sign-up; always set email redirect
  const signUp = useCallback(
    async (email: string, password: string, options?: { name?: string }) => {
      const redirectUrl = `${window.location.origin}/`;
      // Clean up auth state before sign up to avoid limbo
      cleanupAuthState();
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch {}
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name: options?.name || email.split('@')[0] },
          emailRedirectTo: redirectUrl,
        },
      });
      if (error) {
        return { error };
      }
      // Session will activate on email confirm (if enabled)
      return {};
    },
    []
  );

  // Fully robust sign out: cleanup, Supabase sign out, full reload
  const signOut = useCallback(async () => {
    cleanupAuthState();
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch {}
    setSession(null);
    setUser(null);
    // Full reload to clean everything
    window.location.href = '/auth';
  }, []);

  const value: AuthContextType = {
    user,
    session,
    signIn,
    signUp,
    signOut,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Public hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

