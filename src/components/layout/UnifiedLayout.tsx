
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from './Header';
import { Footer } from './Footer';
import { QAButton } from './QAButton';
import { useResponsiveDesign } from '@/hooks/use-responsive-design';

interface UnifiedLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const UnifiedLayout: React.FC<UnifiedLayoutProps> = ({ 
  children, 
  className = '' 
}) => {
  const { isMobile } = useResponsiveDesign();

  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      
      <div className={`min-h-screen flex flex-col bg-background text-foreground ${className}`}>
        <Header />
        
        <main className="flex-1" role="main">
          {children}
        </main>
        
        <Footer />
        
        {/* QA Button for development */}
        <QAButton />
      </div>
    </>
  );
};
