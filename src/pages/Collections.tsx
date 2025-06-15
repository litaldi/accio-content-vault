
import React from 'react';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import SmartCollections from '@/components/content/SmartCollections';
import { Helmet } from 'react-helmet-async';

const Collections: React.FC = () => {
  return (
    <AuthenticatedLayout>
      <Helmet>
        <title>Collections - Accio</title>
        <meta name="description" content="Organize your knowledge into smart collections" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <SmartCollections />
      </div>
    </AuthenticatedLayout>
  );
};

export default Collections;
