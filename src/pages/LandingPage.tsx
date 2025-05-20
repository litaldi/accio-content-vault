
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from '@/components/ui/card';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { SectionHeader } from '@/components/ui/section-header';
import { Check, ArrowRight, Star, Mail, ExternalLink } from 'lucide-react';

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useDocumentTitle('Welcome to Accio');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Navigation */}
      <header className="w-full py-4 px-6 bg-background border-b border-border sticky top-0 z-40">
        <div className="container-lg flex justify-between items-center">
          <a href="/" className="flex items-center" aria-label="Accio homepage">
            <h1 className="text-2xl font-bold text-primary">
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Accio</span>
            </h1>
          </a>
          
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
            <a href="#features" className="text-foreground hover:text-primary transition-all text-sm font-medium focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm focus-visible:outline-none">Features</a>
            <a href="#testimonials" className="text-foreground hover:text-primary transition-all text-sm font-medium focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm focus-visible:outline-none">Testimonials</a>
            <a href="#faq" className="text-foreground hover:text-primary transition-all text-sm font-medium focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm focus-visible:outline-none">FAQ</a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-all text-sm font-medium focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm focus-visible:outline-none">Pricing</a>
            <a href="/enterprise" className="text-foreground hover:text-primary transition-all text-sm font-medium focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm focus-visible:outline-none">Enterprise</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <EnhancedButton 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="focus-visible:ring-offset-2"
            >
              Log in
            </EnhancedButton>
            <EnhancedButton 
              onClick={() => navigate('/register')}
              className="focus-visible:ring-offset-2"
            >
              Try for free
            </EnhancedButton>
          </div>
        </div>
      </header>
      
      <main className="flex-grow" id="main-content">
        {/* Hero Section */}
        <section className="section-padding bg-purple-gradient" aria-labelledby="hero-heading">
          <div className="container-lg grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in text-center md:text-left">
              <h1 id="hero-heading" className="heading-1">
                <span className="text-primary">Your knowledge,</span> organized with ease
              </h1>
              <p className="body-lg max-w-xl md:max-w-none">
                Capture what matters to you and find it when you need it. Accio brings your digital life together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                <EnhancedButton 
                  size="lg" 
                  onClick={() => navigate('/register')}
                  trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
                >
                  Start for free
                </EnhancedButton>
                <EnhancedButton 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate('/demo')}
                >
                  See how it works
                </EnhancedButton>
              </div>
              <p className="text-sm text-muted-foreground pt-2">
                Looking for enterprise solutions? <a href="/enterprise" className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded">Visit Accio Enterprise</a>
              </p>
            </div>
            <div className="relative h-[300px] md:h-[500px] rounded-lg overflow-hidden shadow-elevation-3 animate-slide-up">
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80" 
                alt="Person using Accio to organize digital content"
                className="object-cover w-full h-full rounded-lg" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent" aria-hidden="true"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="section-padding bg-background" aria-labelledby="features-heading">
          <div className="container-lg space-y-12">
            <SectionHeader
              title="Everything you need to stay organized"
              subtitle="Accio helps you capture, organize, and find what matters most in your digital life."
              id="features-heading"
            />
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature cards */}
              <Card className="border border-purple-100 dark:border-purple-900/30 hover:shadow-elevation-3 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Check className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="heading-4">Effortless Capture</h3>
                  <p className="body-md">
                    Save articles, notes, and files with a single click. Our browser extension works wherever you browse.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border border-purple-100 dark:border-purple-900/30 hover:shadow-elevation-3 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Check className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="heading-4">Smart Organization</h3>
                  <p className="body-md">
                    AI automatically tags and categorizes your content, making it easy to find exactly what you need.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border border-purple-100 dark:border-purple-900/30 hover:shadow-elevation-3 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Check className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="heading-4">Natural Search</h3>
                  <p className="body-md">
                    Ask questions in everyday language and find exactly what you're looking for instantly.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border border-purple-100 dark:border-purple-900/30 hover:shadow-elevation-3 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Check className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="heading-4">Work Anywhere</h3>
                  <p className="body-md">
                    Access your content from any device with our mobile apps and web interface.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border border-purple-100 dark:border-purple-900/30 hover:shadow-elevation-3 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Check className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="heading-4">Share with Others</h3>
                  <p className="body-md">
                    Collaborate on projects by sharing collections with friends, family, or colleagues.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border border-purple-100 dark:border-purple-900/30 hover:shadow-elevation-3 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Check className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="heading-4">Privacy First</h3>
                  <p className="body-md">
                    Your data stays private with end-to-end encryption and granular sharing controls.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section id="testimonials" className="section-padding bg-purple-gradient" aria-labelledby="testimonials-heading">
          <div className="container-lg space-y-12">
            <SectionHeader
              title="People love using Accio"
              subtitle="Hear from our community of users who have transformed how they manage information."
              id="testimonials-heading"
            />
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <Card className="bg-background border-purple-100 dark:border-purple-900/30">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1" aria-label="5 out of 5 stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-primary text-primary" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="text-lg">
                    "Accio completely changed how I organize research for my PhD. I can find exactly what I need in seconds rather than digging through folders and bookmarks."
                  </blockquote>
                  <div className="flex items-center gap-4 pt-4">
                    <div className="h-10 w-10 rounded-full bg-purple-200 dark:bg-purple-800 flex items-center justify-center" aria-hidden="true">
                      <span className="font-semibold">AM</span>
                    </div>
                    <div>
                      <p className="font-semibold">Alex Morgan</p>
                      <p className="text-sm text-muted-foreground">PhD Student</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Testimonial 2 */}
              <Card className="bg-background border-purple-100 dark:border-purple-900/30">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1" aria-label="5 out of 5 stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-primary text-primary" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="text-lg">
                    "As a freelance writer, I'm constantly collecting inspiration and references. Accio helps me recall that perfect quote or statistic exactly when I need it."
                  </blockquote>
                  <div className="flex items-center gap-4 pt-4">
                    <div className="h-10 w-10 rounded-full bg-purple-200 dark:bg-purple-800 flex items-center justify-center" aria-hidden="true">
                      <span className="font-semibold">JC</span>
                    </div>
                    <div>
                      <p className="font-semibold">Jamie Chen</p>
                      <p className="text-sm text-muted-foreground">Content Creator</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Testimonial 3 */}
              <Card className="bg-background border-purple-100 dark:border-purple-900/30">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1" aria-label="5 out of 5 stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-primary text-primary" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="text-lg">
                    "Our team uses Accio to build our knowledge base. The AI tagging and natural language search have boosted our productivity tremendously."
                  </blockquote>
                  <div className="flex items-center gap-4 pt-4">
                    <div className="h-10 w-10 rounded-full bg-purple-200 dark:bg-purple-800 flex items-center justify-center" aria-hidden="true">
                      <span className="font-semibold">TR</span>
                    </div>
                    <div>
                      <p className="font-semibold">Taylor Roberts</p>
                      <p className="text-sm text-muted-foreground">Product Manager</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section id="faq" className="section-padding bg-background" aria-labelledby="faq-heading">
          <div className="container-sm space-y-12">
            <SectionHeader
              title="Frequently asked questions"
              subtitle="Everything you need to know about Accio and how it can help you."
              id="faq-heading"
            />
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  How is Accio different from regular bookmarking tools?
                </AccordionTrigger>
                <AccordionContent>
                  Unlike traditional bookmarking tools that just save links, Accio captures and organizes the actual content. 
                  Our AI automatically tags and categorizes everything, making it searchable using natural language questions.
                  This means you can find information based on concepts and ideas, not just keywords or folder locations.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  Is my data private and secure?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely. Your data is encrypted end-to-end and we never sell your information to third parties. 
                  You have complete control over what you share and with whom. We're committed to the highest standards 
                  of data privacy and security.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  What file types does Accio support?
                </AccordionTrigger>
                <AccordionContent>
                  Accio supports a wide range of file types including web pages, PDFs, images, text files, and more. 
                  Our AI can extract and index content from most document types to make them searchable. 
                  If you have specific file type needs, please contact our support team.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  Can I use Accio offline?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, with our premium plans you can download your content for offline access. 
                  The mobile app will sync when you're back online to ensure all your information stays up to date.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  How much does Accio cost?
                </AccordionTrigger>
                <AccordionContent>
                  Accio offers a free plan with core features and reasonable storage limits. 
                  Our premium plans start at $8/month with additional storage, advanced features, and priority support. 
                  Enterprise plans with custom solutions are also available for teams and organizations.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="section-padding bg-purple-gradient" aria-labelledby="cta-heading">
          <div className="container-md text-center space-y-8">
            <h2 id="cta-heading" className="heading-2">Start organizing your digital life today</h2>
            <p className="body-lg max-w-2xl mx-auto">
              Join thousands of people who use Accio to capture, organize, and find what matters to them.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <EnhancedButton 
                size="lg" 
                onClick={() => navigate('/register')}
              >
                Get started for free
              </EnhancedButton>
              <EnhancedButton 
                size="lg" 
                variant="outline" 
                onClick={() => window.location.href = 'mailto:contact@accio.com'}
                leadingIcon={<Mail className="h-4 w-4" aria-hidden="true" />}
              >
                Contact sales
              </EnhancedButton>
            </div>
            <p className="text-sm text-muted-foreground">
              No credit card required. Free plan includes core features and 100MB storage.
            </p>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-background border-t border-border py-12 px-6" role="contentinfo">
        <div className="container-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-lg font-semibold mb-4">Accio</h3>
              <p className="text-muted-foreground">
                Your personal knowledge assistant for the digital age.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4 uppercase text-muted-foreground">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-foreground hover:text-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">Features</a></li>
                <li><a href="#pricing" className="text-foreground hover:text-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">Pricing</a></li>
                <li><a href="/integrations" className="text-foreground hover:text-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">Integrations</a></li>
                <li><a href="/enterprise" className="text-foreground hover:text-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">Enterprise</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4 uppercase text-muted-foreground">Company</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-foreground hover:text-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">About</a></li>
                <li><a href="/blog" className="text-foreground hover:text-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">Blog</a></li>
                <li><a href="/careers" className="text-foreground hover:text-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">Careers</a></li>
                <li><a href="/contact" className="text-foreground hover:text-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4 uppercase text-muted-foreground">Legal</h3>
              <ul className="space-y-2">
                <li><a href="/privacy" className="text-foreground hover:text-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">Privacy</a></li>
                <li><a href="/terms" className="text-foreground hover:text-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">Terms</a></li>
                <li><a href="/security" className="text-foreground hover:text-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">Security</a></li>
                <li><a href="/accessibility" className="text-foreground hover:text-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">Accessibility</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Accio. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="https://twitter.com" className="text-muted-foreground hover:text-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full p-1" aria-label="Twitter" rel="noopener noreferrer" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="https://linkedin.com" className="text-muted-foreground hover:text-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full p-1" aria-label="LinkedIn" rel="noopener noreferrer" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://github.com" className="text-muted-foreground hover:text-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full p-1" aria-label="GitHub" rel="noopener noreferrer" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
