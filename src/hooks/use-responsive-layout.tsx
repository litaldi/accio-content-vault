
import { useState, useEffect } from 'react';

interface ResponsiveBreakpoints {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  currentBreakpoint: 'mobile' | 'tablet' | 'desktop' | 'large-desktop';
}

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
  largeDesktop: 1536
} as const;

/**
 * Hook for responsive layout management with consistent breakpoints
 * across the application. Provides current screen size information
 * and responsive utilities.
 */
export const useResponsiveLayout = (): ResponsiveBreakpoints => {
  const [screenSize, setScreenSize] = useState<ResponsiveBreakpoints>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
    currentBreakpoint: 'mobile'
  });

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      
      const isMobile = width < BREAKPOINTS.mobile;
      const isTablet = width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet;
      const isDesktop = width >= BREAKPOINTS.tablet && width < BREAKPOINTS.largeDesktop;
      const isLargeDesktop = width >= BREAKPOINTS.largeDesktop;
      
      let currentBreakpoint: ResponsiveBreakpoints['currentBreakpoint'];
      if (isMobile) currentBreakpoint = 'mobile';
      else if (isTablet) currentBreakpoint = 'tablet';
      else if (isDesktop) currentBreakpoint = 'desktop';
      else currentBreakpoint = 'large-desktop';
      
      setScreenSize({
        isMobile,
        isTablet,
        isDesktop,
        isLargeDesktop,
        currentBreakpoint
      });
    };

    // Initial check
    updateScreenSize();

    // Add event listener with throttling for performance
    let timeoutId: number;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(updateScreenSize, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return screenSize;
};

export default useResponsiveLayout;
