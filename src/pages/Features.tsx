
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Brain, Search, Shield, Zap, Users, BarChart } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Organization',
      description: 'Automatically categorize and tag your content using advanced machine learning algorithms.'
    },
    {
      icon: Search,
      title: 'Intelligent Search',
      description: 'Find anything instantly with semantic search that understands context and meaning.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and security protocols protect your sensitive information.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance ensures your knowledge base loads and searches instantly.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share knowledge seamlessly with your team while maintaining access controls.'
    },
    {
      icon: BarChart,
      title: 'Analytics & Insights',
      description: 'Track usage patterns and discover insights about your knowledge consumption.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Features - Accio</title>
        <meta name="description" content="Discover the powerful features that make Accio the best knowledge management platform." />
      </Helmet>
      
      <div className="min-h-screen py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Features for Modern Teams
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to capture, organize, and discover knowledge efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 rounded-xl border bg-card hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
