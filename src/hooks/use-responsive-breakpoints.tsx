
import { useState, useEffect } from 'react';

interface ResponsiveBreakpoints {
  isXs: boolean;      // < 475px
  isSm: boolean;      // 475px - 639px
  isMd: boolean;      // 640px - 767px
  isLg: boolean;      // 768px - 1023px
  isXl: boolean;      // 1024px - 1279px
  is2Xl: boolean;     // 1280px - 1535px
  is3Xl: boolean;     // >= 1536px
  isMobile: boolean;  // < 768px
  isTablet: boolean;  // 768px - 1023px
  isDesktop: boolean; // >= 1024px
  width: number;
  height: number;
}

const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;

/**
 * Enhanced responsive breakpoints hook with granular screen size detection
 * Provides precise breakpoint information for responsive design
 */
export const useResponsiveBreakpoints = (): ResponsiveBreakpoints => {
  const [dimensions, setDimensions] = useState<ResponsiveBreakpoints>({
    isXs: false,
    isSm: false,
    isMd: false,
    isLg: false,
    isXl: false,
    is2Xl: false,
    is3Xl: false,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    width: 0,
    height: 0
  });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      const isXs = width < BREAKPOINTS.xs;
      const isSm = width >= BREAKPOINTS.xs && width < BREAKPOINTS.sm;
      const isMd = width >= BREAKPOINTS.sm && width < BREAKPOINTS.md;
      const isLg = width >= BREAKPOINTS.md && width < BREAKPOINTS.lg;
      const isXl = width >= BREAKPOINTS.lg && width < BREAKPOINTS.xl;
      const is2Xl = width >= BREAKPOINTS.xl && width < BREAKPOINTS['2xl'];
      const is3Xl = width >= BREAKPOINTS['2xl'];
      
      const isMobile = width < BREAKPOINTS.md;
      const isTablet = width >= BREAKPOINTS.md && width < BREAKPOINTS.lg;
      const isDesktop = width >= BREAKPOINTS.lg;
      
      setDimensions({
        isXs,
        isSm,
        isMd,
        isLg,
        isXl,
        is2Xl,
        is3Xl,
        isMobile,
        isTablet,
        isDesktop,
        width,
        height
      });
    };

    // Initial check
    updateDimensions();

    // Optimized resize handler with debouncing
    let timeoutId: number;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(updateDimensions, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return dimensions;
};

export default useResponsiveBreakpoints;
