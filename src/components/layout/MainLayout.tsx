
import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsiveDesign } from '@/hooks/use-responsive-design';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import ImprovedNavigation from '@/components/navigation/ImprovedNavigation';
import ImprovedFooter from '@/components/Footer/ImprovedFooter';
import { Toaster } from '@/components/ui/toaster';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  showNavigation?: boolean;
  showFooter?: boolean;
  fullWidth?: boolean;
  isLoggedIn?: boolean;
  user?: any;
  onSignOut?: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className,
  showNavigation = true,
  showFooter = true,
  fullWidth = false,
  isLoggedIn = false,
  user,
  onSignOut
}) => {
  const { isMobile } = useResponsiveDesign();
  const { preferences, announceToScreenReader } = useAccessibility();

  const handleQuickAction = () => {
    announceToScreenReader('Navigating to save content page');
    window.location.href = '/save';
  };

  return (
    <div 
      className={cn(
        "min-h-screen flex flex-col w-full bg-background text-foreground",
        // Apply accessibility preferences
        preferences.highContrast && "high-contrast",
        preferences.reducedMotion && "reduce-motion",
        preferences.fontSize === 'large' && "text-lg",
        preferences.fontSize === 'small' && "text-sm",
        "transition-colors duration-300",
        className
      )}
    >
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className={cn(
          "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100]",
          "bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "transition-all duration-200"
        )}
      >
        Skip to main content
      </a>

      {/* Navigation */}
      {showNavigation && (
        <ImprovedNavigation 
          isLoggedIn={isLoggedIn}
          user={user}
          onSignOut={onSignOut}
        />
      )}

      {/* Main Content */}
      <main
        id="main-content"
        className={cn(
          "flex-grow w-full",
          !fullWidth && "container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        )}
        role="main"
        tabIndex={-1}
      >
        {children}
      </main>

      {/* Floating Action Button for Mobile */}
      {isLoggedIn && isMobile && (
        <Button
          onClick={handleQuickAction}
          className={cn(
            "fixed bottom-6 right-6 z-40",
            "w-14 h-14 rounded-full shadow-lg hover:shadow-xl",
            "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70",
            "transition-all duration-200",
            "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            preferences.reducedMotion ? "transform-none" : "hover:scale-110"
          )}
          aria-label="Add content quickly"
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}

      {/* Footer */}
      {showFooter && <ImprovedFooter />}

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default MainLayout;
