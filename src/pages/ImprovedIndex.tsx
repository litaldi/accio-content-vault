
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import ImprovedUnifiedLayout from '@/components/layout/ImprovedUnifiedLayout';
import MarketingHeroSection from '@/components/home/MarketingHeroSection';
import ImprovedPageShowcase from '@/components/home/ImprovedPageShowcase';
import FeaturesSection from '@/components/home/FeaturesSection';
import CTASection from '@/components/home/CTASection';
import MarketingPricingSection from '@/components/home/MarketingPricingSection';
import FAQSection from '@/components/home/FAQSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import SocialProofSection from '@/components/home/SocialProofSection';
import UseCasesSection from '@/components/home/UseCasesSection';
import TrustSignalsSection from '@/components/home/TrustSignalsSection';
import { EnhancedCard, EnhancedCardContent, EnhancedCardDescription, EnhancedCardHeader, EnhancedCardTitle } from '@/components/ui/enhanced-card';
import { ImprovedButton } from '@/components/ui/improved-button';
import { Search, BookOpen, BarChart3, Settings, Sparkles } from 'lucide-react';

const ImprovedIndexContent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const quickActions = [
    {
      title: "Search Content",
      description: "Find anything in your knowledge library instantly",
      icon: Search,
      action: () => navigate('/search'),
      color: "bg-blue-500"
    },
    {
      title: "Dashboard",
      description: "View your saved content and insights",
      icon: BookOpen,
      action: () => navigate('/dashboard'),
      color: "bg-green-500"
    },
    {
      title: "Analytics",
      description: "Track your knowledge growth",
      icon: BarChart3,
      action: () => navigate('/analytics'),
      color: "bg-purple-500"
    },
    {
      title: "Settings",
      description: "Customize your experience",
      icon: Settings,
      action: () => navigate('/settings'),
      color: "bg-orange-500"
    }
  ];

  return (
    <ImprovedUnifiedLayout isLoggedIn={isLoggedIn} user={user}>
      <Helmet>
        <title>Accio - AI-Powered Knowledge Management | Save, Organize, Find Everything</title>
        <meta name="description" content="Transform scattered bookmarks into an AI-powered knowledge engine. Save anything, find everything, achieve 10x productivity. Trusted by 10K+ professionals. Free forever plan available." />
        <meta name="keywords" content="knowledge management, AI, productivity, content organization, search, bookmarks, notes, research, information management, digital workspace" />
        <meta property="og:title" content="Accio - AI-Powered Knowledge Management | Save, Organize, Find Everything" />
        <meta property="og:description" content="Turn scattered bookmarks into an AI-powered knowledge engine. Save anything, find everything, achieve more with intelligent organization." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://accio.app/" />
        <meta property="og:image" content="https://accio.app/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Accio - Your AI Knowledge Engine" />
        <meta name="twitter:description" content="Save anything, find everything, achieve 10x productivity with AI-powered organization." />
        <meta name="twitter:image" content="https://accio.app/twitter-image.jpg" />
        <link rel="canonical" href="https://accio.app/" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Accio" />
        <meta name="theme-color" content="#3B82F6" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Helmet>

      <div className="space-y-16">
        <MarketingHeroSection />
        
        {/* Quick Access Section for returning users */}
        {isLoggedIn && (
          <section className="py-16 bg-muted/30" aria-labelledby="quick-access-heading">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 id="quick-access-heading" className="text-3xl font-bold mb-4">Welcome back!</h2>
                <p className="text-xl text-muted-foreground">
                  Quick access to your most used features
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {quickActions.map((action) => (
                  <EnhancedCard 
                    key={action.title}
                    interactive
                    elevated
                    onClick={action.action}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        action.action();
                      }
                    }}
                    aria-label={`${action.title}: ${action.description}`}
                    className="group"
                  >
                    <EnhancedCardHeader className="text-center">
                      <div className={`w-12 h-12 mx-auto mb-4 ${action.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <action.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <EnhancedCardTitle className="text-lg">{action.title}</EnhancedCardTitle>
                      <EnhancedCardDescription>{action.description}</EnhancedCardDescription>
                    </EnhancedCardHeader>
                    <EnhancedCardContent>
                      <ImprovedButton 
                        variant="outline" 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          action.action();
                        }}
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Access Now
                      </ImprovedButton>
                    </EnhancedCardContent>
                  </EnhancedCard>
                ))}
              </div>
            </div>
          </section>
        )}
        
        <SocialProofSection />
        <ImprovedPageShowcase />
        <FeaturesSection />
        <UseCasesSection />
        <TestimonialsSection />
        <MarketingPricingSection />
        <TrustSignalsSection />
        <FAQSection />
        <CTASection />
      </div>
    </ImprovedUnifiedLayout>
  );
};

const ImprovedIndex = () => {
  return (
    <AccessibilityProvider>
      <ImprovedIndexContent />
    </AccessibilityProvider>
  );
};

export default ImprovedIndex;
