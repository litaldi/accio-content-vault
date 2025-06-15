
import React from 'react';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import KnowledgeInsights from '@/components/analytics/KnowledgeInsights';
import { Helmet } from 'react-helmet-async';

const Analytics: React.FC = () => {
  return (
    <AuthenticatedLayout>
      <Helmet>
        <title>Analytics - Accio</title>
        <meta name="description" content="Track your learning progress and knowledge insights" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <KnowledgeInsights />
      </div>
    </AuthenticatedLayout>
  );
};

export default Analytics;
