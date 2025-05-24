
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface NavigationState {
  activeDropdown: string | null;
  isMobileMenuOpen: boolean;
  scrolled: boolean;
}

export const useNavigation = () => {
  const location = useLocation();
  const [state, setState] = useState<NavigationState>({
    activeDropdown: null,
    isMobileMenuOpen: false,
    scrolled: false,
  });

  // Handle scroll effect for navbar
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;
          setState(prev => ({ ...prev, scrolled: isScrolled }));
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setState(prev => ({
      ...prev,
      isMobileMenuOpen: false,
      activeDropdown: null,
    }));
  }, [location.pathname]);

  const setActiveDropdown = (dropdown: string | null) => {
    setState(prev => ({ ...prev, activeDropdown: dropdown }));
  };

  const setMobileMenuOpen = (open: boolean) => {
    setState(prev => ({ ...prev, isMobileMenuOpen: open }));
  };

  const closeAllMenus = () => {
    setState(prev => ({
      ...prev,
      activeDropdown: null,
      isMobileMenuOpen: false,
    }));
  };

  return {
    ...state,
    setActiveDropdown,
    setMobileMenuOpen,
    closeAllMenus,
  };
};
