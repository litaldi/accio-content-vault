
import React from 'react';
import { Layout, Typography } from '@/components/design-system/DesignSystem';
import { Brain, Search, Shield, Zap, Users, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Organization',
    description: 'Automatically categorize and tag your content with advanced AI algorithms.',
    color: 'text-purple-500'
  },
  {
    icon: Search,
    title: 'Semantic Search',
    description: 'Find exactly what you need with intelligent search that understands context.',
    color: 'text-blue-500'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level encryption and security for your most important information.',
    color: 'text-green-500'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Access your knowledge instantly with our optimized search and retrieval.',
    color: 'text-yellow-500'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Share and collaborate on knowledge bases with your team members.',
    color: 'text-pink-500'
  },
  {
    icon: Star,
    title: 'Smart Recommendations',
    description: 'Discover related content and insights you might have missed.',
    color: 'text-indigo-500'
  }
];

const ConsolidatedFeaturesSection: React.FC = () => {
  return (
    <Layout.Section sectionSize="xl" sectionBackground="muted">
      <Layout.Container containerSize="lg">
        <div className="text-center mb-16">
          <Typography.H2 className="mb-6">
            Everything you need to build your knowledge empire
          </Typography.H2>
          <Typography.Lead className="max-w-3xl mx-auto">
            Powerful features designed to help you capture, organize, and rediscover 
            information with unprecedented ease and intelligence.
          </Typography.Lead>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 h-full hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className={`${feature.color} p-2 rounded-lg bg-background`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <Typography.H3 className="text-lg mb-2">
                    {feature.title}
                  </Typography.H3>
                  <Typography.Body className="text-muted-foreground text-sm">
                    {feature.description}
                  </Typography.Body>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="group">
            Explore All Features
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </Layout.Container>
    </Layout.Section>
  );
};

export default ConsolidatedFeaturesSection;
