
import React from 'react';
import { Helmet } from 'react-helmet-async';
import UnifiedTopNavigation from '@/components/navigation/UnifiedTopNavigation';
import GlobalFooter from '@/components/layout/GlobalFooter';

interface UnifiedPageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  showNavigation?: boolean;
  showFooter?: boolean;
}

const UnifiedPageLayout: React.FC<UnifiedPageLayoutProps> = ({
  children,
  title = 'Accio - AI-Powered Knowledge Engine',
  description = 'Transform how you save, organize, and access information with AI-powered intelligence.',
  className = '',
  showNavigation = true,
  showFooter = true,
}) => {
  return (
    <div className={`min-h-screen flex flex-col bg-background ${className}`}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
      </Helmet>

      {showNavigation && <UnifiedTopNavigation />}
      
      <main className="flex-grow" role="main">
        {children}
      </main>
      
      {showFooter && <GlobalFooter />}
    </div>
  );
};

export default UnifiedPageLayout;
