
import React, { createContext, useContext, useState, useEffect } from 'react';

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
  session: { access_token: string } | null;
  loading: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: Error }>;
  signUp: (name: string, email: string, password: string) => Promise<{ error?: Error }>;
  signOut: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: Error }>;
  signInWithProvider: (provider: 'google' | 'github') => Promise<{ error?: Error }>;
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
        const demoUser = { 
          id: 'demo', 
          email: 'demo@yourapp.com', 
          name: 'Demo User',
          user_metadata: { full_name: 'Demo User', name: 'Demo User' }
        };
        const demoSession = { access_token: 'demo-token' };
        
        setUser(demoUser);
        setSession(demoSession);
        localStorage.setItem('user', JSON.stringify(demoUser));
        localStorage.setItem('session', JSON.stringify(demoSession));
        return {};
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      return { error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const newUser = { 
        id: 'new-user', 
        email, 
        name,
        user_metadata: { full_name: name, name }
      };
      const newSession = { access_token: 'new-token' };
      
      setUser(newUser);
      setSession(newSession);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('session', JSON.stringify(newSession));
      return {};
    } catch (error) {
      return { error: error as Error };
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

  const login = async (email: string, password: string) => {
    const result = await signIn(email, password);
    if (result.error) {
      throw result.error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    const result = await signUp(name, email, password);
    if (result.error) {
      throw result.error;
    }
  };

  const logout = async () => {
    await signOut();
  };

  const resetPassword = async (email: string) => {
    try {
      // Simulate password reset
      console.log('Password reset sent to:', email);
      return {};
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signInWithProvider = async (provider: 'google' | 'github') => {
    try {
      // Simulate OAuth sign in
      const oauthUser = { 
        id: `${provider}-user`, 
        email: `user@${provider}.com`, 
        name: `${provider} User`,
        user_metadata: { full_name: `${provider} User`, name: `${provider} User` }
      };
      const oauthSession = { access_token: `${provider}-token` };
      
      setUser(oauthUser);
      setSession(oauthSession);
      localStorage.setItem('user', JSON.stringify(oauthUser));
      localStorage.setItem('session', JSON.stringify(oauthSession));
      return {};
    } catch (error) {
      return { error: error as Error };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading,
      isLoading: loading,
      isAuthenticated: !!user,
      isDemoMode: user?.email === 'demo@yourapp.com',
      signIn, 
      signUp,
      signOut,
      login,
      register,
      logout,
      resetPassword,
      signInWithProvider
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
