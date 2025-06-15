
import React from 'react';
import { Helmet } from 'react-helmet-async';
import UnifiedPageLayout from '@/components/layout/UnifiedPageLayout';
import HeroSection from '@/components/home/HeroSection';
import EnhancedFeaturesSection from '@/components/home/EnhancedFeaturesSection';
import QuickActionsSection from '@/components/home/QuickActionsSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import FinalCTASection from '@/components/home/FinalCTASection';

const Home: React.FC = () => {
  return (
    <UnifiedPageLayout
      title="Accio - Transform Information Into Organized Intelligence"
      description="AI-powered knowledge management platform that helps you save, organize, and rediscover everything that matters."
    >
      <Helmet>
        <title>Accio - AI-Powered Knowledge Management</title>
        <meta name="description" content="Transform scattered information into organized intelligence with Accio's AI-powered knowledge management platform." />
        <meta name="keywords" content="knowledge management, AI, productivity, note taking, content organization" />
      </Helmet>
      
      <HeroSection />
      <QuickActionsSection />
      <EnhancedFeaturesSection />
      <BenefitsSection />
      <FinalCTASection />
    </UnifiedPageLayout>
  );
};

export default Home;
