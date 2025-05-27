
import React from 'react';
import InternalNavigation from '../navigation/InternalNavigation';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <InternalNavigation />
      <main className="flex-1 lg:ml-0">
        {children}
      </main>
    </div>
  );
};

export default AuthenticatedLayout;
