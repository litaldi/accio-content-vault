
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface Session {
  access_token: string;
  user: User;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize auth state from localStorage
    const storedUser = localStorage.getItem('auth_user');
    const storedSession = localStorage.getItem('auth_session');

    if (storedUser && storedSession) {
      try {
        setUser(JSON.parse(storedUser));
        setSession(JSON.parse(storedSession));
      } catch (error) {
        console.error('Error parsing stored auth data:', error);
      }
    }

    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Mock authentication - in real app this would call your auth service
    const mockUser: User = {
      id: 'user-123',
      email: email,
      name: email.split('@')[0]
    };

    const mockSession: Session = {
      access_token: 'mock-token-' + Date.now(),
      user: mockUser
    };

    setUser(mockUser);
    setSession(mockSession);

    localStorage.setItem('auth_user', JSON.stringify(mockUser));
    localStorage.setItem('auth_session', JSON.stringify(mockSession));
  };

  const signOut = async () => {
    setUser(null);
    setSession(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_session');
  };

  const value: AuthContextType = {
    user,
    session,
    signIn,
    signOut,
    loading
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
