
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserMenu } from '@/components/navigation/UserMenu';
import { Brain, Menu } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AccessibilityButton } from '@/components/accessibility/AccessibilityButton';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link 
            to="/dashboard" 
            className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity"
          >
            <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Accio
            </span>
            <Badge variant="outline" className="text-xs">
              AI
            </Badge>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Main navigation">
            <Link 
              to="/dashboard" 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              to="/search" 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Search
            </Link>
            <Link 
              to="/library" 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Library
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-2">
            <AccessibilityButton className="hidden sm:flex" />
            <UserMenu />
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {children}
    </div>
  );
};

export default AuthenticatedLayout;
