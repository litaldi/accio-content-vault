
import React from 'react';
import { Helmet } from 'react-helmet-async';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import { DashboardContent } from '@/components/Dashboard/DashboardContent';

const Dashboard: React.FC = () => {
  return (
    <AuthenticatedLayout>
      <Helmet>
        <title>Dashboard - Accio</title>
        <meta name="description" content="Your personal knowledge management dashboard" />
      </Helmet>
      
      <main id="main-content" aria-label="Dashboard content" className="container mx-auto px-4 py-8">
        <DashboardContent />
      </main>
    </AuthenticatedLayout>
  );
};

export default Dashboard;
