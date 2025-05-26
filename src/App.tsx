
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import { Toaster } from '@/components/ui/toaster';
import EnhancedAccessibility from '@/components/accessibility/EnhancedAccessibility';

// Import pages
import Index from '@/pages/Index';
import About from '@/pages/About';
import Help from '@/pages/Help';
import FAQ from '@/pages/FAQ';
import Features from '@/pages/Features';
import Pricing from '@/pages/Pricing';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="system" storageKey="accio-ui-theme">
        <AccessibilityProvider>
          <Router>
            <div className="min-h-screen w-full">
              <Helmet>
                <html lang="en" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="theme-color" content="#3B82F6" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                
                {/* Enhanced SEO meta tags */}
                <meta name="author" content="Accio Team" />
                <meta name="robots" content="index, follow" />
                <meta name="language" content="English" />
                <meta name="revisit-after" content="7 days" />
                
                {/* Structured data for organization */}
                <script type="application/ld+json">
                  {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Accio",
                    "description": "AI-powered knowledge management platform",
                    "url": "https://accio.app",
                    "logo": "https://accio.app/logo.png",
                    "sameAs": [
                      "https://twitter.com/accio",
                      "https://github.com/accio"
                    ]
                  })}
                </script>
              </Helmet>

              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/features" element={<Features />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/help" element={<Help />} />
                <Route path="/faq" element={<FAQ />} />
                {/* Add more routes as needed */}
              </Routes>

              <EnhancedAccessibility />
              <Toaster />
            </div>
          </Router>
        </AccessibilityProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
