
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { EnhancedNavigation } from '@/components/navigation/EnhancedNavigation';
import { useAuth } from '@/contexts/AuthContext';

interface UnifiedPageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showNavigation?: boolean;
  showFooter?: boolean;
  className?: string;
}

const UnifiedPageLayout: React.FC<UnifiedPageLayoutProps> = ({
  children,
  title = 'Accio - Your Personal Knowledge Sanctuary',
  description = 'Organize, discover, and grow your knowledge with AI-powered insights and seamless content management.',
  showNavigation = true,
  showFooter = true,
  className
}) => {
  const { user } = useAuth();

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        {showNavigation && (
          <EnhancedNavigation />
        )}
        
        <main className={className}>
          {children}
        </main>

        {showFooter && (
          <footer className="border-t bg-muted/30 mt-auto">
            <div className="container py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                  <h3 className="font-semibold">Accio</h3>
                  <p className="text-sm text-muted-foreground">
                    Your personal knowledge sanctuary powered by AI.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Product</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                    <li><a href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</a></li>
                    <li><a href="/analytics" className="text-muted-foreground hover:text-foreground transition-colors">Analytics</a></li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Support</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/help" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
                    <li><a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
                    <li><a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a></li>
                    <li><a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a></li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Connect</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Twitter</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">GitHub</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
                <p>&copy; 2024 Accio. All rights reserved.</p>
              </div>
            </div>
          </footer>
        )}
      </div>
    </>
  );
};

export default UnifiedPageLayout;
