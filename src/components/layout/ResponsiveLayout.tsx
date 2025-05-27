
import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsiveLayout } from '@/hooks/use-responsive-layout';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebarWidth?: 'sm' | 'md' | 'lg';
  collapsibleSidebar?: boolean;
}

const sidebarWidthClasses = {
  sm: 'w-64',
  md: 'w-72',
  lg: 'w-80'
};

/**
 * Main responsive layout component that handles different screen sizes
 * and provides consistent spacing and structure
 */
export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  className = '',
  sidebar,
  header,
  footer,
  sidebarWidth = 'md',
  collapsibleSidebar = true
}) => {
  const { isMobile, isTablet } = useResponsiveLayout();
  const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile);

  // Close sidebar on mobile by default
  React.useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      {header && (
        <div className="sticky top-0 z-50">
          {header}
        </div>
      )}

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebar && (
          <>
            {/* Desktop Sidebar */}
            <aside className={cn(
              "hidden lg:flex lg:flex-col border-r bg-muted/20 transition-all duration-300",
              sidebarWidthClasses[sidebarWidth],
              !sidebarOpen && collapsibleSidebar && "lg:w-16"
            )}>
              {sidebar}
            </aside>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (isMobile || isTablet) && (
              <>
                <div 
                  className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                  aria-hidden="true"
                />
                <aside className="fixed left-0 top-0 z-50 h-full w-72 bg-background border-r shadow-xl lg:hidden overflow-y-auto">
                  {sidebar}
                </aside>
              </>
            )}
          </>
        )}

        {/* Main Content */}
        <main className={cn(
          "flex-1 overflow-y-auto",
          className
        )}>
          {children}
        </main>
      </div>

      {/* Footer */}
      {footer && (
        <div className="border-t bg-muted/20">
          {footer}
        </div>
      )}
    </div>
  );
};

export default ResponsiveLayout;
