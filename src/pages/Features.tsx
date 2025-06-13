
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Typography, Spacing, Grid } from '@/components/ui/design-system';
import { 
  Brain, 
  Search, 
  BookOpen, 
  Smartphone, 
  Globe, 
  Shield, 
  Users, 
  Zap,
  Target,
  BarChart3,
  Cloud,
  Eye,
  Headphones,
  Wifi
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Features: React.FC = () => {
  const primaryFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Intelligence',
      description: 'Advanced machine learning automatically understands, categorizes, and connects your content for deeper insights.',
      features: ['Smart auto-tagging', 'Content categorization', 'Relationship mapping', 'Context understanding'],
      badge: 'Core Feature'
    },
    {
      icon: Search,
      title: 'Semantic Search',
      description: 'Find anything by describing what you remember, not just keywords. Our AI understands meaning and context.',
      features: ['Natural language queries', 'Context-aware results', 'Smart suggestions', 'Instant results'],
      badge: 'Most Popular'
    },
    {
      icon: BookOpen,
      title: 'Immersive Reading',
      description: 'Distraction-free reading mode with customizable settings, progress tracking, and intelligent highlights.',
      features: ['Focus mode', 'Reading analytics', 'Progress tracking', 'Customizable display'],
      badge: 'New'
    }
  ];

  const productivityFeatures = [
    { icon: Target, title: 'Smart Goals', description: 'Set and track reading and learning goals with AI-powered insights.' },
    { icon: BarChart3, title: 'Analytics Dashboard', description: 'Detailed insights into your reading habits and knowledge growth.' },
    { icon: Zap, title: 'Quick Capture', description: 'Save content from anywhere with our browser extension and mobile apps.' },
    { icon: Cloud, title: 'Universal Sync', description: 'Access your knowledge library across all devices with real-time sync.' }
  ];

  const collaborationFeatures = [
    { icon: Users, title: 'Team Workspaces', description: 'Share collections and collaborate on knowledge bases with your team.' },
    { icon: Globe, title: 'Public Collections', description: 'Discover and contribute to community-curated knowledge collections.' },
    { icon: Shield, title: 'Privacy Controls', description: 'Granular privacy settings to control what you share and with whom.' },
    { icon: Eye, title: 'Access Management', description: 'Manage permissions and access levels for different team members.' }
  ];

  const technicalFeatures = [
    { icon: Wifi, title: 'Offline Access', description: 'Download content for offline reading and automatic sync when back online.' },
    { icon: Smartphone, title: 'Cross-Platform', description: 'Native apps for iOS, Android, and desktop with seamless sync.' },
    { icon: Headphones, title: 'Accessibility First', description: 'Full screen reader support, keyboard navigation, and customizable display.' },
    { icon: Shield, title: 'Enterprise Security', description: 'SOC 2 compliance, end-to-end encryption, and enterprise SSO support.' }
  ];

  const FeatureGrid = ({ title, features, className = "" }: any) => (
    <div className={className}>
      <Typography.H3 className="mb-6 text-center">{title}</Typography.H3>
      <Grid.Responsive cols={{ sm: 1, md: 2, lg: 4 }}>
        {features.map((feature: any, index: number) => (
          <Card key={index} className="h-full hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <Typography.H4 className="mb-2 text-base">{feature.title}</Typography.H4>
              <Typography.Body size="sm" className="text-muted-foreground">
                {feature.description}
              </Typography.Body>
            </CardContent>
          </Card>
        ))}
      </Grid.Responsive>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Features - Accio | AI-Powered Knowledge Management</title>
        <meta name="description" content="Discover all the powerful features that make Accio the ultimate knowledge management platform. AI-powered organization, semantic search, and more." />
        <meta name="keywords" content="knowledge management features, AI organization, semantic search, reading mode, team collaboration" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <Spacing.Section size="xl" className="bg-gradient-to-br from-primary/5 to-background">
          <Spacing.Container>
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-6">
                Complete Feature Overview
              </Badge>
              <Typography.H1 className="mb-6">
                Everything you need to master your knowledge
              </Typography.H1>
              <Typography.Lead className="mb-8">
                From AI-powered organization to immersive reading experiences, discover how Accio transforms 
                the way you capture, organize, and leverage information.
              </Typography.Lead>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/register">Start Your Journey</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </Spacing.Container>
        </Spacing.Section>

        {/* Primary Features */}
        <Spacing.Section size="xl">
          <Spacing.Container>
            <div className="text-center mb-16">
              <Typography.H2 className="mb-4">Core Capabilities</Typography.H2>
              <Typography.Lead>The foundation of your knowledge management system</Typography.Lead>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {primaryFeatures.map((feature, index) => (
                <Card key={index} className="relative overflow-hidden">
                  {feature.badge && (
                    <Badge className="absolute top-4 right-4 z-10">
                      {feature.badge}
                    </Badge>
                  )}
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mb-4">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Typography.Body className="mb-6 text-muted-foreground">
                      {feature.description}
                    </Typography.Body>
                    <ul className="space-y-2">
                      {feature.features.map((item: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Spacing.Container>
        </Spacing.Section>

        {/* Feature Categories */}
        <Spacing.Section size="lg" className="bg-muted/20">
          <Spacing.Container>
            <Spacing.Stack gap="8">
              <FeatureGrid 
                title="Productivity & Learning" 
                features={productivityFeatures}
              />
              <FeatureGrid 
                title="Collaboration & Sharing" 
                features={collaborationFeatures}
                className="pt-12 border-t"
              />
              <FeatureGrid 
                title="Technical & Security" 
                features={technicalFeatures}
                className="pt-12 border-t"
              />
            </Spacing.Stack>
          </Spacing.Container>
        </Spacing.Section>

        {/* CTA Section */}
        <Spacing.Section size="lg">
          <Spacing.Container>
            <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-0">
              <CardContent className="p-12 text-center">
                <Typography.H2 className="mb-4">Ready to transform your knowledge?</Typography.H2>
                <Typography.Lead className="mb-8 max-w-2xl mx-auto">
                  Join thousands of professionals who've revolutionized their information management with Accio.
                </Typography.Lead>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link to="/register">Get Started Free</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/contact">Talk to Sales</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Spacing.Container>
        </Spacing.Section>
      </div>
    </>
  );
};

export default Features;
