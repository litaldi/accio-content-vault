
import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsiveDesign } from '@/hooks/use-responsive-design';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import UnifiedNavigation from '@/components/navigation/UnifiedNavigation';
import UnifiedFooter from '@/components/Footer/UnifiedFooter';
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
        "min-h-screen flex flex-col w-full bg-background text-foreground",
        // Apply accessibility preferences
        preferences.highContrast && "high-contrast",
        preferences.reducedMotion && "reduce-motion",
        preferences.fontSize === 'large' && "font-size-large",
        preferences.fontSize === 'small' && "font-size-small",
        preferences.lineSpacing === 'relaxed' && "line-spacing-relaxed",
        preferences.lineSpacing === 'loose' && "line-spacing-loose",
        preferences.highlightLinks && "highlight-links",
        className
      )}
      style={{
        fontSize: preferences.fontSize === 'large' ? '1.125rem' : 
                 preferences.fontSize === 'small' ? '0.875rem' : undefined
      }}
    >
      {/* Skip to content for keyboard users */}
      <a
        href="#main-content"
        className={cn(
          "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50",
          "bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        )}
      >
        Skip to main content
      </a>

      {/* Navigation */}
      {showNavigation && <UnifiedNavigation />}
      
      {/* Main Content */}
      <main 
        id="main-content"
        className={cn(
          "flex-grow w-full",
          !fullWidth && "container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        )}
        role="main"
      >
        {children}
      </main>

      {/* Footer */}
      {showFooter && <UnifiedFooter />}
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default UnifiedLayout;
