
import React from 'react';
import UnifiedPageLayout from '@/components/layout/UnifiedPageLayout';
import { Helmet } from 'react-helmet-async';
import { Typography, Spacing } from '@/components/ui/design-system';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Search, Bookmark, BarChart3, Zap, Shield } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Organization',
      description: 'Automatically categorize and tag your content with intelligent AI analysis.'
    },
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find anything instantly with natural language search and semantic understanding.'
    },
    {
      icon: Bookmark,
      title: 'Quick Capture',
      description: 'Save content from anywhere with our browser extension and mobile apps.'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Track your learning progress and discover patterns in your knowledge.'
    },
    {
      icon: Zap,
      title: 'Voice Search',
      description: 'Search your knowledge base using natural voice commands.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and stored securely with enterprise-grade security.'
    }
  ];

  return (
    <UnifiedPageLayout
      title="Features - Accio"
      description="Discover all the powerful features that make Accio the best knowledge management platform."
    >
      <Helmet>
        <title>Features - Accio</title>
        <meta name="description" content="Explore Accio's powerful AI-driven features for knowledge management" />
      </Helmet>
      
      <Spacing.Section sectionSize="xl">
        <Spacing.Container>
          <div className="text-center mb-16">
            <Typography.H1 className="mb-6">
              Powerful Features for Modern Knowledge Workers
            </Typography.H1>
            <Typography.Lead className="max-w-3xl mx-auto">
              Everything you need to capture, organize, and rediscover your digital knowledge with AI-powered intelligence.
            </Typography.Lead>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <Typography.H3 className="mb-3">
                    {feature.title}
                  </Typography.H3>
                  <Typography.Body>
                    {feature.description}
                  </Typography.Body>
                </CardContent>
              </Card>
            ))}
          </div>
        </Spacing.Container>
      </Spacing.Section>
    </UnifiedPageLayout>
  );
};

export default Features;
