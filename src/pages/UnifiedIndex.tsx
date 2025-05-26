
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import PrimaryNavigation from '@/components/navigation/PrimaryNavigation';
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
import ImprovedFooter from '@/components/Footer/ImprovedFooter';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, BookOpen, BarChart3, Settings, Sparkles } from 'lucide-react';

const UnifiedIndexContent = () => {
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
    <div className="min-h-screen flex flex-col w-full">
      <Helmet>
        <title>Accio - Stop Losing Your Best Ideas. Start Building Brilliance.</title>
        <meta name="description" content="Transform chaos into your AI-powered knowledge engine. Save anything, find everything, achieve 10x productivity. Trusted by 10K+ professionals." />
        <meta name="keywords" content="knowledge management, AI, productivity, content organization, search, bookmarks, notes, research" />
        <meta property="og:title" content="Accio - Stop Losing Your Best Ideas. Start Building Brilliance." />
        <meta property="og:description" content="Turn scattered bookmarks into an AI-powered knowledge engine. Save anything, find everything, achieve more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yoursite.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Accio - Your AI Knowledge Engine" />
        <meta name="twitter:description" content="Save anything, find everything, achieve 10x productivity with AI-powered organization." />
        <link rel="canonical" href="https://yoursite.com/" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Accio" />
        <meta name="theme-color" content="#3B82F6" />
      </Helmet>
      
      <PrimaryNavigation />
      
      <main id="main-content" className="flex-grow w-full" role="main">
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
                  <Card 
                    key={action.title} 
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 group"
                    onClick={action.action}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        action.action();
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${action.title}: ${action.description}`}
                  >
                    <CardHeader className="text-center">
                      <div className={`w-12 h-12 mx-auto mb-4 ${action.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <action.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                      <CardDescription>{action.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          action.action();
                        }}
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Access Now
                      </Button>
                    </CardContent>
                  </Card>
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
      </main>
      
      <ImprovedFooter />
    </div>
  );
};

const UnifiedIndex = () => {
  return (
    <ThemeProvider>
      <AccessibilityProvider>
        <AuthProvider>
          <UnifiedIndexContent />
        </AuthProvider>
      </AccessibilityProvider>
    </ThemeProvider>
  );
};

export default UnifiedIndex;
