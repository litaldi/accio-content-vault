
import React from 'react';
import { AppHeader } from './AppHeader';
import { AppFooter } from './AppFooter';

interface UnifiedLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

export const UnifiedLayout: React.FC<UnifiedLayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true
}) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {showHeader && <AppHeader />}
      <main className="flex-1">
        {children}
      </main>
      {showFooter && <AppFooter />}
    </div>
  );
};

export default UnifiedLayout;
