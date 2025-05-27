
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ArrowUp, 
  Search, 
  Sparkles,
  Menu,
  X,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface FloatingAction {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href?: string;
  onClick?: () => void;
  primary?: boolean;
  showWhenAuthenticated?: boolean;
}

export const UnifiedFloatingActions: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { user } = useAuth();

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setShowBackToTop(scrolled > 600); // Increased threshold for better UX
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

  // Close expanded menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-floating-actions]')) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isExpanded]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const quickActions: FloatingAction[] = [
    {
      id: 'search',
      icon: Search,
      label: 'Search',
      href: '/search'
    },
    {
      id: 'ai-features',
      icon: Sparkles,
      label: 'AI Features',
      href: '/ai-features'
    },
    {
      id: 'quick-save',
      icon: Plus,
      label: 'Quick Save',
      href: '/save',
      showWhenAuthenticated: true
    }
  ];

  // Filter actions based on authentication state
  const visibleActions = quickActions.filter(action => 
    !action.showWhenAuthenticated || (action.showWhenAuthenticated && user)
  );

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      data-floating-actions
      role="region"
      aria-label="Floating action buttons"
    >
      {/* Quick Action Menu - Hidden on large screens */}
      {visibleActions.length > 0 && (
        <div className={cn(
          "flex flex-col items-end gap-2 transition-all duration-300",
          "lg:hidden", // Hidden on desktop
          isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        )}>
          {visibleActions.map((action) => (
            <div
              key={action.id}
              className="flex items-center gap-3"
            >
              <div className="bg-background/95 backdrop-blur-sm px-3 py-1 rounded-full border text-sm font-medium shadow-md">
                {action.label}
              </div>
              <Button
                asChild={!!action.href}
                onClick={action.onClick}
                size="icon"
                variant={action.primary ? "default" : "secondary"}
                className={cn(
                  "h-12 w-12 rounded-full shadow-lg transition-all duration-200",
                  "hover:scale-110 active:scale-95",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                )}
                aria-label={action.label}
              >
                {action.href ? (
                  <Link to={action.href}>
                    <action.icon className="h-5 w-5" />
                  </Link>
                ) : (
                  <>
                    <action.icon className="h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Main Toggle Button - Only show on mobile when there are actions */}
      {visibleActions.length > 0 && (
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          size="icon"
          className={cn(
            "h-14 w-14 rounded-full shadow-lg transition-all duration-300 lg:hidden",
            "bg-primary hover:bg-primary/90",
            "hover:scale-110 active:scale-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          )}
          aria-label={isExpanded ? "Close quick actions" : "Open quick actions"}
          aria-expanded={isExpanded}
        >
          {isExpanded ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      )}

      {/* Back to Top Button - Minimalist arrow design */}
      {showBackToTop && (
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
      )}
    </div>
  );
};

export default UnifiedFloatingActions;
