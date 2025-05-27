import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SkipLink } from '@/components/ui/skip-link';
import HeroSection from '@/components/home/HeroSection';
import ConsolidatedFeaturesSection from '@/components/features/ConsolidatedFeaturesSection';
import { Layout } from '@/components/design-system/DesignSystem';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Accio - AI-Powered Knowledge Engine</title>
        <meta name="description" content="Transform information chaos into organized intelligence with Accio's AI-powered knowledge management platform." />
      </Helmet>

      <SkipLink href="#main-content">Skip to main content</SkipLink>
      
      <div className="min-h-screen" id="main-content">
        <HeroSection />
        <ConsolidatedFeaturesSection />
      </div>
    </div>
  );
};

export default Home;
