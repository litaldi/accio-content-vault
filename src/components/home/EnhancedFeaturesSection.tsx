
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Shield, Sparkles, Target } from 'lucide-react';
import { Typography, Spacing } from '@/components/ui/design-system';

const EnhancedFeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Unlock deeper understanding with AI-generated summaries, key concepts, and related content suggestions.',
    },
    {
      icon: Shield,
      title: 'Secure Knowledge Base',
      description: 'Your data is encrypted and securely stored, ensuring your knowledge remains private and protected.',
    },
    {
      icon: Sparkles,
      title: 'Smart Organization',
      description: 'Automatically categorize and tag your content, making it easier to find and connect related ideas.',
    },
    {
      icon: Target,
      title: 'Seamless Integration',
      description: 'Connect with your favorite tools and platforms, creating a unified knowledge ecosystem.',
    },
  ];

  return (
    <Spacing.Section size="lg">
      <Spacing.Container>
        <div className="text-center mb-12">
          <Typography.H2>
            Supercharge Your Knowledge Workflow
          </Typography.H2>
          <Typography.Lead className="max-w-3xl mx-auto">
            Discover the features that make Accio the ultimate tool for knowledge workers
          </Typography.Lead>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <feature.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </Spacing.Container>
    </Spacing.Section>
  );
};

export default EnhancedFeaturesSection;
