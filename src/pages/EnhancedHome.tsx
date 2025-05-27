
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HeroSection } from '@/components/home/HeroSection';
import ConsolidatedFeaturesSection from '@/components/features/ConsolidatedFeaturesSection';
import { ImprovedSkipLinks } from '@/components/accessibility/ImprovedSkipLinks';

const EnhancedHome = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Accio - AI-Powered Knowledge Engine</title>
        <meta name="description" content="Transform scattered information into organized intelligence with Accio's AI-powered knowledge management platform. Save, organize, and rediscover everything that matters." />
        <meta name="keywords" content="knowledge management, AI organization, digital library, semantic search, productivity tools" />
        <meta property="og:title" content="Accio - AI-Powered Knowledge Engine" />
        <meta property="og:description" content="Transform scattered information into organized intelligence with AI-powered knowledge management." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Accio - AI-Powered Knowledge Engine" />
        <meta name="twitter:description" content="Transform scattered information into organized intelligence with AI-powered knowledge management." />
      </Helmet>

      <ImprovedSkipLinks />
      
      <main id="main-content" tabIndex={-1} role="main" aria-label="Main content">
        <HeroSection />
        <ConsolidatedFeaturesSection />
      </main>
    </div>
  );
};

export default EnhancedHome;
