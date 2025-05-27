
import React from 'react';
import { Outlet } from 'react-router-dom';
import UnifiedNavigation from '@/components/navigation/UnifiedNavigation';
import Footer from '@/components/layout/Footer';
import { ImprovedSkipLinks } from '@/components/accessibility/ImprovedSkipLinks';

interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ImprovedSkipLinks />
      
      <header>
        <UnifiedNavigation />
      </header>
      
      <main className="flex-1" id="main-content" tabIndex={-1}>
        {children || <Outlet />}
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;
