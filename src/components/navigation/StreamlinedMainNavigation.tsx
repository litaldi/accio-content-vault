
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Brain } from 'lucide-react';
import { DesktopNavigation } from './DesktopNavigation';
import { DesktopActions } from './DesktopActions';
import { MobileMenu } from './MobileMenu';

const StreamlinedMainNavigation = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            aria-label="Accio homepage"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Accio</span>
          </Link>

          <DesktopNavigation user={user} />
          <DesktopActions user={user} onSignOut={handleSignOut} />
          <MobileMenu 
            user={user} 
            isOpen={isOpen} 
            setIsOpen={setIsOpen} 
            onSignOut={handleSignOut} 
          />
        </div>
      </div>
    </header>
  );
};

export default StreamlinedMainNavigation;
