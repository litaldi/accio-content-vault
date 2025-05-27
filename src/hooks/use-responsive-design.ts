
import { useState, useEffect } from 'react';

interface ResponsiveBreakpoints {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeScreen: boolean;
  screenSize: 'mobile' | 'tablet' | 'desktop' | 'large';
  width: number;
  height: number;
}

export const useResponsiveDesign = (): ResponsiveBreakpoints => {
  const [breakpoints, setBreakpoints] = useState<ResponsiveBreakpoints>(() => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isLargeScreen: false,
        screenSize: 'desktop',
        width: 1024,
        height: 768
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024 && width < 1440;
    const isLargeScreen = width >= 1440;

    return {
      isMobile,
      isTablet,
      isDesktop,
      isLargeScreen,
      screenSize: isMobile ? 'mobile' : isTablet ? 'tablet' : isDesktop ? 'desktop' : 'large',
      width,
      height
    };
  });

  useEffect(() => {
    const updateBreakpoints = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024 && width < 1440;
      const isLargeScreen = width >= 1440;

      setBreakpoints({
        isMobile,
        isTablet,
        isDesktop,
        isLargeScreen,
        screenSize: isMobile ? 'mobile' : isTablet ? 'tablet' : isDesktop ? 'desktop' : 'large',
        width,
        height
      });
    };

    // Add event listener with throttling
    let timeoutId: number;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(updateBreakpoints, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return breakpoints;
};

export default useResponsiveDesign;
