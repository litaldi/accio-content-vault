
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
  user_metadata?: {
    full_name?: string;
    name?: string;
    [key: string]: any;
  };
}

interface AuthResult {
  error?: Error;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loading: boolean;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult | void>;
  signUp: (email: string, password: string, metadata?: any) => Promise<AuthResult | void>;
  signOut: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  signInWithProvider: (provider: string) => Promise<AuthResult>;
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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('accio_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('accio_user');
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<AuthResult | void> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        user_metadata: {
          full_name: email.split('@')[0],
          name: email.split('@')[0]
        }
      };
      
      setUser(userData);
      localStorage.setItem('accio_user', JSON.stringify(userData));
      return {};
    } catch (error) {
      return { error: new Error('Invalid credentials') };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, metadata?: any): Promise<AuthResult | void> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData: User = {
        id: '1',
        email,
        name: metadata?.name || email.split('@')[0],
        user_metadata: {
          full_name: metadata?.name || email.split('@')[0],
          name: metadata?.name || email.split('@')[0]
        }
      };
      
      setUser(userData);
      localStorage.setItem('accio_user', JSON.stringify(userData));
      return {};
    } catch (error) {
      return { error: new Error('Failed to create account') };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      localStorage.removeItem('accio_user');
    } catch (error) {
      throw new Error('Failed to sign out');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const result = await signIn(email, password);
    if (result && result.error) {
      throw result.error;
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    const result = await signUp(email, password, { name });
    if (result && result.error) {
      throw result.error;
    }
  };

  const logout = async () => {
    await signOut();
  };

  const signInWithProvider = async (provider: string): Promise<AuthResult> => {
    try {
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData: User = {
        id: '1',
        email: 'user@google.com',
        name: 'Google User',
        user_metadata: {
          full_name: 'Google User',
          name: 'Google User'
        }
      };
      
      setUser(userData);
      localStorage.setItem('accio_user', JSON.stringify(userData));
      return {};
    } catch (error) {
      return { error: new Error(`${provider} sign in failed`) };
    }
  };

  const resetPassword = async (email: string) => {
    // Simulate password reset
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const value = {
    user,
    isLoading,
    loading: isLoading,
    isAuthenticated: !!user,
    isDemoMode: true, // For demo purposes
    signIn,
    signUp,
    signOut,
    login,
    register,
    logout,
    signInWithProvider,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
