
import { useState, useEffect } from 'react';

interface ResponsiveLayoutState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenSize: 'mobile' | 'tablet' | 'desktop';
}

export const useResponsiveLayout = (): ResponsiveLayoutState => {
  const [state, setState] = useState<ResponsiveLayoutState>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    screenSize: 'desktop'
  });

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;

      setState({
        isMobile,
        isTablet,
        isDesktop,
        screenSize: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'
      });
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  return state;
};
