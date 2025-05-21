
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SkipToContent from '@/components/SkipToContent';
import { Card, CardContent } from '@/components/ui/card';
import { Link, FileText, Search, Tag, ChevronRight, ArrowRight, MessageSquare } from 'lucide-react';

// Define the steps for onboarding
const onboardingSteps = [{
  title: "Save Content",
  description: "Save articles, webpages, and files with a single click.",
  icon: <Link className="h-8 w-8 text-primary" aria-hidden="true" />
}, {
  title: "AI Tagging",
  description: "Accio automatically tags your content for easy organization.",
  icon: <Tag className="h-8 w-8 text-primary" aria-hidden="true" />
}, {
  title: "Upload Files",
  description: "Upload PDFs and images directly to your collection.",
  icon: <FileText className="h-8 w-8 text-primary" aria-hidden="true" />
}, {
  title: "Smart Search",
  description: "Find content with keywords or natural language questions.",
  icon: <Search className="h-8 w-8 text-primary" aria-hidden="true" />
}];

/**
 * Landing page component for the application
 * Features hero section, onboarding steps, feature highlights, and CTA sections
 */
const Index = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  
  /**
   * Handles navigation to next onboarding step or registration page
   */
  const handleNextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/register');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Accio - Remember Everything You Discover Online</title>
        <meta name="description" content="Accio organizes your online content with AI-powered tagging and powerful search." />
      </Helmet>
      
      <SkipToContent />
      <Navbar isLoggedIn={false} />
      
      <main className="flex-grow" id="main-content">
        {/* Hero Section */}
        <section className="hero-gradient py-20 px-4" aria-labelledby="hero-heading">
          <div className="max-w-6xl mx-auto text-center">
            <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold text-white mb-6">
              Remember everything you discover online
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Accio organizes your online content with AI-powered tagging and powerful search.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" onClick={() => navigate('/register')} className="bg-white text-primary hover:bg-white/90 focus-visible:ring-offset-primary">
                Get Started - Free
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/login')} className="border-white hover:bg-white/10 focus-visible:ring-offset-primary focus-visible:ring-white text-sky-50">
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
            
            <div className="mx-auto max-w-3xl">
              <Card className="overflow-hidden border-2 border-primary/10">
                <CardContent className="p-0">
                  {/* Progress indicator */}
                  <div className="flex" aria-hidden="true">
                    {onboardingSteps.map((_, index) => (
                      <div 
                        key={index} 
                        className={`h-1 flex-1 ${index <= currentStep ? "bg-primary" : "bg-muted"}`} 
                      />
                    ))}
                  </div>
                  
                  {/* Content */}
                  <div className="p-8" aria-live="polite">
                    <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6" aria-hidden="true">
                      {onboardingSteps[currentStep].icon}
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">
                      {onboardingSteps[currentStep].title}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-8">
                      {onboardingSteps[currentStep].description}
                    </p>
                    <Button size="lg" onClick={handleNextStep} aria-label={currentStep < onboardingSteps.length - 1 ? `Next: ${onboardingSteps[currentStep + 1]?.title || 'Get Started'}` : 'Get Started'}>
                      {currentStep < onboardingSteps.length - 1 ? "Next" : "Get Started"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center mt-16">
              {onboardingSteps.map((step, index) => (
                <div 
                  key={index} 
                  className={`p-6 rounded-lg border ${index === currentStep ? "border-primary bg-primary/5" : "border-border bg-card"} cursor-pointer transition-colors`} 
                  onClick={() => setCurrentStep(index)} 
                  onKeyDown={e => {
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
                  <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">
                    {step.description}
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

        {/* About Section */}
        <section className="py-16 px-4 bg-background" aria-labelledby="about-heading">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 id="about-heading" className="text-3xl font-bold mb-4">About Accio</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Accio was built to solve the problem of information overload. In today's digital world, we consume vast amounts of content daily but struggle to remember and retrieve it when needed.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Our mission is to give you a second brain that intelligently organizes everything you discover online, making it instantly searchable and retrievable.
                </p>
                <Button 
                  onClick={() => navigate('/about')}
                  variant="outline"
                  className="group"
                >
                  Learn more about us
                  <ChevronRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Button>
              </div>
              <div className="bg-muted rounded-lg p-8">
                <blockquote className="italic text-lg">
                  "Accio has transformed how I manage research for my projects. Finding information I saved months ago is now instantaneous."
                </blockquote>
                <div className="mt-4">
                  <p className="font-medium">— Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">Product Designer</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Preview Section */}
        <section className="py-16 px-4 bg-muted/50" aria-labelledby="pricing-heading">
          <div className="max-w-6xl mx-auto text-center">
            <h2 id="pricing-heading" className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Choose the plan that works for your needs
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <Card className="border-2 transition-all hover:border-primary/50 hover:shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">Free</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">$0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-start gap-2">
                      <svg className="h-5 w-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Save up to 100 items</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="h-5 w-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Basic search</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="h-5 w-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>AI-powered tagging</span>
                    </li>
                  </ul>
                  <Button onClick={() => navigate('/register')} className="w-full">Get Started</Button>
                </CardContent>
              </Card>
              
              {/* Pro Plan */}
              <Card className="border-2 border-primary relative transition-all hover:shadow-md">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">Pro</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">$9.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-start gap-2">
                      <svg className="h-5 w-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Unlimited saves</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="h-5 w-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Advanced semantic search</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="h-5 w-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Priority AI analysis</span>
                    </li>
                  </ul>
                  <Button onClick={() => navigate('/pricing')} className="w-full">Choose Pro</Button>
                </CardContent>
              </Card>
              
              {/* Team Plan */}
              <Card className="border-2 transition-all hover:border-primary/50 hover:shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">Team</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">$19.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-start gap-2">
                      <svg className="h-5 w-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Everything in Pro</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="h-5 w-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Team collaboration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="h-5 w-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Advanced analytics</span>
                    </li>
                  </ul>
                  <Button onClick={() => navigate('/pricing')} variant="outline" className="w-full">Choose Team</Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8">
              <Button
                variant="link"
                onClick={() => navigate('/pricing')}
                className="text-primary flex items-center gap-2"
              >
                View full pricing details
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 bg-background" aria-labelledby="contact-heading">
          <div className="max-w-4xl mx-auto text-center">
            <h2 id="contact-heading" className="text-3xl font-bold mb-4">Questions? Get in Touch</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our support team is always ready to help with any questions you might have.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/contact')}
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-5 w-5" aria-hidden="true" />
              Contact Us
            </Button>
          </div>
        </section>

        {/* FAQ Section Preview */}
        <section className="py-16 px-4 bg-muted/50" aria-labelledby="faq-heading">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="faq-heading" className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Find quick answers to common questions
              </p>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-background border rounded-lg">
                <h3 className="text-xl font-medium mb-2">How does AI tagging work?</h3>
                <p className="text-muted-foreground">
                  Our AI system automatically analyzes your saved content to extract key topics and themes, then assigns relevant tags to help organize your library.
                </p>
              </div>
              
              <div className="p-6 bg-background border rounded-lg">
                <h3 className="text-xl font-medium mb-2">Can I use Accio on mobile devices?</h3>
                <p className="text-muted-foreground">
                  Yes! Accio works on all devices with a modern web browser, including smartphones and tablets.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button
                variant="outline"
                onClick={() => navigate('/faq')}
                className="flex items-center gap-2 mx-auto"
              >
                View all FAQs
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-background" aria-labelledby="cta-heading">
          <div className="max-w-4xl mx-auto text-center">
            <h2 id="cta-heading" className="text-3xl font-bold mb-6">Ready to organize your online life?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join Accio today and never lose important content again.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" onClick={() => navigate('/register')} className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                Sign Up Free
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/login')} className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                Login
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
