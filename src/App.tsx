
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
                    "url": "https://accio.app",
                    "description": "AI-powered knowledge management platform",
                    "sameAs": [
                      "https://twitter.com/accio",
                      "https://linkedin.com/company/accio"
                    ]
                  })}
                </script>
              </Helmet>
              
              <EnhancedAccessibility />
              
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/help" element={<Help />} />
                <Route path="/faq" element={<FAQ />} />
                
                {/* Marketing & Support Routes */}
                <Route path="/contact" element={<Help />} />
                <Route path="/support" element={<Help />} />
                <Route path="/features" element={<Index />} />
                <Route path="/pricing" element={<Index />} />
                <Route path="/demo" element={<Index />} />
                <Route path="/register" element={<Index />} />
                
                {/* Fallback route */}
                <Route path="*" element={<Index />} />
              </Routes>
              
              <Toaster />
            </div>
          </Router>
        </AccessibilityProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
