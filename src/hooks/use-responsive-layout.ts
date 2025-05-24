
import { useState, useEffect } from 'react';

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  width: number;
  height: number;
  orientation: 'portrait' | 'landscape';
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
  prefersColorScheme: 'light' | 'dark' | 'no-preference';
}

export const useResponsiveLayout = (): ResponsiveState => {
  const [state, setState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
    width: 0,
    height: 0,
    orientation: 'portrait',
    prefersReducedMotion: false,
    prefersHighContrast: false,
    prefersColorScheme: 'no-preference'
  });

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Check media queries
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

      let prefersColorScheme: 'light' | 'dark' | 'no-preference' = 'no-preference';
      if (prefersDark) prefersColorScheme = 'dark';
      else if (prefersLight) prefersColorScheme = 'light';

      setState({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024 && width < 1440,
        isLargeDesktop: width >= 1440,
        width,
        height,
        orientation: width > height ? 'landscape' : 'portrait',
        prefersReducedMotion,
        prefersHighContrast,
        prefersColorScheme
      });
    };

    // Initial check
    updateLayout();

    // Add event listeners
    window.addEventListener('resize', updateLayout);
    window.addEventListener('orientationchange', updateLayout);

    // Media query listeners
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    const darkSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const lightSchemeQuery = window.matchMedia('(prefers-color-scheme: light)');

    const handleMediaChange = () => updateLayout();

    reducedMotionQuery.addEventListener('change', handleMediaChange);
    highContrastQuery.addEventListener('change', handleMediaChange);
    darkSchemeQuery.addEventListener('change', handleMediaChange);
    lightSchemeQuery.addEventListener('change', handleMediaChange);

    return () => {
      window.removeEventListener('resize', updateLayout);
      window.removeEventListener('orientationchange', updateLayout);
      reducedMotionQuery.removeEventListener('change', handleMediaChange);
      highContrastQuery.removeEventListener('change', handleMediaChange);
      darkSchemeQuery.removeEventListener('change', handleMediaChange);
      lightSchemeQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  return state;
};
