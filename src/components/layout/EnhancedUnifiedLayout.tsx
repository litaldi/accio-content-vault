
import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsiveDesign } from '@/hooks/use-responsive-design';
import EnhancedUnifiedNavigation from '@/components/navigation/EnhancedUnifiedNavigation';
import EnhancedUnifiedFooter from '@/components/Footer/EnhancedUnifiedFooter';
import { Toaster } from '@/components/ui/toaster';
import { Plus } from 'lucide-react';

interface EnhancedUnifiedLayoutProps {
  children: React.ReactNode;
  className?: string;
  showNavigation?: boolean;
  showFooter?: boolean;
  fullWidth?: boolean;
  isLoggedIn?: boolean;
  user?: { email?: string };
  onSignOut?: () => void;
}

export const EnhancedUnifiedLayout: React.FC<EnhancedUnifiedLayoutProps> = ({
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

  return (
    <div 
      className={cn(
        "min-h-screen flex flex-col w-full bg-background text-foreground",
        className
      )}
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
      {showNavigation && (
        <EnhancedUnifiedNavigation 
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
      >
        {children}
      </main>

      {/* Floating Add Button for Mobile */}
      {isLoggedIn && isMobile && (
        <button
          className={cn(
            "fixed bottom-6 right-6 z-40",
            "w-14 h-14 rounded-full bg-primary text-primary-foreground",
            "shadow-lg hover:shadow-xl transition-shadow duration-200",
            "flex items-center justify-center",
            "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          )}
          aria-label="Add content"
          onClick={() => window.location.href = '/save'}
        >
          <Plus className="h-6 w-6" />
        </button>
      )}

      {/* Footer */}
      {showFooter && <EnhancedUnifiedFooter />}
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default EnhancedUnifiedLayout;
