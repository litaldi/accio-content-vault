
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import NavbarHeader from './NavbarHeader';
import NavbarDesktopLinks from './NavbarDesktopLinks';
import NavbarMobileMenu from './NavbarMobileMenu';
import NavbarActions from './NavbarActions';
import SkipToContent from '@/components/SkipToContent';

interface EnhancedNavbarProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

const EnhancedNavbar: React.FC<EnhancedNavbarProps> = ({ onLogout }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const isLoggedIn = !!user;
  const isMobile = useIsMobile();
  
  // Handle scroll effect for navbar with performance optimization
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 10;
          if (isScrolled !== scrolled) {
            setScrolled(isScrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleLogout = async () => {
    if (onLogout) {
      onLogout();
    } else {
      await signOut();
    }
  };

  const getUserInitials = () => {
    if (!user?.email) return 'U';
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <>
      <SkipToContent />
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-background/95 backdrop-blur-md shadow-sm border-border' 
            : 'bg-background border-transparent'
        }`}
        role="banner"
        aria-label="Main navigation"
      >
        <div className="container flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <NavbarHeader />
            {!isMobile && (
              <NavbarDesktopLinks isLoggedIn={isLoggedIn} currentPath={location.pathname} />
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <NavbarActions 
              isLoggedIn={isLoggedIn} 
              isMobile={isMobile} 
              handleLogout={handleLogout}
              getUserInitials={getUserInitials}
            />
            {isMobile && (
              <NavbarMobileMenu isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default EnhancedNavbar;
