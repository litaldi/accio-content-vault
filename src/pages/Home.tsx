
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProfessionalNavigation from '@/components/navigation/ProfessionalNavigation';
import ImprovedFooter from '@/components/layout/ImprovedFooter';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import PricingSection from '@/components/home/PricingSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Accio - Transform Knowledge into Power</title>
        <meta name="description" content="The intelligent platform that captures, organizes, and transforms any content into searchable knowledge. Stop losing valuable insights—start building your personal knowledge sanctuary." />
        <meta name="keywords" content="knowledge management, AI, content organization, search, productivity" />
        <meta property="og:title" content="Accio - Transform Knowledge into Power" />
        <meta property="og:description" content="The intelligent platform that captures, organizes, and transforms any content into searchable knowledge." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://accio.app" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background">
        <ProfessionalNavigation />
        
        <main id="main-content" className="flex-grow">
          <HeroSection />
          <FeaturesSection />
          <TestimonialsSection />
          <PricingSection />
          <CTASection />
        </main>
        
        <ImprovedFooter />
      </div>
    </>
  );
};

export default Home;
