
import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsiveDesign } from '@/hooks/use-responsive-design';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import MainNavigation from '@/components/navigation/MainNavigation';
import AppFooter from '@/components/layout/AppFooter';
import AccessibilityButton from '@/components/accessibility/AccessibilityButton';
import SkipLinks from '@/components/accessibility/SkipLinks';
import { Toaster } from '@/components/ui/toaster';

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
  fullWidth = false
}) => {
  const { isMobile } = useResponsiveDesign();
  const { preferences, announceToScreenReader } = useAccessibility();

  return (
    <div 
      className={cn(
        "min-h-screen flex flex-col w-full transition-colors duration-300",
        "bg-background text-foreground",
        // Apply accessibility preferences
        preferences.highContrast && "high-contrast",
        preferences.reducedMotion && "reduce-motion",
        preferences.fontSize === 'large' && "text-lg",
        preferences.fontSize === 'small' && "text-sm",
        // Enhanced dark mode support
        "dark:bg-background dark:text-foreground",
        className
      )}
      dir={preferences.language === 'he' || preferences.language === 'ar' ? 'rtl' : 'ltr'}
      lang={preferences.language}
    >
      {/* Skip Links */}
      <SkipLinks />

      {/* Navigation */}
      {showNavigation && <MainNavigation />}

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

      {/* Accessibility Button */}
      <AccessibilityButton variant="floating" />

      {/* Footer */}
      {showFooter && <AppFooter />}

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
