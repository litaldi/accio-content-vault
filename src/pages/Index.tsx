
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { 
  HeroSection,
  StatsSection,
  EnhancedFeaturesSection,
  TestimonialsSection,
  BenefitsSection,
  FAQSection,
  FinalCTASection
} from '@/components/home';

const Index = () => {
  return (
    <UnifiedLayout>
      <Helmet>
        <title>Accio - Your AI-Powered Knowledge Engine</title>
        <meta name="description" content="Transform how you save, organize, and access digital content with Accio's intelligent AI-powered knowledge engine. Never lose important information again." />
        <meta name="keywords" content="knowledge management, AI organization, content saving, digital workspace" />
        <link rel="canonical" href="/" />
      </Helmet>

      <div className="py-12 space-y-24">
        <HeroSection />
        <StatsSection />
        <EnhancedFeaturesSection />
        <TestimonialsSection />
        <BenefitsSection />
        <FAQSection />
        <FinalCTASection />
      </div>
    </UnifiedLayout>
  );
};

export default Index;
