
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import MainMenu from '@/components/navigation/MainMenu';
import EnhancedDashboard from '@/components/Dashboard/EnhancedDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <Helmet>
        <title>Dashboard - Accio</title>
        <meta name="description" content="Your personal content dashboard with AI-powered insights and productivity tools" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <MainMenu />
        <main id="main-content" role="main" aria-label="Dashboard content">
          <EnhancedDashboard />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
