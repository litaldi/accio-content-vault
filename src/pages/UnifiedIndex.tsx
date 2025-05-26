
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import UnifiedLayout from '@/components/layout/UnifiedLayout';
import { UnifiedTypography, UnifiedSpacing } from '@/components/ui/unified-design-system';
import { useResponsiveDesign } from '@/hooks/use-responsive-design';
import { 
  Search, 
  BookOpen, 
  Settings, 
  HelpCircle, 
  Sparkles, 
  Shield, 
  Brain,
  Users,
  Star,
  ArrowRight,
  Zap,
  Globe,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const UnifiedIndex = () => {
  const navigate = useNavigate();
  const { isMobile } = useResponsiveDesign();
  
  // Mock auth check
  const isLoggedIn = false;

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Organization",
      description: "Automatically categorize and tag your content with intelligent AI.",
      highlight: "Smart"
    },
    {
      icon: Search,
      title: "Instant Search",
      description: "Find anything in seconds with natural language search.",
      highlight: "Fast"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and stays completely private.",
      highlight: "Secure"
    },
    {
      icon: Globe,
      title: "Works Everywhere",
      description: "Save content from any device, anywhere in the world.",
      highlight: "Global"
    }
  ];

  const benefits = [
    "Save 2+ hours daily on content organization",
    "Never lose important information again",
    "Find any saved content in under 3 seconds",
    "Works seamlessly across all your devices"
  ];

  return (
    <UnifiedLayout fullWidth>
      <Helmet>
        <title>Accio - Transform Chaos Into Your AI-Powered Knowledge Engine</title>
        <meta name="description" content="Stop losing your best ideas. Save anything, find everything, achieve 10x productivity with AI-powered organization. Trusted by 10,000+ professionals worldwide." />
        <meta name="keywords" content="knowledge management, AI, productivity, content organization, search, bookmarks, notes, research" />
        <meta property="og:title" content="Accio - Transform Chaos Into Your AI-Powered Knowledge Engine" />
        <meta property="og:description" content="Stop losing your best ideas. Save anything, find everything, achieve more." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Accio - Your AI Knowledge Engine" />
        <meta name="twitter:description" content="Save anything, find everything, achieve 10x productivity with AI-powered organization." />
        <link rel="canonical" href="https://yoursite.com/" />
      </Helmet>

      {/* Hero Section */}
      <UnifiedSpacing.Section size="lg" className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-primary/10 to-background">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" aria-hidden="true" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" aria-hidden="true" />
        
        <UnifiedSpacing.Container size="lg">
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-16">
            <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
              <Shield className="h-4 w-4" aria-hidden="true" />
              Bank-level security
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
              <Brain className="h-4 w-4" aria-hidden="true" />
              AI-powered organization
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
              <Users className="h-4 w-4" aria-hidden="true" />
              Trusted by 10,000+ users
            </Badge>
          </div>

          {/* Hero Content */}
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <UnifiedTypography.H1 className="text-center">
              Transform chaos into your{' '}
              <span className="text-primary relative">
                AI-powered knowledge engine
                <Sparkles className="absolute -top-4 -right-8 h-8 w-8 text-primary/70 animate-pulse" aria-hidden="true" />
              </span>
            </UnifiedTypography.H1>
            
            <UnifiedTypography.Lead className="text-center max-w-3xl mx-auto">
              Stop losing your best ideas. Save any webpage, document, or thought. 
              <span className="font-semibold text-foreground"> Let AI organize everything perfectly.</span> 
              Find anything instantly with natural language search.
            </UnifiedTypography.Lead>

            {/* Benefits List */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm bg-accent/50 rounded-full px-4 py-2">
                  <CheckCircle className="h-4 w-4 text-green-500" aria-hidden="true" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/register')} 
                className="group shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <Zap className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" aria-hidden="true" />
                Start building your knowledge engine
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/demo')}
                className="hover:bg-accent transition-all duration-300 hover:-translate-y-1"
              >
                Watch 2-minute demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="pt-8 space-y-4">
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" aria-hidden="true" />
                ))}
              </div>
              <UnifiedTypography.Body size="sm" className="text-center">
                4.9 stars from 2,500+ happy users worldwide
              </UnifiedTypography.Body>
            </div>
          </div>
        </UnifiedSpacing.Container>
      </UnifiedSpacing.Section>

      {/* Features Section */}
      <UnifiedSpacing.Section>
        <UnifiedSpacing.Container>
          <div className="text-center mb-16">
            <UnifiedTypography.H2>Everything you need to organize your knowledge</UnifiedTypography.H2>
            <UnifiedTypography.Lead>
              Powerful features designed to make knowledge management effortless and enjoyable.
            </UnifiedTypography.Lead>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-primary" aria-hidden="true" />
                  </div>
                  <Badge variant="outline" className="w-fit mx-auto mb-2">
                    {feature.highlight}
                  </Badge>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </UnifiedSpacing.Container>
      </UnifiedSpacing.Section>

      {/* CTA Section */}
      <UnifiedSpacing.Section className="bg-primary text-primary-foreground">
        <UnifiedSpacing.Container size="lg">
          <div className="text-center space-y-8">
            <UnifiedTypography.H2 className="text-primary-foreground">
              Ready to transform how you manage knowledge?
            </UnifiedTypography.H2>
            <UnifiedTypography.Lead className="text-primary-foreground/90">
              Join thousands of professionals who never lose important information again.
            </UnifiedTypography.Lead>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate('/register')}
                className="shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Free - No Credit Card Required
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/contact')}
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </UnifiedSpacing.Container>
      </UnifiedSpacing.Section>
    </UnifiedLayout>
  );
};

export default UnifiedIndex;
