
import React from 'react';
import { ModernLayout } from '@/components/layout/ModernLayout';
import { ModernHeroSection } from '@/components/home/ModernHeroSection';
import { ModernDashboard } from '@/components/dashboard/ModernDashboard';
import { useAuth } from '@/contexts/AuthContext';

export const ModernHomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <ModernLayout>
      {user ? <ModernDashboard /> : <ModernHeroSection />}
    </ModernLayout>
  );
};

export default ModernHomePage;
