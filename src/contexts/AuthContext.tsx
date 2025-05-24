
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email?: string;
  name?: string;
  user_metadata?: {
    name?: string;
    avatar_url?: string;
  };
}

interface AuthContextType {
  user: User | null;
  session: any;
  isLoading: boolean;
  isConfigured?: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
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
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log('Login attempt:', email);
      const mockUser: User = { id: '1', email, name: 'Test User' };
      setUser(mockUser);
      setSession({ user: mockUser, access_token: 'mock-token' });
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    await login(email, password);
  };

  const logout = () => {
    setUser(null);
    setSession(null);
  };

  const signOut = () => {
    logout();
  };

  const register = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    try {
      console.log('Register attempt:', email);
      const mockUser: User = { id: '1', email, name: name || 'New User' };
      setUser(mockUser);
      setSession({ user: mockUser, access_token: 'mock-token' });
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    await register(email, password, name);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session,
      isLoading,
      isConfigured: true,
      login, 
      logout, 
      register,
      signOut,
      signIn,
      signUp
    }}>
      {children}
    </AuthContext.Provider>
  );
};
