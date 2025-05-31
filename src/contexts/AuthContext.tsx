
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
  user_metadata?: {
    full_name?: string;
    name?: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ error?: Error }>;
  signUp: (name: string, email: string, password: string) => Promise<{ error?: Error }>;
  signOut: () => Promise<void>;
  signInWithProvider: (provider: string) => Promise<{ error?: Error }>;
  resetPassword: (email: string) => Promise<{ error?: Error }>;
  isAuthenticated: boolean;
  isDemoMode?: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
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

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: 'demo-user-123',
        email,
        name: email.split('@')[0],
        user_metadata: {
          full_name: email.split('@')[0],
          name: email.split('@')[0]
        }
      };
      
      setUser(mockUser);
      localStorage.setItem('accio_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: 'demo-user-' + Date.now(),
        email,
        name: name || email.split('@')[0],
        user_metadata: {
          full_name: name || email.split('@')[0],
          name: name || email.split('@')[0]
        }
      };
      
      setUser(mockUser);
      localStorage.setItem('accio_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('accio_user');
  };

  const signIn = async (email: string, password: string) => {
    try {
      await login(email, password);
      return {};
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      await register(email, password, name);
      return {};
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await logout();
  };

  const signInWithProvider = async (provider: string) => {
    try {
      // Simulate provider sign in
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: 'demo-user-' + Date.now(),
        email: `user@${provider}.com`,
        name: `${provider} User`,
        user_metadata: {
          full_name: `${provider} User`,
          name: `${provider} User`
        }
      };
      
      setUser(mockUser);
      localStorage.setItem('accio_user', JSON.stringify(mockUser));
      return {};
    } catch (error) {
      return { error: error as Error };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      // Simulate password reset
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {};
    } catch (error) {
      return { error: error as Error };
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    signIn,
    signUp,
    signOut,
    signInWithProvider,
    resetPassword,
    isAuthenticated: !!user,
    isDemoMode: true
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
