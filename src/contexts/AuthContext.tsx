
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { getDemoUserByEmail, isDemoUser } from '@/data/demoData';

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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsDemoMode(session?.user?.email ? isDemoUser(session.user.email) : false);
        setLoading(false);
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
    // Check for demo users first
    const demoUser = getDemoUserByEmail(email);
    if (demoUser && demoUser.password === password) {
      // Create a mock session for demo users
      const mockUser = {
        id: `demo-${demoUser.role}`,
        email: demoUser.email,
        created_at: demoUser.profile.joinDate,
        user_metadata: {
          firstName: demoUser.profile.firstName,
          lastName: demoUser.profile.lastName,
          role: demoUser.role
        }
      } as User;

      const mockSession = {
        access_token: 'demo-token',
        token_type: 'bearer',
        user: mockUser
      } as Session;

      setUser(mockUser);
      setSession(mockSession);
      setIsDemoMode(true);
      
      return { error: null };
    }

    // Regular Supabase authentication for non-demo users
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    // Prevent signup with demo emails
    if (isDemoUser(email)) {
      return { 
        error: { 
          message: 'This email is reserved for demo purposes. Please use the demo login instead.' 
        } 
      };
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { error };
  };

  const signInWithProvider = async (provider: 'google' | 'github') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
    });
    return { error };
  };

  const signOut = async () => {
    if (isDemoMode) {
      // For demo users, just clear the local state
      setUser(null);
      setSession(null);
      setIsDemoMode(false);
      return;
    }

    await supabase.auth.signOut();
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
