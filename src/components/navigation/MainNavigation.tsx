
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useResponsiveDesign } from '@/hooks/use-responsive-design';
import NavigationLogo from './NavigationLogo';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import UserMenu from './UserMenu';
import LanguageSelector from './LanguageSelector';

const MainNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMobile } = useResponsiveDesign();
  const { preferences, announceToScreenReader } = useAccessibility();
  
  // Safely use auth context with fallback
  let user = null;
  let signOut = () => {};
  
  try {
    const authContext = useAuth();
    user = authContext.user;
    signOut = authContext.signOut;
  } catch (error) {
    console.warn('AuthProvider not available, navigation will work in guest mode');
  }

  const isLoggedIn = !!user;

  // Enhanced scroll handler with better performance
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await signOut();
      announceToScreenReader('Successfully signed out');
      navigate('/');
    } catch (error) {
      announceToScreenReader('Error signing out');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        "border-b border-border/40 bg-background/95 backdrop-blur-xl",
        "supports-[backdrop-filter]:bg-background/80",
        scrolled && "shadow-lg border-border/60",
        preferences.highContrast && "border-2 border-foreground",
        "dark:border-border/20 dark:bg-background/90"
      )}
      role="banner"
      dir={preferences.language === 'he' || preferences.language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <NavigationLogo />
          <DesktopNav isLoggedIn={isLoggedIn} />
          
          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSelector />
            <ModeToggle />
            <UserMenu isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
            <MobileNav 
              isLoggedIn={isLoggedIn}
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
