
import React from 'react';
import { Helmet } from 'react-helmet-async';
import EnterpriseNavigation from '@/components/navigation/EnterpriseNavigation';
import EnterpriseFooter from '@/components/layout/EnterpriseFooter';
import EnterpriseHeroSection from '@/components/home/EnterpriseHeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import PricingSection from '@/components/home/PricingSection';
import EnterpriseTestimonialsSection from '@/components/home/EnterpriseTestimonialsSection';
import CTASection from '@/components/home/CTASection';
import FAQSection from '@/components/home/FAQSection';

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Accio Enterprise - Transform Knowledge into Competitive Advantage</title>
        <meta name="description" content="The enterprise knowledge platform trusted by industry leaders. Transform scattered information into AI-powered intelligence with enterprise-grade security and compliance." />
        <meta name="keywords" content="enterprise knowledge management, AI platform, business intelligence, team collaboration, SOC 2 compliance" />
        <meta property="og:title" content="Accio Enterprise - Transform Knowledge into Competitive Advantage" />
        <meta property="og:description" content="The enterprise knowledge platform trusted by industry leaders. Transform scattered information into AI-powered intelligence." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://accio.app/og-enterprise.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Accio Enterprise - Transform Knowledge into Competitive Advantage" />
        <meta name="twitter:description" content="The enterprise knowledge platform trusted by industry leaders." />
        <link rel="canonical" href="https://accio.app" />
        
        {/* Structured Data for Enterprise */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Accio Enterprise",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "description": "Enterprise knowledge management platform with AI-powered intelligence",
            "offers": {
              "@type": "Offer",
              "category": "Enterprise Software",
              "businessFunction": "Knowledge Management"
            },
            "provider": {
              "@type": "Organization",
              "name": "Accio Technologies",
              "url": "https://accio.app"
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background">
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
        
        <EnterpriseNavigation />
        
        <main id="main-content" className="flex-grow" role="main">
          <EnterpriseHeroSection />
          <FeaturesSection />
          <EnterpriseTestimonialsSection />
          <PricingSection />
          <FAQSection />
          <CTASection />
        </main>
        
        <EnterpriseFooter />
      </div>
    </>
  );
};

export default Home;
