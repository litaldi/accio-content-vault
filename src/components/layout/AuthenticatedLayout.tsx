
import React from 'react';
import UnifiedPageLayout from './UnifiedPageLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children,
  title = "Accio - Knowledge Management",
  description = "Your personal knowledge management platform"
}) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <UnifiedPageLayout title={title} description={description}>
      {children}
    </UnifiedPageLayout>
  );
};

export default AuthenticatedLayout;
