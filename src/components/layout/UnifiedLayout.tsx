
import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsiveDesign } from '@/hooks/use-responsive-design';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import OrganizedNavigation from '@/components/navigation/OrganizedNavigation';
import MarketingFooter from '@/components/Footer/MarketingFooter';
import AccessibilityButton from '@/components/accessibility/AccessibilityButton';
import SkipLinks from '@/components/accessibility/SkipLinks';
import { Toaster } from '@/components/ui/toaster';

interface UnifiedLayoutProps {
  children: React.ReactNode;
  className?: string;
  showNavigation?: boolean;
  showFooter?: boolean;
  fullWidth?: boolean;
}

export const UnifiedLayout: React.FC<UnifiedLayoutProps> = ({
  children,
  className,
  showNavigation = true,
  showFooter = true,
  fullWidth = false
}) => {
  const { isMobile } = useResponsiveDesign();
  const { preferences } = useAccessibility();

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
        className
      )}
      lang="en"
    >
      {/* Skip Links */}
      <SkipLinks />

      {/* Navigation */}
      {showNavigation && <OrganizedNavigation />}

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
      {showFooter && <MarketingFooter />}

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default UnifiedLayout;
