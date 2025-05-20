
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from '@/components/ui/card';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Check, ArrowRight, Star, Mail } from 'lucide-react';

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useDocumentTitle('Welcome to Accio');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Navigation */}
      <header className="w-full py-4 px-6 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">
              <span className="gradient-text">Accio</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
            <a href="#testimonials" className="text-foreground hover:text-primary transition-colors">Testimonials</a>
            <a href="#faq" className="text-foreground hover:text-primary transition-colors">FAQ</a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors">Pricing</a>
            <a href="/enterprise" className="text-foreground hover:text-primary transition-colors">Enterprise</a>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/login')}>
              Log in
            </Button>
            <Button onClick={() => navigate('/register')}>
              Try for free
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                <span className="text-primary">Your knowledge,</span> organized with ease
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Capture what matters to you and find it when you need it. Accio brings your digital life together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                <Button size="lg" onClick={() => navigate('/register')}>
                  Start for free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/demo')}>
                  See how it works
                </Button>
              </div>
              <p className="text-sm text-muted-foreground pt-2">
                Looking for enterprise solutions? <a href="/enterprise" className="text-primary hover:underline">Visit Accio Enterprise</a>
              </p>
            </div>
            <div className="relative h-[300px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80" 
                alt="Person using Accio to organize digital content"
                className="object-cover w-full h-full rounded-lg" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 px-6 bg-background">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold">Everything you need to stay organized</h2>
              <p className="text-xl text-muted-foreground">
                Accio helps you capture, organize, and find what matters most in your digital life.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <Card className="border border-purple-100 dark:border-purple-900/30 hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Effortless Capture</h3>
                  <p className="text-muted-foreground">
                    Save articles, notes, and files with a single click. Our browser extension works wherever you browse.
                  </p>
                </CardContent>
              </Card>
              
              {/* Feature 2 */}
              <Card className="border border-purple-100 dark:border-purple-900/30 hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Smart Organization</h3>
                  <p className="text-muted-foreground">
                    AI automatically tags and categorizes your content, making it easy to find exactly what you need.
                  </p>
                </CardContent>
              </Card>
              
              {/* Feature 3 */}
              <Card className="border border-purple-100 dark:border-purple-900/30 hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Natural Search</h3>
                  <p className="text-muted-foreground">
                    Ask questions in everyday language and find exactly what you're looking for instantly.
                  </p>
                </CardContent>
              </Card>
              
              {/* Feature 4 */}
              <Card className="border border-purple-100 dark:border-purple-900/30 hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Work Anywhere</h3>
                  <p className="text-muted-foreground">
                    Access your content from any device with our mobile apps and web interface.
                  </p>
                </CardContent>
              </Card>
              
              {/* Feature 5 */}
              <Card className="border border-purple-100 dark:border-purple-900/30 hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Share with Others</h3>
                  <p className="text-muted-foreground">
                    Collaborate on projects by sharing collections with friends, family, or colleagues.
                  </p>
                </CardContent>
              </Card>
              
              {/* Feature 6 */}
              <Card className="border border-purple-100 dark:border-purple-900/30 hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Privacy First</h3>
                  <p className="text-muted-foreground">
                    Your data stays private with end-to-end encryption and granular sharing controls.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section id="testimonials" className="py-16 px-6 bg-purple-50 dark:bg-purple-900/10">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold">People love using Accio</h2>
              <p className="text-xl text-muted-foreground">
                Hear from our community of users who have transformed how they manage information.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <Card className="bg-background border-purple-100 dark:border-purple-900/30">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="text-lg">
                    "Accio completely changed how I organize research for my PhD. I can find exactly what I need in seconds rather than digging through folders and bookmarks."
                  </blockquote>
                  <div className="flex items-center gap-4 pt-4">
                    <div className="h-10 w-10 rounded-full bg-purple-200 dark:bg-purple-800"></div>
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
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="text-lg">
                    "As a freelance writer, I'm constantly collecting inspiration and references. Accio helps me recall that perfect quote or statistic exactly when I need it."
                  </blockquote>
                  <div className="flex items-center gap-4 pt-4">
                    <div className="h-10 w-10 rounded-full bg-purple-200 dark:bg-purple-800"></div>
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
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="text-lg">
                    "Our team uses Accio to build our knowledge base. The AI tagging and natural language search have boosted our productivity tremendously."
                  </blockquote>
                  <div className="flex items-center gap-4 pt-4">
                    <div className="h-10 w-10 rounded-full bg-purple-200 dark:bg-purple-800"></div>
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
        <section id="faq" className="py-16 px-6 bg-background">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Frequently asked questions</h2>
              <p className="text-xl text-muted-foreground">
                Everything you need to know about Accio and how it can help you.
              </p>
            </div>
            
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
        <section className="py-16 px-6 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Start organizing your digital life today</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of people who use Accio to capture, organize, and find what matters to them.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" onClick={() => navigate('/register')}>
                Get started for free
              </Button>
              <Button size="lg" variant="outline" onClick={() => window.location.href = 'mailto:contact@accio.com'}>
                <Mail className="mr-2 h-4 w-4" />
                Contact sales
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              No credit card required. Free plan includes core features and 100MB storage.
            </p>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-background border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto">
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
                <li><a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-foreground hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="/integrations" className="text-foreground hover:text-primary transition-colors">Integrations</a></li>
                <li><a href="/enterprise" className="text-foreground hover:text-primary transition-colors">Enterprise</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4 uppercase text-muted-foreground">Company</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-foreground hover:text-primary transition-colors">About</a></li>
                <li><a href="/blog" className="text-foreground hover:text-primary transition-colors">Blog</a></li>
                <li><a href="/careers" className="text-foreground hover:text-primary transition-colors">Careers</a></li>
                <li><a href="/contact" className="text-foreground hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4 uppercase text-muted-foreground">Legal</h3>
              <ul className="space-y-2">
                <li><a href="/privacy" className="text-foreground hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="/terms" className="text-foreground hover:text-primary transition-colors">Terms</a></li>
                <li><a href="/security" className="text-foreground hover:text-primary transition-colors">Security</a></li>
                <li><a href="/accessibility" className="text-foreground hover:text-primary transition-colors">Accessibility</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Accio. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Twitter
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                LinkedIn
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
