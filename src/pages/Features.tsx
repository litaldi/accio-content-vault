
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography, Spacing } from '@/components/ui/design-system';
import { AIContentCurationEngine } from '@/components/features/AIContentCurationEngine';
import { ImprovedSkipLinks } from '@/components/accessibility/ImprovedSkipLinks';

const Features = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Features - Accio AI-Powered Knowledge Management</title>
        <meta name="description" content="Explore Accio's powerful AI features including intelligent content curation, smart recommendations, and automated organization." />
      </Helmet>

      <ImprovedSkipLinks />
      
      <main id="main-content" tabIndex={-1} role="main" aria-label="Features page">
        <Spacing.Section size="lg">
          <Spacing.Container>
            <div className="text-center mb-12">
              <Typography.H1 className="mb-4">
                Intelligent Features for Modern Knowledge Workers
              </Typography.H1>
              <Typography.Lead>
                Discover how AI transforms the way you capture, organize, and discover knowledge
              </Typography.Lead>
            </div>
            
            <AIContentCurationEngine />
          </Spacing.Container>
        </Spacing.Section>
      </main>
    </div>
  );
};

export default Features;
