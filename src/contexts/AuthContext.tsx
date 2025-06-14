
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';

interface AuthResult {
  error?: Error;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLoading: boolean;
  isDemoMode?: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<AuthResult>;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (email: string, password: string, name?: string) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string, name?: string) => Promise<AuthResult>;
  signInWithProvider: (provider: string) => Promise<AuthResult>;
  logout: () => Promise<AuthResult>;
  resetPassword: (email: string) => Promise<AuthResult>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock auth state - in real app, this would connect to your auth service
    const mockUser: User = {
      id: '1',
      email: 'user@example.com',
      name: 'John Doe',
      user_metadata: {
        name: 'John Doe',
        full_name: 'John Doe',
        avatar_url: 'https://github.com/shadcn.png'
      }
    };
    
    setUser(mockUser);
    setLoading(false);
  }, []);

  const signOut = async (): Promise<AuthResult> => {
    try {
      setUser(null);
      return {};
    } catch (error) {
      return { error: error as Error };
    }
  };

  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      // Mock login
      const mockUser: User = {
        id: '1',
        email,
        name: 'John Doe',
        user_metadata: { name: 'John Doe', full_name: 'John Doe' }
      };
      setUser(mockUser);
      return {};
    } catch (error) {
      return { error: error as Error };
    }
  };

  const register = async (email: string, password: string, name?: string): Promise<AuthResult> => {
    try {
      // Mock register
      const mockUser: User = {
        id: '1',
        email,
        name: name || 'New User',
        user_metadata: { name: name || 'New User', full_name: name || 'New User' }
      };
      setUser(mockUser);
      return {};
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = login;
  const signUp = register;
  const logout = signOut;

  const signInWithProvider = async (provider: string): Promise<AuthResult> => {
    try {
      // Mock provider sign in
      const mockUser: User = {
        id: '1',
        email: 'user@example.com',
        name: 'John Doe',
        user_metadata: { name: 'John Doe', full_name: 'John Doe' }
      };
      setUser(mockUser);
      return {};
    } catch (error) {
      return { error: error as Error };
    }
  };

  const resetPassword = async (email: string): Promise<AuthResult> => {
    try {
      // Mock reset password
      console.log('Password reset requested for:', email);
      return {};
    } catch (error) {
      return { error: error as Error };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isLoading: loading,
      isDemoMode: true,
      isAuthenticated: !!user,
      signOut,
      login,
      register,
      signIn,
      signUp,
      signInWithProvider,
      logout,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
