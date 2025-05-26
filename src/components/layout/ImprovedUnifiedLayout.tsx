
import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsiveDesign } from '@/hooks/use-responsive-design';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import PrimaryNavigation from '@/components/navigation/PrimaryNavigation';
import ImprovedFooter from '@/components/Footer/ImprovedFooter';
import AccessibilityButton from '@/components/accessibility/AccessibilityButton';
import SkipLinks from '@/components/accessibility/SkipLinks';
import { Toaster } from '@/components/ui/toaster';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImprovedUnifiedLayoutProps {
  children: React.ReactNode;
  className?: string;
  showNavigation?: boolean;
  showFooter?: boolean;
  fullWidth?: boolean;
  isLoggedIn?: boolean;
  user?: any;
  onSignOut?: () => void;
}

export const ImprovedUnifiedLayout: React.FC<ImprovedUnifiedLayoutProps> = ({
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
        "min-h-screen flex flex-col w-full bg-background text-foreground transition-colors duration-300",
        // Apply accessibility preferences
        preferences.highContrast && "high-contrast",
        preferences.reducedMotion && "reduce-motion",
        preferences.fontSize === 'large' && "text-lg",
        preferences.fontSize === 'small' && "text-sm",
        className
      )}
      dir={preferences.language === 'he' || preferences.language === 'ar' ? 'rtl' : 'ltr'}
      lang={preferences.language}
    >
      {/* Skip Links */}
      <SkipLinks />

      {/* Navigation */}
      {showNavigation && (
        <PrimaryNavigation 
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
        aria-label="Main content"
      >
        {children}
      </main>

      {/* Floating Action Button for Mobile */}
      {isLoggedIn && isMobile && (
        <Button
          onClick={handleQuickAction}
          className={cn(
            "fixed bottom-20 right-6 z-40",
            "w-14 h-14 rounded-full",
            "shadow-lg hover:shadow-xl transition-all duration-200",
            "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            preferences.reducedMotion ? "transform-none" : "hover:scale-110"
          )}
          aria-label="Add content quickly"
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}

      {/* Accessibility Button */}
      <AccessibilityButton variant="floating" />

      {/* Footer */}
      {showFooter && <ImprovedFooter />}

      {/* Toast Notifications */}
      <Toaster />

      {/* Screen reader announcements region */}
      <div 
        id="announcements" 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      />
    </div>
  );
};

export default ImprovedUnifiedLayout;
