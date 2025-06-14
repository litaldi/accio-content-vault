
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AppHeader } from './AppHeader';
import AuthenticatedLayout from './AuthenticatedLayout';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
