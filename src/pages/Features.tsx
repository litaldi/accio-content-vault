
import React from 'react';
import { Helmet } from 'react-helmet-async';
import EnhancedNavigation from '@/components/navigation/EnhancedNavigation';
import ImprovedFooter from '@/components/Footer/ImprovedFooter';
import { BookOpen, Search, Brain, Zap, Shield, Cloud } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: 'Save Anything',
    description: 'Save articles, videos, PDFs, and more with our browser extension or mobile app.',
    details: ['One-click browser extension', 'Mobile sharing', 'Bulk import tools', 'OCR for images']
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: 'AI Organization',
    description: 'Let AI automatically tag and categorize your content for effortless organization.',
    details: ['Smart auto-tagging', 'Content categorization', 'Duplicate detection', 'Smart recommendations']
  },
  {
    icon: <Search className="h-8 w-8" />,
    title: 'Smart Search',
    description: 'Find anything with natural language search and semantic understanding.',
    details: ['Natural language queries', 'Semantic search', 'Advanced filters', 'Search history']
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: 'Quick Access',
    description: 'Access your knowledge library from anywhere with fast, responsive tools.',
    details: ['Quick save shortcuts', 'Instant search', 'Mobile apps', 'Offline access']
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: 'Privacy First',
    description: 'Your data is encrypted and secure with enterprise-grade privacy protection.',
    details: ['End-to-end encryption', 'GDPR compliant', 'No data selling', 'Privacy controls']
  },
  {
    icon: <Cloud className="h-8 w-8" />,
    title: 'Sync Everywhere',
    description: 'Access your content on all devices with real-time synchronization.',
    details: ['Cross-platform sync', 'Real-time updates', 'Backup & restore', 'Export options']
  }
];

const Features = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Features - Accio Knowledge Library</title>
        <meta name="description" content="Discover powerful features for organizing and accessing your knowledge with AI-powered tools." />
      </Helmet>
      
      <EnhancedNavigation />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Powerful Features</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to build and manage your personal knowledge library
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <ImprovedFooter />
    </div>
  );
};

export default Features;
