
import React from 'react';
import { Helmet } from 'react-helmet-async';
import EnhancedUnifiedLayout from '@/components/layout/EnhancedUnifiedLayout';
import { UnifiedTypography, UnifiedSpacing } from '@/components/ui/unified-design-system';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  Search, 
  Shield, 
  Globe, 
  Zap, 
  FileText, 
  Tag, 
  BarChart3,
  Smartphone,
  Cloud,
  Lock,
  RefreshCw
} from 'lucide-react';

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Organization",
      description: "Automatically categorize and tag your content with intelligent AI that learns from your preferences.",
      highlight: "Smart"
    },
    {
      icon: Search,
      title: "Natural Language Search",
      description: "Find anything instantly using natural language queries. Ask questions and get precise results.",
      highlight: "Fast"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Bank-level encryption ensures your data stays completely private and secure.",
      highlight: "Secure"
    },
    {
      icon: Globe,
      title: "Works Everywhere",
      description: "Save content from any device, anywhere. Browser extensions and mobile apps included.",
      highlight: "Global"
    },
    {
      icon: FileText,
      title: "Multiple Content Types",
      description: "Save articles, PDFs, images, videos, and more. OCR technology extracts text from images.",
      highlight: "Versatile"
    },
    {
      icon: Tag,
      title: "Smart Tagging",
      description: "Automatic tagging with 95% accuracy. Customize tags and create your own organization system.",
      highlight: "Organized"
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Track your reading habits, discover patterns, and optimize your knowledge consumption.",
      highlight: "Insightful"
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Native iOS and Android apps with offline access and seamless synchronization.",
      highlight: "Mobile"
    },
    {
      icon: Cloud,
      title: "Cloud Sync",
      description: "Your library syncs instantly across all devices with real-time updates.",
      highlight: "Synced"
    },
    {
      icon: Lock,
      title: "Team Collaboration",
      description: "Share collections with your team while maintaining granular privacy controls.",
      highlight: "Social"
    },
    {
      icon: RefreshCw,
      title: "Auto Backup",
      description: "Never lose your data with automatic backups and version history.",
      highlight: "Reliable"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Sub-second search results and instant content loading for maximum productivity.",
      highlight: "Speed"
    }
  ];

  return (
    <EnhancedUnifiedLayout>
      <Helmet>
        <title>Features - Accio Knowledge Library</title>
        <meta name="description" content="Discover all the powerful features that make Accio the ultimate knowledge management solution for professionals." />
        <meta name="keywords" content="features, AI organization, smart search, content management, productivity tools" />
      </Helmet>

      {/* Hero Section */}
      <UnifiedSpacing.Section size="lg" className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-primary/10 to-background">
        <UnifiedSpacing.Container size="lg">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4">
              All Features
            </Badge>
            <UnifiedTypography.H1 className="text-center">
              Everything you need to build your{' '}
              <span className="text-primary">knowledge empire</span>
            </UnifiedTypography.H1>
            
            <UnifiedTypography.Lead className="text-center">
              Discover the powerful features that make Accio the ultimate tool for organizing, 
              searching, and managing your digital knowledge.
            </UnifiedTypography.Lead>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/register')}
                className="shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Free Trial
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/pricing')}
              >
                View Pricing
              </Button>
            </div>
          </div>
        </UnifiedSpacing.Container>
      </UnifiedSpacing.Section>

      {/* Features Grid */}
      <UnifiedSpacing.Section>
        <UnifiedSpacing.Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        <UnifiedSpacing.Container>
          <div className="text-center space-y-8">
            <UnifiedTypography.H2 className="text-primary-foreground">
              Ready to supercharge your productivity?
            </UnifiedTypography.H2>
            <UnifiedTypography.Lead className="text-primary-foreground/90">
              Join thousands who've transformed their knowledge management with Accio.
            </UnifiedTypography.Lead>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/register')}
              className="shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started Free - No Credit Card Required
            </Button>
          </div>
        </UnifiedSpacing.Container>
      </UnifiedSpacing.Section>
    </EnhancedUnifiedLayout>
  );
};

export default Features;
