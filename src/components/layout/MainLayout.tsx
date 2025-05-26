
import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsiveLayout } from '@/hooks/use-responsive-layout';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Toaster } from '@/components/ui/toaster';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  showControls?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className,
  showControls = true,
  maxWidth = 'xl'
}) => {
  const { isMobile } = useResponsiveLayout();

  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full'
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to main content
      </a>

      {/* Theme Controls - Top Right */}
      {showControls && (
        <div className={cn(
          "fixed z-50 flex items-center gap-2",
          "top-4 right-4",
          isMobile ? "top-3 right-3" : "top-6 right-6"
        )}>
          <ModeToggle />
        </div>
      )}

      {/* Main Content */}
      <main 
        id="main-content"
        className={cn(
          "mx-auto w-full",
          maxWidthClasses[maxWidth],
          className
        )}
        role="main"
      >
        {children}
      </main>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default MainLayout;
