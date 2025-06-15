import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Brain, Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const Navigation: React.FC = () => {
  const { user } = useAuth();

  return (
    <nav className="modern-nav">
      <div className="container-modern flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <Brain className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Accio</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/features" className="modern-nav-item">
            Features
          </Link>
          <Link to="/pricing" className="modern-nav-item">
            Pricing
          </Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="modern-nav-item">
                Dashboard
              </Link>
              <Button variant="outline">
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          )}
        </div>

        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
