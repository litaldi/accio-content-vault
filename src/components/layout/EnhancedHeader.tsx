
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UnifiedAuthModal } from '@/components/auth/UnifiedAuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedHeaderProps {
  className?: string;
}

export const EnhancedHeader: React.FC<EnhancedHeaderProps> = ({ className }) => {
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signup' | 'login'>('signup');

  const handleGetStarted = () => {
    setAuthModalTab('signup');
    setAuthModalOpen(true);
  };

  const handleLogin = () => {
    setAuthModalTab('login');
    setAuthModalOpen(true);
  };

  return (
    <>
      <header className={cn(
        "sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}>
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-primary">Accio</span>
          </Link>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            {/* Authentication Buttons or User Menu */}
            {!user ? (
              <div className="flex items-center gap-2">
                {/* Login Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogin}
                  className="hidden sm:flex items-center gap-2 text-sm font-medium hover:bg-accent transition-colors"
                  aria-label="Log in to your account"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Log In</span>
                </Button>

                {/* Get Started Button */}
                <Button
                  onClick={handleGetStarted}
                  size="sm"
                  className="flex items-center gap-2 text-sm font-medium shadow-sm hover:shadow-md transition-all"
                  aria-label="Get started with Accio"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Get Started</span>
                </Button>

                {/* Mobile unified button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGetStarted}
                  className="sm:hidden"
                  aria-label="Sign up or log in"
                >
                  Join
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                asChild
              >
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Unified Auth Modal */}
      <UnifiedAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </>
  );
};

export default EnhancedHeader;
