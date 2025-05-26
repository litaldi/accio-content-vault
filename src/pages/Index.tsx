
import React from 'react';
import { Helmet } from 'react-helmet-async';
import MainNavigation from '@/components/navigation/MainNavigation';
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
        <title>Accio - Transform Your Productivity with AI Knowledge Management | Save 5+ Hours Weekly</title>
        <meta name="description" content="Join 50,000+ professionals using Accio's AI-powered knowledge engine. Stop losing brilliant ideas. Reclaim 5+ hours weekly. Free forever plan available. Start your productivity revolution in 30 seconds." />
        <meta name="keywords" content="AI knowledge management, productivity tools, smart bookmarks, digital brain, information organization, research assistant, knowledge base, AI search, productivity revolution, save time, knowledge empire" />
        <link rel="canonical" href="/" />
        
        {/* Enhanced Open Graph for better social sharing */}
        <meta property="og:title" content="Accio - Stop Losing Brilliant Ideas. Start Your Knowledge Revolution." />
        <meta property="og:description" content="Join 50,000+ productivity champions who've transformed their workflow with AI-powered knowledge management. Reclaim 5+ hours weekly. Free forever." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image-hero.jpg" />
        <meta property="og:image:alt" content="Accio AI Knowledge Engine - Transform scattered information into organized intelligence and reclaim 5+ hours weekly" />
        <meta property="og:url" content="https://accio.app" />
        <meta property="og:site_name" content="Accio" />
        
        {/* Enhanced Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stop Losing Brilliant Ideas. Start Your Knowledge Revolution." />
        <meta name="twitter:description" content="Join 50,000+ productivity champions. AI-powered knowledge management that saves 5+ hours weekly. Free forever plan." />
        <meta name="twitter:image" content="/og-image-hero.jpg" />
        <meta name="twitter:creator" content="@AccioApp" />
        
        {/* Additional marketing-focused meta tags */}
        <meta name="author" content="Accio" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="theme-color" content="#3B82F6" />
        
        {/* Structured data for better SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Accio",
            "description": "AI-powered knowledge management platform that helps professionals save time and organize information",
            "url": "https://accio.app",
            "applicationCategory": "ProductivityApplication",
            "operatingSystem": "Web, iOS, Android",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "description": "Free forever plan available"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "2500"
            }
          })}
        </script>
      </Helmet>

      <MainNavigation />
      
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
