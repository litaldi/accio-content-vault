
import React from 'react';
import { Helmet } from 'react-helmet-async';
import FeatureVerification from '@/components/FeatureVerification';
import DemoBanner from '@/components/demo/DemoBanner';

const FeatureTest: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Feature Testing - Accio Knowledge Engine</title>
        <meta name="description" content="Verify and test all features of the Accio knowledge management platform." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">Feature Testing Dashboard</h1>
              <p className="text-muted-foreground">
                Comprehensive testing interface to verify all core features are working correctly.
                Use the demo account to test functionality with sample data.
              </p>
            </div>

            <DemoBanner />
            <FeatureVerification />
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureTest;
