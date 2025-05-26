
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  signUp: (email: string, password: string) => Promise<{ error?: Error }>;
  signOut: () => Promise<void>;
  signInWithProvider: (provider: 'google' | 'github') => Promise<{ error?: Error }>;
  loading: boolean;
  isDemoMode?: boolean;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string): Promise<{ error?: Error }> => {
    setLoading(true);
    try {
      // Simulate API call
      const mockUser = { id: '1', email, name: email.split('@')[0] };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return {};
    } catch (error) {
      return { error: new Error('Failed to sign in') };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string): Promise<{ error?: Error }> => {
    setLoading(true);
    try {
      // Simulate API call
      const mockUser = { id: '1', email, name: email.split('@')[0] };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return {};
    } catch (error) {
      return { error: new Error('Failed to sign up') };
    } finally {
      setLoading(false);
    }
  };

  const signInWithProvider = async (provider: 'google' | 'github'): Promise<{ error?: Error }> => {
    setLoading(true);
    try {
      // Simulate OAuth flow
      const mockUser = { 
        id: '1', 
        email: `user@${provider}.com`, 
        name: `${provider} User` 
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return {};
    } catch (error) {
      return { error: new Error(`Failed to sign in with ${provider}`) };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      signUp,
      signInWithProvider,
      signOut,
      loading,
      isDemoMode: false
    }}>
      {children}
    </AuthContext.Provider>
  );
};
