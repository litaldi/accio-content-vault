
import React from 'react';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import { Helmet } from 'react-helmet-async';
import { Typography } from '@/components/ui/design-system';

const SavedContent: React.FC = () => {
  return (
    <AuthenticatedLayout>
      <Helmet>
        <title>Saved Content - Accio</title>
        <meta name="description" content="Access and manage all your saved content" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <Typography.H1 className="mb-8">
          Saved Content
        </Typography.H1>
        <Typography.Body>
          Your saved content will appear here. Start capturing knowledge to build your personal library.
        </Typography.Body>
      </div>
    </AuthenticatedLayout>
  );
};

export default SavedContent;
