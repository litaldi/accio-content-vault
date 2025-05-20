
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { OptimizedImage } from '@/components/ui/optimized-image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from '@/components/ui/card';
import { Check, ArrowRight, Search, Shield, Database, FileText, Settings, Users, Clock } from 'lucide-react';

const EnterpriseLanding: React.FC = () => {
  const navigate = useNavigate();
  useDocumentTitle('Accio Enterprise - Secure AI Solutions');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="w-full py-4 px-6 bg-background border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">
              <span className="bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">Accio Enterprise</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">How It Works</a>
            <a href="#industries" className="text-foreground hover:text-primary transition-colors">Industries</a>
            <a href="#testimonials" className="text-foreground hover:text-primary transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/login')}>
              Sign In
            </Button>
            <Button onClick={() => navigate('/contact')}>
              Request Demo
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-28 px-6 bg-gradient-to-br from-purple-900 to-purple-800 text-white">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Secure AI Conversations for Enterprise & Government
              </h1>
              <p className="text-xl opacity-90">
                Unlock the power of AI in a privacy-first world. Built for sensitive data, compliance, and mission-critical workflows.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:max-w-md">
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="pr-24 bg-white/10 border-white/20 text-white placeholder:text-white/70 h-12" 
                  />
                  <Button className="absolute right-1 top-1 bottom-1" size="sm">
                    Get Started
                  </Button>
                </div>
              </div>
              <p className="text-sm opacity-75">Free trial available. No credit card required.</p>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-purple-700/30 rounded-lg flex items-center justify-center">
                <OptimizedImage 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                  alt="Secure Enterprise AI Platform" 
                  className="object-cover w-full h-full mix-blend-overlay" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 px-6 bg-background">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Enterprise-Grade AI Platform</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Powerful tools that provide security, compliance, and control for your organization's AI needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <Card className="border border-purple-100 dark:border-purple-900/30 hover:shadow-md transition-shadow bg-background">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Advanced LLM Conversations</h3>
                  <p className="text-muted-foreground">
                    Secure, private AI conversations with fine-tuned models specifically trained for your enterprise needs.
                  </p>
                </CardContent>
              </Card>
              
              {/* Feature 2 */}
              <Card className="border border-purple-100 dark:border-purple-900/30 hover:shadow-md transition-shadow bg-background">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Database className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Customizable Agents</h3>
                  <p className="text-muted-foreground">
                    Build and deploy AI agents to access internal systems with complete data protection and security controls.
                  </p>
                </CardContent>
              </Card>
              
              {/* Feature 3 */}
              <Card className="border border-purple-100 dark:border-purple-900/30 hover:shadow-md transition-shadow bg-background">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Enterprise Knowledge Base</h3>
                  <p className="text-muted-foreground">
                    Connect your organization's knowledge to AI with advanced RAG capabilities and document understanding.
                  </p>
                </CardContent>
              </Card>
              
              {/* Feature 4 */}
              <Card className="border border-purple-100 dark:border-purple-900/30 hover:shadow-md transition-shadow bg-background">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Settings className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Enterprise Security</h3>
                  <p className="text-muted-foreground">
                    SOC 2 Type II, HIPAA, GDPR, and FedRAMP ready with end-to-end encryption and governance controls.
                  </p>
                </CardContent>
              </Card>
              
              {/* Feature 5 */}
              <Card className="border border-purple-100 dark:border-purple-900/30 hover:shadow-md transition-shadow bg-background">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Process Templates</h3>
                  <p className="text-muted-foreground">
                    Pre-built workflows for common enterprise tasks, customizable to match your specific requirements.
                  </p>
                </CardContent>
              </Card>
              
              {/* Feature 6 */}
              <Card className="border border-purple-100 dark:border-purple-900/30 hover:shadow-md transition-shadow bg-background">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">24/7 Expert Support</h3>
                  <p className="text-muted-foreground">
                    Dedicated customer success team with industry expertise to ensure your AI deployment succeeds.
                  </p>
                </CardContent>
              </Card>
              
              {/* Feature 7 */}
              <Card className="border border-purple-100 dark:border-purple-900/30 hover:shadow-md transition-shadow bg-background">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Privacy & Compliance</h3>
                  <p className="text-muted-foreground">
                    Meet data sovereignty requirements with regional deployments and comprehensive audit logs.
                  </p>
                </CardContent>
              </Card>
              
              {/* Feature 8 */}
              <Card className="border border-purple-100 dark:border-purple-900/30 hover:shadow-md transition-shadow bg-background">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Real-time Collaboration</h3>
                  <p className="text-muted-foreground">
                    Work together with your team on AI-powered insights with shared workspaces and permissions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section id="how-it-works" className="py-16 px-6 bg-purple-50 dark:bg-purple-900/10">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our platform seamlessly integrates with your existing workflows and systems
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative p-8 rounded-lg bg-background border border-purple-100 dark:border-purple-900/30 text-center">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mt-6 mb-4">Connect Your Data</h3>
                <p className="text-muted-foreground">
                  Securely connect your content repositories and knowledge bases with our simple no-code setup.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="relative p-8 rounded-lg bg-background border border-purple-100 dark:border-purple-900/30 text-center">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mt-6 mb-4">Configure Your AI</h3>
                <p className="text-muted-foreground">
                  Choose your capabilities, set permissions, and customize the way your AI responds.
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="relative p-8 rounded-lg bg-background border border-purple-100 dark:border-purple-900/30 text-center">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mt-6 mb-4">Deploy & Scale</h3>
                <p className="text-muted-foreground">
                  Roll out to your organization with enterprise-grade reliability and scale as your needs grow.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Industries Section */}
        <section id="industries" className="py-16 px-6 bg-background">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Transforming Industries</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our AI solutions are designed to solve the unique challenges of various sectors
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Industry 1 */}
              <Card className="border border-purple-100 dark:border-purple-900/30 hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Database className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Enterprise Knowledge Management</h3>
                  <p className="text-muted-foreground">
                    Transform how your organization accesses and utilizes internal knowledge with AI-powered search and insights.
                  </p>
                </CardContent>
              </Card>
              
              {/* Industry 2 */}
              <Card className="border border-purple-100 dark:border-purple-900/30 hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Government Operations</h3>
                  <p className="text-muted-foreground">
                    Enhance public service delivery with secure AI solutions that meet stringent compliance requirements.
                  </p>
                </CardContent>
              </Card>
              
              {/* Industry 3 */}
              <Card className="border border-purple-100 dark:border-purple-900/30 hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Financial Services</h3>
                  <p className="text-muted-foreground">
                    Streamline compliance processes and improve customer experiences with AI that understands financial regulations.
                  </p>
                </CardContent>
              </Card>
              
              {/* Industry 4 */}
              <Card className="border border-purple-100 dark:border-purple-900/30 hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Healthcare</h3>
                  <p className="text-muted-foreground">
                    Support clinical decision-making and improve patient outcomes with HIPAA-compliant AI solutions.
                  </p>
                </CardContent>
              </Card>
              
              {/* Industry 5 */}
              <Card className="border border-purple-100 dark:border-purple-900/30 hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Legal</h3>
                  <p className="text-muted-foreground">
                    Accelerate legal research, contract analysis, and due diligence with precision AI tools designed for legal professionals.
                  </p>
                </CardContent>
              </Card>
              
              {/* Industry 6 */}
              <Card className="border border-purple-100 dark:border-purple-900/30 hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Education</h3>
                  <p className="text-muted-foreground">
                    Transform learning experiences with personalized AI tutoring and administrative support for educational institutions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 px-6 bg-purple-50 dark:bg-purple-900/10">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Trusted by Leading Organizations</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See what our enterprise and government clients have to say about our platform
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-background p-6 rounded-lg border border-purple-100 dark:border-purple-900/30">
                <blockquote className="text-lg italic mb-6">
                  "Accio Enterprise has transformed how our agency manages information. The security features and compliance controls gave us confidence to deploy AI at scale."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-purple-200 dark:bg-purple-800/50 flex items-center justify-center">
                    <span className="font-semibold text-purple-700 dark:text-purple-300">JD</span>
                  </div>
                  <div>
                    <p className="font-semibold">James Davis</p>
                    <p className="text-sm text-muted-foreground">Federal Agency CIO</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-background p-6 rounded-lg border border-purple-100 dark:border-purple-900/30">
                <blockquote className="text-lg italic mb-6">
                  "The ability to customize our AI with our proprietary data while maintaining complete control over information flow has been game-changing for our business."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-purple-200 dark:bg-purple-800/50 flex items-center justify-center">
                    <span className="font-semibold text-purple-700 dark:text-purple-300">MJ</span>
                  </div>
                  <div>
                    <p className="font-semibold">Michael Johnson</p>
                    <p className="text-sm text-muted-foreground">Director of Innovation</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-background p-6 rounded-lg border border-purple-100 dark:border-purple-900/30">
                <blockquote className="text-lg italic mb-6">
                  "We deployed Accio across our healthcare network, and the HIPAA compliance features gave us peace of mind. The ROI has been exceptional."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-purple-200 dark:bg-purple-800/50 flex items-center justify-center">
                    <span className="font-semibold text-purple-700 dark:text-purple-300">SR</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Healthcare System CTO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" className="py-16 px-6 bg-background">
          <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3 space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Custom Enterprise Pricing</h2>
                <p className="text-xl text-muted-foreground">
                  We tailor our pricing to meet the specific needs of your organization, providing exactly what you need.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Unlimited API Calls</h3>
                    <p className="text-muted-foreground">No rate limits or quotas to worry about</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Dedicated Support Team</h3>
                    <p className="text-muted-foreground">24/7 support with SLAs tailored to your needs</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Custom Model Fine-tuning</h3>
                    <p className="text-muted-foreground">Train models on your proprietary data</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">On-premises Deployment</h3>
                    <p className="text-muted-foreground">For organizations with strict data sovereignty requirements</p>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-muted-foreground italic">
                  Contact our sales team today to get a customized quote for your organization.
                </p>
              </div>
            </div>
            
            <div className="md:col-span-2 bg-purple-50 dark:bg-purple-900/10 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6">Contact Our Enterprise Team</h3>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                  <Input id="name" placeholder="Your name" className="w-full" />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Work Email</label>
                  <Input id="email" type="email" placeholder="you@company.com" className="w-full" />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-1">Company Name</label>
                  <Input id="company" placeholder="Your company" className="w-full" />
                </div>
                
                <div>
                  <label htmlFor="size" className="block text-sm font-medium mb-1">Company Size</label>
                  <select id="size" className="w-full h-10 px-3 rounded-md border border-input bg-background">
                    <option>Please select</option>
                    <option>1-10 employees</option>
                    <option>11-50 employees</option>
                    <option>51-200 employees</option>
                    <option>201-500 employees</option>
                    <option>501-1000 employees</option>
                    <option>1000+ employees</option>
                  </select>
                </div>
                
                <Button className="w-full">Request Enterprise Demo</Button>
                
                <p className="text-xs text-center text-muted-foreground mt-4">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-6 bg-gradient-to-br from-purple-700 to-purple-900 text-white">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to transform your enterprise with AI?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join leading organizations that trust Accio Enterprise for their most sensitive AI needs.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="default" className="bg-white text-purple-900 hover:bg-white/90">
                Schedule a Demo
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Documentation
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-background border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <h3 className="text-lg font-semibold mb-4">Accio Enterprise</h3>
              <p className="text-muted-foreground mb-4">
                Secure, compliant AI solutions for enterprise and government organizations.
              </p>
              <div className="flex space-x-4">
                <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="#" aria-label="GitHub" className="text-muted-foreground hover:text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4 uppercase text-muted-foreground">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-foreground hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="text-foreground hover:text-primary transition-colors">Security</a></li>
                <li><a href="#" className="text-foreground hover:text-primary transition-colors">Compliance</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4 uppercase text-muted-foreground">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-foreground hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="text-foreground hover:text-primary transition-colors">API Reference</a></li>
                <li><a href="#" className="text-foreground hover:text-primary transition-colors">Guides</a></li>
                <li><a href="#" className="text-foreground hover:text-primary transition-colors">Case Studies</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4 uppercase text-muted-foreground">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-foreground hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="text-foreground hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="text-foreground hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="text-foreground hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Accio Enterprise. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EnterpriseLanding;
