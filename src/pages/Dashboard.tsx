
import React from 'react';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import { Helmet } from 'react-helmet-async';

const Dashboard: React.FC = () => {
  return (
    <AuthenticatedLayout>
      <Helmet>
        <title>Dashboard - Accio</title>
        <meta name="description" content="Your personal knowledge management dashboard" />
      </Helmet>
      
      <main id="main-content" role="main" aria-label="Dashboard content">
        <div data-testid="enhanced-dashboard">
          <h2>Welcome back!</h2>
          <div data-testid="quick-actions">
            <button>Save Content</button>
            <button>Bulk Import</button>
          </div>
          <div data-testid="activity-feed">
            <h3>Recent Activity</h3>
            <div>No recent activity</div>
          </div>
          <div data-testid="notifications">
            <h3>Notifications</h3>
            <div>No notifications</div>
          </div>
        </div>
      </main>
    </AuthenticatedLayout>
  );
};

export default Dashboard;
