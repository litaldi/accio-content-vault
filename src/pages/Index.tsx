
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PrimaryNavigation from '@/components/navigation/PrimaryNavigation';
import MarketingHeroSection from '@/components/home/MarketingHeroSection';
import ImprovedPageShowcase from '@/components/home/ImprovedPageShowcase';
import FeaturesSection from '@/components/home/FeaturesSection';
import CTASection from '@/components/home/CTASection';
import MarketingPricingSection from '@/components/home/MarketingPricingSection';
import FAQSection from '@/components/home/FAQSection';
import ImprovedFooter from '@/components/Footer/ImprovedFooter';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Helmet>
        <title>Accio - Stop Losing Your Best Ideas. Start Building Brilliance.</title>
        <meta name="description" content="Transform chaos into your AI-powered knowledge engine. Save anything, find everything, achieve 10x productivity. Trusted by 10K+ professionals." />
        <meta name="keywords" content="knowledge management, AI, productivity, content organization, search, bookmarks, notes, research" />
        <meta property="og:title" content="Accio - Stop Losing Your Best Ideas. Start Building Brilliance." />
        <meta property="og:description" content="Turn scattered bookmarks into an AI-powered knowledge engine. Save anything, find everything, achieve more." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Accio - Your AI Knowledge Engine" />
        <meta name="twitter:description" content="Save anything, find everything, achieve 10x productivity with AI-powered organization." />
        <link rel="canonical" href="https://yoursite.com/" />
      </Helmet>
      
      <PrimaryNavigation />
      
      <main id="main-content" className="flex-grow w-full" role="main">
        <MarketingHeroSection />
        <ImprovedPageShowcase />
        <FeaturesSection />
        <MarketingPricingSection />
        <FAQSection />
        <CTASection />
      </main>
      
      <ImprovedFooter />
    </div>
  );
};

export default Index;
