
import * as React from "react"

export interface BreakpointValues {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

export function useBreakpoint(): BreakpointValues {
  const [breakpoint, setBreakpoint] = React.useState<BreakpointValues>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });
  
  React.useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      setBreakpoint({
        isMobile: width < MOBILE_BREAKPOINT,
        isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
        isDesktop: width >= TABLET_BREAKPOINT,
      });
    };
    
    // Check on mount
    checkBreakpoint();
    
    // Add resize listener
    window.addEventListener("resize", checkBreakpoint);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);
  
  return breakpoint;
}

export function useIsMobile() {
  const { isMobile } = useBreakpoint();
  return isMobile;
}
