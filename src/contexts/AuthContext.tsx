
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    name?: string;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  signIn: (email: string, password: string) => Promise<{ error?: Error }>;
  signUp: (name: string, email: string, password: string) => Promise<{ error?: Error }>;
  signOut: () => Promise<void>;
  signInWithProvider: (provider: string) => Promise<{ error?: Error }>;
  resetPassword: (email: string) => Promise<{ error?: Error }>;
  isLoading: boolean;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode] = useState(false);

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: email,
        user_metadata: {
          full_name: 'John Doe',
          name: 'John Doe'
        }
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await login(email, password);
      return {};
    } catch (error) {
      return { error: error as Error };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: '1',
        name: name,
        email: email,
        user_metadata: {
          full_name: name,
          name: name
        }
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      await register(name, email, password);
      return {};
    } catch (error) {
      return { error: error as Error };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const signOut = async () => {
    logout();
  };

  const signInWithProvider = async (provider: string) => {
    try {
      // Simulate provider sign-in
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: '1',
        name: 'Google User',
        email: 'user@gmail.com',
        user_metadata: {
          full_name: 'Google User',
          name: 'Google User'
        }
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
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

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        signIn,
        signUp,
        signOut,
        signInWithProvider,
        resetPassword,
        isLoading,
        isDemoMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
