
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
        <title>Accio - Turn Your Brain Into a Supercomputer | AI Knowledge Engine</title>
        <meta name="description" content="Stop losing your best ideas. Transform scattered bookmarks and notes into an AI-powered knowledge engine. Save anything, find everything, become 10x more productive. Join 50,000+ professionals." />
        <meta name="keywords" content="AI knowledge management, productivity tools, smart bookmarks, digital brain, information organization, research assistant, knowledge base, AI search" />
        <link rel="canonical" href="/" />
        
        {/* Enhanced Open Graph */}
        <meta property="og:title" content="Accio - Turn Your Brain Into a Supercomputer" />
        <meta property="og:description" content="Join 50,000+ professionals who've transformed their productivity. Save anything, let AI organize it perfectly, find everything instantly." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image-hero.jpg" />
        <meta property="og:image:alt" content="Accio AI Knowledge Engine - Transform scattered information into organized intelligence" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Accio - Turn Your Brain Into a Supercomputer" />
        <meta name="twitter:description" content="Never lose another brilliant idea. AI-powered knowledge engine trusted by 50,000+ professionals." />
        <meta name="twitter:image" content="/og-image-hero.jpg" />
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
