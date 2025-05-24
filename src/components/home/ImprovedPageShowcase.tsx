
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, BookOpen, Share, Zap } from 'lucide-react';

const ImprovedPageShowcase: React.FC = () => {
  const features = [
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find content instantly with AI-powered semantic search that understands context and meaning.'
    },
    {
      icon: BookOpen,
      title: 'Organized Knowledge',
      description: 'Automatically categorize and tag your content for effortless organization and discovery.'
    },
    {
      icon: Share,
      title: 'Easy Sharing',
      description: 'Collaborate with teams and share knowledge collections with simple, secure sharing options.'
    },
    {
      icon: Zap,
      title: 'Quick Capture',
      description: 'Save content from anywhere with our browser extension, mobile app, or direct URL input.'
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Features for Modern Knowledge Workers</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build and maintain your personal knowledge base
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
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
      </div>
    </section>
  );
};

export default ImprovedPageShowcase;
