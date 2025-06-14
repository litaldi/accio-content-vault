
import React from 'react';
import { ModernHeader } from './ModernHeader';
import { ModernFooter } from './ModernFooter';

interface ModernLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
}

export const ModernLayout: React.FC<ModernLayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  className = ''
}) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950 ${className}`}>
      {showHeader && <ModernHeader />}
      <main className="flex-1">
        {children}
      </main>
      {showFooter && <ModernFooter />}
    </div>
  );
};

export default ModernLayout;
