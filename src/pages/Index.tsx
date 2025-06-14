
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import { MainNavigation } from '@/components/navigation/MainNavigation';
import { CleanHeroSection } from '@/components/home/CleanHeroSection';
import { DemoBanner } from '@/components/demo/DemoBanner';

const Index: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <Helmet>
        <title>Accio - AI-Powered Knowledge Management</title>
        <meta name="description" content="Transform any content into searchable knowledge with AI. Build your personal knowledge sanctuary that grows smarter with every addition." />
        <meta name="keywords" content="knowledge management, AI, content organization, search, productivity" />
        <meta property="og:title" content="Accio - AI-Powered Knowledge Management" />
        <meta property="og:description" content="Transform any content into searchable knowledge with AI" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <MainNavigation />
        <DemoBanner />
        
        <main id="main-content" role="main">
          <CleanHeroSection />
          
          {!user && (
            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of users who are already building their knowledge vaults with Accio.
                </p>
              </div>
            </section>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t bg-background py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/features" className="hover:text-primary">Features</a></li>
                  <li><a href="/pricing" className="hover:text-primary">Pricing</a></li>
                  <li><a href="/security" className="hover:text-primary">Security</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/about" className="hover:text-primary">About</a></li>
                  <li><a href="/blog" className="hover:text-primary">Blog</a></li>
                  <li><a href="/careers" className="hover:text-primary">Careers</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/help" className="hover:text-primary">Help Center</a></li>
                  <li><a href="/contact" className="hover:text-primary">Contact</a></li>
                  <li><a href="/accessibility" className="hover:text-primary">Accessibility</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/privacy" className="hover:text-primary">Privacy</a></li>
                  <li><a href="/terms" className="hover:text-primary">Terms</a></li>
                  <li><a href="/cookies" className="hover:text-primary">Cookies</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t pt-8 mt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2024 Accio. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
