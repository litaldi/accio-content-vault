
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  ArrowUp, 
  Search, 
  Sparkles,
  Menu,
  X
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
      setShowBackToTop(scrolled > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      id: 'save-content',
      icon: Plus,
      label: 'Save Content',
      href: '/save',
      primary: true,
      showWhenAuthenticated: true
    },
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
    }
  ];

  // Filter actions based on authentication state
  const visibleActions = quickActions.filter(action => 
    !action.showWhenAuthenticated || (action.showWhenAuthenticated && user)
  );

  // Don't render on desktop when no user and no quick actions
  if (!user && visibleActions.length === 0 && !showBackToTop) {
    return null;
  }

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      data-floating-actions
    >
      {/* Quick Action Menu - Hidden on large screens if user not authenticated */}
      {(user || visibleActions.length > 0) && (
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
                  "hover:scale-110 active:scale-95"
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
      {(user || visibleActions.length > 0) && (
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          size="icon"
          className={cn(
            "h-14 w-14 rounded-full shadow-lg transition-all duration-300 lg:hidden",
            "bg-primary hover:bg-primary/90",
            "hover:scale-110 active:scale-95"
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

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          variant="outline"
          className={cn(
            "h-12 w-12 rounded-full shadow-lg transition-all duration-300",
            "bg-background/95 backdrop-blur-sm border",
            "hover:bg-accent hover:scale-110 active:scale-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          )}
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default UnifiedFloatingActions;
