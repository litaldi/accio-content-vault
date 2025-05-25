
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ImprovedNavigation from '@/components/navigation/ImprovedNavigation';
import EnhancedHeroSection from '@/components/ui/enhanced-hero-section';
import ImprovedPageShowcase from '@/components/home/ImprovedPageShowcase';
import FeaturesSection from '@/components/home/FeaturesSection';
import CTASection from '@/components/home/CTASection';
import PricingSection from '@/components/home/PricingSection';
import FAQSection from '@/components/home/FAQSection';
import ImprovedFooter from '@/components/Footer/ImprovedFooter';
import { AccessibleLayout } from '@/components/layout/AccessibleLayout';
import { Helmet } from 'react-helmet-async';

const ImprovedIndex = () => {
  return (
    <AccessibleLayout>
      <div className="min-h-screen flex flex-col w-full">
        <Helmet>
          <title>Accio - Your Personal Knowledge Library</title>
          <meta name="description" content="Transform the internet into your curated knowledge base. Save, organize, and rediscover content with AI-powered intelligence." />
          <meta name="keywords" content="knowledge management, AI, content organization, search, productivity" />
          <meta property="og:title" content="Accio - Your Personal Knowledge Library" />
          <meta property="og:description" content="Transform the internet into your curated knowledge base with AI-powered intelligence." />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Accio - Your Personal Knowledge Library" />
          <meta name="twitter:description" content="Save, organize, and rediscover content with AI-powered intelligence." />
          <link rel="canonical" href="https://yoursite.com/" />
        </Helmet>
        
        <ImprovedNavigation />
        
        <main id="main-content" className="flex-grow w-full" role="main">
          <EnhancedHeroSection />
          <ImprovedPageShowcase />
          <FeaturesSection />
          <PricingSection />
          <FAQSection />
          <CTASection />
        </main>
        
        <ImprovedFooter />
      </div>
    </AccessibleLayout>
  );
};

export default ImprovedIndex;
