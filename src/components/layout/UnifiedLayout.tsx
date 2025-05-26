
import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsiveDesign } from '@/hooks/use-responsive-design';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import MainNavigation from '@/components/navigation/MainNavigation';
import ImprovedFooter from '@/components/layout/ImprovedFooter';
import AccessibilityButton from '@/components/accessibility/AccessibilityButton';
import SkipToContent from '@/components/accessibility/SkipToContent';
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
        "min-h-screen flex flex-col w-full transition-all duration-300",
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
      {/* Skip Links for accessibility */}
      <SkipToContent />

      {/* Navigation */}
      {showNavigation && <MainNavigation />}

      {/* Main Content */}
      <main
        id="main-content"
        className={cn(
          "flex-grow w-full relative",
          // Add smooth transitions for better UX
          "transition-all duration-300 ease-in-out",
          !fullWidth && "container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        )}
        role="main"
        tabIndex={-1}
        aria-label="Main content"
      >
        <div className="animate-fade-in">
          {children}
        </div>
      </main>

      {/* Accessibility Button */}
      <AccessibilityButton variant="floating" />

      {/* Footer */}
      {showFooter && <ImprovedFooter />}

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default UnifiedLayout;
