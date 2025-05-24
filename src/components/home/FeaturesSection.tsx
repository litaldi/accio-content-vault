
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Globe, Shield, Smartphone } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Bot,
      title: 'AI-Powered Intelligence',
      description: 'Advanced AI helps you discover connections, suggest tags, and find relevant content automatically.'
    },
    {
      icon: Globe,
      title: 'Universal Compatibility',
      description: 'Works with any website, document, or file type. Save from anywhere on the web.'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data is encrypted and secure. You own your knowledge, always.'
    },
    {
      icon: Smartphone,
      title: 'Cross-Platform Access',
      description: 'Access your knowledge library from any device, anywhere, anytime.'
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Accio?</h2>
          <p className="text-xl text-muted-foreground">
            Built for the modern knowledge worker
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
