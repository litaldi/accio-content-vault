
import { useState, useEffect } from 'react';

export interface ResponsiveBreakpoints {
  sm: boolean;   // >= 640px
  md: boolean;   // >= 768px
  lg: boolean;   // >= 1024px
  xl: boolean;   // >= 1280px
  '2xl': boolean; // >= 1536px
}

export interface ResponsiveState extends ResponsiveBreakpoints {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  orientation: 'portrait' | 'landscape';
}

export const useResponsiveDesign = (): ResponsiveState => {
  const [state, setState] = useState<ResponsiveState>({
    sm: false,
    md: false,
    lg: false,
    xl: false,
    '2xl': false,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    screenWidth: 0,
    orientation: 'landscape'
  });

  useEffect(() => {
    const updateScreenInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      const breakpoints = {
        sm: width >= 640,
        md: width >= 768,
        lg: width >= 1024,
        xl: width >= 1280,
        '2xl': width >= 1536
      };

      setState({
        ...breakpoints,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        screenWidth: width,
        orientation: width > height ? 'landscape' : 'portrait'
      });
    };

    // Initial call
    updateScreenInfo();

    // Add event listener with throttling
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateScreenInfo, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return state;
};
