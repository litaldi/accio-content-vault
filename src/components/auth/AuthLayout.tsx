
import React from 'react';
import { AuthHeader } from './AuthHeader';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-8">
          <AuthHeader title={title} subtitle={subtitle} />
          {children}
        </div>
      </main>
    </div>
  );
};
