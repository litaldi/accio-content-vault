
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
  user_metadata?: {
    role?: string;
    [key: string]: any;
  };
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<{ error?: Error }>;
  signUp: (email: string, password: string, name?: string) => Promise<{ error?: Error }>;
  signInWithProvider: (provider: 'google' | 'github') => Promise<{ error?: Error }>;
  signOut: () => Promise<void>;
  loading: boolean;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode] = useState(true); // Set to true for demo purposes

  useEffect(() => {
    // Simulate checking for existing session
    const checkSession = async () => {
      setLoading(false);
    };
    
    checkSession();
  }, []);

  const signIn = async (email: string, password: string): Promise<{ error?: Error }> => {
    setLoading(true);
    try {
      // Mock sign in - replace with actual auth logic
      const mockUser = { 
        id: '1', 
        email, 
        name: 'Demo User',
        user_metadata: { role: 'user' }
      };
      setUser(mockUser);
      return {};
    } catch (error) {
      return { error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name?: string): Promise<{ error?: Error }> => {
    setLoading(true);
    try {
      // Mock sign up - replace with actual auth logic
      const mockUser = { 
        id: '1', 
        email, 
        name: name || 'Demo User',
        user_metadata: { role: 'user' }
      };
      setUser(mockUser);
      return {};
    } catch (error) {
      return { error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  const signInWithProvider = async (provider: 'google' | 'github'): Promise<{ error?: Error }> => {
    setLoading(true);
    try {
      // Mock provider sign in - replace with actual auth logic
      const mockUser = { 
        id: '1', 
        email: `user@${provider}.com`, 
        name: `${provider} User`,
        user_metadata: { role: 'user' }
      };
      setUser(mockUser);
      return {};
    } catch (error) {
      return { error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setUser(null);
  };

  const value = {
    user,
    signIn,
    signUp,
    signInWithProvider,
    signOut,
    loading,
    isDemoMode,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
