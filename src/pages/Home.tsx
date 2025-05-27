
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SkipLink } from '@/components/ui/skip-link';
import ImprovedHeroSection from '@/components/home/ImprovedHeroSection';
import ConsolidatedFeaturesSection from '@/components/features/ConsolidatedFeaturesSection';
import { Layout } from '@/components/design-system/DesignSystem';

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Accio - Transform Knowledge Into Wealth | AI-Powered Knowledge Management</title>
        <meta 
          name="description" 
          content="Never lose brilliant ideas again. Build your knowledge empire with AI-powered content organization, intelligent search, and seamless capture tools that understand how you think." 
        />
        <meta name="keywords" content="knowledge management, AI, content organization, search, productivity, knowledge wealth, note taking, research" />
        <link rel="canonical" href="https://accio.app" />
        <meta property="og:title" content="Accio - Transform Knowledge Into Wealth" />
        <meta property="og:description" content="Never lose brilliant ideas again. Build your knowledge empire with AI-powered content organization." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://accio.app" />
        <meta property="og:image" content="https://accio.app/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Accio - Transform Knowledge Into Wealth" />
        <meta name="twitter:description" content="Never lose brilliant ideas again. Build your knowledge empire with AI-powered content organization." />
        <meta name="twitter:image" content="https://accio.app/og-image.jpg" />
      </Helmet>
      
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      
      <div className="min-h-screen" id="main-content">
        <ImprovedHeroSection />
        <ConsolidatedFeaturesSection />
      </div>
    </>
  );
};

export default Home;
