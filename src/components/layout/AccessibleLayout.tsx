
import React from 'react';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import EnhancedAccessibilityButton from '@/components/accessibility/EnhancedAccessibilityButton';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import { Toaster } from '@/components/ui/toaster';
import { ThemingChecker } from '@/components/theme/ThemingChecker';
import { cn } from '@/lib/utils';

interface AccessibleLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const AccessibleLayout: React.FC<AccessibleLayoutProps> = ({ 
  children,
  className
}) => {
  return (
    <AccessibilityProvider>
      <ThemeProvider>
        <div className={cn("min-h-screen bg-background", className)}>
          {/* Skip Links for keyboard users */}
          <div className="sr-only focus-within:not-sr-only focus-within:fixed focus-within:top-0 focus-within:left-0 focus-within:z-50 focus-within:w-full focus-within:bg-background focus-within:p-4 focus-within:shadow-md">
            <div className="flex gap-4 justify-center">
              <a
                href="#main-content"
                className="rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                Skip to main content
              </a>
              <a
                href="#navigation"
                className="rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                Skip to navigation
              </a>
            </div>
          </div>
          
          {/* Main Content */}
          {children}
          
          {/* Enhanced accessibility button */}
          <EnhancedAccessibilityButton />
          
          {/* UI Consistency checker in development */}
          <ThemingChecker />
          
          {/* Toasts */}
          <Toaster />
        </div>
      </ThemeProvider>
    </AccessibilityProvider>
  );
};

export default AccessibleLayout;
