
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  user_metadata?: {
    role?: string;
    [key: string]: any;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loading: boolean; // Alias for compatibility
  isDemoMode: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: { name?: string }) => Promise<void>;
  signInWithProvider: (provider: string) => Promise<void>;
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
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode] = useState(true); // Default to demo mode

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('accio_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('accio_user');
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        user_metadata: {
          role: 'user'
        }
      };
      
      setUser(mockUser);
      localStorage.setItem('accio_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, metadata?: { name?: string }): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name: metadata?.name || email.split('@')[0],
        user_metadata: {
          role: 'user'
        }
      };
      
      setUser(mockUser);
      localStorage.setItem('accio_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithProvider = async (provider: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser: User = {
        id: Date.now().toString(),
        email: `user@${provider}.com`,
        name: `${provider} User`,
        user_metadata: {
          role: 'user',
          provider
        }
      };
      
      setUser(mockUser);
      localStorage.setItem('accio_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error(`Failed to sign in with ${provider}`);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
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

  const value: AuthContextType = {
    user,
    isLoading,
    loading: isLoading, // Alias for compatibility
    isDemoMode,
    signIn,
    signUp,
    signInWithProvider,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
