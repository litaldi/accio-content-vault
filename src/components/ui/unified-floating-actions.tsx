
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export const UnifiedFloatingActions: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setShowBackToTop(scrolled > 800); // Show after more scrolling
    };

    const throttledHandleScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, []);

  // Simple throttle function
  function throttle(func: Function, delay: number) {
    let timeoutId: NodeJS.Timeout;
    let lastExecTime = 0;
    return function (...args: any[]) {
      const currentTime = Date.now();
      if (currentTime - lastExecTime > delay) {
        func(...args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Only show back to top when needed
  if (!showBackToTop) return null;

  return (
    <div 
      className="fixed bottom-6 right-6 z-50"
      role="region"
      aria-label="Floating action button"
    >
      {/* Back to Top Button - Clean, minimal design */}
      <Button
        onClick={scrollToTop}
        size="icon"
        variant="outline"
        className={cn(
          "h-12 w-12 rounded-full shadow-lg transition-all duration-300",
          "bg-background/95 backdrop-blur-sm border-2",
          "hover:bg-accent hover:scale-110 active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          // Ensure sufficient touch target for mobile
          "min-h-[48px] min-w-[48px]"
        )}
        aria-label="Back to top"
        title="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default UnifiedFloatingActions;
