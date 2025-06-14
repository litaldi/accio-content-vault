
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLoading: boolean;
  isDemoMode?: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signInWithProvider: (provider: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
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

  const signOut = async () => {
    setUser(null);
  };

  const login = async (email: string, password: string) => {
    // Mock login
    const mockUser: User = {
      id: '1',
      email,
      name: 'John Doe',
      user_metadata: { name: 'John Doe', full_name: 'John Doe' }
    };
    setUser(mockUser);
  };

  const register = async (email: string, password: string, name?: string) => {
    // Mock register
    const mockUser: User = {
      id: '1',
      email,
      name: name || 'New User',
      user_metadata: { name: name || 'New User', full_name: name || 'New User' }
    };
    setUser(mockUser);
  };

  const signIn = login;
  const signUp = register;
  const logout = signOut;

  const signInWithProvider = async (provider: string) => {
    // Mock provider sign in
    const mockUser: User = {
      id: '1',
      email: 'user@example.com',
      name: 'John Doe',
      user_metadata: { name: 'John Doe', full_name: 'John Doe' }
    };
    setUser(mockUser);
  };

  const resetPassword = async (email: string) => {
    // Mock reset password
    console.log('Password reset requested for:', email);
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
