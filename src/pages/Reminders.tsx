
import React from 'react';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import { Helmet } from 'react-helmet-async';
import { Typography } from '@/components/ui/design-system';

const Reminders: React.FC = () => {
  return (
    <AuthenticatedLayout>
      <Helmet>
        <title>Reminders - Accio</title>
        <meta name="description" content="Manage your knowledge reminders and notifications" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <Typography.H1 className="mb-8">
          Reminders
        </Typography.H1>
        <Typography.Body>
          Set reminders to revisit important content and maintain your learning momentum.
        </Typography.Body>
      </div>
    </AuthenticatedLayout>
  );
};

export default Reminders;
