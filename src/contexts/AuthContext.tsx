
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
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
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      // Demo login logic
      if (email === 'demo@yourapp.com' && password === 'Demo1234!') {
        const mockUser = {
          id: 'demo-user-id',
          email: 'demo@yourapp.com',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          app_metadata: {},
          user_metadata: {},
          aud: 'authenticated',
          confirmation_sent_at: null,
          confirmed_at: new Date().toISOString(),
          email_confirmed_at: new Date().toISOString(),
          invited_at: null,
          last_sign_in_at: new Date().toISOString(),
          phone: null,
          phone_confirmed_at: null,
          recovery_sent_at: null,
          role: 'authenticated'
        } as User;
        
        setUser(mockUser);
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      // Mock registration
      const mockUser = {
        id: `user-${Date.now()}`,
        email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        confirmation_sent_at: null,
        confirmed_at: new Date().toISOString(),
        email_confirmed_at: new Date().toISOString(),
        invited_at: null,
        last_sign_in_at: new Date().toISOString(),
        phone: null,
        phone_confirmed_at: null,
        recovery_sent_at: null,
        role: 'authenticated'
      } as User;
      
      setUser(mockUser);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
