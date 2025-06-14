
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BookOpen, Search, Brain, ArrowRight } from 'lucide-react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { HomeHeroSection } from '@/components/home/HomeHeroSection';
import { HomeFeaturesSection } from '@/components/home/HomeFeaturesSection';
import { HomeTestimonialsSection } from '@/components/home/HomeTestimonialsSection';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Accio - AI-Powered Knowledge Management Platform</title>
        <meta name="description" content="Transform scattered information into organized intelligence with Accio's AI-powered knowledge management platform. Get started free today." />
        <meta property="og:title" content="Accio - AI-Powered Knowledge Management" />
        <meta property="og:description" content="Organize, search, and leverage your knowledge like never before with AI." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://accio.app" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <HomeHeroSection />
        <HomeFeaturesSection />
        <HomeTestimonialsSection />

        {/* Quick Actions Demo */}
        <section className="section-spacing-sm bg-muted/10">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h3 className="text-2xl font-bold mb-8">Quick Actions</h3>
            <div className="grid-features max-w-3xl mx-auto">
              <EnhancedCard 
                variant="interactive" 
                padding="lg"
                data-tour="save-button"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">Save Content</p>
                    <p className="text-sm text-muted-foreground">One-click capture</p>
                  </div>
                </div>
              </EnhancedCard>
              
              <EnhancedCard variant="interactive" padding="lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">Smart Search</p>
                    <p className="text-sm text-muted-foreground">⌘K to search</p>
                  </div>
                </div>
              </EnhancedCard>
              
              <EnhancedCard variant="interactive" padding="lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">AI Organize</p>
                    <p className="text-sm text-muted-foreground">Auto-categorize</p>
                  </div>
                </div>
              </EnhancedCard>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-spacing bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-4xl text-center space-8">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Knowledge?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of professionals who have revolutionized their information management with Accio.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <EnhancedButton 
                variant="secondary" 
                size="lg"
                emphasis="high"
                showArrow
                asChild
              >
                <Link to="/register">Start Free Trial</Link>
              </EnhancedButton>
              <EnhancedButton 
                variant="outline" 
                size="lg"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link to="/contact">Contact Sales</Link>
              </EnhancedButton>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Action Button for Mobile */}
      <EnhancedButton
        size="fab"
        className="lg:hidden"
        aria-label="Quick capture"
        leftIcon={<BookOpen className="h-6 w-6" />}
      />
    </>
  );
};

export default Home;
