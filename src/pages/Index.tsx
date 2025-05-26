
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/Footer';
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
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Accio - Your AI-Powered Knowledge Engine</title>
        <meta name="description" content="Transform how you save, organize, and access digital content with Accio's intelligent AI-powered knowledge engine. Never lose important information again." />
        <meta name="keywords" content="knowledge management, AI organization, content saving, digital workspace" />
        <link rel="canonical" href="/" />
      </Helmet>

      <Navigation />
      
      <main className="flex-1" role="main">
        <div className="py-12 space-y-24">
          <HeroSection />
          <StatsSection />
          <EnhancedFeaturesSection />
          <TestimonialsSection />
          <BenefitsSection />
          <FAQSection />
          <FinalCTASection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
