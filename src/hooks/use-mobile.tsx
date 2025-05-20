
import * as React from "react"

export interface BreakpointValues {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
}

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

export function useBreakpoint(): BreakpointValues {
  const [breakpoint, setBreakpoint] = React.useState<BreakpointValues>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenWidth: typeof window !== 'undefined' ? window.innerWidth : 1200,
  });
  
  React.useEffect(() => {
    // Initial check
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      setBreakpoint({
        isMobile: width < MOBILE_BREAKPOINT,
        isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
        isDesktop: width >= TABLET_BREAKPOINT,
        screenWidth: width,
      });
    };
    
    // Check on mount
    checkBreakpoint();
    
    // Add resize listener with debounce for performance
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkBreakpoint, 100);
    };
    
    window.addEventListener("resize", handleResize);
    
    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return breakpoint;
}

export function useIsMobile() {
  const { isMobile } = useBreakpoint();
  return isMobile;
}

export function useIsTablet() {
  const { isTablet } = useBreakpoint();
  return isTablet;
}

export function useIsDesktop() {
  const { isDesktop } = useBreakpoint();
  return isDesktop;
}

export function useIsSmallScreen() {
  const { isMobile, isTablet } = useBreakpoint();
  return isMobile || isTablet;
}

export function useScreenWidth() {
  const { screenWidth } = useBreakpoint();
  return screenWidth;
}
