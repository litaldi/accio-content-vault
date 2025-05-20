
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Link, FileText, Search, Tag } from 'lucide-react';
import { Illustration } from '@/components/ui/illustration';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { cn } from '@/lib/utils';
import { sanitizeInput } from '@/lib/security';

// Define the steps for onboarding
const onboardingSteps = [
  {
    title: "Save Content",
    description: "Save articles, webpages, and files with a single click.",
    icon: <Link className="h-8 w-8 text-primary" aria-hidden="true" />,
    illustration: "save"
  },
  {
    title: "AI Tagging",
    description: "Accio automatically tags your content for easy organization.",
    icon: <Tag className="h-8 w-8 text-primary" aria-hidden="true" />,
    illustration: "organize"
  },
  {
    title: "Upload Files",
    description: "Upload PDFs and images directly to your collection.",
    icon: <FileText className="h-8 w-8 text-primary" aria-hidden="true" />,
    illustration: "share"
  },
  {
    title: "Smart Search",
    description: "Find content with keywords or natural language questions.",
    icon: <Search className="h-8 w-8 text-primary" aria-hidden="true" />,
    illustration: "search"
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={false} />
      
      <main className="flex-grow" id="main-content">
        {/* Hero Section */}
        <section 
          className="hero-gradient py-20 px-4 relative overflow-hidden" 
          aria-labelledby="hero-heading"
        >
          {/* Abstract background shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20" aria-hidden="true">
            <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/30 blur-3xl"></div>
            <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-primary/20 blur-3xl"></div>
            <div className="absolute -bottom-[10%] left-[30%] w-[40%] h-[40%] rounded-full bg-primary/25 blur-3xl"></div>
          </div>

          <div className="max-w-6xl mx-auto text-center relative z-10">
            <h1 
              id="hero-heading" 
              className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in"
            >
              Remember everything you discover online
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-fade-up">
              Accio organizes your online content with AI-powered tagging and powerful search.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up">
              <Button
                size="lg"
                onClick={() => navigate('/register')}
                className="bg-white text-primary hover:bg-white/90 focus-visible:ring-offset-primary"
              >
                Get Started - Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/login')}
                className="text-white border-white hover:bg-white/10 focus-visible:ring-offset-primary focus-visible:ring-white"
              >
                Login
              </Button>
            </div>
          </div>
        </section>

        {/* Onboarding Section */}
        <section className="py-16 px-4 bg-background" aria-labelledby="onboarding-heading">
          <div className="max-w-6xl mx-auto text-center">
            <h2 id="onboarding-heading" className="text-3xl font-bold mb-4">How Accio Works</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Your personal content library, organized by AI
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="relative">
                <Card className="overflow-hidden border-2 border-primary/10 h-full">
                  <CardContent className="p-0">
                    {/* Progress indicator */}
                    <div className="flex" aria-hidden="true">
                      {onboardingSteps.map((_, index) => (
                        <div
                          key={index}
                          className={`h-1 flex-1 ${
                            index <= currentStep ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                    
                    {/* Content */}
                    <div className="p-8" aria-live="polite">
                      <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6" aria-hidden="true">
                        {onboardingSteps[currentStep].icon}
                      </div>
                      <h3 className="text-2xl font-semibold mb-3">
                        {sanitizeInput(onboardingSteps[currentStep].title)}
                      </h3>
                      <p className="text-lg text-muted-foreground mb-8">
                        {sanitizeInput(onboardingSteps[currentStep].description)}
                      </p>
                      <Button
                        size="lg"
                        onClick={handleNextStep}
                        aria-label={currentStep < onboardingSteps.length - 1 
                          ? `Next: ${onboardingSteps[currentStep + 1]?.title || 'Get Started'}` 
                          : 'Get Started'}
                      >
                        {currentStep < onboardingSteps.length - 1 ? "Next" : "Get Started"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="relative rounded-lg overflow-hidden shadow-xl transition-all h-[300px] md:h-auto">
                <Illustration 
                  name={onboardingSteps[currentStep].illustration}
                  alt={`Illustration for ${onboardingSteps[currentStep].title}`}
                  className="w-full h-full"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 text-center mt-16">
              {onboardingSteps.map((step, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg border ${
                    index === currentStep
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card"
                  } cursor-pointer transition-colors`}
                  onClick={() => setCurrentStep(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setCurrentStep(index);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-selected={index === currentStep}
                  aria-label={`View ${step.title} details`}
                >
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{sanitizeInput(step.title)}</h3>
                  <p className="text-muted-foreground">
                    {sanitizeInput(step.description)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-secondary" aria-labelledby="features-heading">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="features-heading" className="text-3xl font-bold mb-4">Powerful Features</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Accio brings powerful tools to help you organize and retrieve your digital content
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6 card-hover shadow-sm transition-all">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" aria-hidden="true" />
                  Natural Language Search
                </h3>
                <p className="text-muted-foreground">
                  Ask questions in plain English like "What did I save about job interviews?" and Accio will find the right content.
                </p>
              </Card>
              
              <Card className="p-6 card-hover shadow-sm transition-all">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Tag className="h-5 w-5 text-primary" aria-hidden="true" />
                  AI-Powered Tagging
                </h3>
                <p className="text-muted-foreground">
                  Automatically categorize your content with relevant tags generated by advanced AI.
                </p>
              </Card>
              
              <Card className="p-6 card-hover shadow-sm transition-all">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
                  Multiple Content Types
                </h3>
                <p className="text-muted-foreground">
                  Save links, upload PDFs, or add images - all in one organized library.
                </p>
              </Card>
              
              <Card className="p-6 card-hover shadow-sm transition-all">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Link className="h-5 w-5 text-primary" aria-hidden="true" />
                  One-Click Saving
                </h3>
                <p className="text-muted-foreground">
                  Save content from anywhere with a simple click or share from other apps.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          className="py-16 px-4 bg-background relative overflow-hidden" 
          aria-labelledby="cta-heading"
        >
          {/* Visual enhancement: subtle background pattern */}
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none" 
            aria-hidden="true"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '15px 15px',
            }}
          ></div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 id="cta-heading" className="text-3xl font-bold mb-6">Ready to organize your online life?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join Accio today and never lose important content again.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/register')}
                className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 px-8"
              >
                Sign Up Free
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Login
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8 px-4" role="contentinfo">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Accio</h3>
            <p className="text-muted-foreground mb-4">
              Your personal content library, organized by AI.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/features" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
              <li><a href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="/download" className="text-muted-foreground hover:text-primary transition-colors">Download</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/help" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
              <li><a href="/tutorials" className="text-muted-foreground hover:text-primary transition-colors">Tutorials</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              <li><a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Accio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
