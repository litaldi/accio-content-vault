
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Typography, Spacing } from '@/components/ui/design-system';
import ConsolidatedFeaturesSection from '@/components/features/ConsolidatedFeaturesSection';
import { Sparkles, ArrowRight } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Features - Accio AI Knowledge Management</title>
        <meta 
          name="description" 
          content="Discover all the powerful features that make Accio the ultimate AI-powered knowledge management platform. Quick capture, intelligent search, AI insights, and more." 
        />
        <meta name="keywords" content="AI features, knowledge management, quick capture, intelligent search, AI insights" />
      </Helmet>
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <Spacing.Section size="lg" className="bg-gradient-to-br from-primary/5 via-background to-blue-500/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true" />
          
          <Spacing.Container className="relative">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-8 animate-fade-in">
                <Sparkles className="h-3 w-3 mr-1" aria-hidden="true" />
                Complete Feature Overview
              </Badge>
              
              <Typography.H1 className="mb-8 animate-slide-up">
                Powerful Features for
                <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent block sm:inline">
                  {" "}Knowledge Excellence
                </span>
              </Typography.H1>
              
              <Typography.Lead className="mb-12 max-w-3xl mx-auto animate-slide-up">
                Discover the comprehensive suite of AI-powered tools designed to transform 
                how you capture, organize, search, and leverage your knowledge. Every feature 
                works together to create your ultimate knowledge sanctuary.
              </Typography.Lead>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in">
                <Button 
                  size="lg" 
                  className="group shadow-lg hover:shadow-xl transition-all" 
                  asChild
                >
                  <a href="/register">
                    Start Using Features
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="group border-2 hover:bg-primary/5" 
                  asChild
                >
                  <a href="/ai-features">
                    Explore AI Features
                    <Sparkles className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </Spacing.Container>
        </Spacing.Section>

        {/* Features Section */}
        <ConsolidatedFeaturesSection />

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-primary/10 to-blue-600/10">
          <Spacing.Container className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Experience the Full Power of Accio
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Every feature is designed to work seamlessly together, creating a knowledge 
              management experience that's both powerful and intuitive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-all">
                <a href="/register">Start Your Free Trial</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/pricing">View Pricing</a>
              </Button>
            </div>
          </Spacing.Container>
        </section>
      </div>
    </>
  );
};

export default Features;
