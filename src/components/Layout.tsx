
import React from 'react';
import { Outlet } from 'react-router-dom';
import MegaMenuNavigation from '@/components/navigation/MegaMenuNavigation';
import Footer from '@/components/Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MegaMenuNavigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
