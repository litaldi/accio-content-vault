
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const checkSession = async () => {
      setLoading(false);
    };
    
    checkSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock sign in - replace with actual auth logic
      const mockUser = { id: '1', email, name: 'Demo User' };
      setUser(mockUser);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    setLoading(true);
    try {
      // Mock sign up - replace with actual auth logic
      const mockUser = { id: '1', email, name: name || 'Demo User' };
      setUser(mockUser);
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
    signOut,
    loading,
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
