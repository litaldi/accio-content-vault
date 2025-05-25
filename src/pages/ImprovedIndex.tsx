
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ImprovedNavigation from '@/components/navigation/ImprovedNavigation';
import Container from '@/components/layout/Container';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useResponsiveDesign } from '@/hooks/use-responsive-design';
import RepositionedAccessibilityButton from '@/components/accessibility/RepositionedAccessibilityButton';
import { ModeToggle } from '@/components/ui/mode-toggle';
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
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ImprovedIndex = () => {
  const navigate = useNavigate();
  const { isMobile, isTablet } = useResponsiveDesign();
  
  // Mock auth check
  const isLoggedIn = false;

  const quickActions = [
    {
      title: "Search Content",
      description: "Find anything in your knowledge library instantly",
      icon: Search,
      action: () => navigate('/search'),
      color: "bg-blue-500"
    },
    {
      title: "Dashboard",
      description: "View your saved content and insights",
      icon: BookOpen,
      action: () => navigate('/dashboard'),
      color: "bg-green-500"
    },
    {
      title: "Get Help",
      description: "Access tutorials and support",
      icon: HelpCircle,
      action: () => navigate('/help'),
      color: "bg-purple-500"
    },
    {
      title: "Settings",
      description: "Customize your experience",
      icon: Settings,
      action: () => navigate('/settings'),
      color: "bg-orange-500"
    }
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Organization",
      description: "Automatically categorize and tag your content with intelligent AI."
    },
    {
      icon: Search,
      title: "Instant Search",
      description: "Find anything in seconds with natural language search."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and stays completely private."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share knowledge and collaborate with your team seamlessly."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col w-full relative">
      <Helmet>
        <title>Accio - Stop Losing Your Best Ideas. Start Building Brilliance.</title>
        <meta name="description" content="Transform chaos into your AI-powered knowledge engine. Save anything, find everything, achieve 10x productivity. Trusted by 10K+ professionals." />
      </Helmet>

      {/* Fixed Accessibility Controls - Top Right */}
      <div className={cn(
        "fixed z-50 flex items-center gap-3",
        isMobile ? "top-3 right-3" : "top-6 right-6"
      )}>
        <ModeToggle />
        <RepositionedAccessibilityButton />
      </div>
      
      <ImprovedNavigation />
      
      <main id="main-content" className="flex-grow w-full" role="main">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-primary/10 to-background">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true" />
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" aria-hidden="true" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" aria-hidden="true" />
          
          <Container size="xl" padding="lg" verticalSpacing="xl">
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-16 text-muted-foreground text-sm">
              <div className="flex items-center gap-2 bg-accent/50 rounded-full px-4 py-2 backdrop-blur-sm">
                <Shield className="h-4 w-4" aria-hidden="true" />
                <span className="font-medium">Bank-level security</span>
              </div>
              <div className="flex items-center gap-2 bg-accent/50 rounded-full px-4 py-2 backdrop-blur-sm">
                <Brain className="h-4 w-4" aria-hidden="true" />
                <span className="font-medium">AI-powered organization</span>
              </div>
              <div className="flex items-center gap-2 bg-accent/50 rounded-full px-4 py-2 backdrop-blur-sm">
                <Users className="h-4 w-4" aria-hidden="true" />
                <span className="font-medium">Trusted by 10,000+ users</span>
              </div>
            </div>

            {/* Hero Content */}
            <div className="text-center space-y-8 max-w-4xl mx-auto">
              <Typography.H1 className="text-center">
                Turn the internet into your personal{' '}
                <span className="text-primary relative">
                  knowledge library
                  <Sparkles className="absolute -top-4 -right-8 h-8 w-8 text-primary/70 animate-pulse" aria-hidden="true" />
                </span>
              </Typography.H1>
              
              <Typography.Lead className="text-center max-w-3xl mx-auto">
                Save any webpage, document, or file. Let AI organize everything perfectly. 
                <span className="font-semibold text-foreground"> Find anything instantly</span> 
                with natural language search.
              </Typography.Lead>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/register')} 
                  className="group shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <Sparkles className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" aria-hidden="true" />
                  Start building your library
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/demo')}
                  className="hover:bg-accent transition-all duration-300 hover:-translate-y-1"
                >
                  See how it works
                </Button>
              </div>

              {/* Social Proof */}
              <div className="pt-8 space-y-4">
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <Typography.Small className="text-center">
                  4.9 stars from 2,500+ happy users
                </Typography.Small>
              </div>
            </div>
          </Container>
        </section>

        {/* Quick Access for Logged In Users */}
        {isLoggedIn && (
          <section className="py-16 bg-muted/30">
            <Container size="xl" padding="lg">
              <div className="text-center mb-12">
                <Typography.H2>Welcome back!</Typography.H2>
                <Typography.Lead>Quick access to your most used features</Typography.Lead>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {quickActions.map((action) => (
                  <Card 
                    key={action.title} 
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 hover:border-primary/20"
                    onClick={action.action}
                  >
                    <CardHeader className="text-center pb-2">
                      <div className={cn(
                        "w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center",
                        action.color
                      )}>
                        <action.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription className="mb-4">
                        {action.description}
                      </CardDescription>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full"
                      >
                        Access Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Features Section */}
        <section className="py-20">
          <Container size="xl" padding="lg">
            <div className="text-center mb-16">
              <Typography.H2>Everything you need to organize your knowledge</Typography.H2>
              <Typography.Lead>
                Powerful features designed to make knowledge management effortless
              </Typography.Lead>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-primary" aria-hidden="true" />
                  </div>
                  <Typography.H4>{feature.title}</Typography.H4>
                  <Typography.Small>{feature.description}</Typography.Small>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <Container size="lg" padding="lg">
            <div className="text-center space-y-8">
              <Typography.H2 className="text-primary-foreground">
                Ready to transform how you manage knowledge?
              </Typography.H2>
              <Typography.Lead className="text-primary-foreground/90">
                Join thousands of professionals who never lose important information again.
              </Typography.Lead>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => navigate('/register')}
                  className="shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started Free
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
          </Container>
        </section>
      </main>
    </div>
  );
};

export default ImprovedIndex;
