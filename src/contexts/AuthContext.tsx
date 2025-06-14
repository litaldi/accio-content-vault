
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  session: { access_token: string } | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<{ access_token: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const checkSession = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        const savedSession = localStorage.getItem('session');
        
        if (savedUser && savedSession) {
          setUser(JSON.parse(savedUser));
          setSession(JSON.parse(savedSession));
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Demo user for testing
      if (email === 'demo@yourapp.com' && password === 'Demo1234!') {
        const demoUser = { id: 'demo', email: 'demo@yourapp.com', name: 'Demo User' };
        const demoSession = { access_token: 'demo-token' };
        
        setUser(demoUser);
        setSession(demoSession);
        localStorage.setItem('user', JSON.stringify(demoUser));
        localStorage.setItem('session', JSON.stringify(demoSession));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setUser(null);
    setSession(null);
    localStorage.removeItem('user');
    localStorage.removeItem('session');
  };

  return (
    <AuthContext.Provider value={{ user, session, signIn, signOut, loading }}>
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
