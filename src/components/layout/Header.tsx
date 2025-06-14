
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';
import { UserMenu } from '@/components/navigation/UserMenu';
import { Button } from '@/components/ui/button';

export const Header: React.FC = () => {
  return (
    <header 
      className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link 
          to="/dashboard" 
          className="flex items-center gap-2 text-xl font-bold hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
          aria-label="Accio - Go to dashboard"
        >
          <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Brain className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Accio
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
          <Link 
            to="/dashboard" 
            className="text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
          >
            Dashboard
          </Link>
          <Link 
            to="/profile" 
            className="text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
          >
            Profile
          </Link>
          <Link 
            to="/settings" 
            className="text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
          >
            Settings
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
