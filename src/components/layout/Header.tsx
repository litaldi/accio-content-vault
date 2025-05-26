
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-background border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">A</span>
            </div>
            <span className="font-bold text-xl text-primary">Accio</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/features" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link 
              to="/about" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Auth Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="outline" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
