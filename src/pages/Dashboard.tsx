
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DashboardContent } from '@/components/Dashboard/DashboardContent';
import { ImprovedSkipLinks } from '@/components/accessibility/ImprovedSkipLinks';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dashboard - Accio</title>
        <meta name="description" content="Your personal knowledge management dashboard" />
      </Helmet>

      <ImprovedSkipLinks />
      
      <main id="main-content" tabIndex={-1} role="main" aria-label="Dashboard">
        <DashboardContent />
      </main>
    </div>
  );
};

export default Dashboard;
