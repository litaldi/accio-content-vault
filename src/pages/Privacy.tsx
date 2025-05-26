import React from 'react';
import { Helmet } from 'react-helmet-async';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { Card, CardContent } from '@/components/ui/card';

const Privacy = () => {
  return (
    <UnifiedLayout>
      <Helmet>
        <title>Privacy Policy - Accio Knowledge Library</title>
        <meta name="description" content="Learn how Accio protects your privacy and handles your personal information." />
      </Helmet>

      <Card>
        <CardContent>
          Privacy Policy Content
        </CardContent>
      </Card>
    </UnifiedLayout>
  );
};

export default Privacy;
